const pdf = require('pdf-parse');

exports.extractText = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text || '';
  } catch (err) {
    throw new Error('PDF parsing failed: ' + (err.message || err));
  }
};
