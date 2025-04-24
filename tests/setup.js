import { jest } from '@jest/globals';

// Mock canvas and other browser APIs
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    });
  }
};

global.URL = {
  createObjectURL: jest.fn(),
  revokeObjectURL: jest.fn()
};

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock canvas functionality
const mockCanvas = {
  getContext: jest.fn(() => ({
    drawImage: jest.fn(),
    fillStyle: '',
    fillRect: jest.fn()
  })),
  toDataURL: jest.fn(() => 'data:image/jpeg;base64,mockdata'),
  width: 0,
  height: 0
};

// Mock document functions
global.document.createElement = jest.fn((tag) => {
  if (tag === 'canvas') {
    return mockCanvas;
  }
  const element = document.createElement(tag);
  return element;
});

// Mock FileReader
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  onload: null,
  onerror: null
})); 