class FormHandler {
  static init() {
    const phoneInput = document.getElementById('phone');
    const whatsappInput = document.getElementById('whatsapp');
    
    // Set phone number patterns
    phoneInput.pattern = '[0-9+\\s\\(\\)\\-]{10,}';
    whatsappInput.pattern = '[0-9+\\s\\(\\)\\-]{10,}';
    
    // Add event listeners
    phoneInput.addEventListener('input', () => this.formatPhoneNumber(phoneInput));
    whatsappInput.addEventListener('input', () => this.formatPhoneNumber(whatsappInput));
    
    // Restore form values
    this.restoreFormValues();
  }

  static updateMessageTemplates(name) {
    const whatsappMessage = document.getElementById('whatsappMessage');
    const smsMessage = document.getElementById('smsMessage');
    
    if (!name || name.trim() === '') {
      whatsappMessage.value = 'hi from me on whatsapp';
      smsMessage.value = 'hi from me on sms';
    } else {
      whatsappMessage.value = `Hi ${name}, I'd like to connect with you on WhatsApp.`;
      smsMessage.value = `Hi ${name}, I'd like to connect with you.`;
    }
  }

  static formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Format the number
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    
    input.value = value;
  }

  static saveFormValues() {
    const form = document.getElementById('vcardForm');
    const formData = new FormData(form);
    const values = {};
    
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    
    localStorage.setItem('vcardFormData', JSON.stringify(values));
  }

  static restoreFormValues() {
    const savedData = localStorage.getItem('vcardFormData');
    if (savedData) {
      const values = JSON.parse(savedData);
      const form = document.getElementById('vcardForm');
      
      for (const [key, value] of Object.entries(values)) {
        const input = form.elements[key];
        if (input) {
          input.value = value;
        }
      }
    }
  }

  static showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 3000);
  }

  static showSuccess(message) {
    const successDiv = document.getElementById('success');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 3000);
  }
} 