# Deployment Configuration Guide

## Vercel Frontend Deployment Configuration

### Automatic Configuration (Recommended)

Vercel will automatically detect the configuration from `vercel.json` in the root directory.

### Manual Configuration (If Auto-Config Fails)

If you need to manually configure in Vercel dashboard:

1. **Project Settings**
   - Framework Preset: **Vite**
   - Root Directory: **client**

2. **Build Settings**
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

3. **Environment Variables** (Settings → Environment Variables)
   ```
   VITE_API_URL = https://your-backend.onrender.app
   ```

4. **Deploy**
   - Vercel will automatically redeploy on push to main/master

### Troubleshooting Vercel

**Problem: "vite build exited with code 127"**
- ✅ This is now fixed with the root `vercel.json` configuration
- Vercel now correctly identifies the `/client` directory
- If error persists: Clear build cache in Vercel dashboard (Settings → Advanced → Clear Cache)

**Problem: "404 on API calls"**
- Verify `VITE_API_URL` environment variable is set
- Make sure backend is deployed first
- Check backend URL is correct and accessible

**Problem: "Blank page or 500 errors"**
- Check browser console for errors
- Verify all dependencies are installed
- Check environment variables are correct

---

## Render Backend Deployment Configuration

### Automatic Configuration (Recommended)

Render will automatically detect the configuration from `render.json` in the root directory.

### Manual Configuration (If Auto-Config Fails)

If you need to manually configure in Render dashboard:

1. **Create New Web Service**
   - Connect GitHub repository
   - Repository: `Task2-AI-Based-Text-summarization-Platform-Labmentix`

2. **Service Settings**
   - Name: `ai-summarization-server`
   - Environment: **Node**
   - Region: Choose closest to your location
   - Branch: `main` (or your default branch)
   - Root Directory: **server**

3. **Build Settings**
   - Build Command: `npm install`
   - Start Command: `node index.js`

4. **Environment Variables** (Settings → Environment)
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   OPENAI_API_KEY=sk-your-openai-key
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=https://your-frontend.vercel.app
   LOG_LEVEL=info
   ```

5. **Deploy**
   - Render will automatically redeploy on push

### Getting Render Service URL

After deployment:
1. Go to your service on Render
2. Copy the URL from "Service URL" at the top
3. Format: `https://your-service-name.onrender.app`

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud) - Recommended for Production

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
5. Add IP whitelist: Allow `0.0.0.0/0` (for simplicity, or add specific IPs)

### Option 2: Local MongoDB

For development only:
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# MongoDB runs on localhost:27017
# Connection string: mongodb://localhost:27017/summarizeai

# Windows: Download from https://www.mongodb.com/try/download/community
```

---

## API Key Setup

### OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy and save securely
4. Use in environment variables: `OPENAI_API_KEY=sk-...`

**Note:** Keep API keys secret - never commit to repository!

---

## Complete Deployment Checklist

- [ ] Fork/clone repository to GitHub
- [ ] Create MongoDB Atlas account and get connection string
- [ ] Get OpenAI API key
- [ ] Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Deploy backend to Render:
  - [ ] Connect repository
  - [ ] Set root directory to `server`
  - [ ] Add environment variables
  - [ ] Deploy
  - [ ] Copy Render URL
- [ ] Deploy frontend to Vercel:
  - [ ] Import project
  - [ ] Set root directory to `client`
  - [ ] Add `VITE_API_URL` environment variable (Render URL)
  - [ ] Deploy
  - [ ] Copy Vercel URL
- [ ] Update Render backend:
  - [ ] Go back to Render service
  - [ ] Update `CLIENT_URL` with Vercel URL
  - [ ] Trigger redeploy
- [ ] Test endpoints:
  - [ ] Backend health: `curl https://your-backend.onrender.app/health`
  - [ ] Frontend loads: https://your-frontend.vercel.app
- [ ] Setup monitoring and logs

---

## Monitoring Deployments

### View Logs

**Render Logs:**
```
Dashboard → Your Service → Logs
```

**Vercel Logs:**
```
Dashboard → Your Project → Deployments → Click deployment → View Logs
```

### Health Monitoring

Add monitoring endpoint checks:

```bash
# Script to monitor backend
curl -X GET https://your-backend.onrender.app/health \
  -H "Accept: application/json"
```

---

## Rollback & Troubleshooting

### If Deployment Fails

**Vercel:**
1. Check "Deployments" tab
2. Click previous successful deployment
3. Click "Redeploy"

**Render:**
1. Check "Logs" for error details
2. Fix code/environment variables
3. Push new commit (auto-redeploys)
4. Or manually trigger from dashboard

### Clear Cache & Rebuild

**Vercel:**
- Settings → Advanced → Clear Cache → Re-deploy

**Render:**
- Manual Deploy → Clear Build Cache

---

## Performance Tips

1. **Frontend Optimization**
   - Vercel CDN automatically optimizes distribution
   - Static assets cached globally

2. **Backend Optimization**
   - Use MongoDB indexes
   - Enable compression in Express (already enabled)
   - Monitor API response times

3. **Database Optimization**
   - Keep MongoDB queries efficient
   - Use proper indexing
   - Monitor collection sizes

---

## Security Checklist

- [ ] `OPENAI_API_KEY` is secure and not exposed
- [ ] `JWT_SECRET` is strong and unique
- [ ] Environment variables are set in dashboard, not in code
- [ ] `.env` files are in `.gitignore`
- [ ] Database credentials are secure
- [ ] Backend CORS allows only your frontend
- [ ] Rate limiting is enabled
- [ ] Helmet security headers are enabled

---

## Next Steps

1. Deploy backend to Render first
2. Deploy frontend to Vercel
3. Test all features
4. Monitor logs for errors
5. Set up error tracking (optional: Sentry, DataDog)
6. Configure custom domain (optional)

For issues: Check logs, verify environment variables, and test endpoints manually.
