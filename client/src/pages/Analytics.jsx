import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '../components/UI'
import { useAuth } from '../context/AuthContext'
import { useAnalytics } from '../hooks/useData'

export default function Analytics() {
  const { user, token } = useAuth()
  const { analytics, fetchAnalytics } = useAnalytics(token)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const mockData = [
    { name: 'Mon', summaries: 12, tokens: 1200 },
    { name: 'Tue', summaries: 19, tokens: 1921 },
    { name: 'Wed', summaries: 15, tokens: 1500 },
    { name: 'Thu', summaries: 25, tokens: 2500 },
    { name: 'Fri', summaries: 22, tokens: 2200 },
    { name: 'Sat', summaries: 18, tokens: 1800 },
    { name: 'Sun', summaries: 14, tokens: 1400 }
  ]

  const summaryModeData = [
    { name: 'Short', value: 35 },
    { name: 'Medium', value: 45 },
    { name: 'Long', value: 20 }
  ]

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899']

  const stats = [
    {
      label: 'Total Summaries',
      value: user?.summariesCreated || 0,
      icon: '📄'
    },
    {
      label: 'Tokens Used',
      value: user?.tokensUsed || 0,
      icon: '⚡'
    },
    {
      label: 'This Month',
      value: analytics?.length || 0,
      icon: '📅'
    },
    {
      label: 'Plan',
      value: user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1) || 'Free',
      icon: '🎯'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-slate-400">Track your usage and insights</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <Card>
            <h3 className="text-lg font-semibold mb-6">Activity Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="summaries" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card>
            <h3 className="text-lg font-semibold mb-6">Summary Modes Used</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summaryModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {summaryModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card>
          <h3 className="text-lg font-semibold mb-6">Token Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="tokens" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
