import type { User } from '../types/auth.types'

export const formatSubscriptionAmount = (
  amount: number,
  currency = 'INR'
) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

export const formatSubscriptionDate = (value?: string | null) => {
  if (!value) {
    return 'Not available'
  }

  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatSubscriptionDuration = (durationInDays: number) => {
  if (durationInDays % 30 === 0) {
    const months = durationInDays / 30
    return months === 1 ? '1 month' : `${months} months`
  }

  return durationInDays === 1 ? '1 day' : `${durationInDays} days`
}

export const canAccessLeadDetails = (user: User | null) => {
  if (!user) {
    return false
  }

  return user.role === 'ADMIN' || user.role === 'STAFF' || user.canAccessLeads
}
