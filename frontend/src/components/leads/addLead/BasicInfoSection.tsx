import type { ChangeEvent } from 'react'
import { DOMAINS, LOCATIONS, BUDGET_TYPES } from './constants'

interface Props {
  form: any
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const inputCls = 'w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500'

const BasicInfoSection = ({ form, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-blue-800 flex items-center">
      <span className="mr-2">🟦</span> 1. Basic Info (Required)
    </h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input required name="title" placeholder="e.g., Build SaaS Landing Page"
        value={form.title} onChange={onChange} className={inputCls} />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (1-2 lines)</label>
      <input required name="shortDescription" placeholder="Brief overview of the project"
        value={form.shortDescription} onChange={onChange} className={inputCls} />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
      <textarea required name="fullDescription" rows={4} placeholder="Detailed requirement..."
        value={form.fullDescription} onChange={onChange} className={inputCls} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Domain / Category</label>
        <select name="domain" value={form.domain} onChange={onChange} className={inputCls}>
          {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <select name="location" value={form.location} onChange={onChange} className={inputCls}>
          {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Type</label>
        <select name="budgetType" value={form.budgetType} onChange={onChange} className={inputCls}>
          {BUDGET_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget / Stipend Amount</label>
        <input required name="budget" placeholder="e.g., $1000 - $5000"
          value={form.budget} onChange={onChange} className={inputCls} />
      </div>
    </div>
  </div>
)

export default BasicInfoSection