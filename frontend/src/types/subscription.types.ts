export type SubscriptionStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'CANCELLED'

export interface SubscriptionPlan {
  id: number
  name: string
  description: string
  amount: number
  currency: string
  durationInDays: number
  features: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CurrentSubscription {
  id: number
  status: SubscriptionStatus
  startedAt: string | null
  expiresAt: string | null
  canAccessLeads: boolean
  plan: SubscriptionPlan
}

export interface SubscriptionOrderResponse {
  orderId: string
  amount: number
  currency: string
  keyId: string
  plan: SubscriptionPlan
  user: {
    name: string
    email: string
  }
}
