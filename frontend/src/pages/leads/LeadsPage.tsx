import { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import LeadCard from '../../components/leads/LeadCard'
import LeadsHeader from '../../components/leads/LeadsHeader'
import LeadsFilter from '../../components/leads/LeadsFilter'
import type { LeadFilters } from '../../components/leads/LeadsFilter'
import AddLeadModal from '../../components/leads/AddLeadModal'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import SubscriptionPlansModal from '../../components/subscription/SubscriptionPlansModal'
import { getApiErrorMessage } from '../../utils/api'

interface Lead {
  id: number
  title: string
  shortDescription: string
  budget: string
  category?: string
  location?: string
  domain?: string
  projectType?: string
  contactName?: string
  email?: string
}

interface LeadDetailsRecord extends Lead {
  fullDescription: string
  duration: string
  experienceLevel: string
  numberOfOpenings: number
  deadline?: string
  skillsRequired: string[]
  toolsTechnologies: string[]
  eligibilityCriteria: string
  portfolioRequired: boolean
  perks: string[]
  contactEmail: string
  phoneNumber: string
  websiteUrl?: string
  preferredContactMethod: string
}

const DEFAULT_FILTERS: LeadFilters = {
  domain: 'All',
  location: 'All',
  budgetType: 'All',
  projectType: 'All',
}

const LeadsPage = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<LeadFilters>(DEFAULT_FILTERS)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState<LeadDetailsRecord | undefined>(
    undefined
  )
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const isPreviewMode = user?.role === 'USER' && !user?.canAccessLeads

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get('/leads')
      setLeads(res.data)
    } catch (error) {
      console.error('Failed to fetch leads', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.title.toLowerCase().includes(search.toLowerCase())
    const matchesDomain = filters.domain === 'All' || lead.domain === filters.domain
    const matchesLocation = filters.location === 'All' || lead.location === filters.location
    const matchesBudget = filters.budgetType === 'All' || lead.budget?.startsWith(filters.budgetType)
    const matchesProjectType = filters.projectType === 'All' || lead.projectType === filters.projectType

    return matchesSearch && matchesDomain && matchesLocation && matchesBudget && matchesProjectType
  })

  const handleEdit = async (lead: Lead) => {
    try {
      const res = await api.get(`/leads/${lead.id}`)
      setEditData(res.data)
      setIsModalOpen(true)
    } catch (error) {
      alert(
        getApiErrorMessage(error, 'Failed to fetch full lead details for editing.')
      )
    }
  }

  const handleAdd = () => {
    setEditData(undefined)
    setIsModalOpen(true)
  }

  return (
  <DashboardLayout>
    <div className="space-y-4">

      {/* Upgrade banner — always at very top */}
      {isPreviewMode && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              
              <p className="mt-1 text-sm text-amber-700">
                Upgrade to Pro to open the complete lead details page and contact information.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSubscriptionModal(true)}
className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}

      {/* Search + Filters in one row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <LeadsHeader search={search} setSearch={setSearch} onAddClick={handleAdd} />
        <LeadsFilter filters={filters} onChange={setFilters} />
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-gray-500">Loading leads...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onDelete={async (id) => {
                  try {
                    await api.delete(`/leads/${id}`)
                    fetchLeads()
                  } catch (error) {
                    alert(getApiErrorMessage(error, 'Failed to delete lead'))
                  }
                }}
                onEdit={handleEdit}
                onUpgradeRequired={() => setShowSubscriptionModal(true)}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full">No leads found</p>
          )}
        </div>
      )}

    </div>

    {isModalOpen && (
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchLeads}
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

export default LeadsPage
