import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { QRCodeGenerator } from '../src/js/modules/qrcode.js';

describe('QRCodeGenerator', () => {
  let qrGenerator;
  let container;
  let mockQRCode;

  beforeEach(() => {
    // Setup DOM elements
    container = document.createElement('div');
    container.id = 'qrcode';
    document.body.appendChild(container);
    
    // Mock QRCode
    mockQRCode = {
      clear: vi.fn(),
      makeCode: vi.fn()
    };

    // Mock QRCode constructor
    global.QRCode = vi.fn(() => mockQRCode);
    global.QRCode.CorrectLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };

    qrGenerator = new QRCodeGenerator();
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    vi.clearAllMocks();
  });

  it('generates QR code without logo', () => {
    qrGenerator.generateQRCode('qrcode', 'test data');
    
    expect(global.QRCode).toHaveBeenCalledWith(container, {
      text: 'test data',
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: global.QRCode.CorrectLevel.H
    });
  });

  it('handles missing element ID', () => {
    const consoleError = vi.spyOn(console, 'error');
    const error = new Error('Element with id non-existent not found');
    
    qrGenerator.generateQRCode('non-existent', 'test data');
    
    expect(consoleError).toHaveBeenCalledWith(
      'Error generating QR code:',
      error
    );
    
    consoleError.mockRestore();
  });

  it('handles empty data', () => {
    qrGenerator.generateQRCode('qrcode', '');
    expect(container.innerHTML).toContain('No data provided for QR code');
  });

  it('adds download button with correct type', () => {
    // Test the _setupDownloadButton method directly
    const button = document.createElement('button');
    button.textContent = 'Download vcard qrcode';
    button.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
    
    // Mock the container's appendChild method
    const appendChildSpy = vi.spyOn(container, 'appendChild');
    
    // Call the method
    qrGenerator._setupDownloadButton(container, document.createElement('canvas'), 'qrcode');
    
    // Verify that appendChild was called with a button
    expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    
    // Get the actual button that was created
    const createdButton = appendChildSpy.mock.calls[0][0];
    expect(createdButton.textContent).toBe('Download vcard qrcode');
    expect(createdButton.className).toBe('mt-2 text-sm text-blue-600 hover:text-blue-800');
  });
}); 