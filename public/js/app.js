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

  generateVCard() {
    const contact = {
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

    const vcardData = this.vcardGenerator.generateVCard(contact);
    const simplifiedVCard = this.vcardGenerator.generateSimplifiedVCard(contact);

    // Generate QR codes
    this.qrGenerator.generateQRCode('qrcode', vcardData);

    // Generate WhatsApp QR code if number is provided
    if (contact.whatsapp) {
      const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;
      this.qrGenerator.generateQRCode('whatsappQrcode', whatsappUrl);
    }

    // Generate SMS QR code
    const smsUrl = `sms:${contact.phone.replace(/\D/g, '')}`;
    this.qrGenerator.generateQRCode('smsQrcode', smsUrl);

    // Download vCard
    this.vcardGenerator.downloadVCard('contact.vcf', vcardData);
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new VCardApp();
});

// Default images
const DEFAULT_PROFILE_IMAGE = 'images/default-profile.png';
const DEFAULT_LOGO_IMAGE = 'images/default-logo.png';
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';

// Load default images
const defaultProfileImage = new Image();
defaultProfileImage.onerror = () => {
    console.error('Failed to load default profile image');
    defaultProfileImage.src = PLACEHOLDER_IMAGE;
};
defaultProfileImage.src = DEFAULT_PROFILE_IMAGE;

const defaultLogoImage = new Image();
defaultLogoImage.onerror = () => {
    console.error('Failed to load default logo image');
    defaultLogoImage.src = PLACEHOLDER_IMAGE;
};
defaultLogoImage.src = DEFAULT_LOGO_IMAGE;

// Update the image preview functions
function handleImagePreview(input, previewId, feedbackId, defaultImage) {
    const file = input.files[0];
    if (!file) {
        document.getElementById(previewId).classList.add('hidden');
        document.getElementById(feedbackId).textContent = '';
        return;
    }

    if (!file.type.startsWith('image/')) {
        document.getElementById(feedbackId).textContent = 'Please select an image file';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            document.getElementById(previewId).classList.remove('hidden');
            document.getElementById(previewId).querySelector('img').src = e.target.result;
            document.getElementById(feedbackId).textContent = '';
        };
        img.onerror = () => {
            document.getElementById(feedbackId).textContent = 'Failed to load image';
            document.getElementById(previewId).querySelector('img').src = defaultImage;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
} 