class Timeline {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.video = video;
    this.thumbnails = [];
    this.generating = false;
  }

  async generateThumbnails() {
    if (this.generating) return;
    this.generating = true;
    this.thumbnails = [];

    const count = 20;
    const duration = this.video.duration;
    const thumbWidth = 80;
    const thumbHeight = 60;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = thumbWidth;
    tempCanvas.height = thumbHeight;
    const tempCtx = tempCanvas.getContext("2d");

    for (let i = 0; i < count; i++) {
      const time = (i / count) * duration;
      try {
        const blob = await this._captureFrame(time, tempCanvas, tempCtx);
        this.thumbnails.push({ time, blob });
      } catch {
        // skip failed frame
      }
    }

    this.generating = false;
    this.draw();
  }

  _captureFrame(time, canvas, ctx) {
    return new Promise((resolve, reject) => {
      const onSeeked = () => {
        this.video.removeEventListener("seeked", onSeeked);
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to capture"));
          },
          "image/jpeg",
          0.5,
        );
      };
      this.video.addEventListener("seeked", onSeeked);
      this.video.currentTime = time;
    });
  }

  draw() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * devicePixelRatio;
    this.canvas.height = rect.height * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    const w = rect.width;
    const h = rect.height;

    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(0, 0, w, h);

    if (this.thumbnails.length === 0) return;

    const thumbW = w / this.thumbnails.length;
    const loadPromises = this.thumbnails.map((thumb, i) => {
      if (thumb.img) {
        this.ctx.drawImage(thumb.img, i * thumbW, 0, thumbW, h);
        return Promise.resolve();
      }
      return createImageBitmap(thumb.blob).then((img) => {
        thumb.img = img;
        this.ctx.drawImage(img, i * thumbW, 0, thumbW, h);
      });
    });

    Promise.all(loadPromises).catch(() => {});
  }

  getTimeFromX(clientX) {
    const rect = this.canvas.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return ratio * this.video.duration;
  }
}
