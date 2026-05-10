# 🚀 Quick Reference Guide

## Local Development

### Install & Run

```bash
# Backend
cd server
npm install
npm run dev                # Runs on http://localhost:5000

# Frontend  
cd client
npm install
npm run dev                # Runs on http://localhost:5173

# Both with Docker
docker-compose up --build  # All services at once
```

### Environment Setup

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/summarizeai
OPENAI_API_KEY=sk-your-key
JWT_SECRET=your-secret
CLIENT_URL=http://localhost:5173
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
```

---

## Build & Preview

```bash
# Frontend build
cd client
npm run build     # Creates client/dist/
npm run preview   # Preview production build

# Test production build
cd client
npm run build
npm run preview
```

---

## API Endpoints (Local)

### Public Endpoints
```bash
# Health check
curl http://localhost:5000/health

# Demo summarization
curl -X POST http://localhost:5000/api/summaries/public \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text here","length":"medium","format":"paragraph"}'
```

### Protected Endpoints
```bash
# Requires JWT token in Authorization header
curl http://localhost:5000/api/summaries \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Deployment Checklist

### Before Deployment
- [ ] Code committed and pushed to GitHub
- [ ] All tests passing locally
- [ ] Environment variables documented
- [ ] API keys obtained (OpenAI)

### Deploy Backend (Render)

1. Go to https://render.com
2. Create Web Service
3. Connect repo: `Task2-AI-Based-Text-summarization-Platform-Labmentix`
4. Settings:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node index.js`
5. Add Environment Variables (from `server/.env.example`)
6. Deploy
7. Copy Service URL

### Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. Import Project
3. Select repo
4. Set Environment Variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.app
   ```
5. Deploy
6. Copy Frontend URL

### Post-Deployment

1. Update Render backend:
   - Set `CLIENT_URL` to your Vercel URL
   - Redeploy
2. Test frontend
3. Test API calls

---

## Project Structure

```
project-root/
├── client/              # React + Vite
│   ├── src/
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── server/              # Express + Node
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── vercel.json          # Frontend deployment
├── render.json          # Backend deployment
└── README.md
```

---

## Common Issues & Fixes

### "Cannot find module"
```bash
cd [frontend or backend]
npm install
npm install  # Run again if needed
```

### API calls returning 404
- Check backend is running: `curl http://localhost:5000/health`
- Check `VITE_API_URL` in frontend `.env`
- Check vite.config.js proxy configuration

### "PORT already in use"
```bash
# Change port in .env or use different terminal

# Or kill process using port:
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB connection error
- Verify connection string in `.env`
- Check MongoDB is running locally
- If using Atlas, verify IP whitelist includes your IP

### Build fails on Vercel
- ✅ Already fixed with root `vercel.json`
- If still failing: Clear cache in Vercel dashboard
- Check `client/package.json` has all dependencies

---

## File Locations Quick Links

| File | Purpose |
|------|---------|
| `vercel.json` | Frontend deployment config (ROOT) |
| `render.json` | Backend deployment config (ROOT) |
| `client/vite.config.js` | Vite build configuration |
| `client/package.json` | Frontend dependencies |
| `server/index.js` | Backend entry point |
| `server/package.json` | Backend dependencies |
| `server/.env` | Backend environment (git ignored) |
| `client/.env` | Frontend environment (git ignored) |

---

## Environment Variables Reference

### Backend
| Variable | Example | Purpose |
|----------|---------|---------|
| PORT | 5000 | Server port |
| NODE_ENV | production | Environment |
| MONGODB_URI | mongodb://... | Database URL |
| OPENAI_API_KEY | sk-... | AI API key |
| JWT_SECRET | random-key | Authentication |
| CLIENT_URL | https://... | Frontend URL |

### Frontend
| Variable | Example | Purpose |
|----------|---------|---------|
| VITE_API_URL | http://localhost:5000 | Backend URL |

---

## Useful Commands

```bash
# Frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Backend
npm run dev              # Start with hot reload
npm start                # Start production
npm install              # Install dependencies

# Testing
curl http://localhost:5000/health
curl http://localhost:5173

# Docker
docker-compose up --build
docker-compose down

# Git
git add .
git commit -m "Your message"
git push origin main
```

---

## Deployment URLs

### After Deployment
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-service.onrender.app`
- **Database:** MongoDB Atlas (connection string)

---

## Documentation Files

- `README.md` - Main documentation
- `DEPLOYMENT_CONFIG.md` - Configuration guide
- `DEPLOYMENT_PRODUCTION.md` - Step-by-step deployment
- `RESTRUCTURING_SUMMARY.md` - Architecture changes
- `VERIFICATION_CHECKLIST.md` - Pre-deployment checklist

---

## Support

### GitHub
https://github.com/Rohit97116/Task2-AI-Based-Text-summarization-Platform-Labmentix

### Check Logs
- **Render:** Dashboard → Service → Logs
- **Vercel:** Dashboard → Project → Deployments → Logs

### Reset Environment
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Reference Card

| Action | Command |
|--------|---------|
| Start backend | `cd server && npm run dev` |
| Start frontend | `cd client && npm run dev` |
| Build frontend | `cd client && npm run build` |
| Install deps | `npm install` |
| Test backend | `curl http://localhost:5000/health` |
| View logs | Check dashboard (Render/Vercel) |
| Deploy | Push to main → Auto-deploys |

---

**Last Updated:** May 2026
**Status:** Production Ready ✅
