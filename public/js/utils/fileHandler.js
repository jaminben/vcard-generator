export class FileHandler {
  static async handlePhotoFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve('');
        return;
      }

      if (!file.type.startsWith('image/')) {
        reject(new Error('Please upload an image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate dimensions to maintain aspect ratio
          const maxSize = 300;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the base64 data without the data URL prefix
          const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
          resolve(base64);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(file);
    });
  }

  static async handleLogoFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve('');
        return;
      }

      if (!file.type.startsWith('image/')) {
        reject(new Error('Please upload an image file'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate dimensions to maintain aspect ratio
          const maxSize = 64;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const base64 = canvas.toDataURL('image/png');
          resolve(base64);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(file);
    });
  }
} 