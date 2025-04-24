export class FileHandler {
    async handlePhotoFile(file) {
        return this.handleImageFile(file, {
            maxWidth: 200,
            maxHeight: 200,
            quality: 0.8
        });
    }

    async handleLogoFile(file) {
        return this.handleImageFile(file, {
            maxWidth: 100,
            maxHeight: 100,
            quality: 0.8
        });
    }

    async handleImageFile(file, options) {
        if (!file) {
            throw new Error('No file provided');
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }

        try {
            const imageUrl = await this.readFileAsDataURL(file);
            return imageUrl;
        } catch (error) {
            console.error('Error handling image file:', error);
            throw new Error('Failed to process image file');
        }
    }

    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            
            reader.readAsDataURL(file);
        });
    }
} 