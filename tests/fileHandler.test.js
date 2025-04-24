import { jest } from '@jest/globals';
import { FileHandler } from '../src/js/utils/fileHandler.js';

describe('FileHandler', () => {
  test('handles empty photo file', async () => {
    const result = await FileHandler.handlePhotoFile(null);
    expect(result).toBe('');
  });

  test('handles empty logo file', async () => {
    const result = await FileHandler.handleLogoFile(null);
    expect(result).toBe('');
  });

  test('rejects non-image photo file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    await expect(FileHandler.handlePhotoFile(file)).rejects.toThrow('Please upload an image file');
  });

  test('rejects non-image logo file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    await expect(FileHandler.handleLogoFile(file)).rejects.toThrow('Please upload an image file');
  });

  test('handles photo file read error', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      onerror: null
    };
    
    global.FileReader = jest.fn(() => mockReader);
    
    const promise = FileHandler.handlePhotoFile(file);
    mockReader.onerror();
    
    await expect(promise).rejects.toThrow('Error reading file');
  });

  test('handles logo file read error', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const mockReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      onerror: null
    };
    
    global.FileReader = jest.fn(() => mockReader);
    
    const promise = FileHandler.handleLogoFile(file);
    mockReader.onerror();
    
    await expect(promise).rejects.toThrow('Error reading file');
  });

  test('processes photo file successfully', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      onerror: null
    };
    
    global.FileReader = jest.fn(() => mockReader);
    
    const promise = FileHandler.handlePhotoFile(file);
    mockReader.onload = { target: { result: 'data:image/jpeg;base64,testdata' } };
    mockReader.onload();
    
    const result = await promise;
    expect(result).toContain('data:image/jpeg;base64,');
  });

  test('processes logo file successfully', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const mockReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      onerror: null
    };
    
    global.FileReader = jest.fn(() => mockReader);
    
    const promise = FileHandler.handleLogoFile(file);
    mockReader.onload = { target: { result: 'data:image/png;base64,testdata' } };
    mockReader.onload();
    
    const result = await promise;
    expect(result).toContain('data:image/png;base64,');
  });
}); 