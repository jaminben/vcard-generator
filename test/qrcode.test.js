import { QRCodeGenerator } from '../src/js/modules/qrcode.js';

describe('QRCodeGenerator', () => {
  let qrGenerator;
  let container;

  beforeEach(() => {
    // Setup DOM elements
    container = document.createElement('div');
    container.id = 'qrcode';
    document.body.appendChild(container);
    
    qrGenerator = new QRCodeGenerator();
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = '';
  });

  test('generates QR code without logo', () => {
    qrGenerator.generateQRCode('qrcode', 'test data');
    
    // Wait for the async operations to complete
    return new Promise(resolve => setTimeout(resolve, 600)).then(() => {
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeTruthy();
      expect(canvas.width).toBe(256);
      expect(canvas.height).toBe(256);
    });
  });

  test('handles missing element ID', () => {
    qrGenerator.generateQRCode('non-existent', 'test data');
    expect(document.getElementById('non-existent')).toBeFalsy();
  });

  test('handles empty data', () => {
    qrGenerator.generateQRCode('qrcode', '');
    expect(container.innerHTML).toContain('No data provided for QR code');
  });

  test('adds download button with correct type', () => {
    qrGenerator.generateQRCode('qrcode', 'test data');
    
    return new Promise(resolve => setTimeout(resolve, 600)).then(() => {
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button.textContent).toBe('Download vcard qrcode');
    });
  });
}); 