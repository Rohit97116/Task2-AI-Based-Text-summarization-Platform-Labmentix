import React, { useState, useRef } from 'react'

export default function InputSection({ onSummarize, loading, onClear }) {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [length, setLength] = useState('medium')
  const [format, setFormat] = useState('paragraph')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const submit = (e) => {
    if (e) e.preventDefault()
    if (!text.trim() && !file) return
    onSummarize({ text: text.trim(), file, length, format })
  }

  const clearAll = () => {
    setText('')
    setFile(null)
    setLength('medium')
    setFormat('paragraph')
    if (fileRef.current) fileRef.current.value = null
    if (onClear) onClear()
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f && f.type === 'application/pdf') setFile(f)
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium text-slate-700">Text input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-lg border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition p-3 resize-none"
          placeholder="Paste or type text here"
        />
        <div className="text-xs text-slate-400 mt-1">{text.length} characters</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Upload PDF</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mt-2 flex items-center justify-center px-4 py-6 border-2 ${dragOver ? 'border-sky-400 bg-sky-50' : 'border-dashed border-slate-200 bg-white'} rounded-lg cursor-pointer transition glass`}
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          <div className="text-center text-slate-500">
            <div className="text-sm">Drag & drop a PDF here, or click to browse</div>
            <div className="text-xs mt-1">Only PDF files are accepted</div>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
        {file && (
          <div className="mt-2 flex items-center justify-between bg-slate-50 p-3 rounded">
            <div className="text-sm text-slate-700">{file.name}</div>
            <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = null }} className="text-sm text-red-500">Remove</button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-3 w-full">
          <div className="w-1/2">
            <label className="block text-sm text-slate-600">Summary length</label>
            <select value={length} onChange={(e) => setLength(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 p-2">
              <option value="short">Short (3-4 lines)</option>
              <option value="medium">Medium (6-8 lines)</option>
              <option value="long">Long (detailed)</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-slate-600">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 p-2">
              <option value="paragraph">Paragraph</option>
              <option value="bullets">Bullets</option>
            </select>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={clearAll} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition">Clear</button>
          <button disabled={loading || (!text.trim() && !file)} type="submit" className={`px-4 py-2 rounded-lg text-white transition ${loading || (!text.trim() && !file) ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.02]'}`}>
            {loading ? (
              <div className="flex items-center gap-2"><span className="spinner" />Summarizing...</div>
            ) : 'Summarize'}
          </button>
        </div>
      </div>
    </form>
  )
}
