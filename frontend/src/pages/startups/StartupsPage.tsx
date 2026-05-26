// frontend/src/pages/startups/StartupsPage.tsx

import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import AddStartupModal from '../../components/startups/AddStartupModal'
import StartupCard from '../../components/startups/StartupCard'
import StartupsFilter from '../../components/startups/StartupsFilter'
import InvestorApplyModal from '../../components/startups/InvestorApplyModal'
import type { Startup, StartupFilters } from '../../components/startups/types'

// -------------------------
// Main Page
// -------------------------
const StartupsPage = () => {
  const { user } = useAuth()

  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState<Startup | undefined>(undefined)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [filters, setFilters] = useState<StartupFilters>({
    search: '',
    stage: 'All',
    amountRange: 'All',
  })

  const status = user?.investorStatus || 'NONE'
  const canManage = user?.role === 'ADMIN' || user?.role === 'STAFF'
  const isApproved = status === 'APPROVED' || canManage

  const fetchStartups = async () => {
    if (!isApproved) { setLoading(false); return }
    try {
      setLoading(true)
      const res = await api.get('/startups')
      setStartups(res.data)
    } catch (err) {
      console.error('Error fetching startups:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStartups()
  }, [isApproved])

  const handleEdit = (data: Startup) => {
    setEditData(data)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditData(undefined)
    setIsModalOpen(true)
  }

  const handleApplySuccess = () => {
    setShowApplyModal(false)
    // Reload so AuthContext re-fetches user and investorStatus becomes PENDING
    window.location.reload()
  }

  // -------------------------
  // Filter Logic
  // -------------------------
  const filteredStartups = startups.filter(s => {
    const matchesSearch =
      s.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      s.details.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStage = filters.stage === 'All' || s.stage === filters.stage

    const matchesAmount = (() => {
      if (filters.amountRange === 'All') return true
      const raw = parseFloat(s.amount.replace(/[^0-9.]/g, ''))
      const isK = s.amount.toLowerCase().includes('k')
      const isM = s.amount.toLowerCase().includes('m')
      const normalized = isM ? raw * 1_000_000 : isK ? raw * 1_000 : raw
      if (filters.amountRange === 'Under $100K')    return normalized < 100_000
      if (filters.amountRange === '$100K – $500K')  return normalized >= 100_000 && normalized < 500_000
      if (filters.amountRange === '$500K – $1M')    return normalized >= 500_000 && normalized < 1_000_000
      if (filters.amountRange === '$1M – $5M')      return normalized >= 1_000_000 && normalized < 5_000_000
      if (filters.amountRange === '$5M – $10M')     return normalized >= 5_000_000 && normalized < 10_000_000
      if (filters.amountRange === '$10M+')          return normalized >= 10_000_000
      return true
    })()

    return matchesSearch && matchesStage && matchesAmount
  })

  // -------------------------
  // Restricted Access UI
  // -------------------------
  if (!isApproved) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restricted Access</h1>

          {status === 'PENDING' && (
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mt-6">
              <p className="font-medium">Your application is currently under review.</p>
              <p className="text-sm mt-1">We will notify you once approved.</p>
            </div>
          )}

          {status === 'REJECTED' && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mt-6">
              <p className="font-medium">Your application was not approved.</p>
            </div>
          )}

          {status === 'NONE' && (
            <div className="mt-4">
              <p className="text-gray-500 mb-6">
                You must be a verified investor to view startups. Submit an application and our team will review it.
              </p>
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Request Investor Verification
              </button>
            </div>
          )}
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
          <InvestorApplyModal
            onClose={() => setShowApplyModal(false)}
            onSuccess={handleApplySuccess}
          />
        )}
      </DashboardLayout>
    )
  }

  // -------------------------
  // Main UI (Approved)
  // -------------------------
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Filter Bar + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <StartupsFilter filters={filters} onChange={setFilters} />
          {canManage && (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              + Add Startup
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredStartups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(item => (
              <StartupCard
                key={item.id}
                startup={item}
                onEdit={handleEdit}
                onDelete={fetchStartups}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-bold text-gray-800">
              {filters.search || filters.stage !== 'All' || filters.amountRange !== 'All'
                ? 'No startups match your filters'
                : 'No startups currently raising'}
            </h3>
            <p className="text-gray-500 mt-1">
              {filters.search || filters.stage !== 'All' || filters.amountRange !== 'All'
                ? 'Try adjusting or resetting your filters.'
                : 'Check back later for new opportunities.'}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddStartupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchStartups}
          initialData={editData}
        />
      )}
    </DashboardLayout>
  )
}

export default StartupsPage