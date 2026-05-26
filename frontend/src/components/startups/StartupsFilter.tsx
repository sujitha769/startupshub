import { useState, useRef, useEffect } from 'react'

const STAGES = [
  'All',
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

const AMOUNT_RANGES = [
  'All',
  'Under $100K',
  '$100K – $500K',
  '$500K – $1M',
  '$1M – $5M',
  '$5M – $10M',
  '$10M+',
]

export interface StartupFilters {
  search: string
  stage: string
  amountRange: string
}

interface Props {
  filters: StartupFilters
  onChange: (filters: StartupFilters) => void
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
        <div className="absolute left-0 z-50 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
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

const StartupsFilter = ({ filters, onChange }: Props) => {
  const handleChange = (key: keyof StartupFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const hasActiveFilters =
    filters.stage !== 'All' ||
    filters.amountRange !== 'All'

  const resetAll = () => {
    onChange({ search: '', stage: 'All', amountRange: 'All' })
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search startups..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Dropdowns */}
      <FilterDropdown label="Stage"        value={filters.stage}       options={STAGES}        onChange={v => handleChange('stage', v)} />
      <FilterDropdown label="Amount Range" value={filters.amountRange} options={AMOUNT_RANGES} onChange={v => handleChange('amountRange', v)} />

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

export default StartupsFilter