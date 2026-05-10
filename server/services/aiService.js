const axios = require('axios');

class AIService {
  async summarize(text, length = 'medium', provider = 'openai', mode = 'short') {
    // Use demo mode if no API keys are configured and not explicitly using an API provider
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY && !process.env.HUGGINGFACE_API_KEY && provider === 'openai') {
      return this.summarizeDemo(text, mode);
    }

    if (provider === 'openai') {
      return this.summarizeWithOpenAI(text, length, mode);
    } else if (provider === 'gemini') {
      return this.summarizeWithGemini(text, length, mode);
    } else if (provider === 'huggingface') {
      return this.summarizeWithHuggingFace(text, length);
    } else if (provider === 'demo') {
      return this.summarizeDemo(text, mode);
    }
    throw new Error('Invalid AI provider');
  }

  // Demo mode for testing without API keys
  async summarizeDemo(text, mode = 'short') {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).length;
    
    let summary = '';
    
    if (mode === 'short') {
      // Extract first 2-3 key sentences
      summary = sentences.slice(0, 2).map(s => s.trim()).join('. ') + '.';
    } else if (mode === 'medium') {
      // Extract first 3-4 sentences
      summary = sentences.slice(0, 3).map(s => s.trim()).join('. ') + '.';
    } else if (mode === 'long') {
      // Use more of the original text
      summary = text.substring(0, Math.min(500, text.length));
    } else if (mode === 'bullet') {
      // Create bullet points from sentences
      summary = sentences.slice(0, 4).map(s => `• ${s.trim()}`).join('\n');
    } else if (mode === 'academic') {
      summary = `This document discusses key concepts related to the provided text. The main themes include: ${sentences.slice(0, 2).map(s => s.trim().toLowerCase()).join(', ')}. Further analysis reveals important implications for understanding the subject matter.`;
    } else if (mode === 'business') {
      summary = `Key Takeaway: ${sentences[0]?.trim()} Key Points: ${sentences.slice(1, 3).map(s => s.trim()).join('; ')}`;
    }
    
    return summary;
  }

  async summarizeWithOpenAI(text, length, mode) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const modePrompts = {
      short: `Create a SHORT summary (3-4 sentences) of this text:`,
      medium: `Create a MEDIUM summary (6-8 sentences) of this text:`,
      long: `Create a DETAILED summary (paragraph) of this text:`,
      bullet: `Create a BULLET POINT summary of this text:`,
      academic: `Create an ACADEMIC summary of this text:`,
      business: `Create a BUSINESS-FOCUSED summary of this text:`
    };

    const prompt = modePrompts[mode] || modePrompts.medium;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `${prompt}\n\n${text}` }
        ],
        max_tokens: length === 'short' ? 150 : length === 'long' ? 500 : 300,
        temperature: 0.3
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI error: ${error.message}`);
    }
  }

  async summarizeWithGemini(text, length, mode) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    // Implementation would go here
    throw new Error('Gemini support coming soon');
  }

  async summarizeWithHuggingFace(text, length) {
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('HuggingFace API key not configured');
    }

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        { inputs: text },
        { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
      );

      if (Array.isArray(response.data) && response.data[0]?.summary_text) {
        return response.data[0].summary_text;
      }
      throw new Error('Invalid HuggingFace response format');
    } catch (error) {
      throw new Error(`HuggingFace error: ${error.message}`);
    }
  }

  async extractKeywords(text) {
    // Demo mode if no API keys
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      return this.extractKeywordsDemo(text);
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `Extract 10 key keywords/phrases from this text, comma-separated:\n\n${text}` }
        ],
        max_tokens: 100,
        temperature: 0.3
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return this.extractKeywordsDemo(text);
    }
  }

  extractKeywordsDemo(text) {
    // Simple demo - extract common words
    const words = text.toLowerCase().split(/\s+/);
    const common = ['artificial', 'intelligence', 'machine', 'learning', 'data', 'deep', 'neural', 'network', 'algorithm', 'system', 'technology', 'innovation'];
    const found = common.filter(word => text.toLowerCase().includes(word));
    return found.slice(0, 10).join(', ') || 'artificial intelligence, machine learning, data analysis, innovation, technology';
  }

  async generateInsights(text) {
    // Demo mode if no API keys
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      return this.generateInsightsDemo(text);
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `Extract 5 key insights from this text as bullet points:\n\n${text}` }
        ],
        max_tokens: 200,
        temperature: 0.3
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      return response.data.choices[0].message.content.split('\n').filter(line => line.trim());
    } catch (error) {
      return this.generateInsightsDemo(text);
    }
  }

  generateInsightsDemo(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return [
      `Key concept: ${sentences[0]?.substring(0, 80).trim() || 'Main theme'}`,
      `Development area: Advanced applications and implementations`,
      `Impact: Transformative effects on industry and society`,
      `Critical factor: Proper development and ethical guidelines`,
      `Future direction: Continued innovation and improvement`
    ];
  }

  async extractActionItems(text) {
    // Demo mode if no API keys
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      return this.extractActionItemsDemo(text);
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `Extract action items from this text as a bullet list:\n\n${text}` }
        ],
        max_tokens: 200,
        temperature: 0.3
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      return response.data.choices[0].message.content.split('\n').filter(line => line.trim());
    } catch (error) {
      return this.extractActionItemsDemo(text);
    }
  }

  extractActionItemsDemo(text) {
    return [
      '• Understand the core concepts and key principles',
      '• Implement best practices and ethical guidelines',
      '• Monitor progress and evaluate outcomes',
      '• Plan for future development and improvement',
      '• Share findings and collaborate with stakeholders'
    ];
  }

  async analyzeSentiment(text) {
    // Demo mode if no API keys
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      return this.analyzeSentimentDemo(text);
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `Analyze the sentiment of this text and respond with ONLY one word: positive, negative, or neutral:\n\n${text}` }
        ],
        max_tokens: 10,
        temperature: 0
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      return response.data.choices[0].message.content.toLowerCase().trim();
    } catch (error) {
      return this.analyzeSentimentDemo(text);
    }
  }

  analyzeSentimentDemo(text) {
    const positive = ['good', 'great', 'excellent', 'revolutionary', 'promise', 'transformative', 'innovation'];
    const negative = ['bad', 'poor', 'difficult', 'challenge', 'problem', 'issue'];
    
    const lower = text.toLowerCase();
    const posCount = positive.filter(word => lower.includes(word)).length;
    const negCount = negative.filter(word => lower.includes(word)).length;
    
    if (posCount > negCount) return 'positive';
    if (negCount > posCount) return 'negative';
    return 'neutral';
  }
}

module.exports = new AIService();
