import base64

def generate_vcard(first_name, last_name, phone, email, whatsapp='', website='', company='', job_title='', photo_path=''):
    photo_encoded = ''
    if photo_path:
        with open(photo_path, 'rb') as image_file:
            photo_encoded = base64.b64encode(image_file.read()).decode('utf-8')

    vcard = f"""BEGIN:VCARD
VERSION:3.0
N:{last_name};{first_name};;;
FN:{first_name} {last_name}
ORG:{company}
TITLE:{job_title}
TEL;TYPE=CELL:{phone}
TEL;TYPE=WhatsApp:{whatsapp}
EMAIL;TYPE=INTERNET:{email}
URL:{website}"""

    if photo_encoded:
        vcard += f"\nPHOTO;ENCODING=b;TYPE=JPEG:{photo_encoded}"

    vcard += "\nEND:VCARD"
    return vcard


def save_vcard(filename, vcard_data):
    with open(filename, 'w') as file:
        file.write(vcard_data)


# Example usage
if __name__ == "__main__":
    first_name = "Olark"
    last_name = "Doe"
    phone = "+17073465275"
    whatsapp = "+17073465275"
    email = "support@olark.com"
    website = "https://www.olark.com"
    company = "Olark"
    job_title = "At your Service"
    photo_path = "profile.png"  # Replace with the path to your photo

    vcard = generate_vcard(first_name, last_name, phone, email, whatsapp, website, company, job_title, photo_path)
    save_vcard(f"{first_name}_{last_name}.vcf", vcard)
    print("vCard generated successfully!")

