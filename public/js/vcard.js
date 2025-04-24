// Import modules
import { VCardGenerator } from './modules/vcard.js';
import { QRCodeGenerator } from './modules/qrcode.js';
import { FileHandler } from './modules/fileHandler.js';
import { FormHandler } from './modules/formHandler.js';

export class VCardApp {
    constructor() {
        this.vcardGenerator = new VCardGenerator();
        this.qrCodeGenerator = new QRCodeGenerator();
        this.fileHandler = new FileHandler();
        this.formHandler = new FormHandler();
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const generateBtn = document.getElementById('generateBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const photoInput = document.getElementById('photo');
        const logoInput = document.getElementById('logo');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateVCard());
        }
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadVCard());
        }
        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }
        if (logoInput) {
            logoInput.addEventListener('change', (e) => this.handleLogoUpload(e));
        }
    }

    async generateVCard() {
        try {
            const formData = this.formHandler.getFormData();
            const vcard = this.vcardGenerator.generate(formData);
            
            this.updatePreview(formData);
            
            const qrCodeElement = document.getElementById('qrcode');
            if (qrCodeElement) {
                // Clear any existing QR code
                qrCodeElement.innerHTML = '';
                // Generate new QR code
                this.qrCodeGenerator.generateQRCode(vcard, qrCodeElement);
            }
            
            const downloadBtn = document.getElementById('downloadBtn');
            if (downloadBtn) {
                downloadBtn.disabled = false;
            }
        } catch (error) {
            alert(`Error generating vCard: ${error.message}`);
        }
    }

    updatePreview(data) {
        const previewName = document.getElementById('previewName');
        const previewTitle = document.getElementById('previewTitle');
        const previewEmail = document.getElementById('previewEmail');
        const previewPhone = document.getElementById('previewPhone');
        const previewCompany = document.getElementById('previewCompany');

        if (previewName) previewName.textContent = data.name;
        if (previewTitle) previewTitle.textContent = data.title;
        if (previewEmail) previewEmail.textContent = data.email;
        if (previewPhone) previewPhone.textContent = data.phone;
        if (previewCompany) previewCompany.textContent = data.company;
    }

    async downloadVCard() {
        try {
            const formData = this.formHandler.getFormData();
            const vcard = this.vcardGenerator.generate(formData);
            
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formData.name.replace(/\s+/g, '_')}.vcf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert(`Error downloading vCard: ${error.message}`);
        }
    }

    async handlePhotoUpload(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const dataUrl = await this.fileHandler.handlePhotoFile(file);
            const previewImage = document.getElementById('previewImage');
            if (previewImage) {
                previewImage.src = dataUrl;
            }
        } catch (error) {
            alert(`Error uploading photo: ${error.message}`);
        }
    }

    async handleLogoUpload(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const dataUrl = await this.fileHandler.handleLogoFile(file);
            const previewLogo = document.getElementById('previewLogo');
            if (previewLogo) {
                previewLogo.src = dataUrl;
            }
        } catch (error) {
            alert(`Error uploading logo: ${error.message}`);
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VCardApp();
});

