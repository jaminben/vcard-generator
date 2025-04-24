export class QRCodeGenerator {
  constructor() {
    this.logoData = '';
  }

  setLogo(logoData) {
    this.logoData = logoData;
  }

  generateQRCode(elementId, data) {
    try {
      const qrcodeDiv = document.getElementById(elementId);
      if (!qrcodeDiv) {
        console.error('Error generating QR code:', new Error(`Element with id ${elementId} not found`));
        return;
      }
      
      qrcodeDiv.innerHTML = '';
      
      if (!data) {
        qrcodeDiv.innerHTML = '<p class="text-red-500">No data provided for QR code</p>';
        return;
      }

      // Create QR code directly in the target div
      const qrCode = new QRCode(qrcodeDiv, {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // Wait for the QR code to be fully rendered
      const checkQRCode = () => {
        const qrCanvas = qrcodeDiv.querySelector('canvas');
        if (!qrCanvas) {
          console.log('Waiting for QR code canvas...');
          setTimeout(checkQRCode, 100);
          return;
        }

        console.log('QR code canvas found, proceeding with rendering');
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = 256;
        finalCanvas.height = 256;
        
        // Insert the final canvas before the QR code canvas
        qrcodeDiv.insertBefore(finalCanvas, qrCanvas);

        const ctx = finalCanvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
        
        // Draw the QR code
        ctx.drawImage(qrCanvas, 0, 0);

        if (this.logoData) {
          const logo = new Image();
          logo.onload = () => {
            const logoSize = 64;
            const logoX = (256 - logoSize) / 2;
            const logoY = (256 - logoSize) / 2;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

            // Remove the original QR code canvas
            qrCanvas.remove();
            this._setupDownloadButton(qrcodeDiv, finalCanvas, elementId);
          };
          logo.onerror = () => {
            console.error('Error loading logo image');
            // Remove the original QR code canvas
            qrCanvas.remove();
            this._setupDownloadButton(qrcodeDiv, finalCanvas, elementId);
          };
          logo.src = this.logoData;
        } else {
          // Remove the original QR code canvas
          qrCanvas.remove();
          this._setupDownloadButton(qrcodeDiv, finalCanvas, elementId);
        }
      };

      // Start checking for QR code readiness
      setTimeout(checkQRCode, 500); // Give more initial time for QR code to render
    } catch (error) {
      console.error('Error generating QR code:', error);
      const qrcodeDiv = document.getElementById(elementId);
      if (qrcodeDiv) {
        qrcodeDiv.innerHTML = `
          <p class="text-red-500">Error generating QR code: ${error.message}</p>
          <p class="text-sm text-gray-500">Try reducing the amount of data in the vCard</p>
        `;
      }
    }
  }

  _setupDownloadButton(container, canvas, elementId) {
    const qrType = this._getQRType(elementId);
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
    downloadBtn.textContent = `Download ${qrType.replace('-', ' ')}`;
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `${qrType}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
    container.appendChild(downloadBtn);
  }

  _getQRType(elementId) {
    switch (elementId) {
      case 'qrcode':
        return 'vcard-qrcode';
      case 'whatsappQrcode':
        return 'whatsapp-qrcode';
      case 'smsQrcode':
        return 'sms-qrcode';
      default:
        return 'qr-code';
    }
  }
} 