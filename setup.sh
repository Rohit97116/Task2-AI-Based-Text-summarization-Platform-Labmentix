#!/bin/bash

# SummarizeAI Setup Script

echo "🚀 SummarizeAI Setup"
echo "===================="

# Check Node version
echo "Checking Node.js version..."
node_version=$(node -v)
echo "✓ Node.js $node_version detected"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd server

echo "Installing server dependencies..."
npm install

if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .env.example .env
  echo "⚠️  Please edit server/.env with your API keys:"
  echo "   - MONGODB_URI"
  echo "   - OPENAI_API_KEY"
  echo "   - JWT_SECRET"
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd client

echo "Installing client dependencies..."
npm install

if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  cp .env.example .env.local 2>/dev/null || true
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 To start development:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd client"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:5173 in your browser"
echo ""
echo "📝 Don't forget to configure your environment variables!"
