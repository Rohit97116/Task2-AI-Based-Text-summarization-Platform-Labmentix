import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Trash2, Star } from 'lucide-react'
import { Card, Button, Input } from '../components/UI'
import { useAuth } from '../context/AuthContext'
import { useSummaries } from '../hooks/useData'

export default function MySummaries() {
  const { token } = useAuth()
  const { summaries, loading, fetchSummaries } = useSummaries(token)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchSummaries()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">My Summaries</h1>
          <p className="text-slate-400">Manage and organize your summaries</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search summaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2.5 text-white">
            <option>All</option>
            <option>Favorites</option>
            <option>Recent</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* Summaries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill()
              .map((_, i) => (
                <Card key={i} className="h-64 animate-pulse" />
              ))
          ) : summaries.length > 0 ? (
            summaries.map((summary, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:border-blue-600/30 transition-all cursor-pointer group">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{summary.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-3">{summary.summaries?.short || summary.originalText?.substring(0, 100)}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500">{new Date(summary.createdAt).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-800 rounded transition">
                        <Star size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-800 rounded transition">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-800/20 rounded transition text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 mb-4">No summaries yet</p>
              <Button>Create Your First Summary</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
