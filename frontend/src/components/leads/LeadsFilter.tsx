import { useState, useRef, useEffect } from 'react'

const DOMAINS = [
  'All', 'Web Development', 'Mobile Development', 'AI/ML', 'Data Science',
  'Cybersecurity', 'Cloud & DevOps', 'Blockchain', 'UI/UX Design',
  'Graphic Design', 'Marketing', 'Content Writing', 'SEO & Growth',
  'Finance & Accounting', 'Sales & Business Development', 'HR & Recruitment', 'Other'
]

const LOCATIONS = ['All', 'Remote', 'Onsite', 'Hybrid']
const BUDGET_TYPES = ['All', 'Fixed', 'Hourly', 'Range']
const PROJECT_TYPES = ['All', 'Freelance', 'Part-time', 'Full-time', 'Internship']

export interface LeadFilters {
  domain: string
  location: string
  budgetType: string
  projectType: string
}

interface Props {
  filters: LeadFilters
  onChange: (filters: LeadFilters) => void
}

interface DropdownProps {
  label: string
  value: string
  options: string[]
  onChange: (val: string) => void
}

const FilterDropdown = ({ label, value, options, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = value !== 'All'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border shadow-sm transition-colors whitespace-nowrap ${
          isActive
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }`}
      >
        {isActive ? value : label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 max-h-64 overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  value === opt
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt === 'All' ? `All ${label}s` : opt}
                {value === opt && (
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          {isActive && (
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={() => { onChange('All'); setOpen(false) }}
                className="w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 text-left"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const LeadsFilter = ({ filters, onChange }: Props) => {
  const handleChange = (key: keyof LeadFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const hasActiveFilters =
    filters.domain !== 'All' ||
    filters.location !== 'All' ||
    filters.budgetType !== 'All' ||
    filters.projectType !== 'All'

  const resetAll = () => {
    onChange({ domain: 'All', location: 'All', budgetType: 'All', projectType: 'All' })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown label="Domain"       value={filters.domain}      options={DOMAINS}        onChange={v => handleChange('domain', v)} />
      <FilterDropdown label="Location"     value={filters.location}    options={LOCATIONS}      onChange={v => handleChange('location', v)} />
      <FilterDropdown label="Budget"       value={filters.budgetType}  options={BUDGET_TYPES}   onChange={v => handleChange('budgetType', v)} />
      <FilterDropdown label="Project Type" value={filters.projectType} options={PROJECT_TYPES}  onChange={v => handleChange('projectType', v)} />

      {hasActiveFilters && (
        <button
          onClick={resetAll}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Reset all
        </button>
      )}
    </div>
  )
}

export default LeadsFilter