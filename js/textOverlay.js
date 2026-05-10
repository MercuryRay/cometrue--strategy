class TextOverlayManager {
  constructor() {
    this.overlays = [];
    this.selectedId = null;
    this.dragging = null;
  }

  add(text, size, color) {
    const overlay = {
      id: Date.now(),
      text,
      size,
      color,
      x: 0.5,
      y: 0.5,
    };
    this.overlays.push(overlay);
    return overlay;
  }

  remove(id) {
    this.overlays = this.overlays.filter((o) => o.id !== id);
    if (this.selectedId === id) this.selectedId = null;
  }

  render(ctx, canvasWidth, canvasHeight) {
    for (const overlay of this.overlays) {
      const x = overlay.x * canvasWidth;
      const y = overlay.y * canvasHeight;
      const fontSize = overlay.size * (canvasHeight / 720);

      ctx.save();
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.lineWidth = fontSize / 12;
      ctx.lineJoin = "round";
      ctx.strokeText(overlay.text, x, y);

      ctx.fillStyle = overlay.color;
      ctx.fillText(overlay.text, x, y);

      if (this.selectedId === overlay.id) {
        const metrics = ctx.measureText(overlay.text);
        const w = metrics.width + 16;
        const h = fontSize + 12;
        ctx.strokeStyle = "#6c5ce7";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);
      }

      ctx.restore();
    }
  }

  hitTest(mx, my, canvasWidth, canvasHeight, ctx) {
    for (let i = this.overlays.length - 1; i >= 0; i--) {
      const overlay = this.overlays[i];
      const x = overlay.x * canvasWidth;
      const y = overlay.y * canvasHeight;
      const fontSize = overlay.size * (canvasHeight / 720);

      ctx.font = `bold ${fontSize}px sans-serif`;
      const metrics = ctx.measureText(overlay.text);
      const w = metrics.width + 16;
      const h = fontSize + 12;

      if (
        mx >= x - w / 2 &&
        mx <= x + w / 2 &&
        my >= y - h / 2 &&
        my <= y + h / 2
      ) {
        return overlay;
      }
    }
    return null;
  }

  startDrag(overlay, mx, my, canvasWidth, canvasHeight) {
    this.dragging = {
      overlay,
      offsetX: mx / canvasWidth - overlay.x,
      offsetY: my / canvasHeight - overlay.y,
    };
  }

  drag(mx, my, canvasWidth, canvasHeight) {
    if (!this.dragging) return;
    this.dragging.overlay.x = clamp(
      mx / canvasWidth - this.dragging.offsetX,
      0.05,
      0.95,
    );
    this.dragging.overlay.y = clamp(
      my / canvasHeight - this.dragging.offsetY,
      0.05,
      0.95,
    );
  }

  stopDrag() {
    this.dragging = null;
  }
}
