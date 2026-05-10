const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const HF_KEY = process.env.HUGGINGFACE_API_KEY;

async function callOpenAI(prompt, maxTokens = 400) {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not configured');

  const payload = {
    model: OPENAI_MODEL,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    temperature: 0.3
  };

  try {
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
      headers: { Authorization: `Bearer ${OPENAI_KEY}` }
    });

    if (!resp.data || !resp.data.choices || !resp.data.choices[0]) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const content = resp.data.choices[0].message?.content;
    if (!content) throw new Error('OpenAI returned empty content');
    return content;
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message || 'Unknown OpenAI error';
    throw new Error(`OpenAI API error: ${msg}`);
  }
}

async function callHuggingFace(text, task = 'summarization') {
  if (!HF_KEY) throw new Error('HUGGINGFACE_API_KEY not configured');
  // Use bart-large-cnn for summarization fallback
  const model = 'facebook/bart-large-cnn';
  const url = `https://api-inference.huggingface.co/models/${model}`;
  
  try {
    const resp = await axios.post(url, { inputs: text }, { headers: { Authorization: `Bearer ${HF_KEY}` } });
    if (Array.isArray(resp.data) && resp.data[0] && resp.data[0].summary_text) {
      return resp.data[0].summary_text;
    }
    if (typeof resp.data === 'string') return resp.data;
    throw new Error('Invalid HuggingFace response format');
  } catch (err) {
    const msg = err.response?.data?.error || err.message || 'Unknown HuggingFace error';
    throw new Error(`HuggingFace API error: ${msg}`);
  }
}

function buildPromptForSummary(text, length) {
  let instruction = 'Summarize the following text into a clear and concise version. Maintain key points.';
  if (length === 'short') instruction += ' Make the summary 3-4 lines.';
  if (length === 'medium') instruction += ' Make the summary 6-8 lines.';
  if (length === 'long') instruction += ' Provide a detailed summary.';
  instruction += '\n\nText:\n' + text;
  return instruction;
}

exports.summarize = async (text, length = 'medium') => {
  const prompt = buildPromptForSummary(text, length);
  
  // Try OpenAI first
  if (OPENAI_KEY) {
    try {
      const out = await callOpenAI(prompt, 600);
      if (out && out.trim()) return out.trim();
    } catch (err) {
      console.warn('OpenAI summarize failed:', err.message);
    }
  }

  // Fallback to HuggingFace
  if (HF_KEY) {
    try {
      const hf = await callHuggingFace(text, 'summarization');
      if (hf && hf.trim()) return hf.trim();
    } catch (err) {
      console.warn('HuggingFace summarize failed:', err.message);
    }
  }

  // If both fail, throw error with details
  const providers = [];
  if (!OPENAI_KEY) providers.push('OPENAI_API_KEY');
  if (!HF_KEY) providers.push('HUGGINGFACE_API_KEY');
  const missing = providers.length > 0 ? ` Missing: ${providers.join(', ')}.` : '';
  throw new Error(`No AI provider available.${missing}`);
};

exports.extractKeywords = async (text) => {
  const prompt = `Extract 8-12 important keywords or short phrases from the text, comma-separated. Text: ${text}`;
  
  // Try OpenAI first
  if (OPENAI_KEY) {
    try {
      const out = await callOpenAI(prompt, 120);
      if (out && out.trim()) return out.trim();
    } catch (err) {
      console.warn('OpenAI keywords failed:', err.message);
    }
  }

  // Fallback: naive frequency extraction
  try {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const stop = new Set(['the','and','of','to','a','in','is','for','that','on','with','as','are','by','an','be','from','it','this','or','at','as','not','we','you','but','all','just','which','who','about','them','these','would','what','could','said','has','have','having','do','does','did','been','be','being','used','using','if','how','also','so','here','there','been','been','where','when','up','down','out','over','under']);
    const freqs = {};
    for (const w of words) {
      if (w && !stop.has(w) && w.length > 3) {
        freqs[w] = (freqs[w] || 0) + 1;
      }
    }
    const keys = Object.entries(freqs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(x => x[0]);
    return keys.length > 0 ? keys.join(', ') : 'keywords not available';
  } catch (err) {
    console.warn('Keyword extraction fallback failed:', err.message);
    return 'keywords not available';
  }
};
