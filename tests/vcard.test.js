import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
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

  test('validates required fields', () => {
    const contact = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };

    expect(() => vcardGenerator.generateVCard(contact)).toThrow('Required fields (firstName, lastName, phone, email) are missing');
  });

  test('sanitizes input fields', () => {
    const contact = {
      firstName: 'John;Doe',
      lastName: 'Doe,John',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com',
      whatsapp: '+1 (555) 555-5556',
      website: 'https://example.com',
      company: 'Example;Corp',
      jobTitle: 'Developer,Senior',
      photo: 'data:image/jpeg;base64,test'
    };

    const vcard = vcardGenerator.generateVCard(contact);
    
    expect(vcard).toContain('FN:JohnDoe DoeJohn');
    expect(vcard).toContain('N:DoeJohn;JohnDoe;;;');
    expect(vcard).toContain('TEL;TYPE=CELL:+1 (555) 555-5555');
    expect(vcard).toContain('EMAIL:john@example.com');
    expect(vcard).toContain('TEL;TYPE=WHATSAPP:+1 (555) 555-5556');
    expect(vcard).toContain('URL:https://example.com');
    expect(vcard).toContain('ORG:ExampleCorp');
    expect(vcard).toContain('TITLE:DeveloperSenior');
  });

  test('validates email format', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'invalid-email'
    };

    expect(() => vcardGenerator.generateVCard(contact)).toThrow('Invalid email format');
  });

  test('validates URL format', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com',
      website: 'invalid-url'
    };

    expect(() => vcardGenerator.generateVCard(contact)).toThrow('Invalid URL format');
  });

  test('validates photo format', () => {
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 555-5555',
      email: 'john@example.com',
      photo: 'invalid-photo'
    };

    expect(() => vcardGenerator.generateVCard(contact)).toThrow('Invalid photo format');
  });

  test('validates download data', () => {
    expect(() => vcardGenerator.downloadVCard('test.vcf', '')).toThrow('No vCard data provided');
  });
}); 