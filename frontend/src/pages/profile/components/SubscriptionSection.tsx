import type { CurrentSubscription } from '../../../types/subscription.types'
import { formatSubscriptionAmount, formatSubscriptionDate } from '../../../utils/subscription'

interface Plan {
  name: string
  amount: number
  currency: string
}

interface Subscription {
  plan: Plan
  expiresAt: string
}

interface SubscriptionSectionProps {
 subscription?: CurrentSubscription
  onManage: () => void
}

const SubscriptionSection = ({ subscription, onManage }: SubscriptionSectionProps) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <h2 className="text-sm font-semibold text-gray-900">Subscription</h2>
      </div>
      <button
        type="button"
        onClick={onManage}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
        Manage Plan
      </button>
    </div>

    <div className="p-6">
      {subscription ? (
        <div className="space-y-5">
          <div className="rounded-xl p-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}>
            <div>
              <p className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-1">Current Plan</p>
              <p className="text-lg font-bold text-blue-900">{subscription.plan.name}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Price</p>
              <p className="text-base font-semibold text-gray-900">
                {formatSubscriptionAmount(subscription.plan.amount, subscription.plan.currency)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Expires On</p>
              <p className="text-base font-semibold text-gray-900">
                {formatSubscriptionDate(subscription.expiresAt)}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-1">Lead Access</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-base font-semibold text-emerald-700">Active</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-900">No active subscription</p>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Browse lead cards freely, but unlock full details and premium access with a plan.
          </p>
        </div>
      )}
    </div>
  </div>
)

export default SubscriptionSection