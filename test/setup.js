import 'jest-canvas-mock';

// Mock canvas module
jest.mock('canvas', () => ({
  createCanvas: () => ({
    getContext: () => ({
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '#ffffff'
    }),
    width: 256,
    height: 256,
    toDataURL: () => 'data:image/png;base64,mock'
  })
}));

// Mock QRCode library
global.QRCode = class {
  constructor(element, options) {
    const canvas = document.createElement('canvas');
    canvas.width = options.width || 256;
    canvas.height = options.height || 256;
    element.appendChild(canvas);
  }
};

// Mock QRCode.CorrectLevel
global.QRCode.CorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};

// Mock Image
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    }, 100);
  }
}; 