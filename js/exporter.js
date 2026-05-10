class VideoExporter {
  constructor(video, canvas, textManager, activeFilter) {
    this.video = video;
    this.sourceCanvas = canvas;
    this.textManager = textManager;
    this.activeFilter = activeFilter;
    this.cancelled = false;
  }

  cancel() {
    this.cancelled = true;
  }

  async export(trimStart, trimEnd, onProgress) {
    this.cancelled = false;
    const duration = trimEnd - trimStart;
    const fps = 30;
    const totalFrames = Math.ceil(duration * fps);

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = this.sourceCanvas.width;
    exportCanvas.height = this.sourceCanvas.height;
    const exportCtx = exportCanvas.getContext("2d");

    const stream = exportCanvas.captureStream(fps);
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(this.video);
    const dest = audioCtx.createMediaStreamDestination();
    source.connect(dest);
    source.connect(audioCtx.destination);

    for (const track of dest.stream.getAudioTracks()) {
      stream.addTrack(track);
    }

    const recorder = new MediaRecorder(stream, {
      mimeType: this._getSupportedMimeType(),
      videoBitsPerSecond: 5000000,
    });

    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    return new Promise((resolve, reject) => {
      recorder.onstop = () => {
        source.disconnect(dest);
        audioCtx.close();
        const blob = new Blob(chunks, { type: recorder.mimeType });
        resolve(blob);
      };

      recorder.start();
      this.video.currentTime = trimStart;

      let frameCount = 0;

      const renderFrame = () => {
        if (this.cancelled) {
          recorder.stop();
          reject(new Error("Cancelled"));
          return;
        }

        if (
          this.video.currentTime >= trimEnd ||
          frameCount >= totalFrames
        ) {
          recorder.stop();
          return;
        }

        exportCtx.drawImage(
          this.video,
          0,
          0,
          exportCanvas.width,
          exportCanvas.height,
        );

        if (this.activeFilter && this.activeFilter !== "none") {
          const imageData = exportCtx.getImageData(
            0,
            0,
            exportCanvas.width,
            exportCanvas.height,
          );
          Filters[this.activeFilter](imageData);
          exportCtx.putImageData(imageData, 0, 0);
        }

        this.textManager.render(
          exportCtx,
          exportCanvas.width,
          exportCanvas.height,
        );

        frameCount++;
        onProgress(frameCount / totalFrames);

        requestAnimationFrame(renderFrame);
      };

      this.video.play();
      renderFrame();
    });
  }

  _getSupportedMimeType() {
    const types = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
      "video/mp4",
    ];
    return types.find((t) => MediaRecorder.isTypeSupported(t)) || "video/webm";
  }
}
