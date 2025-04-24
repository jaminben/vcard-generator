export class FormHandler {
    getFormData() {
        const form = document.getElementById('vcardForm');
        if (!form) {
            throw new Error('Form not found');
        }

        return {
            name: form.querySelector('#name').value,
            title: form.querySelector('#title').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            company: form.querySelector('#company').value
        };
    }

    validateFormData(data) {
        const errors = [];

        if (!data.name) {
            errors.push('Name is required');
        }

        if (!data.email) {
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
        const phoneRegex = /^\+?[\d\s-()]+$/;
        return phoneRegex.test(phone);
    }
} 