import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'
import Sidebar from './components/Sidebar'

import Landing from './pages/Landing'

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}
import CreateSummary from './pages/CreateSummary'
import MySummaries from './pages/MySummaries'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-64">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

function AppContent() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Landing />} />
      <Route path="/create" element={<ProtectedLayout><CreateSummary /></ProtectedLayout>} />
      <Route path="/summaries" element={<ProtectedLayout><MySummaries /></ProtectedLayout>} />
      <Route path="/analytics" element={<ProtectedLayout><Analytics /></ProtectedLayout>} />
      <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />
    </Routes>
  )
}

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome, {user?.name || 'User'}! 👋</h1>
          <p className="text-xl text-slate-400">Let's summarize something amazing today</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-2xl font-bold mb-2">Create Summary</h3>
            <p className="text-slate-400 mb-6">Upload documents and get instant summaries</p>
            <a href="/create" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
              Start Now →
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">View Summaries</h3>
            <p className="text-slate-400 mb-6">Access and manage all your summaries</p>
            <a href="/summaries" className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
              View All →
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-2">Analytics</h3>
            <p className="text-slate-400 mb-6">Track your usage and insights</p>
            <a href="/analytics" className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
              View Stats →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router {...routerConfig}>
          <AppContent />
          <Toaster position="bottom-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
