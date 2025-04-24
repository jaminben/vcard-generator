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
    }
  }

  static updateMessageTemplates(firstName) {
    const whatsappMessage = document.getElementById('whatsappMessage');
    const smsMessage = document.getElementById('smsMessage');
    
    if (whatsappMessage) {
      whatsappMessage.value = `Hi ${firstName}, I'd like to connect with you on WhatsApp.`;
    }
    
    if (smsMessage) {
      smsMessage.value = `Hi ${firstName}, I'd like to connect with you.`;
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
      element.className = 'text-red-500';
    }
  }

  static showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = 'text-green-500';
    }
  }
} 