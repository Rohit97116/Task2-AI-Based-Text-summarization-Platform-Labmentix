const pdfUtil = require('../utils/pdf');
const openaiClient = require('../utils/openaiClient');

function cleanText(t) {
  return t.replace(/\s+/g, ' ').trim();
}

exports.handleSummarize = async (req, res) => {
  try {
    const length = req.body.length || req.body.summaryLength || 'medium';
    let text = req.body.text || '';

    // Validate input
    if (req.file) {
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed.' });
      }
      try {
        const buf = req.file.buffer;
        const extracted = await pdfUtil.extractText(buf);
        text = (text + '\n' + extracted).trim();
      } catch (pdfErr) {
        console.error('PDF extraction error:', pdfErr.message, pdfErr.stack);
        return res.status(400).json({ error: 'Failed to parse PDF: ' + (pdfErr.message || 'Unknown error') });
      }
    }

    text = cleanText(text || '');
    if (!text) return res.status(400).json({ error: 'Empty input. Provide text or a PDF file.' });

    // Validate length param
    if (!['short', 'medium', 'long'].includes(length)) {
      return res.status(400).json({ error: 'Invalid summary length. Use: short, medium, long.' });
    }

    const summary = await openaiClient.summarize(text, length);
    const keywords = await openaiClient.extractKeywords(text);

    if (!summary || !keywords) {
      return res.status(500).json({ error: 'AI service returned empty response.' });
    }

    return res.json({ summary, keywords });
  } catch (err) {
    console.error('Summarize error:', err.message || err);
    console.error('Full error stack:', err.stack);
    const msg = err.message ? String(err.message).substring(0, 100) : 'Unknown error';
    return res.status(500).json({ error: 'Failed to summarize. ' + msg });
  }
};
