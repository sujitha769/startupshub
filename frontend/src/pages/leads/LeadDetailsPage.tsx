import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import SubscriptionPlansModal from '../../components/subscription/SubscriptionPlansModal'
import { useLeadDetails } from '../../hooks/useLeadDetails'
import BasicInfoCard from './leadDetails/BasicInfoCard'
import SkillsCard from './leadDetails/SkillsCard'
import JobOverviewCard from './leadDetails/JobOverviewCard'
import PerksCard from './leadDetails/PerksCard'
import ContactCard from './leadDetails/ContactCard'

const LeadDetailsPage = () => {
  const { lead, loading, isLocked, showSubscriptionModal, setShowSubscriptionModal, fetchLead } = useLeadDetails()

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">

        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/dashboard/leads" className="text-gray-500 hover:text-blue-600 font-medium flex items-center transition-colors">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Leads
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>

        ) : isLocked ? (
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.657 1.343-3 3-3m-6 0a3 3 0 013 3m-6 0h12m-8 4h4m-6 0a2 2 0 01-2-2v-3a4 4 0 118 0v3a2 2 0 01-2 2H8z" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Upgrade to Pro to see full lead details</h2>
            <p className="mt-3 text-slate-500">
              This lead is available in preview mode. Subscribe to open the full detail page, contact information, and premium access.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubscriptionModal(true)}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Upgrade now
              </button>
              <Link
                to="/dashboard/leads"
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Back to lead cards
              </Link>
            </div>
          </div>

        ) : !lead ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Lead not found</h2>
            <p className="text-gray-500 mt-2">The lead you are looking for does not exist or was removed.</p>
          </div>

        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main Content (Left 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <BasicInfoCard lead={lead} />
              <SkillsCard lead={lead} />
            </div>

            {/* Sidebar (Right 1/3) */}
            <div className="space-y-6">
              <JobOverviewCard lead={lead} />
              <PerksCard perks={lead.perks} />
              <ContactCard lead={lead} />
            </div>

          </div>
        )}
      </div>

      <SubscriptionPlansModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSuccess={() => { void fetchLead() }}
        title="Upgrade to Pro to see this lead"
        description="Subscribe to unlock the complete lead details page, full project scope, and contact information."
      />
    </DashboardLayout>
  )
}

export default LeadDetailsPage