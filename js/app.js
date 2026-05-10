(function () {
  const video = document.getElementById("sourceVideo");
  const canvas = document.getElementById("previewCanvas");
  const ctx = canvas.getContext("2d");
  const uploadOverlay = document.getElementById("uploadOverlay");
  const fileInput = document.getElementById("fileInput");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const volumeBtn = document.getElementById("volumeBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const exportBtn = document.getElementById("exportBtn");
  const exportModal = document.getElementById("exportModal");
  const exportProgress = document.getElementById("exportProgress");
  const exportStatus = document.getElementById("exportStatus");
  const cancelExportBtn = document.getElementById("cancelExport");
  const textInput = document.getElementById("textInput");
  const textSize = document.getElementById("textSize");
  const textColor = document.getElementById("textColor");
  const addTextBtn = document.getElementById("addTextBtn");
  const textListEl = document.getElementById("textList");
  const filterGrid = document.getElementById("filterGrid");
  const trimStartInput = document.getElementById("trimStart");
  const trimEndInput = document.getElementById("trimEnd");
  const trimStartTime = document.getElementById("trimStartTime");
  const trimEndTime = document.getElementById("trimEndTime");
  const trimOverlayStart = document.getElementById("trimOverlayStart");
  const trimOverlayEnd = document.getElementById("trimOverlayEnd");
  const timelineEl = document.getElementById("timeline");
  const timelineCanvas = document.getElementById("timelineCanvas");
  const playhead = document.getElementById("playhead");

  const textManager = new TextOverlayManager();
  let timeline = null;
  let activeFilter = "none";
  let isPlaying = false;
  let isVideoLoaded = false;
  let animFrameId = null;
  let exporter = null;

  function enableControls() {
    const controls = [
      playBtn, volumeBtn, volumeSlider, exportBtn,
      textInput, textSize, textColor, addTextBtn,
      trimStartInput, trimEndInput,
    ];
    controls.forEach((el) => (el.disabled = false));
    filterGrid.querySelectorAll(".filter-btn").forEach((btn) => (btn.disabled = false));
  }

  // File upload
  uploadOverlay.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) loadVideo(e.target.files[0]);
  });

  uploadOverlay.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadOverlay.classList.add("dragover");
  });
  uploadOverlay.addEventListener("dragleave", () => {
    uploadOverlay.classList.remove("dragover");
  });
  uploadOverlay.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadOverlay.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) loadVideo(e.dataTransfer.files[0]);
  });

  function loadVideo(file) {
    const url = URL.createObjectURL(file);
    video.src = url;

    video.addEventListener(
      "loadedmetadata",
      () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        durationEl.textContent = formatTime(video.duration);
        trimEndInput.value = 100;
        trimEndTime.textContent = formatTimeShort(video.duration);
        uploadOverlay.classList.add("hidden");
        isVideoLoaded = true;
        enableControls();

        timeline = new Timeline(timelineCanvas, video);
        timeline.generateThumbnails();

        drawFrame();
      },
      { once: true },
    );
  }

  // Playback
  playBtn.addEventListener("click", togglePlay);

  function togglePlay() {
    if (!isVideoLoaded) return;
    if (isPlaying) {
      video.pause();
    } else {
      const trimS = getTrimStart();
      const trimE = getTrimEnd();
      if (video.currentTime < trimS || video.currentTime >= trimE) {
        video.currentTime = trimS;
      }
      video.play();
    }
  }

  video.addEventListener("play", () => {
    isPlaying = true;
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    renderLoop();
  });

  video.addEventListener("pause", () => {
    isPlaying = false;
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    if (animFrameId) cancelAnimationFrame(animFrameId);
  });

  video.addEventListener("ended", () => {
    video.pause();
    video.currentTime = getTrimStart();
  });

  video.addEventListener("timeupdate", () => {
    if (isPlaying && video.currentTime >= getTrimEnd()) {
      video.pause();
      video.currentTime = getTrimStart();
    }
  });

  function renderLoop() {
    if (!isPlaying) return;
    drawFrame();
    updateTimeDisplay();
    updatePlayhead();
    animFrameId = requestAnimationFrame(renderLoop);
  }

  function drawFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (activeFilter !== "none") {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      Filters[activeFilter](imageData);
      ctx.putImageData(imageData, 0, 0);
    }

    textManager.render(ctx, canvas.width, canvas.height);
  }

  function updateTimeDisplay() {
    currentTimeEl.textContent = formatTime(video.currentTime);
  }

  function updatePlayhead() {
    if (!isVideoLoaded) return;
    const ratio = video.currentTime / video.duration;
    playhead.style.left = ratio * 100 + "%";
  }

  // Volume
  volumeSlider.addEventListener("input", () => {
    video.volume = parseFloat(volumeSlider.value);
  });
  volumeBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    volumeSlider.value = video.muted ? 0 : video.volume;
  });

  // Timeline seek
  timelineEl.addEventListener("mousedown", (e) => {
    if (!isVideoLoaded) return;
    seekFromTimeline(e);
  });

  timelineEl.addEventListener("mousemove", (e) => {
    if (!isVideoLoaded || e.buttons !== 1) return;
    seekFromTimeline(e);
  });

  function seekFromTimeline(e) {
    const rect = timelineEl.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    video.currentTime = ratio * video.duration;
    updateTimeDisplay();
    updatePlayhead();
    if (!isPlaying) drawFrame();
  }

  // Trim
  function getTrimStart() {
    return (parseFloat(trimStartInput.value) / 100) * video.duration;
  }

  function getTrimEnd() {
    return (parseFloat(trimEndInput.value) / 100) * video.duration;
  }

  trimStartInput.addEventListener("input", () => {
    const val = parseFloat(trimStartInput.value);
    if (val >= parseFloat(trimEndInput.value)) {
      trimStartInput.value = parseFloat(trimEndInput.value) - 0.1;
    }
    trimStartTime.textContent = formatTimeShort(getTrimStart());
    trimOverlayStart.style.width = trimStartInput.value + "%";
  });

  trimEndInput.addEventListener("input", () => {
    const val = parseFloat(trimEndInput.value);
    if (val <= parseFloat(trimStartInput.value)) {
      trimEndInput.value = parseFloat(trimStartInput.value) + 0.1;
    }
    trimEndTime.textContent = formatTimeShort(getTrimEnd());
    trimOverlayEnd.style.width = 100 - parseFloat(trimEndInput.value) + "%";
  });

  // Filters
  filterGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn || btn.disabled) return;
    filterGrid.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    if (!isPlaying && isVideoLoaded) drawFrame();
  });

  // Text overlays
  addTextBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) return;
    const size = parseInt(textSize.value) || 48;
    const color = textColor.value;
    textManager.add(text, size, color);
    textInput.value = "";
    renderTextList();
    if (!isPlaying) drawFrame();
  });

  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTextBtn.click();
  });

  function renderTextList() {
    if (textManager.overlays.length === 0) {
      textListEl.innerHTML = '<p class="text-list-empty">テキストなし</p>';
      return;
    }
    textListEl.innerHTML = textManager.overlays
      .map(
        (o) =>
          `<div class="text-list-item">
            <span style="color:${o.color}">${o.text}</span>
            <button class="btn btn-small btn-danger" onclick="removeText(${o.id})">削除</button>
          </div>`,
      )
      .join("");
  }

  window.removeText = function (id) {
    textManager.remove(id);
    renderTextList();
    if (!isPlaying) drawFrame();
  };

  // Drag text on canvas
  canvas.addEventListener("mousedown", (e) => {
    if (!isVideoLoaded) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    const hit = textManager.hitTest(mx, my, canvas.width, canvas.height, ctx);
    if (hit) {
      textManager.selectedId = hit.id;
      textManager.startDrag(hit, mx, my, canvas.width, canvas.height);
      e.preventDefault();
    } else {
      textManager.selectedId = null;
    }
    if (!isPlaying) drawFrame();
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!textManager.dragging) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    textManager.drag(mx, my, canvas.width, canvas.height);
    if (!isPlaying) drawFrame();
  });

  window.addEventListener("mouseup", () => textManager.stopDrag());

  // Export
  exportBtn.addEventListener("click", async () => {
    if (!isVideoLoaded) return;

    exportModal.style.display = "flex";
    exportProgress.style.width = "0%";
    exportStatus.textContent = "フレームを処理しています...";

    exporter = new VideoExporter(video, canvas, textManager, activeFilter);

    try {
      const blob = await exporter.export(
        getTrimStart(),
        getTrimEnd(),
        (progress) => {
          exportProgress.style.width = Math.round(progress * 100) + "%";
          exportStatus.textContent = `処理中... ${Math.round(progress * 100)}%`;
        },
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cometrue-video.webm";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err.message !== "Cancelled") {
        exportStatus.textContent = "エクスポートに失敗しました: " + err.message;
        return;
      }
    }

    exportModal.style.display = "none";
    video.pause();
    video.currentTime = getTrimStart();
    drawFrame();
  });

  cancelExportBtn.addEventListener("click", () => {
    if (exporter) exporter.cancel();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }
  });

  // Resize
  window.addEventListener("resize", () => {
    if (timeline) timeline.draw();
  });
})();
