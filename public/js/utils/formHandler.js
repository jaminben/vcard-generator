import { QRCodeHandler } from './qrCodeHandler.js';

export class FormHandler {
  static formatPhoneNumber(phone) {
    // Remove all non-digit characters except +, (, ), and -
    return phone.replace(/[^\d+()\s-]/g, '');
  }

  static updatePhoneNumber(input, value) {
    // Remove all non-digit characters except +, (, ), and -
    const cleaned = value.replace(/[^\d+()\s-]/g, '');
    input.value = cleaned;
    
    // If this is the phone input and WhatsApp is empty or matches the old phone number, mirror to WhatsApp
    if (input.id === 'phone') {
      const whatsappInput = document.getElementById('whatsapp');
      if (whatsappInput && (!whatsappInput.value || whatsappInput.value === input.defaultValue)) {
        whatsappInput.value = cleaned;
        whatsappInput.defaultValue = cleaned;
      }
    }
  }

  static saveFormData() {
    // Save form values
    let formData = {
      company: document.getElementById('company')?.value,
      email: document.getElementById('email')?.value,
      phone: document.getElementById('phone')?.value,
      whatsapp: document.getElementById('whatsapp')?.value,
      website: document.getElementById('website')?.value,
      whatsappMessage: document.getElementById('whatsappMessage')?.value,
      smsMessage: document.getElementById('smsMessage')?.value,
      logoSource: document.querySelector('input[name="logoSource"]:checked')?.value,
      photoData: window.photoData,
      logoData: window.logoData
    };
    localStorage.setItem('vcardFormData', JSON.stringify(formData));

    // Store QR code data
    const qrcodeDiv = document.getElementById('qrcode');
    const whatsappQrcodeDiv = document.getElementById('whatsappQrcode');
    const smsQrcodeDiv = document.getElementById('smsQrcode');
    const websiteQrcodeDiv = document.getElementById('websiteQrcode');

    let qrData = {
      vcard: qrcodeDiv?.getAttribute('data-content'),
      whatsapp: whatsappQrcodeDiv?.getAttribute('data-content'),
      sms: smsQrcodeDiv?.getAttribute('data-content'),
      website: websiteQrcodeDiv?.getAttribute('data-content')
    };
    localStorage.setItem('qrData', JSON.stringify(qrData));
  }

  static restoreFormValues() {
    let savedData = localStorage.getItem('vcardFormData');
    let savedQRData = localStorage.getItem('qrData');

    if (savedData) {
      const formData = JSON.parse(savedData);
      
      // Restore form values
      if (formData.company) document.getElementById('company').value = formData.company;
      if (formData.email) document.getElementById('email').value = formData.email;
      if (formData.phone) document.getElementById('phone').value = formData.phone;
      if (formData.whatsapp) document.getElementById('whatsapp').value = formData.whatsapp;
      if (formData.website) document.getElementById('website').value = formData.website;
      if (formData.whatsappMessage) document.getElementById('whatsappMessage').value = formData.whatsappMessage;
      if (formData.smsMessage) document.getElementById('smsMessage').value = formData.smsMessage;
      
      // Restore photo and logo data
      if (formData.photoData) {
        window.photoData = formData.photoData;
        const photoPreview = document.getElementById('photoPreview');
        const previewImage = document.getElementById('previewImage');
        if (photoPreview && previewImage) {
          photoPreview.classList.remove('hidden');
          previewImage.src = formData.photoData;
        }
      }
      
      if (formData.logoData) {
        window.logoData = formData.logoData;
      }
      
      // Restore logo source selection
      if (formData.logoSource) {
        const radioBtn = document.querySelector(`input[name="logoSource"][value="${formData.logoSource}"]`);
        if (radioBtn) {
          radioBtn.checked = true;
          const logoUploadSection = document.getElementById('logoUploadSection');
          if (logoUploadSection) {
            if (formData.logoSource === 'upload') {
              logoUploadSection.classList.remove('hidden');
            } else {
              logoUploadSection.classList.add('hidden');
            }
          }
        }
      }
    }

    // Restore QR code data
    if (savedQRData) {
      const qrData = JSON.parse(savedQRData);
      
      // Set data-content attributes
      if (qrData.vcard) document.getElementById('qrcode')?.setAttribute('data-content', qrData.vcard);
      if (qrData.whatsapp) document.getElementById('whatsappQrcode')?.setAttribute('data-content', qrData.whatsapp);
      if (qrData.sms) document.getElementById('smsQrcode')?.setAttribute('data-content', qrData.sms);
      if (qrData.website) document.getElementById('websiteQrcode')?.setAttribute('data-content', qrData.website);
      
      // If we have all required data, regenerate QR codes
      if (formData.company && formData.email) {
        // Set the correct logo data based on the saved logo source
        if (formData.logoSource === 'photo' && formData.photoData) {
          window.logoData = formData.photoData;
        } else if (formData.logoSource === 'upload' && formData.logoData) {
          window.logoData = formData.logoData;
        }
        
        // Generate QR codes
        QRCodeHandler.generateVCardQRCode();
        QRCodeHandler.generateWhatsAppQRCode();
        QRCodeHandler.generateSMSQRCode();
        QRCodeHandler.generateWebsiteQRCode();
        
        // Show download section
        let downloadSection = document.getElementById('downloadSection');
        if (downloadSection) {
          downloadSection.classList.remove('hidden');
        }
      }
    }
  }

  static handleFileUpload(inputId, previewId, feedbackId, maxSize = 5 * 1024 * 1024) {
    let input = document.getElementById(inputId);
    let preview = document.getElementById(previewId);
    let feedback = document.getElementById(feedbackId);
    let dropZone = document.getElementById(inputId === 'photoInput' ? 'photoDrop' : 'logoDrop');

    if (!input || !preview || !feedback || !dropZone) return;

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('border-blue-700', 'bg-blue-50');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('border-blue-700', 'bg-blue-50');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      let file = e.dataTransfer.files[0];
      if (file) {
        input.files = e.dataTransfer.files;
        handleFileChange(file);
      }
    });

    // Handle file input change
    input.addEventListener('change', () => {
      let file = input.files[0];
      if (file) {
        handleFileChange(file);
      }
    });

    function handleFileChange(file) {
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        feedback.textContent = 'Please upload an image file';
        feedback.classList.add('text-red-600');
        return;
      }

      if (file.size > maxSize) {
        feedback.textContent = `File size must be less than ${maxSize / 1024 / 1024}MB`;
        feedback.classList.add('text-red-600');
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        preview.classList.remove('hidden');
        let img = preview.querySelector('img');
        if (img) {
          img.src = e.target.result;
        }

        // Store the image data
        if (inputId === 'photoInput') {
          window.photoData = e.target.result;
          // Only set logoData to photoData if there is no existing logoData
          if (!window.logoData) {
            window.logoData = e.target.result;
            // If "Use Profile Photo" is selected, regenerate QR codes
            let photoRadio = document.querySelector('input[name="logoSource"][value="photo"]');
            if (photoRadio && photoRadio.checked) {
              QRCodeHandler.regenerateQRCodes();
            }
          }
        } else if (inputId === 'logoInput') {
          window.logoData = e.target.result;
          QRCodeHandler.regenerateQRCodes();
        }

        // Save form data after successful upload
        FormHandler.saveFormData();

        feedback.textContent = 'File uploaded successfully';
        feedback.classList.remove('text-red-600');
        feedback.classList.add('text-green-600');
      };

      reader.readAsDataURL(file);
    }
  }

  static showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.classList.remove('text-red-500');
      element.classList.add('text-green-500');
    }
  }

  static showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.classList.remove('text-green-500');
      element.classList.add('text-red-500');
    }
  }

  static updateMessageTemplates(firstName) {
    const whatsappMessage = document.getElementById('whatsappMessage');
    const smsMessage = document.getElementById('smsMessage');
    
    if (whatsappMessage) {
      whatsappMessage.value = firstName ? 
        `Hi ${firstName}, I'd like to connect with you on WhatsApp.` :
        'hi from me on whatsapp';
      whatsappMessage.setAttribute('aria-label', `WhatsApp message template: ${whatsappMessage.value}`);
    }
    
    if (smsMessage) {
      smsMessage.value = firstName ? 
        `Hi ${firstName}, I'd like to connect with you.` :
        'hi from me on sms';
      smsMessage.setAttribute('aria-label', `SMS message template: ${smsMessage.value}`);
    }
  }

  static validateForm() {
    const requiredFields = ['firstName', 'lastName', 'phone', 'email'];
    let isValid = true;
    let firstError = null;

    // Clear previous error messages
    document.querySelectorAll('[role="alert"]').forEach(el => {
      el.textContent = '';
      el.removeAttribute('role');
      el.removeAttribute('aria-live');
    });

    // Validate each required field
    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      const errorId = `${field}-error`;
      let errorDiv = document.getElementById(errorId);
      
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = errorId;
        input.parentNode.appendChild(errorDiv);
      }

      if (!input.value.trim()) {
        this.showError(errorId, `${input.labels[0].textContent.replace('*', '').trim()} is required`);
        isValid = false;
        if (!firstError) firstError = input;
      } else if (input.validity && !input.validity.valid) {
        let message = '';
        if (input.type === 'email' && !input.validity.valid) {
          message = 'Please enter a valid email address (e.g., name@example.com)';
        } else if (input.type === 'tel' && !input.validity.valid) {
          message = 'Please enter a valid phone number with country code (e.g., +1 (555) 555-5555)';
        } else {
          message = input.validationMessage;
        }
        this.showError(errorId, message);
        isValid = false;
        if (!firstError) firstError = input;
      }
    });

    // Focus the first error field
    if (firstError) {
      firstError.focus();
      firstError.setAttribute('aria-invalid', 'true');
    }

    return isValid;
  }

  static setupPhoneInputs() {
    const phoneInput = document.getElementById('phone');
    const whatsappInput = document.getElementById('whatsapp');
    
    if (phoneInput) {
      phoneInput.pattern = '[0-9+\\s\\(\\)\\-]{10,}';
      phoneInput.setAttribute('aria-invalid', 'false');
      phoneInput.addEventListener('input', () => {
        phoneInput.setAttribute('aria-invalid', !phoneInput.validity.valid);
      });
    }
    
    if (whatsappInput) {
      whatsappInput.pattern = '[0-9+\\s\\(\\)\\-]{10,}';
      whatsappInput.setAttribute('aria-invalid', 'false');
      whatsappInput.addEventListener('input', () => {
        whatsappInput.setAttribute('aria-invalid', !whatsappInput.validity.valid);
      });
    }
  }

  static setupFileUpload(dropZoneId, inputId, previewId, feedbackId, dataProperty) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(inputId);

    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.borderColor = '#000';
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.borderColor = '#ccc';
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.borderColor = '#ccc';

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          this.handleFileUpload(file, previewId, feedbackId, dataProperty);
        } else {
          this.showError(feedbackId, 'Please drop an image file');
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.handleFileUpload(file, previewId, feedbackId, dataProperty);
        }
      });
    }
  }
} 