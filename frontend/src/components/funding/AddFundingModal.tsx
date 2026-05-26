import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import api from '../../api/axios'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  initialData?: any
}

const FUNDING_TYPES = [
  'Grant',
  'Equity',
  'Loan',
  'Competition',
  'Crowdfunding',
  'Revenue-Based Financing',
  'Convertible Note',
  'Angel Investment',
  'Accelerator / Incubator',
  'Bootstrapping',
  'Venture Debt',
  'SAFE (Simple Agreement for Future Equity)',
  'Initial Public Offering (IPO)',
  'Private Equity',
  'Venture Capital',
  'Microfinance',
  'Invoice Factoring',
  'Asset-Based Lending',
  'Strategic Partnership',
  'Government Subsidy',
  'Family & Friends',
]

const AddFundingModal = ({ isOpen, onClose, onSuccess, initialData }: Props) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || '',
    type: initialData?.type || FUNDING_TYPES[0],
    description: initialData?.description || '',
    applyLink: initialData?.applyLink || '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      if (initialData?.id) {
        await api.put(`/admin/funding/${initialData.id}`, form)
      } else {
        await api.post('/admin/funding', form)
      }
      if (onSuccess) onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save funding opportunity')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">

        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Funding Opportunity' : 'Add Funding Opportunity'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title / Event Name</label>
            <input required name="title" placeholder="e.g., Y Combinator S24, Govt Seed Grant" value={form.title} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input required name="amount" placeholder="e.g., $100,000, Up to $5M" value={form.amount} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Funding</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {FUNDING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
            <textarea required name="description" rows={4} placeholder="Details about eligibility, criteria, etc." value={form.description} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
            <input required type="url" name="applyLink" placeholder="https://..." value={form.applyLink} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t mt-8">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Opportunity'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddFundingModal
