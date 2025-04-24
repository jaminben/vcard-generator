import { vi } from 'vitest';

// Mock canvas and other browser APIs
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    });
  }
};

global.URL = {
  createObjectURL: vi.fn(),
  revokeObjectURL: vi.fn()
};

global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

// Mock QRCode
global.QRCode = vi.fn().mockImplementation(() => ({
  clear: vi.fn(),
  makeCode: vi.fn()
}));

// Mock canvas functionality
const mockCanvasContext = {
  drawImage: vi.fn(),
  fillStyle: '',
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({
    data: new Uint8ClampedArray(100),
    width: 100,
    height: 100
  })),
  putImageData: vi.fn()
};

const mockCanvas = {
  getContext: vi.fn(() => mockCanvasContext),
  toDataURL: vi.fn(() => 'data:image/jpeg;base64,dGVzdGRhdGE='),
  width: 256,
  height: 256
};

// Save original createElement
const originalCreateElement = document.createElement;

// Mock document functions
document.createElement = (tag) => {
  if (tag.toLowerCase() === 'canvas') {
    return mockCanvas;
  }
  return originalCreateElement.call(document, tag);
};

// Mock FileReader
global.FileReader = class {
  constructor() {
    this.readAsDataURL = vi.fn(() => {
      setTimeout(() => {
        this.onload && this.onload({ target: { result: 'data:image/jpeg;base64,dGVzdGRhdGE=' } });
      });
    });
  }
};

// Mock HTMLCanvasElement
global.HTMLCanvasElement = class {
  getContext() {
    return mockCanvasContext;
  }
  toDataURL() {
    return 'data:image/jpeg;base64,dGVzdGRhdGE=';
  }
}; 