export class VCardGenerator {
  generateVCard({ firstName, lastName, phone, email, whatsapp = '', website = '', company = '', jobTitle = '', photo = '' }) {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${firstName} ${lastName}`,
      `N:${lastName};${firstName};;;`,
      `TEL;TYPE=CELL:${phone}`,
      `EMAIL:${email}`,
    ];

    if (whatsapp) {
      vcard.push(`TEL;TYPE=WHATSAPP:${whatsapp}`);
    }

    if (website) {
      vcard.push(`URL:${website}`);
    }

    if (company) {
      vcard.push(`ORG:${company}`);
    }

    if (jobTitle) {
      vcard.push(`TITLE:${jobTitle}`);
    }

    if (photo) {
      vcard.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`);
    }

    vcard.push('END:VCARD');

    return vcard.join('\n');
  }

  generateSimplifiedVCard(contact) {
    const { firstName, lastName, phone, email } = contact;
    return this.generateVCard({ firstName, lastName, phone, email });
  }

  downloadVCard(filename, vcardData) {
    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 