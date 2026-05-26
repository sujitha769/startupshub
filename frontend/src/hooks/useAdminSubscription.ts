import { useCallback, useEffect, useState } from 'react'
import api from '../api/axios'
import type { SubscriptionPlan } from '../types/subscription.types'
import { getApiErrorMessage } from '../utils/api'

interface PlanResponse {
  message: string
  data: SubscriptionPlan
}

export interface PlanFormState {
  name: string
  description: string
  amount: string
  durationInDays: string
  features: string
  isActive: boolean
}

export const DEFAULT_FORM: PlanFormState = {
  name: '',
  description: '',
  amount: '',
  durationInDays: '',
  features: '',
  isActive: true,
}

export const useAdminSubscription = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [form, setForm] = useState<PlanFormState>(DEFAULT_FORM)
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null)
  const [isLoadingPlans, setIsLoadingPlans] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadPlans = useCallback(async () => {
    try {
      setIsLoadingPlans(true)
      const { data } = await api.get<SubscriptionPlan[]>('/subscriptions/plans?includeInactive=true')
      setPlans(data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to load subscription plans right now.'))
    } finally {
      setIsLoadingPlans(false)
    }
  }, [])

  useEffect(() => { void loadPlans() }, [loadPlans])

  const resetForm = () => {
    setForm(DEFAULT_FORM)
    setEditingPlanId(null)
  }

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlanId(plan.id)
    setForm({
      name: plan.name,
      description: plan.description,
      amount: String(plan.amount / 100),
      durationInDays: String(plan.durationInDays),
      features: plan.features.join('\n'),
      isActive: plan.isActive,
    })
    setMessage('')
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsSaving(true)
      setError('')
      setMessage('')

      const payload = {
        ...form,
        amount: Number(form.amount),
        durationInDays: Number(form.durationInDays),
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      }

      if (editingPlanId) {
        await api.put<PlanResponse>(`/subscriptions/plans/${editingPlanId}`, payload)
        setMessage('Subscription plan updated successfully.')
      } else {
        await api.post<PlanResponse>('/subscriptions/plans', payload)
        setMessage('Subscription plan created successfully.')
      }

      resetForm()
      await loadPlans()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to save the subscription plan.'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleTogglePlan = async (planId: number) => {
    try {
      setError('')
      setMessage('')
      await api.patch(`/subscriptions/plans/${planId}/archive`)
      await loadPlans()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to update the plan status.'))
    }
  }

  return {
    plans,
    form, setForm,
    editingPlanId,
    isLoadingPlans,
    isSaving,
    message,
    error,
    resetForm,
    handleEdit,
    handleSubmit,
    handleTogglePlan,
  }
}