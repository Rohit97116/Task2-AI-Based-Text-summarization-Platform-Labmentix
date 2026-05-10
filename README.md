# AI Text Summarization Platform

A production-grade full-stack web application that uses AI to summarize documents and text. Built with React, Vite, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- **Text & Document Summarization**
  - Support for PDF, DOCX, TXT files
  - OCR for image text extraction
  - Real-time text input
  
- **Multiple Summary Formats**
  - Paragraph, Bullets, Academic, Business formats
  - Adjustable summary length (Short, Medium, Long)
  - Keyword extraction and insights
  
- **User Management**
  - JWT authentication
  - User profiles and analytics
  - Summary history and management
  
- **Advanced Features**
  - Usage analytics dashboard
  - Dark/Light theme
  - Rate limiting and security
  - File upload handling (50MB limit)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Recharts** - Analytics charts
- **React Dropzone** - File upload

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Tesseract.js** - OCR
- **pdf-parse** - PDF processing
- **Sharp** - Image processing
- **Helmet** - Security headers
- **Rate Limit** - API protection

## 📁 Project Structure

```
project-root/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── context/            # Context API (Auth, Theme)
│   │   ├── hooks/              # Custom hooks
│   │   ├── main.jsx
│   │   └── main.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   ├── package.json
│   └── .env.example
│
├── server/                      # Express backend
│   ├── config/                 # Configuration
│   │   └── database.js
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Express middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── vercel.json                  # Vercel frontend config
├── render.json                  # Render backend config
├── docker-compose.yml           # Local development
├── README.md                    # This file
└── LICENSE
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or 18+
- npm or yarn
- MongoDB (local or Atlas)
- OpenAI API key

### Local Development

#### 1. Clone and Install

```bash
# Clone repository
git clone https://github.com/Rohit97116/Task2-AI-Based-Text-summarization-Platform-Labmentix.git
cd task\ 5

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

#### 2. Configure Environment

**Backend** - Create `server/.env`:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/summarizeai
OPENAI_API_KEY=sk-your-api-key-here
JWT_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:5173
```

**Frontend** - Create `client/.env`:
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

#### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# App runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

### Using Docker Compose (All-in-One)

```bash
# Build and start all services
docker-compose up --build

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

## 🔧 Environment Setup

### Getting API Keys

**OpenAI API Key:**
1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to `server/.env`

**MongoDB:**
- **Local:** `mongodb://localhost:27017/summarizeai`
- **Atlas Cloud:** Get connection string from https://www.mongodb.com/cloud/atlas

### JWT Secret

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 💻 Development

### Backend Development

```bash
cd server

# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Run production build
npm start

# Check health
curl http://localhost:5000/health
```

### Frontend Development

```bash
cd client

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing API Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Demo summarization (no auth required)
curl -X POST http://localhost:5000/api/summaries/public \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text to summarize"}'
```

## 🌐 Deployment

### Deployment Architecture

```
┌─────────────────────────────────────────────┐
│ GitHub Repository                           │
│ (Push code → Auto-deploy)                   │
└────────┬────────────────────────────────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
 Vercel    Render
 (Client)   (Backend)
```

### Option 1: Vercel (Frontend) + Render (Backend) ⭐ Recommended

#### Step 1: Deploy Backend to Render

1. Go to https://render.com
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** `ai-summarization-server`
   - **Environment:** `Node`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   OPENAI_API_KEY=sk-your-key
   JWT_SECRET=your-secret
   CLIENT_URL=https://your-vercel-url.vercel.app
   ```
6. Deploy

**Save Backend URL:** `https://your-service.onrender.app`

#### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Create new Project → Import Repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.app
   ```
5. Deploy

**Save Frontend URL:** `https://your-app.vercel.app`

#### Step 3: Update Backend CORS

Update `server/.env`:
```env
CLIENT_URL=https://your-app.vercel.app
```

#### Verification

```bash
# Test backend health
curl https://your-backend.onrender.app/health

# Test frontend
Open https://your-app.vercel.app
```

### Option 2: Docker Deployment

#### Build Docker Image

```bash
# Build backend image
docker build -t ai-summarization:latest -f server/Dockerfile .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=your-connection-string \
  -e OPENAI_API_KEY=your-key \
  ai-summarization:latest
```

### Option 3: Railway (Combined)

1. Go to https://railway.app
2. Create new project
3. Add MongoDB plugin
4. Connect GitHub and deploy

## 📡 API Endpoints

### Public Endpoints (No Auth Required)

```
POST /api/summaries/public
├── Body: { text: string, length?: string, format?: string }
├── Response: { summary: string, keywords: string[] }
└── Example:
    curl -X POST http://localhost:5000/api/summaries/public \
      -H "Content-Type: application/json" \
      -d '{"text":"Your text here","length":"medium","format":"paragraph"}'

GET /health
├── Response: { status: string }
└── Used for uptime monitoring
```

### Protected Endpoints (JWT Required)

```
POST /api/summaries
├── Headers: { Authorization: "Bearer YOUR_TOKEN" }
├── Body: { text: string, file?: File, length: string, format: string }
└── Response: { _id, text, summary, keywords, format, createdAt }

GET /api/summaries?skip=0&limit=10
├── Headers: { Authorization: "Bearer YOUR_TOKEN" }
└── Response: { summaries: [], total: number }

GET /api/users/profile
├── Headers: { Authorization: "Bearer YOUR_TOKEN" }
└── Response: { _id, email, name, summaryCount }

GET /api/users/analytics
├── Headers: { Authorization: "Bearer YOUR_TOKEN" }
└── Response: { totalSummaries, totalWords, formats: {} }
```

## 🐛 Troubleshooting

### Build Issues

**"vite build exited with code 127"**
- This was the original Vercel issue
- ✅ Fixed by creating root `vercel.json` with correct configuration
- Vercel now knows to build from `/client` directory

**"Cannot find module"**
- Check all relative paths are correct
- Verify dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules && npm install`

### API Connection Issues

**"Failed to fetch from backend"**
- Check backend is running: `curl http://localhost:5000/health`
- Verify `VITE_API_URL` environment variable is set correctly
- Check CORS configuration in backend

**"MongoDB connection failed"**
- Verify connection string in `.env`
- Check MongoDB is running (local or Atlas access)
- Verify credentials if using Atlas

### Authentication Issues

**"Invalid token"**
- Token may have expired
- Clear localStorage and re-login
- Check JWT_SECRET matches between client and server

## 📊 Monitoring

### Check Deployment Status

**Render (Backend):**
- Log in to https://render.com
- Navigate to your service
- Check "Logs" tab for errors

**Vercel (Frontend):**
- Log in to https://vercel.com
- Navigate to your project
- Check deployment logs

### Health Checks

```bash
# Backend health
curl https://your-backend.onrender.app/health

# Frontend loads (should return HTML)
curl -I https://your-app.vercel.app
```

## 📝 File Upload Limits

- Maximum file size: 50MB
- Supported formats: PDF, DOCX, TXT, PNG, JPG, JPEG, GIF
- OCR works best with clear, high-contrast images

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ File type validation
- ✅ Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues and questions:
- GitHub Issues: https://github.com/Rohit97116/Task2-AI-Based-Text-summarization-Platform-Labmentix/issues
- Documentation: See [DEPLOYMENT.md](./DEPLOYMENT.md) and [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)

## 👨‍💻 Author

**Rohit** - Full Stack Developer

---

**Last Updated:** May 2026
**Version:** 1.0.0 (Production Ready)

MIT
