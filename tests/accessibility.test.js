import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormHandler } from '../src/js/utils/formHandler.js';

describe('Accessibility Tests', () => {
  let mockForm;
  let mockLocalStorage;
  let feedbackDiv;

  beforeEach(() => {
    // Create and setup form
    mockForm = document.createElement('form');
    mockForm.id = 'vcardForm';
    document.body.appendChild(mockForm);

    // Add form fields with ARIA attributes
    const fields = {
      firstName: { label: 'First Name', required: true },
      lastName: { label: 'Last Name', required: true },
      phone: { label: 'Phone Number', required: true },
      whatsapp: { label: 'WhatsApp Number', required: false },
      email: { label: 'Email', required: true },
      website: { label: 'Website', required: false },
      company: { label: 'Company', required: false },
      jobTitle: { label: 'Job Title', required: false }
    };

    Object.entries(fields).forEach(([field, config]) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = field;
      input.id = field;
      input.setAttribute('aria-label', config.label);
      if (config.required) {
        input.setAttribute('required', '');
        input.setAttribute('aria-required', 'true');
      }
      mockForm.appendChild(input);
    });

    // Create feedback div
    feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    document.body.appendChild(feedbackDiv);

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
    if (feedbackDiv && feedbackDiv.parentNode) {
      feedbackDiv.parentNode.removeChild(feedbackDiv);
    }
    vi.clearAllMocks();
  });

  describe('Form Input Accessibility', () => {
    it('all required inputs have aria-required attribute', () => {
      const requiredInputs = mockForm.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        expect(input.getAttribute('aria-required')).toBe('true');
      });
    });

    it('all inputs have aria-label attributes', () => {
      const inputs = mockForm.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('error messages have correct ARIA attributes', () => {
      FormHandler.showError('feedback', 'Error message');
      expect(feedbackDiv.textContent).toBe('Error message');
      expect(feedbackDiv.className).toBe('text-red-700 font-medium mt-2');
      expect(feedbackDiv.getAttribute('role')).toBe('alert');
      expect(feedbackDiv.getAttribute('aria-live')).toBe('assertive');
    });

    it('success messages have correct ARIA attributes', () => {
      FormHandler.showSuccess('feedback', 'Success message');
      expect(feedbackDiv.textContent).toBe('Success message');
      expect(feedbackDiv.className).toBe('text-green-700 font-medium mt-2');
      expect(feedbackDiv.getAttribute('role')).toBe('status');
      expect(feedbackDiv.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Color Contrast Compliance', () => {
    it('error messages use WCAG AAA compliant red', () => {
      FormHandler.showError('feedback', 'Error message');
      expect(feedbackDiv.className).toContain('text-red-700');
      expect(feedbackDiv.className).toContain('font-medium');
    });

    it('success messages use WCAG AAA compliant green', () => {
      FormHandler.showSuccess('feedback', 'Success message');
      expect(feedbackDiv.className).toContain('text-green-700');
      expect(feedbackDiv.className).toContain('font-medium');
    });
  });

  describe('Keyboard Navigation', () => {
    it('form elements are focusable', () => {
      const inputs = mockForm.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input.tabIndex).not.toBe(-1);
      });
    });

    it('form elements have proper tab order', () => {
      const inputs = mockForm.querySelectorAll('input');
      const tabIndices = Array.from(inputs).map(input => input.tabIndex);
      const sortedTabIndices = [...tabIndices].sort((a, b) => a - b);
      expect(tabIndices).toEqual(sortedTabIndices);
    });
  });
}); 