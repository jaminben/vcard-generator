export class QRCodeGenerator {
  constructor() {
    this.logoData = '';
  }

  setLogo(logoData) {
    this.logoData = logoData;
  }

  generateQRCode(vcard, element) {
    if (!element) {
      throw new Error('QR code element not found');
    }

    try {
      // Clear previous QR code
      element.innerHTML = '';
      
      // Create a new QR code
      new QRCode(element, {
        text: vcard,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      const qrcodeDiv = document.getElementById(element.id);
      const container = document.createElement('div');
      container.className = 'relative';
      qrcodeDiv.appendChild(container);

      const tempContainer = document.createElement('div');
      tempContainer.style.display = 'none';
      container.appendChild(tempContainer);

      const qrCanvas = tempContainer.querySelector('canvas');
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 256;
      finalCanvas.height = 256;
      container.appendChild(finalCanvas);

      const ctx = finalCanvas.getContext('2d');
      console.log(qrCanvas, ctx)
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

          this._setupDownloadButton(container, finalCanvas, element.id);
        };
        logo.src = this.logoData;
      } else {
        this._setupDownloadButton(container, finalCanvas, element.id);
      }

      tempContainer.remove();
    } catch (error) {
      console.error('Error generating QR code:', error);
      element.innerHTML = '<p class="text-red-500">Error generating QR code</p>';
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