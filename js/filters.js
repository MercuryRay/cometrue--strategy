const Filters = {
  none(imageData) {
    return imageData;
  },

  grayscale(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    return imageData;
  },

  sepia(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
    return imageData;
  },

  invert(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return imageData;
  },

  brightness(imageData) {
    const data = imageData.data;
    const factor = 1.4;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * factor);
      data[i + 1] = Math.min(255, data[i + 1] * factor);
      data[i + 2] = Math.min(255, data[i + 2] * factor);
    }
    return imageData;
  },

  contrast(imageData) {
    const data = imageData.data;
    const factor = 1.5;
    const intercept = 128 * (1 - factor);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(data[i] * factor + intercept, 0, 255);
      data[i + 1] = clamp(data[i + 1] * factor + intercept, 0, 255);
      data[i + 2] = clamp(data[i + 2] * factor + intercept, 0, 255);
    }
    return imageData;
  },
};
