import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'
import FundingCard from '../../components/funding/FundingCard'
import AddFundingModal from '../../components/funding/AddFundingModal'
import FundingFilter from '../../components/funding/FundingFilter'
import SubscriptionPlansModal from '../../components/subscription/SubscriptionPlansModal'
import { useAuth } from '../../context/AuthContext'

interface Funding {
  id: number
  title: string
  amount: string
  type: string
  description: string
  applyLink: string
}

const FREE_LIMIT = 3

const FundingPage = () => {
  const { user } = useAuth()
  const [funding, setFunding] = useState<Funding[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState<Funding | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('All')
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  const canManage = user?.role === 'ADMIN' || user?.role === 'STAFF'
  const isPreviewMode = user?.role === 'USER' && !user?.canAccessLeads

  const fetchFunding = async () => {
    try {
      setLoading(true)
      const res = await api.get('/funding')
      setFunding(res.data)
    } catch (err) {
      console.error('Error fetching funding:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFunding()
  }, [])

  const filteredFunding = funding.filter((item) => {
    const matchesType = activeType === 'All' || item.type === activeType
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleEdit = (data: Funding) => {
    setEditData(data)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditData(undefined)
    setIsModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Upgrade banner for unsubscribed users */}
        {isPreviewMode && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-amber-700">
                  You're viewing <strong>3 free funding opportunities</strong>. Upgrade to Pro to unlock all of them.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubscriptionModal(true)}
                className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 whitespace-nowrap"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FundingFilter
            search={search}
            activeType={activeType}
            onSearchChange={setSearch}
            onTypeChange={setActiveType}
          />
          {canManage && (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              + Add Funding
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredFunding.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunding.map((item, index) => (
              <FundingCard
                key={item.id}
                funding={item}
                onEdit={handleEdit}
                onDelete={fetchFunding}
                locked={isPreviewMode && index >= FREE_LIMIT}
                onUpgradeRequired={() => setShowSubscriptionModal(true)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-lg font-bold text-gray-800">No funding opportunities found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter.</p>
          </div>
        )}

      </div>

      {/* Modals */}
      {isModalOpen && (
        <AddFundingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchFunding}
          initialData={editData}
        />
      )}

      <SubscriptionPlansModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />

    </DashboardLayout>
  )
}

export default FundingPage