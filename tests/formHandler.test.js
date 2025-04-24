import { jest } from '@jest/globals';
import { FormHandler } from '../src/js/utils/formHandler.js';

describe('FormHandler', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="firstName" value="John">
      <input id="lastName" value="Doe">
      <input id="phone" value="+1 (555) 555-5555">
      <input id="whatsapp" value="+1 (555) 555-5556">
      <input id="email" value="john@example.com">
      <input id="whatsappMessage">
      <input id="smsMessage">
      <div id="photoFeedback"></div>
      <div id="logoFeedback"></div>
    `;
  });

  test('formats phone number correctly', () => {
    expect(FormHandler.formatPhoneNumber('15555555555')).toBe('+1 (555) 555-5555');
    expect(FormHandler.formatPhoneNumber('+15555555555')).toBe('+1 (555) 555-5555');
    expect(FormHandler.formatPhoneNumber('invalid')).toBe('invalid');
  });

  test('updates phone number input', () => {
    const input = document.getElementById('phone');
    FormHandler.updatePhoneNumber(input, '15555555555');
    expect(input.value).toBe('+1 (555) 555-5555');
  });

  test('updates message templates', () => {
    FormHandler.updateMessageTemplates('John');
    expect(document.getElementById('whatsappMessage').value).toBe('Hi John, I\'d like to connect with you on WhatsApp.');
    expect(document.getElementById('smsMessage').value).toBe('Hi John, I\'d like to connect with you.');
  });

  test('saves form values to localStorage', () => {
    FormHandler.saveFormValues();
    const savedData = JSON.parse(localStorage.getItem('vcardFormData'));
    
    expect(savedData.firstName).toBe('John');
    expect(savedData.lastName).toBe('Doe');
    expect(savedData.phone).toBe('+1 (555) 555-5555');
    expect(savedData.whatsapp).toBe('+1 (555) 555-5556');
    expect(savedData.email).toBe('john@example.com');
  });

  test('restores form values from localStorage', () => {
    const formData = {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1 (555) 555-5555',
      whatsapp: '+1 (555) 555-5556',
      email: 'jane@example.com'
    };
    
    localStorage.setItem('vcardFormData', JSON.stringify(formData));
    FormHandler.restoreFormValues();
    
    expect(document.getElementById('firstName').value).toBe('Jane');
    expect(document.getElementById('lastName').value).toBe('Smith');
    expect(document.getElementById('phone').value).toBe('+1 (555) 555-5555');
    expect(document.getElementById('whatsapp').value).toBe('+1 (555) 555-5556');
    expect(document.getElementById('email').value).toBe('jane@example.com');
  });

  test('shows error message', () => {
    FormHandler.showError('photoFeedback', 'Error message');
    const element = document.getElementById('photoFeedback');
    expect(element.textContent).toBe('Error message');
    expect(element.className).toBe('text-red-500');
  });

  test('shows success message', () => {
    FormHandler.showSuccess('logoFeedback', 'Success message');
    const element = document.getElementById('logoFeedback');
    expect(element.textContent).toBe('Success message');
    expect(element.className).toBe('text-green-500');
  });
}); 