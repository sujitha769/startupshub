import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

interface Lead {
  id: number
  title: string
  budget: string
  location?: string
  domain?: string
  shortDescription: string
  contactName?: string
  email?: string
}

interface Props {
  lead: Lead
  onEdit?: (lead: Lead) => void
  onDelete?: (id: number) => void
  onUpgradeRequired?: () => void
}

const LeadCard = ({ lead, onEdit, onDelete, onUpgradeRequired }: Props) => {
  const { user } = useAuth()
  const isAdminOrStaff = user?.role === 'ADMIN' || user?.role === 'STAFF'
  const canViewFullDetails = isAdminOrStaff || Boolean(user?.canAccessLeads)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 relative group">
      
      {/* Admin Actions */}
      {isAdminOrStaff && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button 
            onClick={() => onEdit?.(lead)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this lead?')) {
                onDelete?.(lead.id)
              }
            }}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}

      <div>
        {/* Top Row: Domain and Budget */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {lead.domain || 'General'}
          </span>
          <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2 py-1 rounded-md">
            {lead.budget}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
          {lead.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-5 line-clamp-3 leading-relaxed">
          {lead.shortDescription}
        </p>

        {/* Location */}
        {lead.location && (
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {lead.location}
          </div>
        )}
      </div>

      {/* View More Button */}
      {canViewFullDetails ? (
        <Link
          to={`/dashboard/leads/${lead.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md flex items-center justify-center transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View More
        </Link>
      ) : (
        <button
          type="button"
          onClick={onUpgradeRequired}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md flex items-center justify-center transition-colors shadow-sm"
        >
          Upgrade to View Full Details
        </button>
      )}
    </div>
  )
}

export default LeadCard