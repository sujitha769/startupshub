// frontend/src/components/startups/InvestorApplyModal.tsx

import { useState } from 'react'
import api from '../../api/axios'

interface InvestorApplyModalProps {
  onClose: () => void
  onSuccess: () => void
}

const InvestorApplyModal = ({ onClose, onSuccess }: InvestorApplyModalProps) => {
  const [form, setForm] = useState({
    linkedin: '',
    investmentExperience: '',
    pastInvestments: '',
    ticketSize: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.linkedin.trim() || !form.investmentExperience.trim()) {
      setError('LinkedIn URL and investment experience are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/investor/apply', form)
      onSuccess()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Apply for Investor Access</h2>
            <p className="text-sm text-gray-500 mt-0.5">Fill in your details and we'll review your application.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Investment Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              name="investmentExperience"
              value={form.investmentExperience}
              onChange={handleChange}
              placeholder="Describe your investment experience..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Past Investments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Past Investments
            </label>
            <textarea
              name="pastInvestments"
              value={form.pastInvestments}
              onChange={handleChange}
              placeholder="List any startups or companies you've invested in..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Ticket Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Typical Ticket Size
            </label>
            <input
              type="text"
              name="ticketSize"
              value={form.ticketSize}
              onChange={handleChange}
              placeholder="e.g. $10K – $50K"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default InvestorApplyModal