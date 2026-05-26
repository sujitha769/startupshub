import type { SubscriptionPlan } from '../../../types/subscription.types'
import { formatSubscriptionAmount, formatSubscriptionDuration } from '../../../utils/subscription'

interface Props {
  plans: SubscriptionPlan[]
  isLoadingPlans: boolean
  onEdit: (plan: SubscriptionPlan) => void
  onToggle: (planId: number) => void
}

const PlanList = ({ plans, isLoadingPlans, onEdit, onToggle }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Existing plans</h3>
        <p className="mt-1 text-sm text-slate-500">
          Review pricing and update availability from one place.
        </p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {plans.length} plans
      </span>
    </div>

    <div className="mt-6 space-y-4">
      {isLoadingPlans ? (
        <p className="text-sm text-slate-500">Loading plans...</p>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-10 text-center text-sm text-slate-500">
          No subscription plans yet.
        </div>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    plan.isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {plan.isActive ? 'Active' : 'Archived'}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{plan.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>{formatSubscriptionAmount(plan.amount, plan.currency)}</span>
                  <span>{formatSubscriptionDuration(plan.durationInDays)}</span>
                </div>
                {plan.features.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.features.map((feature) => (
                      <span key={feature}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(plan)}
                  className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onToggle(plan.id)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {plan.isActive ? 'Archive' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)

export default PlanList