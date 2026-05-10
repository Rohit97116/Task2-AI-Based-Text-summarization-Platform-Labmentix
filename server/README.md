# SummarizeAI - Backend Server

Express.js + MongoDB backend for AI text summarization platform.

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

Server starts on `http://localhost:5000`

## 📋 Environment Variables

```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:5173
```

## 🔌 API Routes

### Summaries (`/api/summaries`)
- `POST /` - Create new summary
- `GET /` - Get all user summaries
- `GET /:id` - Get single summary
- `PUT /:id` - Update summary
- `DELETE /:id` - Delete summary

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `GET /analytics` - Get analytics data

## 📦 Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- jwt - Authentication
- multer - File uploads
- pdf-parse - PDF parsing
- tesseract.js - OCR
- axios - HTTP client
- helmet - Security
- cors - CORS handling
- compression - Response compression
- express-rate-limit - Rate limiting

## 🔐 Security

- JWT authentication required for protected routes
- Rate limiting: 100 requests per 15 minutes (global), 10 requests per minute (summarize endpoint)
- Helmet.js for security headers
- File validation for uploads
- Input sanitization and validation

## 📊 Database Schema

### User Model
```
- clerkId (unique)
- email
- name
- avatar
- plan (free/pro/enterprise)
- tokensUsed
- tokenLimit
- summariesCreated
- preferences
- timestamps
```

### Summary Model
```
- userId (ref: User)
- title
- originalText
- summaries (short, medium, long, bullet, academic, business)
- keyInsights
- keywords
- actionItems
- sentiment
- tone
- readabilityScore
- language
- sourceFile
- aiProvider
- tokensUsed
- tags
- isFavorite
- isBookmarked
- exports (pdf, docx, markdown)
- timestamps
```

### Analytics Model
```
- userId (ref: User)
- date
- summariesCreated
- tokensUsed
- filesProcessed
- aiProviderUsage
- fileTypeUsage
- summaryModeUsage
- averageProcessingTime
- exports
```

## 🎯 AI Providers

Supports multiple AI providers:

### OpenAI
- Default provider
- Models: gpt-4o-mini, gpt-4, gpt-3.5-turbo
- Best for: High quality, latest AI features

### Gemini (Coming Soon)
- Multiple model options
- Great for multi-modal content

### HuggingFace
- Free tier available
- Good for cost-conscious deployments
- Model: facebook/bart-large-cnn

## 📝 Request Examples

### Create Summary with Text
```bash
curl -X POST http://localhost:5000/api/summaries \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your long text here...",
    "summaryModes": ["short", "bullet"],
    "language": "en",
    "provider": "openai"
  }'
```

### Upload PDF for Summarization
```bash
curl -X POST http://localhost:5000/api/summaries \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.pdf" \
  -F "summaryModes=[\"medium\", \"academic\"]"
```

## 🔍 Monitoring & Logging

- Winston logger for all requests
- Error tracking with detailed stack traces
- Request/response logging
- Database query monitoring

## 📈 Performance Tips

- Use MongoDB indexes for faster queries
- Enable compression in production
- Implement caching for frequently accessed summaries
- Batch process file uploads
- Use connection pooling

## 🐛 Debugging

Enable debug mode:
```bash
DEBUG=* npm run dev
```

## 📝 License

MIT

## 🙋 Support

For issues, create a GitHub issue or contact support@summarizeai.com
