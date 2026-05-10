# SummarizeAI - Premium AI SaaS Platform

A production-grade AI text summarization platform built with React, Vite, Express, and MongoDB.

## 🚀 Features

### Core Features
- **AI-Powered Summarization** - Multiple summarization modes (short, medium, long, bullet, academic, business)
- **Multi-Format Support** - PDF, DOCX, TXT, Images (OCR), PPTX
- **Advanced Analytics** - Track usage, token consumption, and activity
- **User Authentication** - JWT-based auth with Clerk integration
- **Dark/Light Theme** - Beautiful glassmorphism UI with theme toggle

### AI Capabilities
- ✨ **Multiple Summarization Modes** - 6+ different summary types
- 🎯 **Key Insights Extraction** - Automatic insight generation
- 🏷️ **Keyword Extraction** - Extract important keywords
- ✅ **Action Items** - Pull actionable items from documents
- 💭 **Sentiment Analysis** - Analyze document sentiment
- 🌍 **Multi-Language** - Support for multiple languages
- 🎨 **Custom Formatting** - Bullet points, paragraphs, etc.

### Advanced Features
- 📊 **Dashboard** - Real-time analytics and statistics
- 💾 **Summary History** - Access all past summaries
- ⭐ **Favorites & Bookmarks** - Organize summaries
- 📥 **Export Options** - PDF, DOCX, Markdown exports
- 🔍 **Search & Filter** - Find summaries quickly
- 📈 **Usage Analytics** - Track AI provider usage
- 🎯 **Multi-Provider Support** - OpenAI, Gemini, HuggingFace

## 🏗️ Architecture

### Frontend Stack
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Recharts** - Analytics charts
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend Stack
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **pdf-parse** - PDF parsing
- **Tesseract.js** - OCR
- **Helmet** - Security
- **Express Rate Limit** - Rate limiting

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── UI.jsx              # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── Landing.jsx         # Landing page
│   │   ├── CreateSummary.jsx
│   │   ├── MySummaries.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useData.js
│   │   └── useUI.js
│   ├── App.jsx
│   └── main.jsx

server/
├── config/
│   └── database.js
├── controllers/
│   ├── summaryController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── rateLimit.js
├── models/
│   ├── User.js
│   ├── Summary.js
│   └── Analytics.js
├── services/
│   └── aiService.js
├── routes/
│   ├── summaries.js
│   └── users.js
├── utils/
│   ├── pdfUtil.js
│   ├── ocrUtil.js
│   ├── fileValidator.js
│   └── exportUtil.js
└── index.js
```

## ⚙️ Setup Guide

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- OpenAI/Gemini API key
- Clerk account (optional, for auth)

### Installation

1. **Clone Repository**
```bash
cd server
npm install
```

2. **Setup Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

3. **Start Backend**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

4. **Setup Frontend**
```bash
cd ../client
npm install
```

5. **Start Frontend**
```bash
npm run dev
```

App runs on `http://localhost:5173`

## 🔌 API Endpoints

### Summaries
- `POST /api/summaries` - Create summary
- `GET /api/summaries` - Get user's summaries
- `GET /api/summaries/:id` - Get single summary
- `PUT /api/summaries/:id` - Update summary
- `DELETE /api/summaries/:id` - Delete summary

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/analytics` - Get analytics

## 🎨 UI/UX Design

### Color Scheme
- **Dark Mode**: Slate-950 background with blue/purple accents
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradients**: Blue-Purple-Pink gradient text and backgrounds
- **Animations**: Smooth Framer Motion transitions

### Components
- Modern buttons with hover effects
- Glassmorphic cards
- Animated sidebars
- Responsive grid layouts
- Loading skeletons
- Toast notifications

## 🔐 Security Features

- JWT authentication
- Rate limiting (15 req/min)
- Helmet.js security headers
- Input validation
- File upload validation
- CORS configuration
- Secure password hashing (bcrypt)

## 📊 Performance

- Code splitting with Vite
- Lazy loading components
- Image optimization
- Database indexing
- Request compression
- CDN-ready builds

## 🚀 Deployment

### Quick Deployment Options

**Option 1: Docker (Recommended)**
```bash
docker-compose up --build
```

**Option 2: Railway + Vercel (Production)**
- Backend: [Deploy to Railway](https://railway.app/new)
- Frontend: [Deploy to Vercel](https://vercel.com/new)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Option 3: Heroku**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables for Production
```bash
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/summarizeai
OPENAI_API_KEY=sk-...
JWT_SECRET=your-super-secret-key
CLIENT_URL=https://your-frontend-url.com

# Frontend
VITE_API_URL=https://your-backend-url.com
```

### Recommended Production Stack
- **Frontend**: Vercel (Next.js compatible)
- **Backend**: Railway / Heroku / Render
- **Database**: MongoDB Atlas
- **Storage**: AWS S3 (for exports)
- **CDN**: Vercel / Cloudflare


## 📖 Usage Examples

### Create a Summary
```javascript
const response = await axios.post('/api/summaries', {
  text: 'Your text here',
  summaryModes: ['short', 'medium'],
  language: 'en',
  provider: 'openai'
}, {
  headers: { Authorization: `Bearer ${token}` }
})
```

### Upload and Summarize PDF
```javascript
const formData = new FormData()
formData.append('file', pdfFile)
formData.append('summaryModes', JSON.stringify(['bullet', 'academic']))

const response = await axios.post('/api/summaries', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
})
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License

MIT License - feel free to use this project

## 🎯 Roadmap

- [ ] Collaborative workspaces
- [ ] API for third-party integration
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Team collaboration features
- [ ] Custom AI model training
- [ ] Real-time sync across devices
- [ ] Advanced caching system

## 📞 Support

For issues and questions:
- GitHub Issues: [Create issue](https://github.com)
- Email: support@summarizeai.com

---

**Built with ❤️ using React, Express, and MongoDB**
