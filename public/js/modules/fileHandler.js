class FileHandler {
    async handlePhotoFile(file) {
        return this.handleImageFile(file, 'photo');
    }

    async handleLogoFile(file) {
        return this.handleImageFile(file, 'logo');
    }

    async handleImageFile(file, type) {
        if (!file) {
            throw new Error('No file provided');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }

        try {
            const dataUrl = await this.readFileAsDataURL(file);
            return dataUrl;
        } catch (error) {
            console.error(`Error handling ${type} file:`, error);
            throw new Error(`Error processing ${type} file`);
        }
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