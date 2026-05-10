import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Zap, ChevronDown } from 'lucide-react'
import { Card, Button, Input, Textarea, Badge, Skeleton } from '../components/UI'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CreateSummary() {
  const { token } = useAuth()
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [summaryModes, setSummaryModes] = useState(['short', 'medium'])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const modes = [
    { id: 'short', label: 'Short Summary', icon: '⚡' },
    { id: 'medium', label: 'Medium Summary', icon: '📄' },
    { id: 'long', label: 'Detailed Summary', icon: '📚' },
    { id: 'bullet', label: 'Bullet Points', icon: '• •' },
    { id: 'academic', label: 'Academic', icon: '🎓' },
    { id: 'business', label: 'Business', icon: '💼' }
  ]

  const toggleMode = (mode) => {
    setSummaryModes(prev =>
      prev.includes(mode)
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    )
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setDragOver(false)
    }
  }

  const handleSummarize = async (e) => {
    e.preventDefault()

    if (!text.trim() && !file) {
      toast.error('Please enter text or upload a file')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      if (text) formData.append('text', text)
      if (file) formData.append('file', file)
      formData.append('summaryModes', JSON.stringify(summaryModes))

      const response = await axios.post('/api/summaries', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setResult(response.data.summary)
      toast.success('Summary created successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create summary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Create Summary</h1>
          <p className="text-slate-400">Paste text or upload a document to generate summaries</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSummarize} className="space-y-6">
              {/* Text Input */}
              <Card>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-3">Text Input</label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here..."
                    rows={8}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-400 mt-2">{text.length} characters</div>
                </div>
              </Card>

              {/* File Upload */}
              <Card
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`transition-all ${dragOver ? 'border-blue-500 bg-blue-500/10' : ''}`}
              >
                <div className="text-center py-12">
                  <Upload size={40} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-300 font-medium mb-2">Drag & drop your file here</p>
                  <p className="text-slate-500 text-sm mb-4">or click to browse</p>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-input"
                    accept=".pdf,.docx,.txt,.jpg,.png,.pptx"
                  />
                  <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                    <Button as="span" variant="outline" className="cursor-pointer">
                      <FileText size={20} /> Select File
                    </Button>
                  </label>
                </div>

                {file && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg flex justify-between items-center">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Card>

              {/* Summary Modes */}
              <Card>
                <label className="block text-sm font-semibold mb-4">Summary Types</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {modes.map(mode => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => toggleMode(mode.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        summaryModes.includes(mode.id)
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">{mode.icon}</div>
                      <div className="text-xs font-medium">{mode.label}</div>
                    </button>
                  ))}
                </div>
              </Card>

              <Button
                type="submit"
                disabled={loading || (!text.trim() && !file)}
                className="w-full py-3 gap-2"
              >
                <Zap size={20} />
                {loading ? 'Creating Summary...' : 'Create Summary'}
              </Button>
            </form>
          </div>

          {/* Result Section */}
          <div>
            <Card className="lg:sticky lg:top-8 max-h-[600px] overflow-auto">
              <h3 className="text-lg font-semibold mb-4">Summary Result</h3>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : result ? (
                <div>
                  <p className="text-slate-300">{result.summaries?.short || result.original || 'No summary available'}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Export
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">Your summary will appear here</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
