export class FileHandler {
    async handlePhotoFile(file) {
        return this.handleImageFile(file, 'photo');
    }

    async handleLogoFile(file) {
        return this.handleImageFile(file, 'logo');
    }

    async handleImageFile(file, type) {
        if (!file) {
            throw new Error(`No ${type} file provided`);
        }

        if (!file.type.startsWith('image/')) {
            throw new Error(`File must be an image for ${type}`);
        }

        return this.readFileAsDataURL(file);
    }

    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsDataURL(file);
        });
    }
} 