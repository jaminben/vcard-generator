import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FileHandler } from '../src/js/utils/fileHandler.js';

describe('FileHandler', () => {
  let mockReader;

  beforeEach(() => {
    mockReader = {
      readAsDataURL: vi.fn(function() {
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: this._mockResult } });
          }
        }, 0);
      }),
      onload: null,
      onerror: null,
      _mockResult: null
    };
    
    global.FileReader = vi.fn(() => mockReader);

    // Mock Image
    global.Image = class {
      constructor() {
        this.width = 400;
        this.height = 300;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    };

    // Mock canvas
    const mockCanvas = {
      getContext: vi.fn(() => ({
        drawImage: vi.fn()
      })),
      toDataURL: vi.fn((type, quality) => {
        if (type === 'image/jpeg') {
          return 'data:image/jpeg;base64,dGVzdGRhdGE=';
        }
        return 'data:image/png;base64,dGVzdGRhdGE=';
      })
    };

    global.document.createElement = vi.fn((tag) => {
      if (tag === 'canvas') return mockCanvas;
      return document.createElement(tag);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles empty photo file', async () => {
    const result = await FileHandler.handlePhotoFile(null);
    expect(result).toBe('');
  });

  it('handles empty logo file', async () => {
    const result = await FileHandler.handleLogoFile(null);
    expect(result).toBe('');
  });

  it('rejects non-image photo file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    await expect(FileHandler.handlePhotoFile(file)).rejects.toThrow('Please upload an image file');
  });

  it('rejects non-image logo file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    await expect(FileHandler.handleLogoFile(file)).rejects.toThrow('Please upload an image file');
  });

  it('handles photo file read error', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const promise = FileHandler.handlePhotoFile(file);
    mockReader.onerror();
    await expect(promise).rejects.toThrow('Error reading file');
  });

  it('handles logo file read error', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const promise = FileHandler.handleLogoFile(file);
    mockReader.onerror();
    await expect(promise).rejects.toThrow('Error reading file');
  });

  it('processes photo file successfully', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    mockReader._mockResult = 'data:image/jpeg;base64,dGVzdGRhdGE=';
    const result = await FileHandler.handlePhotoFile(file);
    expect(result).toBe('dGVzdGRhdGE='); // Just the base64 data without prefix
  });

  it('processes logo file successfully', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    mockReader._mockResult = 'data:image/png;base64,dGVzdGRhdGE=';
    const result = await FileHandler.handleLogoFile(file);
    expect(result).toBe('data:image/png;base64,dGVzdGRhdGE='); // Complete data URL
  });
}); 