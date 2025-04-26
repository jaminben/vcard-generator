import { FormHandler } from './utils/formHandler.js';
import { QRCodeHandler } from './utils/qrCodeHandler.js';

// Helper function to download vCard
function downloadVCard(vcard, company) {
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${company.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved form data and images


  // Initialize QR code handler
  QRCodeHandler.loadDefaultLogo();
  QRCodeHandler.initLogoSourceHandler();
  FormHandler.restoreFormValues();
  QRCodeHandler.regenerateQRCodes();

  // Set up phone number formatting
  const phoneInput = document.getElementById('phone');
  const whatsappInput = document.getElementById('whatsapp');
  
  [phoneInput, whatsappInput].forEach(input => {
    if (input) {
      input.pattern = '[0-9+\\s\\(\\)\\-]{10,}';
      input.addEventListener('input', (e) => {
        FormHandler.updatePhoneNumber(e.target, e.target.value);
        FormHandler.saveFormData();
      });
    }
  });

  // Set up file upload handlers
  FormHandler.handleFileUpload('photoInput', 'photoPreview', 'photoFeedback');
  FormHandler.handleFileUpload('logoInput', 'logoPreview', 'logoFeedback');

  // Set up generate button
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const company = document.getElementById('company')?.value;
      const email = document.getElementById('email')?.value;

      if (!company || !email) {
        alert('Please fill in the required fields (Company Name and Email)');
        return;
      }

      // Generate all QR codes
      QRCodeHandler.generateVCardQRCode();
      QRCodeHandler.generateWhatsAppQRCode();
      QRCodeHandler.generateSMSQRCode();
      QRCodeHandler.generateWebsiteQRCode();

      // Show and set up download button
      const downloadSection = document.getElementById('downloadSection');
      const downloadBtn = document.getElementById('downloadBtn');
      
      if (downloadSection && downloadBtn) {
        downloadSection.classList.remove('hidden');
      }

      // Save form data after generating QR codes
      FormHandler.saveFormData();
    });
  }

  const downloadBtn = document.getElementById('downloadBtn');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const company = document.getElementById('company')?.value;
      const email = document.getElementById('email')?.value;      
      const vcard = QRCodeHandler.generateVCard();
      downloadVCard(vcard, company);
    });
  }

  // Save form data when any input changes
  const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea');
  formInputs.forEach(input => {
    input.addEventListener('change', () => {
      FormHandler.saveFormData();
    });
  });

  // Save form data when logo source changes
  const logoSourceRadios = document.querySelectorAll('input[name="logoSource"]');
  logoSourceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      FormHandler.saveFormData();
    });
  });
}); 