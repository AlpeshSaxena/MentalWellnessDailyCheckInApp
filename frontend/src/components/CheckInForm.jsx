/**
 * CheckInForm Component
 *
 * Handles the daily wellness check-in form submission, API communication,
 * and displays AI-generated wellness insights.
 */

import { useState } from 'react'

// ✅ IMPORTANT: Remove trailing slash to avoid "//api/checkin" bugs
const API_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : 'http://localhost:3000'

function CheckInForm() {
  const [formData, setFormData] = useState({
    mood: '',
    stress_level: '',
    sleep_quality: '',
    note: ''
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch(`${API_URL}/api/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mood: Number(formData.mood), // ✅ ensure number
          stress_level: formData.stress_level,
          sleep_quality: formData.sleep_quality,
          note: formData.note
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit check-in')
      }

      setResponse(data)

      // Reset form
      setFormData({
        mood: '',
        stress_level: '',
        sleep_quality: '',
        note: ''
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const moodEmojis = {
    1: '😔',
    2: '😕',
    3: '😐',
    4: '🙂',
    5: '😊'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today? <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className={`flex flex-col items-center cursor-pointer p-3 rounded-lg border-2 transition-all ${
                  formData.mood === value.toString()
                    ? 'border-wellness-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="mood"
                  value={value}
                  checked={formData.mood === value.toString()}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                <span className="text-3xl mb-1">{moodEmojis[value]}</span>
                <span className="text-xs text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <label
                key={level}
                className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all capitalize ${
                  formData.stress_level === level
                    ? 'border-wellness-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="stress_level"
                  value={level}
                  checked={formData.stress_level === level}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Sleep Quality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sleep Quality <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['poor', 'average', 'good'].map((quality) => (
              <label
                key={quality}
                className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all capitalize ${
                  formData.sleep_quality === quality
                    ? 'border-wellness-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="sleep_quality"
                  value={quality}
                  checked={formData.sleep_quality === quality}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                {quality}
              </label>
            ))}
          </div>
        </div>

        {/* Optional Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Note (Optional)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-primary focus:border-transparent"
            placeholder="Share anything else on your mind..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-wellness-primary hover:bg-indigo-600 active:scale-95'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Check-In'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Success Response */}
      {response && (
        <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✨ Your Wellness Insight
          </h3>
          <p className="text-green-700 mb-2 whitespace-pre-wrap">
            {response.ai_insight}
          </p>
          <p className="text-xs text-green-600 mt-3">
            Check-in recorded at:{' '}
            {new Date(response.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

export default CheckInForm
