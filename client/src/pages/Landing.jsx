import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, FileText, TrendingUp, Sparkles, Upload, Copy, Download, X } from 'lucide-react'
import { Button } from '../components/UI'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LandingPage() {
  const summarizeRef = useRef(null)
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const features = [
    { icon: Sparkles, title: 'AI-Powered Summarization', desc: 'Get concise summaries of any document instantly' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Process documents in seconds' },
    { icon: FileText, title: 'Multiple Formats', desc: 'Support for PDF, DOCX, TXT, and images' },
    { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Track your usage and insights' }
  ]

  const handleGetStarted = () => {
    if (summarizeRef.current) {
      summarizeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setText('')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setText('')
    }
  }

  const handleGenerateSummary = async () => {
    if (!text.trim() && !file) {
      toast.error('Please enter text or upload a file')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      if (text) formData.append('text', text)
      if (file) formData.append('file', file)
      formData.append('summaryModes', JSON.stringify(['short']))

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/summaries/public`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setResult(response.data.summary)
      toast.success('Summary generated successfully!')
    } catch (error) {
      console.error('Summarization error:', error)
      toast.error(error.response?.data?.error || 'Failed to generate summary')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyResult = () => {
    if (result) {
      const summaryText = result.summaries?.short || result.originalText || ''
      navigator.clipboard.writeText(summaryText)
      toast.success('Copied to clipboard!')
    }
  }

  const handleClearAll = () => {
    setText('')
    setFile(null)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <LandingNavbar onGetStarted={handleGetStarted} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-32 pb-20 px-4 max-w-6xl mx-auto"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center mb-20">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Summarize Any Document
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
          >
            Transform long documents into concise, actionable summaries using advanced AI technology.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center z-20 relative"
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started
            </button>
            <Button variant="outline" className="px-8">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose SummarizeAI?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur hover:border-blue-600/50 transition-all"
            >
              <feature.icon size={40} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summarization Section */}
      <section
        ref={summarizeRef}
        id="summarize"
        className="py-20 px-4 max-w-6xl mx-auto"
      >
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Summarize?</h2>
            <p className="text-slate-400">Get started with our powerful AI summarization tool</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Text Input */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold mb-3">Paste Your Text</label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  if (file) setFile(null)
                }}
                placeholder="Paste your text here to get an instant summary..."
                className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              />
              <p className="text-xs text-slate-500">{text.length} / 50,000 characters</p>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold mb-3">Upload File</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-blue-500'
                }`}
              >
                <Upload size={40} className="mx-auto mb-3 text-slate-400" />
                <p className="text-slate-400 font-medium mb-2">Drag & drop or click to upload</p>
                <p className="text-sm text-slate-500">PDF, DOCX, TXT, Images (up to 50MB)</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                  accept=".pdf,.docx,.txt,.jpg,.png,.webp,.pptx"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                  >
                    Select File
                  </button>
                </label>
              </div>
              {file && (
                <div className="p-3 bg-slate-800/50 rounded-lg flex justify-between items-center">
                  <span className="text-sm text-slate-300 truncate">{file.name}</span>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Result Display */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold mb-3">Summary Result</label>
              <div className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-lg p-4 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Generating...</p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      {result.summaries?.short || result.originalText || 'Summary generated'}
                    </p>
                    <div className="flex gap-2 pt-3 border-t border-slate-700">
                      <button
                        onClick={handleCopyResult}
                        className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                      >
                        <Copy size={14} /> Copy
                      </button>
                      <button
                        onClick={handleClearAll}
                        className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm h-full flex items-center justify-center">
                    Summary will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateSummary}
              disabled={loading || (!text.trim() && !file)}
              className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap size={20} className="inline-block mr-2" />
              {loading ? 'Generating...' : 'Generate Summary'}
            </motion.button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center pt-8 border-t border-slate-700">
            <div>
              <p className="text-2xl font-bold text-blue-400">1M+</p>
              <p className="text-sm text-slate-400">Summaries Created</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">99.9%</p>
              <p className="text-sm text-slate-400">Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-pink-400">50+</p>
              <p className="text-sm text-slate-400">Languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 text-center text-slate-400 mt-20">
        <p>&copy; 2024 SummarizeAI. All rights reserved.</p>
      </footer>
    </div>
  )
}

function LandingNavbar({ onGetStarted }) {
  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
          SummarizeAI
        </div>
        <div className="flex gap-4">
          <button
            onClick={onGetStarted}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
