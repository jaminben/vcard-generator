export class FormHandler {
    getFormData() {
        const form = document.getElementById('vcardForm');
        if (!form) {
            throw new Error('Form not found');
        }

        const formData = {
            name: form.querySelector('#name')?.value || '',
            title: form.querySelector('#title')?.value || '',
            email: form.querySelector('#email')?.value || '',
            phone: form.querySelector('#phone')?.value || '',
            company: form.querySelector('#company')?.value || ''
        };

        // Validate the form data
        const validation = this.validateFormData(formData);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        return formData;
    }

    validateFormData(data) {
        const errors = [];

        if (!data.name.trim()) {
            errors.push('Name is required');
        }

        if (!data.email.trim()) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Invalid email format');
        }

        if (data.phone && !this.isValidPhone(data.phone)) {
            errors.push('Invalid phone format');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        return phoneRegex.test(phone);
    }
} 