import React, { useState } from 'react'
import { jsPDF } from 'jspdf'

export default function OutputSection({ loading, summary, keywords, showToast }) {
  const [format, setFormat] = useState('paragraph')

  const copy = async () => {
    if (!summary) return
    try {
      await navigator.clipboard.writeText(summary)
      if (showToast) showToast('Copied to clipboard')
    } catch (e) {
      if (showToast) showToast('Copy failed')
    }
  }

  const downloadPDF = () => {
    if (!summary) return
    const doc = new jsPDF()
    doc.setFontSize(12)
    const lines = doc.splitTextToSize(summary, 180)
    doc.text(lines, 10, 10)
    doc.save('summary.pdf')
    if (showToast) showToast('Exported PDF')
  }

  return (
    <div className="mt-2">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Summary</h2>
          <p className="text-sm text-slate-500">Generated summary and extracted keywords</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="rounded-lg border border-slate-200 p-2">
            <option value="paragraph">Paragraph</option>
            <option value="bullets">Bullets</option>
          </select>
          <button onClick={copy} className="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Copy</button>
          <button onClick={downloadPDF} className="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Export PDF</button>
        </div>
      </div>

      <div className="p-4 rounded-lg shadow-sm bg-white border min-h-[160px] glass">
        {loading ? (
          <div className="h-40">
            <div className="h-4 rounded mb-3 skeleton" style={{ width: '50%' }} />
            <div className="h-3 rounded mb-2 skeleton" style={{ width: '80%' }} />
            <div className="h-3 rounded mb-2 skeleton" style={{ width: '70%' }} />
            <div className="h-3 rounded mb-2 skeleton" style={{ width: '90%' }} />
          </div>
        ) : summary ? (
          <div>
            <div className="mb-3">
              <div className="text-sm text-slate-500">Keywords</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {keywords ? keywords.split(',').slice(0,12).map((k, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">{k.trim()}</span>
                )) : <span className="text-xs text-slate-400">No keywords</span>}
              </div>
            </div>

            {format === 'paragraph' ? (
              <p className="whitespace-pre-wrap text-slate-700">{summary}</p>
            ) : (
              <ul className="list-disc pl-5 text-slate-700">
                {summary.split(/\n+/).map((s, i) => s.trim() ? <li key={i}>{s}</li> : null)}
              </ul>
            )}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-400">No summary yet. Enter text or upload a PDF to begin.</div>
        )}
      </div>
    </div>
  )
}
