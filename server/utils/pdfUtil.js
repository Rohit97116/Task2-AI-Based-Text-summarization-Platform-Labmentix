const pdfParse = require('pdf-parse');

async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error(`PDF parsing error: ${error.message}`);
  }
}

module.exports = { extractTextFromPDF };
