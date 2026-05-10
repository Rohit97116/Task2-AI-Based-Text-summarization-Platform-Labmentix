# 🏗️ Architecture & File Structure Guide

## Project Directory Tree

```
project-root/
│
├── 📄 vercel.json                    ⭐ NEW - FIXES VERCEL BUILD ISSUE
│   └── Tells Vercel to build from /client
│       Build: cd client && npm install && npm run build
│       Output: client/dist
│
├── 📄 render.json                    ⭐ NEW - Render backend config
│   └── Tells Render to run from /server
│       Start: node index.js
│
├── 📄 README.md                      ✅ UPDATED - Complete guide
│   └── Main documentation with:
│       • Project overview
│       • Tech stack
│       • Quick start
│       • Deployment instructions
│       • API reference
│       • Troubleshooting
│
├── 📄 DOCUMENTATION_INDEX.md         ⭐ NEW - Navigation guide
│   └── Find documents by topic
│
├── 📄 QUICK_REFERENCE.md             ⭐ NEW - Developer cheat sheet
│   └── Common commands and issues
│
├── 📄 DEPLOYMENT_PRODUCTION.md       ⭐ NEW - Step-by-step deployment
│   └── Production deployment walkthrough
│
├── 📄 DEPLOYMENT_CONFIG.md           ⭐ NEW - Configuration guide
│   └── Detailed configuration options
│
├── 📄 RESTRUCTURING_SUMMARY.md       ⭐ NEW - What changed & why
│   └── Architecture changes overview
│
├── 📄 VERIFICATION_CHECKLIST.md      ⭐ NEW - Pre-deployment checks
│   └── Verification before deployment
│
├── 📄 COMPLETE_SUMMARY.md            ⭐ NEW - Executive summary
│   └── Complete overview of changes
│
├── 📄 DEPLOYMENT.md                  ✅ EXISTING - Comprehensive guide
│   └── Multiple deployment options
│
├── 📄 DEPLOYMENT_QUICKSTART.md       ✅ EXISTING - Quick deployment
│   └── 5-10 minute setup
│
├── 📄 docker-compose.yml             ✅ EXISTING - Docker setup
├── 📄 LICENSE                        ✅ EXISTING
├── 📄 setup.sh                       ✅ EXISTING
│
└── 📁 client/                        ← FRONTEND (Deploys to Vercel)
    ├── src/
    │   ├── components/               # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── InputSection.jsx
    │   │   ├── OutputSection.jsx
    │   │   ├── Spinner.jsx
    │   │   └── UI.jsx
    │   ├── pages/                    # Page components
    │   │   ├── Landing.jsx
    │   │   ├── CreateSummary.jsx
    │   │   ├── MySummaries.jsx
    │   │   ├── Analytics.jsx
    │   │   └── Settings.jsx
    │   ├── context/                  # Context API
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── hooks/                    # Custom hooks
    │   │   ├── useData.js
    │   │   └── useUI.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── main.css
    │
    ├── index.html                    # Vite entry point
    ├── vite.config.js                # Vite configuration with proxy
    ├── tailwind.config.cjs           # TailwindCSS config
    ├── postcss.config.cjs            # PostCSS config
    ├── package.json                  # Frontend dependencies
    ├── package-lock.json
    ├── .env.example                  # Environment template
    └── dist/                         # Build output (generated)
    
└── 📁 server/                        ← BACKEND (Deploys to Render)
    ├── config/
    │   └── database.js               # MongoDB connection
    │
    ├── controllers/
    │   ├── summarizeController.js    # Summarization logic
    │   ├── summaryController.js      # Summary management
    │   └── userController.js         # User management
    │
    ├── middleware/
    │   ├── auth.js                   # JWT authentication
    │   ├── errorHandler.js           # Error handling
    │   └── rateLimit.js              # Rate limiting
    │
    ├── models/
    │   ├── Summary.js                # Summary schema
    │   ├── User.js                   # User schema
    │   └── Analytics.js              # Analytics schema
    │
    ├── routes/
    │   ├── summaries.js              # Summary routes
    │   ├── summarize.js              # Summarization routes
    │   └── users.js                  # User routes
    │
    ├── services/
    │   └── aiService.js              # AI integration
    │
    ├── utils/
    │   ├── pdf.js                    # PDF processing
    │   ├── pdfUtil.js                # PDF utilities
    │   ├── ocrUtil.js                # OCR functionality
    │   ├── openaiClient.js           # OpenAI API client
    │   ├── fileValidator.js          # File validation
    │   └── exportUtil.js             # Export utilities
    │
    ├── index.js                      # Express entry point
    ├── package.json                  # Backend dependencies
    ├── package-lock.json
    ├── Dockerfile                    # Docker configuration
    ├── Procfile                      # Heroku config
    ├── .env.example                  # Environment template
    └── .env                          # Local env (git ignored)
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│         GitHub Repository                       │
│  (All code, auto-deploys on push)               │
│  └─ Task2-AI-Based-Text-summarization...        │
└────────────────┬────────────────────────────────┘
                 │
         ┌───────┴───────┐
         │               │
         ▼               ▼
    ┌─────────┐      ┌────────┐
    │ Vercel  │      │ Render │
    │ (Frontend)     │ (Backend)
    └─────────┘      └────────┘
         │               │
         ▼               ▼
    React App        Node.js Server
    on CDN           (REST API)
         │               │
         └───────┬───────┘
                 │
                 ▼
         ┌──────────────────┐
         │ MongoDB Atlas    │
         │ (Cloud Database) │
         └──────────────────┘
```

---

## 📋 Build Process Flow

### Frontend Build (Vercel)

```
GitHub Push (main branch)
    ↓
Vercel webhook triggered
    ↓
Read vercel.json (at root)
    ↓
Execute: cd client && npm install && npm run build
    ↓
Vite compiles React + builds to client/dist/
    ↓
    ├── index.html (SPA entry point)
    ├── dist/index-*.js (main app)
    ├── dist/vendor-*.js (React, Router, etc)
    ├── dist/charts-*.js (Recharts)
    ├── dist/ui-*.js (UI libraries)
    └── dist/assets/ (CSS, images)
    ↓
Deploy to Vercel CDN globally
    ↓
App live at: https://your-app.vercel.app
```

### Backend Build (Render)

```
GitHub Push (main branch)
    ↓
Render webhook triggered
    ↓
Read render.json (at root)
    ↓
Navigate to /server directory
    ↓
Execute: npm install
    ↓
Install dependencies:
    ├── express
    ├── mongoose
    ├── dotenv
    ├── and others...
    ↓
Execute: node index.js
    ↓
Server starts on port 5000
    ↓
    ├── Connect to MongoDB
    ├── Load middleware
    ├── Setup routes
    └── Listen for requests
    ↓
Server live at: https://your-backend.onrender.app
```

---

## 🔄 Request Flow (Production)

```
User Opens Frontend
    ↓
Browser requests: https://your-app.vercel.app
    ↓
Vercel CDN serves: /client/dist/index.html
    ↓
React app loads with all static assets
    ↓
User fills form and clicks "Summarize"
    ↓
Frontend makes API call to:
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    ↓
POST https://your-backend.onrender.app/api/summaries
    ↓
Render forwards to Node.js server at port 5000
    ↓
Express validates JWT token
    ↓
    ├── If valid: Process summarization
    │   ├── Connect to MongoDB
    │   ├── Call OpenAI API
    │   ├── Save to database
    │   └── Return result
    │
    └── If invalid: Return 401 Unauthorized
    ↓
Backend returns JSON response:
  {
    "summary": "...",
    "keywords": [...],
    "_id": "...",
    "createdAt": "..."
  }
    ↓
Frontend receives and displays result
    ↓
User sees summarization on screen ✅
```

---

## 🔑 Environment Variables Map

### Development (Local)

```
Frontend (.env)
├── VITE_API_URL=http://localhost:5000
└── Uses Vite proxy in vite.config.js

Backend (.env)
├── PORT=5000
├── NODE_ENV=development
├── MONGODB_URI=mongodb://localhost:27017/summarizeai
├── OPENAI_API_KEY=sk-...
├── JWT_SECRET=your-secret
└── CLIENT_URL=http://localhost:5173
```

### Production (Vercel & Render)

```
Frontend (Vercel Dashboard)
├── VITE_API_URL=https://your-backend.onrender.app
└── Set in: Settings → Environment Variables

Backend (Render Dashboard)
├── NODE_ENV=production
├── PORT=5000
├── MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
├── OPENAI_API_KEY=sk-...
├── JWT_SECRET=your-secret
└── CLIENT_URL=https://your-app.vercel.app
```

---

## 📊 Configuration Files Quick Reference

| File | Location | Purpose | Changes |
|------|----------|---------|---------|
| vercel.json | Root | Frontend deploy config | ⭐ NEW |
| render.json | Root | Backend deploy config | ⭐ NEW |
| vite.config.js | client/ | Vite build config | ✅ Verified |
| package.json | client/ | Frontend deps | ✅ Verified |
| package.json | server/ | Backend deps | ✅ Verified |
| .env.example | client/ | Frontend env template | ✅ Verified |
| .env.example | server/ | Backend env template | ✅ Verified |

---

## 🎯 Key Features of New Structure

### Separation of Concerns ✅
- Frontend code in `/client`
- Backend code in `/server`
- Clear deployment configs at root

### Independent Deployment ✅
- Frontend deploys to Vercel independently
- Backend deploys to Render independently
- No deployment conflicts

### Scalability ✅
- Can scale frontend and backend separately
- Frontend on global CDN
- Backend on Node.js runtime

### Development Experience ✅
- Clear project organization
- Easy to onboard new developers
- Proper tool configuration

### Production Readiness ✅
- Security configured
- Performance optimized
- Monitoring enabled
- Error handling active

---

## 🔧 Technology Stack Visualization

```
┌─────────────────────────────────────────────────┐
│         Frontend (React + Vite)                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Components                               │  │
│  │  ├── Pages (Landing, CreateSummary, ...) │  │
│  │  ├── Components (Navbar, InputSection...)│  │
│  │  └── Context & Hooks                    │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ Styling                                  │  │
│  │  ├── TailwindCSS                         │  │
│  │  ├── Framer Motion (Animations)          │  │
│  │  └── PostCSS                             │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
                (Vite Proxy)
                      ↕
┌─────────────────────────────────────────────────┐
│         Backend (Express + Node)                │
│  ┌──────────────────────────────────────────┐  │
│  │ API Routes                               │  │
│  │  ├── /api/summaries (CRUD)               │  │
│  │  ├── /api/users (Auth)                   │  │
│  │  └── /api/summaries/public (Demo)        │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ Services & Utils                         │  │
│  │  ├── AI Service (OpenAI)                 │  │
│  │  ├── PDF Processing                      │  │
│  │  ├── OCR (Tesseract)                     │  │
│  │  └── File Handling (Multer)              │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ Middleware & Security                    │  │
│  │  ├── JWT Authentication                  │  │
│  │  ├── Rate Limiting                       │  │
│  │  ├── CORS                                │  │
│  │  └── Security Headers (Helmet)           │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
                   MongoDB
               (Atlas or Local)
```

---

## ✨ What's Production-Grade?

```
✅ Frontend
   ├── Vite build optimization
   ├── Code splitting
   ├── Static asset caching
   ├── SPA routing configured
   └── Environment variables secured

✅ Backend
   ├── Express configured
   ├── Rate limiting enabled
   ├── Security headers active
   ├── CORS properly configured
   └── Error handling implemented

✅ Deployment
   ├── Vercel auto-deploy configured
   ├── Render auto-deploy configured
   ├── Environment variables template
   └── Health check endpoints

✅ Security
   ├── JWT authentication
   ├── API rate limiting
   ├── Helmet security headers
   ├── Input validation
   └── CORS protection

✅ Documentation
   ├── README with full guide
   ├── Deployment guides
   ├── Configuration reference
   └── Troubleshooting guide
```

---

**Created:** May 2026
**Version:** 1.0.0 - Production Ready
**Status:** ✅ Architecture Complete
