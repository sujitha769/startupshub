import { useState, useRef, useEffect } from 'react'

interface Props {
  search: string
  activeType: string
  onSearchChange: (val: string) => void
  onTypeChange: (val: string) => void
}

const FUNDING_TYPES = [
  'All', 'Grant', 'Equity', 'Loan', 'Competition', 'Crowdfunding',
  'Revenue-Based Financing', 'Convertible Note', 'Angel Investment',
  'Accelerator / Incubator', 'Bootstrapping', 'Venture Debt', 'SAFE',
  'IPO', 'Private Equity', 'Venture Capital', 'Microfinance',
  'Invoice Factoring', 'Asset-Based Lending', 'Strategic Partnership',
  'Government Subsidy', 'Family & Friends', 'Other',
]

const FundingFilter = ({ search, activeType, onSearchChange, onTypeChange }: Props) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search funding..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Type Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border shadow-sm transition-colors ${
            activeType !== 'All'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {/* Sliders icon */}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h6" />
            <circle cx="17" cy="12" r="2" fill="currentColor" stroke="none" />
            <circle cx="14" cy="6" r="2" fill="currentColor" stroke="none" />
            <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
          </svg>
          {activeType === 'All' ? 'Filter by Type' : activeType}
          {/* Chevron */}
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="p-2 max-h-72 overflow-y-auto">
              {FUNDING_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => { onTypeChange(type); setOpen(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    activeType === type
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {type}
                  {activeType === type && (
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {activeType !== 'All' && (
              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={() => { onTypeChange('All'); setOpen(false) }}
                  className="w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 text-left"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default FundingFilter