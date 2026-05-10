# Deployment Guide - AI Summarization Platform

## 🚀 Quick Start Deployment Options

### Option 1: Deploy with Docker (Recommended)

**Prerequisites:**
- Docker installed ([Download Docker](https://www.docker.com/products/docker-desktop))
- Docker Compose installed

**Steps:**
```bash
# Clone the repository
git clone https://github.com/Rohit97116/Task2-AI-Based-Text-summarization-Platform-Labmentix.git
cd "Task2-AI-Based-Text-summarization-Platform-Labmentix"

# Create .env file with your API keys
cp server/.env.example server/.env
# Edit server/.env with your API keys

# Build and run with Docker Compose
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: localhost:27017

---

### Option 2: Deploy Backend to Railway

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Create a new project → GitHub repo connect
4. Select this repository
5. Add MongoDB plugin:
   - Add service → Database → MongoDB
6. Set environment variables:
   - `PORT=5000`
   - `MONGODB_URI=` (auto-filled from MongoDB plugin)
   - `OPENAI_API_KEY=your_key`
   - `JWT_SECRET=your_secret`
7. Deploy automatically on push

**Get your backend URL:** Railway dashboard shows the domain

---

### Option 3: Deploy Frontend to Vercel

**Steps:**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Import project → Select repository → Import
4. Framework: React
5. Build command: `npm run build`
6. Output directory: `dist`
7. Root directory: `client`
8. Environment variables:
   - `VITE_API_URL=https://your-railway-backend-url`
9. Deploy

---

### Option 4: Deploy Both to Heroku

**Backend Deployment:**

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
cd server
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

**Frontend Deployment:**
Similar process with separate Heroku app and environment pointing to backend URL

---

## 🔧 Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/summarizeai
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
HUGGINGFACE_API_KEY=...
JWT_SECRET=your-super-secret-key
CLIENT_URL=https://your-frontend-url.com
```

### Client (.env)
```
VITE_API_URL=https://your-backend-url.com
```

---

## 📊 Recommended Architecture

```
┌─────────────────────────────────────────┐
│  Vercel Frontend (React + Vite)          │
│  https://your-app.vercel.app             │
└──────────────┬──────────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────────┐
│  Railway Backend (Node.js + Express)     │
│  https://your-app-backend.railway.app    │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│  MongoDB Atlas (Cloud Database)          │
│  mongodb+srv://user:pass@...             │
└─────────────────────────────────────────┘
```

---

## ✅ Deployment Checklist

- [ ] API keys configured (OpenAI/Gemini/HuggingFace)
- [ ] Environment variables set on deployment platform
- [ ] Database connection verified
- [ ] Frontend environment variable pointing to backend URL
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Error handling tested
- [ ] Build passes without errors
- [ ] Test API endpoints
- [ ] Test file upload functionality

---

## 🔑 Obtaining API Keys

### OpenAI API Key
1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy and set in environment

### Google Gemini API Key
1. Visit [makersuite.google.com](https://makersuite.google.com)
2. Get API key
3. Set in environment

### HuggingFace API Key
1. Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create new token
3. Set in environment

---

## 🚨 Troubleshooting

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**CORS Issues:**
- Ensure CLIENT_URL matches frontend URL
- Check CORS configuration in server/index.js

**MongoDB Connection Error:**
- Verify MONGODB_URI is correct
- Whitelist IP addresses in MongoDB Atlas
- Check credentials

**Build Failures:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (requires v16+)
- Review build logs for specific errors

---

## 📞 Support

For issues:
1. Check GitHub issues
2. Review error logs
3. Verify environment variables
4. Test locally first with `npm run dev`

---

**Happy Deploying! 🎉**
