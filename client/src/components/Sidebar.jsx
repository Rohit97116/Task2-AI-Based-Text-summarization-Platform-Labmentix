import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  BarChart3, 
  Settings, 
  Home, 
  Cloud,
  HelpCircle,
  X
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ dark, onToggle }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setOpen(v => !v)
    window.addEventListener('sidebar-toggle', handler)
    return () => window.removeEventListener('sidebar-toggle', handler)
  }, [])

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: FileText, label: 'Create Summary', href: '/create' },
    { icon: Cloud, label: 'My Summaries', href: '/summaries' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' }
  ]

  return (
    <>
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : -256 }}
        className={`fixed top-0 left-0 h-full w-64 z-40 md:translate-x-0 md:animate-none`}
      >
        <div className="h-full p-6 bg-slate-950 border-r border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SummarizeAI
            </h1>
            <button
              className="md:hidden p-1 rounded hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2 mb-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                        : 'text-slate-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition text-slate-300 font-medium"
            >
              {dark ? '☀️' : '🌙'} {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </motion.div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  )
}
