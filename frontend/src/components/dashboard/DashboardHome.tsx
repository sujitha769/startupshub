import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import SubscriptionPlansModal from '../subscription/SubscriptionPlansModal'
import {
  formatSubscriptionAmount,
  formatSubscriptionDate,
} from '../../utils/subscription'

interface DashboardStats {
  leads: number
  funding: number
  startups: number
}

interface DashboardCard {
  title: string
  path: string
  countText: string
}

const DashboardHome = () => {
  const { user } = useAuth()
  const name = user?.name ?? 'User'
  const isUser = user?.role === 'USER'
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  const [stats, setStats] = useState<DashboardStats>({
    leads: 0,
    funding: 0,
    startups: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchStats = async () => {
      try {
        const { data } = await api.get<DashboardStats>('/dashboard/stats')
        if (!isMounted) return
        setStats(data)
      } catch {
        // silently fail
      } finally {
        if (isMounted) setIsLoadingStats(false)
      }
    }

    const refreshStats = () => {
      if (document.visibilityState === 'hidden') return
      void fetchStats()
    }

    void fetchStats()
    window.addEventListener('focus', refreshStats)
    document.addEventListener('visibilitychange', refreshStats)

    return () => {
      isMounted = false
      window.removeEventListener('focus', refreshStats)
      document.removeEventListener('visibilitychange', refreshStats)
    }
  }, [])

  const cardItems: DashboardCard[] = [
    {
      title: 'Leads',
      path: '/dashboard/leads',
      countText: stats.leads > 0 ? `${stats.leads}+ leads` : '0 leads',
    },
    {
      title: 'Funding Opportunities',
      path: '/dashboard/funding',
      countText: stats.funding > 0 ? `${stats.funding}+ funding opportunities` : '0 funding opportunities',
    },
    {
      title: 'Startups Raising Funds',
      path: '/dashboard/startups',
      countText: stats.startups > 0 ? `${stats.startups}+ startups` : '0 startups',
    },
  ]

  return (
    <section>
      

      {isUser && (
        <div className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-amber-50 p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                Subscription Access
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {user?.subscription
                  ? `${user.subscription.plan.name} is active`
                  : 'Unlock full lead details with Pro'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {user?.subscription
                  ? `Your current plan renews your lead access until ${formatSubscriptionDate(
                      user.subscription.expiresAt
                    )}. You can extend or switch plans any time.`
                  : 'You can browse lead cards right now, but full lead pages and premium lead access unlock after subscribing.'}
              </p>
              {user?.subscription && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                    {formatSubscriptionAmount(
                      user.subscription.plan.amount,
                      user.subscription.plan.currency
                    )}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                    Expires {formatSubscriptionDate(user.subscription.expiresAt)}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSubscriptionModal(true)}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {user?.subscription ? 'Manage subscription' : 'Subscribe now'}
            </button>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {cardItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition group block"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {item.title}
              </p>
            </div>
            <p className="mt-2 text-xl font-bold text-blue-600">
              {isLoadingStats ? '...' : item.countText}
            </p>
          </Link>
        ))}
      </div>

      <SubscriptionPlansModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </section>
  )
}

export default DashboardHome