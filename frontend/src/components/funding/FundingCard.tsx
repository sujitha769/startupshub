import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

interface Funding {
  id: number
  title: string
  amount: string
  type: string
  description: string
  applyLink: string
}

interface Props {
  funding: Funding
  onEdit?: (funding: Funding) => void
  onDelete?: () => void
  locked?: boolean
  onUpgradeRequired?: () => void
}

const FundingCard = ({ funding, onEdit, onDelete, locked = false, onUpgradeRequired }: Props) => {
  const { user } = useAuth()
  const canManage = user?.role === 'ADMIN' || user?.role === 'STAFF'

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this funding opportunity?')) {
      try {
        await api.delete(`/admin/funding/${funding.id}`)
        if (onDelete) onDelete()
      } catch (err) {
        console.error('Failed to delete funding', err)
        alert('Failed to delete funding')
      }
    }
  }

  // Locked card for unsubscribed users
  if (locked) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col h-full relative overflow-hidden">
        {/* Blurred content behind */}
        <div className="blur-sm pointer-events-none select-none flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {funding.type}
            </span>
            <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2 py-1 rounded-md">
              {funding.amount}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
            {funding.title}
          </h3>
          <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
            {funding.description}
          </p>
          <div className="mt-auto w-full h-10 bg-blue-600 rounded-lg" />
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px] rounded-xl px-6 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-full p-3 mb-3">
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Subscribers Only</p>
          <p className="text-xs text-gray-500 mb-4">Upgrade to Pro to unlock all funding opportunities</p>
          <button
            onClick={onUpgradeRequired}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative group flex flex-col h-full">

      {/* Admin Actions */}
      {canManage && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={() => onEdit && onEdit(funding)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}

      {/* Top Row: Type and Amount */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {funding.type}
        </span>
        <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2 py-1 rounded-md">
          {funding.amount}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
        {funding.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
        {funding.description}
      </p>

      {/* Apply Button */}
      <a
        href={funding.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        <span>Apply Now</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}

export default FundingCard