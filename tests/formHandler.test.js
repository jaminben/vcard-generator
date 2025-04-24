import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormHandler } from '../src/js/utils/formHandler.js';

describe('FormHandler', () => {
  let mockForm;
  let mockLocalStorage;

  beforeEach(() => {
    // Create and setup form
    mockForm = document.createElement('form');
    mockForm.id = 'vcardForm';
    document.body.appendChild(mockForm);

    // Add form fields
    const fields = {
      firstName: '',
      lastName: '',
      phone: '',
      whatsapp: '',
      email: '',
      website: '',
      company: '',
      jobTitle: '',
      whatsappMessage: '',
      smsMessage: ''
    };

    Object.entries(fields).forEach(([field, value]) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = field;
      input.id = field;
      input.value = value;
      mockForm.appendChild(input);
    });

    // Mock localStorage
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    };
    global.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    if (mockForm && mockForm.parentNode) {
      mockForm.parentNode.removeChild(mockForm);
    }
    vi.clearAllMocks();
  });

  it('formats phone number correctly', () => {
    expect(FormHandler.formatPhoneNumber('15555555555')).toBe('+1 (555) 555-5555');
    expect(FormHandler.formatPhoneNumber('+15555555555')).toBe('+1 (555) 555-5555');
    expect(FormHandler.formatPhoneNumber('invalid')).toBe('invalid');
  });

  it('updates phone number input', () => {
    const input = document.getElementById('phone');
    FormHandler.updatePhoneNumber(input, '15555555555');
    expect(input.value).toBe('+1 (555) 555-5555');
  });

  it('updates message templates', () => {
    FormHandler.updateMessageTemplates('John');
    expect(document.getElementById('whatsappMessage').value).toBe('Hi John, I\'d like to connect with you on WhatsApp.');
    expect(document.getElementById('smsMessage').value).toBe('Hi John, I\'d like to connect with you.');
  });

  it('updates message templates with default name', () => {
    FormHandler.updateMessageTemplates('');
    expect(document.getElementById('whatsappMessage').value).toBe('hi from me on whatsapp');
    expect(document.getElementById('smsMessage').value).toBe('hi from me on sms');
  });

  it('validates phone number pattern', () => {
    const phoneInput = document.getElementById('phone');
    const whatsappInput = document.getElementById('whatsapp');
    
    // Setup phone input patterns
    FormHandler.setupPhoneInputs();
    
    // Valid phone numbers
    expect(phoneInput.pattern).toBe('[0-9+\\s\\(\\)\\-]{10,}');
    expect(whatsappInput.pattern).toBe('[0-9+\\s\\(\\)\\-]{10,}');
    
    // Test valid patterns
    expect(phoneInput.checkValidity()).toBe(true);
    expect(whatsappInput.checkValidity()).toBe(true);
    
    // Test invalid patterns
    phoneInput.value = '123'; // Too short
    expect(phoneInput.checkValidity()).toBe(false);
    
    whatsappInput.value = 'abc'; // Invalid characters
    expect(whatsappInput.checkValidity()).toBe(false);
  });

  it('saves form values to localStorage', () => {
    document.getElementById('firstName').value = 'John';
    document.getElementById('lastName').value = 'Doe';
    document.getElementById('phone').value = '+1 (555) 555-5555';
    document.getElementById('whatsapp').value = '+1 (555) 555-5556';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('website').value = 'example.com';
    document.getElementById('company').value = 'Example Inc';
    document.getElementById('jobTitle').value = 'Developer';
    document.getElementById('whatsappMessage').value = 'Hi John';
    document.getElementById('smsMessage').value = 'Hi John';

    FormHandler.saveFormValues();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'vcardFormData',
      JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 555-5555',
        whatsapp: '+1 (555) 555-5556',
        email: 'john@example.com',
        website: 'example.com',
        company: 'Example Inc',
        jobTitle: 'Developer',
        whatsappMessage: 'Hi John',
        smsMessage: 'Hi John'
      })
    );
  });

  it('restores form values from localStorage', () => {
    const formData = {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1 (555) 555-5555',
      whatsapp: '+1 (555) 555-5556',
      email: 'jane@example.com',
      website: 'example.com',
      company: 'Example Inc',
      jobTitle: 'Developer',
      whatsappMessage: 'Hi Jane',
      smsMessage: 'Hi Jane'
    };

    localStorage.getItem.mockReturnValue(JSON.stringify(formData));
    FormHandler.restoreFormValues();

    expect(document.getElementById('firstName').value).toBe('Jane');
    expect(document.getElementById('lastName').value).toBe('Smith');
    expect(document.getElementById('phone').value).toBe('+1 (555) 555-5555');
    expect(document.getElementById('whatsapp').value).toBe('+1 (555) 555-5556');
    expect(document.getElementById('email').value).toBe('jane@example.com');
    expect(document.getElementById('website').value).toBe('example.com');
    expect(document.getElementById('company').value).toBe('Example Inc');
    expect(document.getElementById('jobTitle').value).toBe('Developer');
    expect(document.getElementById('whatsappMessage').value).toBe('Hi Jane');
    expect(document.getElementById('smsMessage').value).toBe('Hi Jane');
  });

  it('shows error message', () => {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'photoFeedback';
    document.body.appendChild(feedbackDiv);

    FormHandler.showError('photoFeedback', 'Error message');
    expect(feedbackDiv.textContent).toBe('Error message');
    expect(feedbackDiv.className).toBe('text-red-500');

    document.body.removeChild(feedbackDiv);
  });

  it('shows success message', () => {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'logoFeedback';
    document.body.appendChild(feedbackDiv);

    FormHandler.showSuccess('logoFeedback', 'Success message');
    expect(feedbackDiv.textContent).toBe('Success message');
    expect(feedbackDiv.className).toBe('text-green-500');

    document.body.removeChild(feedbackDiv);
  });
}); 