import { QRCodeGenerator } from './modules/qrcode.js';
import { VCardGenerator } from './modules/vcard.js';
import { FileHandler } from './utils/fileHandler.js';
import { FormHandler } from './utils/formHandler.js';

class VCardApp {
  constructor() {
    this.qrGenerator = new QRCodeGenerator();
    this.vcardGenerator = new VCardGenerator();
    this.photoData = '';
    this.logoData = '';
    
    this.initializeEventListeners();
    this.loadDefaultLogo();
    FormHandler.restoreFormValues();
    this.restoreGeneratedData();
  }

  initializeEventListeners() {
    // Form input handlers
    document.getElementById('firstName')?.addEventListener('input', (e) => {
      FormHandler.updateMessageTemplates(e.target.value);
      FormHandler.saveFormValues();
    });

    document.getElementById('phone')?.addEventListener('input', (e) => {
      FormHandler.updatePhoneNumber(e.target, e.target.value);
      FormHandler.saveFormValues();
    });

    document.getElementById('whatsapp')?.addEventListener('input', (e) => {
      FormHandler.updatePhoneNumber(e.target, e.target.value);
      FormHandler.saveFormValues();
    });

    // File upload handlers
    document.getElementById('photoInput')?.addEventListener('change', async (e) => {
      try {
        this.photoData = await FileHandler.handlePhotoFile(e.target.files[0]);
        const preview = document.getElementById('previewImage');
        if (preview) {
          preview.src = this.photoData;
          document.getElementById('photoPreview').classList.remove('hidden');
        }
        FormHandler.showSuccess('photoFeedback', 'Photo uploaded successfully');
      } catch (error) {
        FormHandler.showError('photoFeedback', error.message);
      }
    });

    document.getElementById('logoInput')?.addEventListener('change', async (e) => {
      try {
        this.logoData = await FileHandler.handleLogoFile(e.target.files[0]);
        this.qrGenerator.setLogo(this.logoData);
        const preview = document.getElementById('previewLogo');
        if (preview) {
          preview.src = this.logoData;
          document.getElementById('logoPreview').classList.remove('hidden');
        }
        FormHandler.showSuccess('logoFeedback', 'Logo uploaded successfully');
      } catch (error) {
        FormHandler.showError('logoFeedback', error.message);
      }
    });

    // Generate button handler
    document.getElementById('generateBtn')?.addEventListener('click', () => {
      this.generateVCard();
    });
  }

  async loadDefaultLogo() {
    try {
      const response = await fetch('default-logo.png');
      if (response.ok) {
        const blob = await response.blob();
        this.logoData = await FileHandler.handleLogoFile(blob);
        this.qrGenerator.setLogo(this.logoData);
      }
    } catch (error) {
      console.error('Error loading default logo:', error);
    }
  }

  saveGeneratedData(contact, vcardData, simplifiedVCard) {
    const generatedData = {
      contact,
      vcardData,
      simplifiedVCard,
      photoData: this.photoData,
      logoData: this.logoData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('vcardGeneratedData', JSON.stringify(generatedData));
  }

  restoreGeneratedData() {
    const savedData = localStorage.getItem('vcardGeneratedData');
    if (savedData) {
      const generatedData = JSON.parse(savedData);
      this.photoData = generatedData.photoData;
      this.logoData = generatedData.logoData;
      
      if (this.logoData) {
        this.qrGenerator.setLogo(this.logoData);
      }

      // Restore photo preview if exists
      if (this.photoData) {
        const preview = document.getElementById('previewImage');
        if (preview) {
          preview.src = this.photoData;
          document.getElementById('photoPreview').classList.remove('hidden');
        }
      }

      // Restore logo preview if exists
      if (this.logoData) {
        const preview = document.getElementById('previewLogo');
        if (preview) {
          preview.src = this.logoData;
          document.getElementById('logoPreview').classList.remove('hidden');
        }
      }

      // Regenerate QR codes with saved data
      this.generateVCard(generatedData.contact, generatedData.vcardData, generatedData.simplifiedVCard);
    }
  }

  generateVCard(contact = null, savedVcardData = null, savedSimplifiedVCard = null) {
    if (!contact) {
      contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        company: document.getElementById('company').value,
        jobTitle: document.getElementById('jobTitle').value,
        photo: this.photoData
      };
    }

    const vcardData = savedVcardData || this.vcardGenerator.generateVCard(contact);
    const simplifiedVCard = savedSimplifiedVCard || this.vcardGenerator.generateSimplifiedVCard(contact);

    // Save the generated data
    this.saveGeneratedData(contact, vcardData, simplifiedVCard);

    // Generate vCard QR code
    this.qrGenerator.generateQRCode('qrcode', vcardData);

    // Generate WhatsApp QR code if number is provided
    if (contact.whatsapp) {
      const whatsappMessage = document.getElementById('whatsappMessage')?.value || '';
      const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      this.qrGenerator.generateQRCode('whatsappQrcode', whatsappUrl);
    }

    // Generate SMS QR code
    if (contact.phone) {
      const smsMessage = document.getElementById('smsMessage')?.value || '';
      const smsUrl = `sms:${contact.phone.replace(/\D/g, '')}?body=${encodeURIComponent(smsMessage)}`;
      this.qrGenerator.generateQRCode('smsQrcode', smsUrl);
    }

    // Update download links
    this.vcardGenerator.downloadVCard('contact.vcf', vcardData);
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new VCardApp();
}); 