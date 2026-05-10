async function validateFile(file) {
  const allowedMimes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];

  const allowedExtensions = ['pdf', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'webp', 'pptx'];

  if (!allowedMimes.includes(file.mimetype)) {
    throw new Error(`Invalid file type: ${file.mimetype}`);
  }

  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    throw new Error(`Invalid file extension: ${ext}`);
  }

  const maxSizeBytes = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds 50MB limit');
  }

  return true;
}

module.exports = { validateFile };
