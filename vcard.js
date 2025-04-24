document.body.innerHTML = `
<div class="max-w-4xl mx-auto p-6" role="main">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-white focus:p-4 focus:z-50">Skip to main content</a>
  
  <h1 class="text-3xl font-bold text-gray-900 mb-8">Olark vCard Generator</h1>
  
  <div id="main-content" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div>
      <label for="firstName" class="block text-sm font-medium text-gray-900 mb-1">First Name <span class="text-red-600" aria-hidden="true">*</span></label>
      <input type="text" id="firstName" name="firstName" placeholder="First Name" required
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        aria-required="true">
    </div>
    <div>
      <label for="lastName" class="block text-sm font-medium text-gray-900 mb-1">Last Name <span class="text-red-600" aria-hidden="true">*</span></label>
      <input type="text" id="lastName" name="lastName" placeholder="Last Name" required
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        aria-required="true">
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-900 mb-1">Phone Number <span class="text-red-600" aria-hidden="true">*</span></label>
      <input type="tel" id="phone" name="phone" placeholder="Phone Number" required
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        aria-required="true" pattern="[0-9+\s()-]{10,}">
      <p class="text-sm text-gray-600 mt-1">Format: +1 (555) 555-5555</p>
    </div>
    <div>
      <label for="whatsapp" class="block text-sm font-medium text-gray-900 mb-1">WhatsApp Number</label>
      <input type="tel" id="whatsapp" name="whatsapp" placeholder="WhatsApp Number"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        pattern="[0-9+\s()-]{10,}">
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-900 mb-1">Email Address <span class="text-red-600" aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" placeholder="Email Address" required
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        aria-required="true">
    </div>
    <div>
      <label for="website" class="block text-sm font-medium text-gray-900 mb-1">Website</label>
      <input type="url" id="website" name="website" placeholder="Website"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
    </div>
    <div>
      <label for="company" class="block text-sm font-medium text-gray-900 mb-1">Company</label>
      <input type="text" id="company" name="company" placeholder="Company"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
    </div>
    <div>
      <label for="jobTitle" class="block text-sm font-medium text-gray-900 mb-1">Job Title</label>
      <input type="text" id="jobTitle" name="jobTitle" placeholder="Job Title"
        class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
    </div>
  </div>

  <div class="mb-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Profile Photo</h2>
    <div id="photoDrop" role="region" aria-label="Photo upload area" tabindex="0"
      class="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
      <div id="photoPreview" class="hidden mb-4">
        <img id="previewImage" class="mx-auto max-h-48 rounded-lg shadow-md" src="" alt="Profile photo preview">
      </div>
      <p class="text-gray-900">Drag and drop photo here</p>
      <p class="text-gray-700 text-sm my-2">or</p>
      <label for="photoInput" class="block text-sm text-gray-900 mb-2">Select a photo file</label>
      <input type="file" id="photoInput" name="photo" accept="image/*" 
        class="block mx-auto" aria-label="Choose photo file">
    </div>
    <div id="photoFeedback" class="mt-2 text-sm" role="status" aria-live="polite"></div>
  </div>

  <div class="mb-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">QR Code Logo</h2>
    <div id="logoDrop" role="region" aria-label="Logo upload area" tabindex="0"
      class="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
      <div id="logoPreview" class="hidden mb-4">
        <img id="previewLogo" class="mx-auto max-h-48 rounded-lg shadow-md" src="" alt="QR code logo preview">
      </div>
      <p class="text-gray-900">Drag and drop logo here</p>
      <p class="text-gray-700 text-sm my-2">or</p>
      <label for="logoInput" class="block text-sm text-gray-900 mb-2">Select a logo file</label>
      <input type="file" id="logoInput" name="logo" accept="image/*" 
        class="block mx-auto" aria-label="Choose logo file">
    </div>
    <div id="logoFeedback" class="mt-2 text-sm" role="status" aria-live="polite"></div>
  </div>

  <div class="mb-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Message Templates</h2>
    <div class="space-y-4">
      <div>
        <label for="whatsappMessage" class="block text-sm font-medium text-gray-900 mb-1">WhatsApp Message</label>
        <input type="text" id="whatsappMessage" name="whatsappMessage" placeholder="Enter WhatsApp message template"
          class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
      </div>
      <div>
        <label for="smsMessage" class="block text-sm font-medium text-gray-900 mb-1">SMS Message</label>
        <input type="text" id="smsMessage" name="smsMessage" placeholder="Enter SMS message template"
          class="w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
      </div>
    </div>
  </div>

  <button id="generateBtn" type="button"
    class="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
    aria-label="Generate vCard and QR codes">
    Generate vCard
  </button>
  
  <div id="downloadLink" class="mt-4" role="region" aria-label="Download options"></div>
  
  <div class="mt-8 space-y-8">
    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-4">vCard QR Code</h2>
      <div id="qrcode" class="flex justify-center" role="img" aria-label="vCard QR code"></div>
    </section>

    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-4">WhatsApp QR Code</h2>
      <div id="whatsappQrcode" class="flex justify-center" role="img" aria-label="WhatsApp QR code"></div>
    </section>

    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-1">SMS QR Code</h2>
      <div id="smsQrcode" class="flex justify-center" role="img" aria-label="SMS QR code"></div>
    </section>
  </div>
</div>`;

let photoData = '';
let logoData = '';

// Function to generate QR code with logo
function generateQRCode(elementId, data) {
  try {
    const qrcodeDiv = document.getElementById(elementId);
    qrcodeDiv.innerHTML = ''; // Clear previous QR code
    
    if (!data) {
      qrcodeDiv.innerHTML = '<p class="text-red-500">No data provided for QR code</p>';
      return;
    }

    // Create container for QR code
    const container = document.createElement('div');
    container.className = 'relative';
    qrcodeDiv.appendChild(container);

    // Create temporary container for QR code generation
    const tempContainer = document.createElement('div');
    tempContainer.style.display = 'none';
    container.appendChild(tempContainer);

    // Generate QR code in temporary container
    new QRCode(tempContainer, {
      text: data,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // Get the QR code canvas
    const qrCanvas = tempContainer.querySelector('canvas');
    
    // Create final canvas that will contain both QR code and logo
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 256;
    finalCanvas.height = 256;
    container.appendChild(finalCanvas);

    // Draw QR code on final canvas
    const ctx = finalCanvas.getContext('2d');
    ctx.drawImage(qrCanvas, 0, 0);

    // Determine QR code type for filename
    let qrType = 'qr-code';
    if (elementId === 'qrcode') {
      qrType = 'vcard-qrcode';
    } else if (elementId === 'whatsappQrcode') {
      qrType = 'whatsapp-qrcode';
    } else if (elementId === 'smsQrcode') {
      qrType = 'sms-qrcode';
    }

    // Add logo if available
    if (logoData) {
      const logo = new Image();
      logo.onload = function() {
        const logoSize = 64; // 25% of QR code size
        const logoX = (256 - logoSize) / 2;
        const logoY = (256 - logoSize) / 2;

        // Draw white background for logo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
        
        // Draw logo
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

        // Make the canvas draggable
        finalCanvas.draggable = true;
        finalCanvas.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', data);
          e.dataTransfer.setDragImage(finalCanvas, 128, 128);
        });

        // Add download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
        downloadBtn.textContent = `Download ${qrType.replace('-', ' ')}`;
        downloadBtn.addEventListener('click', () => {
          const link = document.createElement('a');
          link.download = `${qrType}.png`;
          link.href = finalCanvas.toDataURL('image/png');
          link.click();
        });
        container.appendChild(downloadBtn);
      };
      logo.src = logoData;
    } else {
      // Make the canvas draggable without logo
      finalCanvas.draggable = true;
      finalCanvas.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', data);
        e.dataTransfer.setDragImage(finalCanvas, 128, 128);
      });

      // Add download button
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'mt-2 text-sm text-blue-600 hover:text-blue-800';
      downloadBtn.textContent = `Download ${qrType.replace('-', ' ')}`;
      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `${qrType}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();
      });
      container.appendChild(downloadBtn);
    }

    // Remove temporary container
    tempContainer.remove();
  } catch (error) {
    console.error('Error generating QR code:', error);
    document.getElementById(elementId).innerHTML = `
      <p class="text-red-500">Error generating QR code: ${error.message}</p>
      <p class="text-sm text-gray-500">Try reducing the amount of data in the vCard</p>
    `;
  }
}

// Function to load default logo
function loadDefaultLogo() {
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    logoData = canvas.toDataURL('image/png');
    
    // If there are any QR codes already generated, regenerate them with the logo
    const qrCodes = ['qrcode', 'whatsappQrcode', 'smsQrcode'];
    qrCodes.forEach(id => {
      const element = document.getElementById(id);
      if (element && element.querySelector('canvas')) {
        const data = element.getAttribute('data-content');
        if (data) {
          generateQRCode(id, data);
        }
      }
    });
  };
  img.src = 'olark-logo.png';
}

// Load default logo when page loads
loadDefaultLogo();

function generateVCard({ firstName, lastName, phone, email, whatsapp = '', website = '', company = '', jobTitle = '', photo = '' }) {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\nORG:${company}\nTITLE:${jobTitle}\nTEL;TYPE=CELL:${phone}\nTEL;TYPE=WhatsApp:${whatsapp}\nEMAIL;TYPE=INTERNET:${email}\nURL:${website}`;

  if (photo) {
    vcard += `\nPHOTO;ENCODING=b;TYPE=JPEG:${photo}`;
  }

  vcard += '\nEND:VCARD';
  return vcard;
}

function generateSimplifiedVCard(contact) {
  // Only include essential fields to reduce size
  return `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName}
FN:${contact.firstName} ${contact.lastName}
TEL:${contact.phone}
EMAIL:${contact.email}
END:VCARD`;
}

function downloadVCard(filename, vcardData) {
  if (!vcardData) {
    alert('Please fill in the required fields');
    return;
  }

  const blob = new Blob([vcardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.innerHTML = `
    <a href="${url}" download="${filename}" class="inline-block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-center">
      Download vCard
    </a>
  `;

  // Generate QR codes with simplified data
  const simplifiedVCard = generateSimplifiedVCard({
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value
  });
  
  // Store the content for regeneration if needed
  document.getElementById('qrcode').setAttribute('data-content', simplifiedVCard);
  generateQRCode('qrcode', simplifiedVCard);
  
  const whatsappNumber = document.getElementById('whatsapp').value || document.getElementById('phone').value;
  const whatsappMessage = document.getElementById('whatsappMessage').value;
  if (whatsappNumber && whatsappMessage) {
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    document.getElementById('whatsappQrcode').setAttribute('data-content', whatsappUrl);
    generateQRCode('whatsappQrcode', whatsappUrl);
  }

  const smsNumber = document.getElementById('phone').value;
  const smsMessage = document.getElementById('smsMessage').value;
  if (smsNumber && smsMessage) {
    const smsUrl = `sms:${smsNumber.replace(/\D/g, '')}?body=${encodeURIComponent(smsMessage)}`;
    document.getElementById('smsQrcode').setAttribute('data-content', smsUrl);
    generateQRCode('smsQrcode', smsUrl);
  }

  // Save form values after generating QR codes
  saveFormValues();
}

function handlePhotoFile(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    photoData = reader.result;
    const previewImage = document.getElementById('previewImage');
    const photoPreview = document.getElementById('photoPreview');
    previewImage.src = photoData;
    previewImage.alt = `Preview of ${file.name}`;
    photoPreview.classList.remove('hidden');
    showSuccess('photoFeedback', `Photo loaded successfully: ${file.name}`);
    saveFormValues();
  };
  reader.readAsDataURL(file);
}

document.getElementById('photoDrop').addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#000';
});

document.getElementById('photoDrop').addEventListener('dragleave', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#ccc';
});

document.getElementById('photoDrop').addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#ccc';

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handlePhotoFile(file);
  } else {
    document.getElementById('photoFeedback').innerHTML = `
      <p class="text-red-500">Please drop an image file</p>
    `;
  }
});

document.getElementById('photoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handlePhotoFile(file);
  }
});

// Add logo upload handling
document.getElementById('logoDrop').addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#000';
});

document.getElementById('logoDrop').addEventListener('dragleave', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#ccc';
});

document.getElementById('logoDrop').addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.borderColor = '#ccc';

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleLogoFile(file);
  } else {
    showError('logoFeedback', 'Please drop an image file');
  }
});

document.getElementById('logoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleLogoFile(file);
  }
});

// Function to handle logo file upload
function handleLogoFile(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    logoData = reader.result;
    const previewLogo = document.getElementById('previewLogo');
    const logoPreview = document.getElementById('logoPreview');
    previewLogo.src = logoData;
    previewLogo.alt = `Preview of ${file.name}`;
    logoPreview.classList.remove('hidden');
    showSuccess('logoFeedback', `Logo loaded successfully: ${file.name}`);
    
    // Regenerate QR codes with new logo
    const qrCodes = ['qrcode', 'whatsappQrcode', 'smsQrcode'];
    qrCodes.forEach(id => {
      const element = document.getElementById(id);
      if (element && element.querySelector('canvas')) {
        const data = element.getAttribute('data-content');
        if (data) {
          generateQRCode(id, data);
        }
      }
    });
  };
  reader.readAsDataURL(file);
}

// Add keyboard navigation for logo drop zone
document.getElementById('logoDrop').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    document.getElementById('logoInput').click();
  }
});

document.getElementById('generateBtn').addEventListener('click', async () => {
  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    phone: document.getElementById('phone').value,
    whatsapp: document.getElementById('whatsapp').value,
    email: document.getElementById('email').value,
    website: document.getElementById('website').value,
    company: document.getElementById('company').value,
    jobTitle: document.getElementById('jobTitle').value,
    photo: photoData
  };

  const vcard = generateVCard(contact);
  await downloadVCard(`${contact.company || 'company'}.vcf`, vcard);
});

// Function to save form values to localStorage
function saveFormValues() {
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    phone: document.getElementById('phone').value,
    whatsapp: document.getElementById('whatsapp').value,
    email: document.getElementById('email').value,
    website: document.getElementById('website').value,
    company: document.getElementById('company').value,
    jobTitle: document.getElementById('jobTitle').value,
    whatsappMessage: document.getElementById('whatsappMessage').value,
    smsMessage: document.getElementById('smsMessage').value,
    photo: photoData,
    logo: logoData,
    qrCodes: {
      vcard: document.getElementById('qrcode').getAttribute('data-content'),
      whatsapp: document.getElementById('whatsappQrcode').getAttribute('data-content'),
      sms: document.getElementById('smsQrcode').getAttribute('data-content')
    },
    vcard: {
      data: generateVCard({
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        company: document.getElementById('company').value,
        jobTitle: document.getElementById('jobTitle').value,
        photo: photoData
      }),
      filename: `${document.getElementById('company').value || 'company'}.vcf`
    }
  };
  localStorage.setItem('vcardFormData', JSON.stringify(formData));
}

// Function to restore form values from localStorage
function restoreFormValues() {
  const savedData = localStorage.getItem('vcardFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    Object.keys(formData).forEach(key => {
      if (key === 'photo' || key === 'logo' || key === 'qrCodes' || key === 'vcard') {
        // Handle special cases
        if (key === 'photo' && formData.photo) {
          photoData = formData.photo;
          const previewImage = document.getElementById('previewImage');
          const photoPreview = document.getElementById('photoPreview');
          previewImage.src = formData.photo;
          photoPreview.classList.remove('hidden');
        } else if (key === 'logo' && formData.logo) {
          logoData = formData.logo;
          const previewLogo = document.getElementById('previewLogo');
          const logoPreview = document.getElementById('logoPreview');
          previewLogo.src = formData.logo;
          logoPreview.classList.remove('hidden');
        } else if (key === 'qrCodes' && formData.qrCodes) {
          // Restore QR codes
          if (formData.qrCodes.vcard) {
            document.getElementById('qrcode').setAttribute('data-content', formData.qrCodes.vcard);
            generateQRCode('qrcode', formData.qrCodes.vcard);
          }
          if (formData.qrCodes.whatsapp) {
            document.getElementById('whatsappQrcode').setAttribute('data-content', formData.qrCodes.whatsapp);
            generateQRCode('whatsappQrcode', formData.qrCodes.whatsapp);
          }
          if (formData.qrCodes.sms) {
            document.getElementById('smsQrcode').setAttribute('data-content', formData.qrCodes.sms);
            generateQRCode('smsQrcode', formData.qrCodes.sms);
          }
        } else if (key === 'vcard' && formData.vcard) {
          // Restore vCard download link
          const blob = new Blob([formData.vcard.data], { type: 'text/vcard' });
          const url = URL.createObjectURL(blob);
          const downloadLink = document.getElementById('downloadLink');
          downloadLink.innerHTML = `
            <a href="${url}" download="${formData.vcard.filename}" class="inline-block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-center">
              Download vCard
            </a>
          `;
        }
      } else {
        // Handle regular form fields
        const element = document.getElementById(key);
        if (element) {
          element.value = formData[key];
        }
      }
    });
  }
}

// Add event listeners to all form inputs
const formInputs = [
  'firstName', 'lastName', 'phone', 'whatsapp', 'email', 
  'website', 'company', 'jobTitle', 'whatsappMessage', 'smsMessage'
];

formInputs.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener('input', saveFormValues);
  }
});

// Restore form values when page loads
restoreFormValues();

// Function to format phone number
function formatPhoneNumber(phone) {
  if (!phone) return '';
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // If it's a US number (10 digits) and doesn't start with +1, add it
  if (cleaned.length === 10 && !phone.startsWith('+1')) {
    return '+1' + cleaned;
  }
  return phone;
}

// Function to update phone number and mirror to WhatsApp
function updatePhoneNumber(input, value) {
  const formattedNumber = formatPhoneNumber(value);
  input.value = formattedNumber;
  
  // If this is the phone input and WhatsApp is empty, mirror to WhatsApp
  if (input.id === 'phone' && !document.getElementById('whatsapp').value) {
    document.getElementById('whatsapp').value = formattedNumber;
  }
}

// Function to update message templates
function updateMessageTemplates(firstName) {
  if (firstName) {
    document.getElementById('whatsappMessage').value = `Hi ${firstName}, this is a WhatsApp message`;
    document.getElementById('smsMessage').value = `Hi ${firstName}, this is an SMS message`;
  }
}

// Add event listeners for phone number formatting
document.getElementById('phone').addEventListener('input', (e) => {
  updatePhoneNumber(e.target, e.target.value);
});

document.getElementById('whatsapp').addEventListener('input', (e) => {
  updatePhoneNumber(e.target, e.target.value);
});

// Add event listener for first name to update message templates
document.getElementById('firstName').addEventListener('input', (e) => {
  updateMessageTemplates(e.target.value);
});

// Update error messages to be more descriptive
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = `
    <p class="text-red-700" role="alert">
      <span class="font-medium">Error:</span> ${message}
    </p>
  `;
}

// Update success messages to be more descriptive
function showSuccess(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = `
    <p class="text-green-700">
      <span class="font-medium">Success:</span> ${message}
    </p>
  `;
}

// Add keyboard navigation for photo drop zone
document.getElementById('photoDrop').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    document.getElementById('photoInput').click();
  }
});

