const jsPDF = require('jspdf');

async function generatePDF(title, content) {
  try {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content, 190);
    doc.text(lines, 10, 30);
    
    return doc.output('arraybuffer');
  } catch (error) {
    throw new Error(`PDF generation error: ${error.message}`);
  }
}

module.exports = { generatePDF };
