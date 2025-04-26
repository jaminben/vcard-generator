// Initialize global variables
window.photoData = '';
window.logoData = '';

export class QRCodeHandler {
  static initLogoSourceHandler() {
    const radioButtons = document.querySelectorAll('input[name="logoSource"]');
    const logoUploadSection = document.getElementById('logoUploadSection');

    // Set initial state - default to using profile photo
    if (logoUploadSection) {
      // Set the radio button to "photo" by default
      const photoRadio = document.querySelector('input[name="logoSource"][value="photo"]');
      if (photoRadio) {
        photoRadio.checked = true;
      }
      
      // Hide the upload section initially
      logoUploadSection.classList.add('hidden');
      
      // Use photo as logo if available
      if (window.photoData) {
        window.logoData = window.photoData;
        this.regenerateQRCodes();
      }
    }

    radioButtons.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'photo') {
          logoUploadSection.classList.add('hidden');
          // Use photo as logo if available
          if (window.photoData) {
            window.logoData = window.photoData;
            // Regenerate QR codes with new logo
            this.regenerateQRCodes();
          }
        } else {
          logoUploadSection.classList.remove('hidden');
          // If we already have a custom logo, use it
          if (window.logoData && window.logoData !== window.photoData) {
            this.regenerateQRCodes();
          }
        }
      });
    });
  }

  static regenerateQRCodes() {
    const qrCodes = ['qrcode', 'whatsappQrcode', 'smsQrcode', 'websiteQrcode'];
    qrCodes.forEach(id => {
      const element = document.getElementById(id);
      if (element && element.querySelector('canvas')) {
        const data = element.getAttribute('data-content');
        if (data) {
          this.generateQRCode(id, data);
        }
      }
    });
  }

  static generateQRCode(elementId, data) {
    try {
      const qrcodeDiv = document.getElementById(elementId);
      qrcodeDiv.innerHTML = ''; // Clear previous QR code
      
      if (!data) {
        qrcodeDiv.innerHTML = '<p class="text-red-500">No data provided for QR code</p>';
        return;
      }

      // Create container for QR code
      const container = document.createElement('div');
      container.className = 'relative';
      qrcodeDiv.appendChild(container);

      // Create temporary container for QR code generation
      const tempContainer = document.createElement('div');
      tempContainer.style.display = 'none';
      container.appendChild(tempContainer);

      // Generate QR code in temporary container
      new QRCode(tempContainer, {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // Get the QR code canvas
      const qrCanvas = tempContainer.querySelector('canvas');
      
      // Create final canvas that will contain both QR code and logo
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 256;
      finalCanvas.height = 256;
      container.appendChild(finalCanvas);

      // Draw QR code on final canvas
      const ctx = finalCanvas.getContext('2d');
      ctx.drawImage(qrCanvas, 0, 0);

      // Determine QR code type for filename
      let qrType = 'qr-code';
      if (elementId === 'qrcode') {
        qrType = 'vcard-qrcode';
      } else if (elementId === 'whatsappQrcode') {
        qrType = 'whatsapp-qrcode';
      } else if (elementId === 'smsQrcode') {
        qrType = 'sms-qrcode';
      } else if (elementId === 'websiteQrcode') {
        qrType = 'website-qrcode';
      }

      // Add logo if available
      if (window.logoData) {
        const logo = new Image();
        logo.onload = function() {
          const logoSize = 64; // 25% of QR code size
          const logoX = (256 - logoSize) / 2;
          const logoY = (256 - logoSize) / 2;

          // Draw white background for logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
          
          // Draw logo
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

          // Make the canvas draggable
          finalCanvas.draggable = true;
          finalCanvas.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', data);
            e.dataTransfer.setDragImage(finalCanvas, 128, 128);
          });

          // Add download button
          const downloadBtn = document.createElement('button');
          downloadBtn.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
          downloadBtn.textContent = `Download ${qrType.replace('-', ' ')}`;
          downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `${qrType}.png`;
            link.href = finalCanvas.toDataURL('image/png');
            link.click();
          });
          container.appendChild(downloadBtn);
        };
        logo.src = window.logoData;
      } else {
        // Make the canvas draggable without logo
        finalCanvas.draggable = true;
        finalCanvas.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', data);
          e.dataTransfer.setDragImage(finalCanvas, 128, 128);
        });

        // Add download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
        downloadBtn.textContent = `Download ${qrType.replace('-', ' ')}`;
        downloadBtn.addEventListener('click', () => {
          const link = document.createElement('a');
          link.download = `${qrType}.png`;
          link.href = finalCanvas.toDataURL('image/png');
          link.click();
        });
        container.appendChild(downloadBtn);
      }

      // Remove temporary container
      tempContainer.remove();
    } catch (error) {
      console.error('Error generating QR code:', error);
      document.getElementById(elementId).innerHTML = `
        <p class="text-red-500">Error generating QR code: ${error.message}</p>
        <p class="text-sm text-gray-500">Try reducing the amount of data in the vCard</p>
      `;
    }
  }

  static generateVCardQRCode() {
    const vcard = this.generateSimplifiedVCard();
    this.generateQRCode('qrcode', vcard);
  }

  static generateWhatsAppQRCode() {
    const whatsapp = document.getElementById('whatsapp')?.value;
    if (whatsapp) {
      const message = document.getElementById('whatsappMessage')?.value || '';
      const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      this.generateQRCode('whatsappQrcode', whatsappUrl);
    }
  }

  static generateSMSQRCode() {
    const phone = document.getElementById('phone')?.value;
    if (phone) {
      const message = document.getElementById('smsMessage')?.value || '';
      const smsUrl = `sms:${phone.replace(/\D/g, '')}?body=${encodeURIComponent(message)}`;
      this.generateQRCode('smsQrcode', smsUrl);
    }
  }

  static generateWebsiteQRCode() {
    const website = document.getElementById('website')?.value;
    if (website) {
      const websiteQrcode = document.getElementById('websiteQrcode');
      if (websiteQrcode) {
        websiteQrcode.setAttribute('data-content', website);
      }
      this.generateQRCode('websiteQrcode', website);
    }
  }

  static generateVCard() {
    const company = document.getElementById('company')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value;
    const website = document.getElementById('website')?.value;

    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${company}\n`;
    vcard += `ORG:${company}\n`;
    if (email) vcard += `EMAIL:${email}\n`;
    if (phone) vcard += `TEL:${phone}\n`;
    if (whatsapp) vcard += `TEL;TYPE=WHATSAPP:${whatsapp}\n`;
    if (website) vcard += `URL:${website}\n`;
    if (window.photoData) vcard += `PHOTO;ENCODING=b;TYPE=JPEG:${window.photoData.split(',')[1]}\n`;
    vcard += 'END:VCARD';

    return vcard;
  }

  static generateSimplifiedVCard() {
    const company = document.getElementById('company')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value;
    const website = document.getElementById('website')?.value;

    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${company}\n`;
    vcard += `ORG:${company}\n`;
    if (email) vcard += `EMAIL:${email}\n`;
    if (phone) vcard += `TEL:${phone}\n`;
    if (whatsapp) vcard += `TEL;TYPE=WHATSAPP:${whatsapp}\n`;
    if (website) vcard += `URL:${website}\n`;
    vcard += 'END:VCARD';

    return vcard;
  }

  static loadDefaultLogo() {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      window.logoData = canvas.toDataURL('image/png');
      
      // If there are any QR codes already generated, regenerate them with the logo
      const qrCodes = ['qrcode', 'whatsappQrcode', 'smsQrcode', 'websiteQrcode'];
      qrCodes.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.querySelector('canvas')) {
          const data = element.getAttribute('data-content');
          if (data) {
            QRCodeHandler.generateQRCode(id, data);
          }
        }
      });
    };
    img.src = 'olark-logo.png';
  }
} 