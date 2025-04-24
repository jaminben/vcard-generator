export class FormHandler {
  static formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as +1 (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  }

  static updatePhoneNumber(input, value) {
    const formatted = this.formatPhoneNumber(value);
    if (formatted !== value) {
      input.value = formatted;
      // Announce the formatted number to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Phone number formatted as: ${formatted}`;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
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

  static saveFormValues() {
    const formData = {
      firstName: document.getElementById('firstName')?.value || '',
      lastName: document.getElementById('lastName')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      whatsapp: document.getElementById('whatsapp')?.value || '',
      email: document.getElementById('email')?.value || '',
      website: document.getElementById('website')?.value || '',
      company: document.getElementById('company')?.value || '',
      jobTitle: document.getElementById('jobTitle')?.value || '',
      whatsappMessage: document.getElementById('whatsappMessage')?.value || '',
      smsMessage: document.getElementById('smsMessage')?.value || ''
    };
    
    localStorage.setItem('vcardFormData', JSON.stringify(formData));
  }

  static restoreFormValues() {
    const savedData = localStorage.getItem('vcardFormData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      
      Object.entries(formData).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
          element.value = value;
        }
      });
    }
  }

  static showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = 'text-red-700 font-medium mt-2';
      element.setAttribute('role', 'alert');
      element.setAttribute('aria-live', 'assertive');
    }
  }

  static showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = 'text-green-700 font-medium mt-2';
      element.setAttribute('role', 'status');
      element.setAttribute('aria-live', 'polite');
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
} 