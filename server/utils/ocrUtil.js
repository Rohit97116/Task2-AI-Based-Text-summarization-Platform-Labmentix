const Tesseract = require('tesseract.js');
const sharp = require('sharp');

async function extractTextFromImage(buffer) {
  try {
    // Preprocess image
    const processedBuffer = await sharp(buffer)
      .grayscale()
      .toBuffer();

    const result = await Tesseract.recognize(processedBuffer, 'eng');
    return result.data.text;
  } catch (error) {
    throw new Error(`OCR error: ${error.message}`);
  }
}

module.exports = { extractTextFromImage };
