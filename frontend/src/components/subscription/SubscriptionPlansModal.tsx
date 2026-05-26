// frontend/src/components/subscription/SubscriptionPlansModal.tsx

import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import type {
  SubscriptionOrderResponse,
  SubscriptionPlan,
} from '../../types/subscription.types'
import {
  formatSubscriptionAmount,
  formatSubscriptionDate,
} from '../../utils/subscription'
import { loadRazorpayCheckoutScript } from '../../utils/razorpay'
import { getApiErrorMessage } from '../../utils/api'
import SubscriptionPlanCard from './SubscriptionPlanCard'

interface Props {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  onSuccess?: () => void
}

const SubscriptionPlansModal = ({
  isOpen,
  onClose,
  title = 'Upgrade to Pro',
  onSuccess,
}: Props) => {
  const { user, refreshUser } = useAuth()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activePlanId, setActivePlanId] = useState<number | null>(null)

  useEffect(() => {
    if (!isOpen) return
    let isMounted = true

    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        setError('')
        const { data } = await api.get<SubscriptionPlan[]>('/subscriptions/plans')
        if (isMounted) setPlans(data)
      } catch (requestError) {
        if (isMounted)
          setError(getApiErrorMessage(requestError, 'Unable to load subscription plans right now.'))
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void fetchPlans()
    return () => { isMounted = false }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubscribe = async (planId: number) => {
    try {
      setActivePlanId(planId)
      setError('')

      const scriptLoaded = await loadRazorpayCheckoutScript()
      if (!scriptLoaded || !window.Razorpay) {
        setError('Unable to load the payment gateway. Please try again.')
        return
      }

      const { data } = await api.post<SubscriptionOrderResponse>(
        '/subscriptions/checkout/order',
        { planId }
      )

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'StartupVisors Pro',
        description: `${data.plan.name} subscription`,
        order_id: data.orderId,
        prefill: { name: data.user.name, email: data.user.email },
        notes: { planId: String(data.plan.id), planName: data.plan.name },
        theme: { color: '#1d4ed8' },
        modal: { ondismiss: () => setActivePlanId(null) },
        handler: async (response) => {
          try {
            await api.post('/subscriptions/checkout/verify', {
              planId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            })
            await refreshUser()
            onSuccess?.()
            onClose()
          } catch (requestError) {
            setError(getApiErrorMessage(requestError, 'Payment succeeded, but subscription verification failed.'))
          } finally {
            setActivePlanId(null)
          }
        },
      })

      razorpay.on('payment.failed', () => {
        setError('Payment failed. Please try again with another method.')
        setActivePlanId(null)
      })

      razorpay.open()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to start the subscription checkout.'))
      setActivePlanId(null)
    }
  }

  const currentPlanId = user?.subscription?.plan.id ?? null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div
        className="flex flex-col w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden"
        style={{ maxHeight: '90vh' }}
      >
        {/* ── Header ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {/* Show active plan info inline in header instead of a banner */}
            {user?.subscription ? (
              <p className="text-xs text-slate-400 mt-0.5">
                Current:{' '}
                <span className="font-semibold text-emerald-600">{user.subscription.plan.name}</span>
                {' '}·{' '}
                <span>active until {formatSubscriptionDate(user.subscription.expiresAt)}</span>
                {' '}·{' '}
                <span className="font-semibold text-slate-500">
                  {formatSubscriptionAmount(user.subscription.plan.amount, user.subscription.plan.currency)}
                </span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-0.5">Choose a plan that works for you</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Plans */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-600" />
            </div>
          ) : plans.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 px-5 py-16 text-center text-sm text-slate-400">
              No plans available yet. Please check back soon.
            </div>
          ) : (
            <div
              className="flex gap-5 overflow-x-auto pt-5 pb-2 -mx-1 px-1"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex-shrink-0 w-72"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <SubscriptionPlanCard
                    plan={plan}
                    isCurrentPlan={currentPlanId === plan.id}
                    isProcessing={activePlanId === plan.id}
                    onSubscribe={handleSubscribe}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlansModal