class FormHandler {
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

        this.validateFormData(formData);
        return formData;
    }

    validateFormData(data) {
        if (!data.name) {
            throw new Error('Name is required');
        }

        if (!data.email) {
            throw new Error('Email is required');
        }

        if (data.email && !this.isValidEmail(data.email)) {
            throw new Error('Invalid email format');
        }

        if (data.phone && !this.isValidPhone(data.phone)) {
            throw new Error('Invalid phone format');
        }
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