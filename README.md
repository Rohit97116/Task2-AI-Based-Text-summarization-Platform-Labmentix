# AI Text Summarization Platform

A web application that uses AI to summarize documents and text. Built with React, Express, and MongoDB.

## Features

- Summarize text and documents (PDF, DOCX, TXT, images)
- Multiple summary formats (short, medium, long, bullets, academic, business)
- Extract keywords and key insights
- Track usage and analytics
- User authentication
- Dark/light theme

## Tech Stack

**Frontend**
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router

**Backend**
- Node.js + Express
- MongoDB
- JWT authentication
- Multer for file uploads

## Quick Start

### Backend

```bash
cd server
npm install
npm start
```

Server runs on http://localhost:5000

### Frontend

```bash
cd client
npm install
npm run dev
```

App runs on http://localhost:5173

### Environment Variables

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/summarizeai
OPENAI_API_KEY=your_key_here
JWT_SECRET=your_secret
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
client/
  src/
    components/
    pages/
    context/
    hooks/

server/
  controllers/
  models/
  routes/
  middleware/
  services/
  utils/
```

## Deployment

See [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md) for deployment options.

Quick options:
- **Railway** (backend) + **Vercel** (frontend)
- **Docker Compose** (local)
- **Heroku** (either)

## API Endpoints

- `POST /api/summaries` - Create summary
- `GET /api/summaries` - Get summaries
- `POST /api/summaries/public` - Public demo endpoint

## License

MIT
