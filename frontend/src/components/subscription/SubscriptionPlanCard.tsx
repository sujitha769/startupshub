// frontend/src/components/subscription/SubscriptionPlanCard.tsx

import type { SubscriptionPlan } from '../../types/subscription.types'
import {
  formatSubscriptionAmount,
  formatSubscriptionDuration,
} from '../../utils/subscription'

interface Props {
  plan: SubscriptionPlan
  isCurrentPlan: boolean
  isProcessing: boolean
  onSubscribe: (planId: number) => void
}

const SubscriptionPlanCard = ({ plan, isCurrentPlan, isProcessing, onSubscribe }: Props) => {
  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border p-5 transition-all duration-200
        ${isCurrentPlan
          ? 'border-blue-500 bg-gradient-to-b from-blue-600 to-blue-700 shadow-lg shadow-blue-200'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
        }`}
    >
      {/* Active badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg border-2 border-white">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Active
          </span>
        </div>
      )}

      {/* Name & description */}
      <div className="mt-3">
        <h3 className={`text-base font-black tracking-tight leading-tight ${isCurrentPlan ? 'text-white' : 'text-slate-900'}`}>
          {plan.name}
        </h3>
        <p className={`mt-1 text-xs leading-relaxed ${isCurrentPlan ? 'text-blue-100' : 'text-slate-400'}`}>
          {plan.description}
        </p>
      </div>

      {/* Divider */}
      <div className={`my-3 h-px ${isCurrentPlan ? 'bg-blue-500' : 'bg-slate-100'}`} />

      {/* Price */}
      <div>
        <p className={`text-2xl font-black leading-none ${isCurrentPlan ? 'text-white' : 'text-slate-900'}`}>
          {formatSubscriptionAmount(plan.amount, plan.currency)}
        </p>
        <p className={`mt-1 text-xs ${isCurrentPlan ? 'text-blue-200' : 'text-slate-400'}`}>
          {formatSubscriptionDuration(plan.durationInDays)}
        </p>
      </div>

      {/* Features */}
      <div className="mt-4 flex-1">
        <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${isCurrentPlan ? 'text-blue-200' : 'text-slate-400'}`}>
          Includes
        </p>
        <ul className="mt-2 space-y-1.5">
          {plan.features.length > 0 ? (
            plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full
                  ${isCurrentPlan ? 'bg-blue-500' : 'bg-blue-50'}`}>
                  <svg className={`h-2 w-2 ${isCurrentPlan ? 'text-white' : 'text-blue-600'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className={`text-xs leading-snug ${isCurrentPlan ? 'text-blue-50' : 'text-slate-600'}`}>
                  {feature}
                </span>
              </li>
            ))
          ) : (
            <li className="flex items-start gap-2">
              <span className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full
                ${isCurrentPlan ? 'bg-blue-500' : 'bg-blue-50'}`}>
                <svg className={`h-2 w-2 ${isCurrentPlan ? 'text-white' : 'text-blue-600'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className={`text-xs leading-snug ${isCurrentPlan ? 'text-blue-50' : 'text-slate-600'}`}>
                Full lead detail access for subscribed users.
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => onSubscribe(plan.id)}
        disabled={isProcessing}
        className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold tracking-wide transition-all duration-200
          disabled:cursor-not-allowed disabled:opacity-60
          ${isCurrentPlan
            ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-md shadow-blue-900/20'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}
      >
        {isProcessing
          ? 'Opening checkout…'
          : isCurrentPlan
            ? 'Extend current plan'
            : 'Subscribe now'}
      </button>
    </div>
  )
}

export default SubscriptionPlanCard