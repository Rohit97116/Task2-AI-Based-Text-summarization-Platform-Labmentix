import React from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react'
import { Card, Button, Input } from '../components/UI'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Settings */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <SettingsIcon size={28} className="text-blue-400" />
              Profile Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input defaultValue={user?.name || ''} placeholder="Your name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue={user?.email || ''} disabled />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Plan</label>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="font-semibold capitalize">{user?.plan || 'Free'}</p>
                <p className="text-slate-400 text-sm">
                  {user?.tokensUsed || 0} / {user?.tokenLimit || 10000} tokens used
                </p>
              </div>
            </div>

            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Theme Settings */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Palette size={28} className="text-purple-400" />
              Theme
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-slate-400 text-sm">Currently using {theme} theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Shield size={28} className="text-green-400" />
              Privacy & Security
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-slate-400 text-sm">Disabled</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="font-medium">API Keys</p>
                <p className="text-slate-400 text-sm">Manage your API keys</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Bell size={28} className="text-yellow-400" />
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {[
              'Email notifications for summaries',
              'Weekly activity digest',
              'Plan upgrade reminders'
            ].map((notif, i) => (
              <label key={i} className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>{notif}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
