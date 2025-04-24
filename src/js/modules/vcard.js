export class VCardGenerator {
  generateVCard({ firstName, lastName, phone, email, whatsapp = '', website = '', company = '', jobTitle = '', photo = '' }) {
    // Input validation
    if (!firstName || !lastName || !phone || !email) {
      throw new Error('Required fields (firstName, lastName, phone, email) are missing');
    }

    // Sanitize inputs
    const sanitized = {
      firstName: this._sanitizeInput(firstName),
      lastName: this._sanitizeInput(lastName),
      phone: this._sanitizePhone(phone),
      email: this._sanitizeEmail(email),
      whatsapp: whatsapp ? this._sanitizePhone(whatsapp) : '',
      website: website ? this._sanitizeUrl(website) : '',
      company: company ? this._sanitizeInput(company) : '',
      jobTitle: jobTitle ? this._sanitizeInput(jobTitle) : '',
      photo: photo ? this._sanitizePhoto(photo) : ''
    };

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${sanitized.firstName} ${sanitized.lastName}`,
      `N:${sanitized.lastName};${sanitized.firstName};;;`,
      `TEL;TYPE=CELL:${sanitized.phone}`,
      `EMAIL:${sanitized.email}`,
    ];

    if (sanitized.whatsapp) {
      vcard.push(`TEL;TYPE=WHATSAPP:${sanitized.whatsapp}`);
    }

    if (sanitized.website) {
      vcard.push(`URL:${sanitized.website}`);
    }

    if (sanitized.company) {
      vcard.push(`ORG:${sanitized.company}`);
    }

    if (sanitized.jobTitle) {
      vcard.push(`TITLE:${sanitized.jobTitle}`);
    }

    if (sanitized.photo) {
      vcard.push(`PHOTO;ENCODING=b;TYPE=JPEG:${sanitized.photo}`);
    }

    vcard.push('END:VCARD');

    return vcard.join('\n');
  }

  _sanitizeInput(input) {
    return input.replace(/[;,\n]/g, '');
  }

  _sanitizePhone(phone) {
    // Remove all non-digit characters except +, (, ), -, and space
    return phone.replace(/[^\d+\s\(\)\-]/g, '');
  }

  _sanitizeEmail(email) {
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
    return email;
  }

  _sanitizeUrl(url) {
    // Add http:// if no protocol is specified
    if (!url.match(/^https?:\/\//)) {
      url = 'http://' + url;
    }
    
    try {
      // Basic URL validation using regex
      if (!/^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(url)) {
        throw new Error('Invalid URL format');
      }
      return url;
    } catch {
      throw new Error('Invalid URL format');
    }
  }

  _sanitizePhoto(photo) {
    // Basic validation for base64 photo data
    if (!photo.startsWith('data:image/') && !photo.startsWith('base64')) {
      throw new Error('Invalid photo format');
    }
    return photo;
  }

  generateSimplifiedVCard(contact) {
    const { firstName, lastName, phone, email } = contact;
    return this.generateVCard({ firstName, lastName, phone, email });
  }

  downloadVCard(filename, vcardData) {
    if (!vcardData) {
      throw new Error('No vCard data provided');
    }

    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('aria-label', `Download vCard file: ${filename}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 