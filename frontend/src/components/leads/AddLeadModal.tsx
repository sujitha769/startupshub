import type { FormEvent } from 'react'
import { useAddLeadForm } from '../../hooks/useAddLeadForm'
import BasicInfoSection from './addLead/BasicInfoSection'
import WorkDetailsSection from './addLead/WorkDetailsSection'
import SkillsSection from './addLead/SkillsSection'
import PerksSection from './addLead/PerksSection'
import ContactSection from './addLead/ContactSection'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  initialData?: any
}

const AddLeadModal = ({ isOpen, onClose, onSuccess, initialData }: Props) => {
  const { form, loading, error, handleChange, handleSubmit } = useAddLeadForm(initialData, onClose, onSuccess)

  if (!isOpen) return null

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">

        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button type="button" onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          <BasicInfoSection form={form} onChange={handleChange} />
          <WorkDetailsSection form={form} onChange={handleChange} />
          <SkillsSection form={form} onChange={handleChange} />
          <PerksSection form={form} onChange={handleChange} />
          <ContactSection form={form} onChange={handleChange} />

          <div className="flex justify-end gap-3 pt-6 border-t mt-8">
            <button type="button" onClick={onClose} disabled={loading}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddLeadModal