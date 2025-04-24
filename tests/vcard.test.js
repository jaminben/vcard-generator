import { jest } from '@jest/globals';
import { VCardGenerator } from '../src/js/modules/vcard.js';

describe('VCardGenerator', () => {
  let vcardGenerator;

  beforeEach(() => {
    vcardGenerator = new VCardGenerator();
  });

  test('generates basic vCard', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com'
    };

    const vcard = vcardGenerator.generateVCard(contact);
    
    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:John Doe');
    expect(vcard).toContain('N:Doe;John;;;');
    expect(vcard).toContain('TEL;TYPE=CELL:+1 (555) 555-5555');
    expect(vcard).toContain('EMAIL:john@example.com');
    expect(vcard).toContain('END:VCARD');
  });

  test('generates vCard with all fields', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com',
      whatsapp: '+1 (555) 555-5556',
      website: 'https://example.com',
      company: 'Example Corp',
      jobTitle: 'Developer',
      photo: 'base64photo'
    };

    const vcard = vcardGenerator.generateVCard(contact);
    
    expect(vcard).toContain('TEL;TYPE=WHATSAPP:+1 (555) 555-5556');
    expect(vcard).toContain('URL:https://example.com');
    expect(vcard).toContain('ORG:Example Corp');
    expect(vcard).toContain('TITLE:Developer');
    expect(vcard).toContain('PHOTO;ENCODING=b;TYPE=JPEG:base64photo');
  });

  test('generates simplified vCard', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com'
    };

    const vcard = vcardGenerator.generateSimplifiedVCard(contact);
    
    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:John Doe');
    expect(vcard).toContain('N:Doe;John;;;');
    expect(vcard).toContain('TEL;TYPE=CELL:+1 (555) 555-5555');
    expect(vcard).toContain('EMAIL:john@example.com');
    expect(vcard).toContain('END:VCARD');
  });

  test('handles missing optional fields', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com'
    };

    const vcard = vcardGenerator.generateVCard(contact);
    
    expect(vcard).not.toContain('TEL;TYPE=WHATSAPP:');
    expect(vcard).not.toContain('URL:');
    expect(vcard).not.toContain('ORG:');
    expect(vcard).not.toContain('TITLE:');
    expect(vcard).not.toContain('PHOTO;ENCODING=b;TYPE=JPEG:');
  });
}); 