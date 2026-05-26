import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import api from '../../api/axios'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  initialData?: any
}

const STAGES = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D+',
  'Bridge Round',
  'Angel Round',
  'Bootstrapped',
  'IPO Ready',
  'Other'
]

const AddStartupModal = ({ isOpen, onClose, onSuccess, initialData }: Props) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || '',
    stage: initialData?.stage || STAGES[0],
    details: initialData?.details || '',
    contactLink: initialData?.contactLink || '',
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
        await api.put(`/admin/startups/${initialData.id}`, form)
      } else {
        await api.post('/admin/startups', form)
      }
      if (onSuccess) onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save startup')
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
            {initialData ? 'Edit Startup' : 'Add Startup Raising Funds'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name / Title</label>
            <input required name="title" value={form.title} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Raising</label>
              <input required name="amount" placeholder="e.g., $500,000" value={form.amount} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select name="stage" value={form.stage} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500">
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Details</label>
            <textarea required name="details" rows={4} placeholder="What do they do? Traction? Market?" value={form.details} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Founder Link</label>
            <input required type="url" name="contactLink" placeholder="Calendly, Email mailto:, LinkedIn, etc." value={form.contactLink} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500" />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-8">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Startup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStartupModal
