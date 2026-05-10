import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Sun, Moon, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SummarizeAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
