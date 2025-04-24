class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getContext() {
    return {
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '#ffffff'
    };
  }

  toDataURL() {
    return 'data:image/png;base64,mock';
  }
}

module.exports = {
  createCanvas: (width, height) => new Canvas(width, height),
  Canvas
}; 