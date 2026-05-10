import { useEffect, useState } from 'react'
import axios from 'axios'

export function useSummaries(token) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSummaries = async (skip = 0, limit = 10) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`/api/summaries?skip=${skip}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSummaries(res.data.summaries)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch summaries')
    } finally {
      setLoading(false)
    }
  }

  return { summaries, loading, error, fetchSummaries }
}

export function useAnalytics(token) {
  const [analytics, setAnalytics] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/users/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnalytics(res.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  return { analytics, loading, fetchAnalytics }
}
