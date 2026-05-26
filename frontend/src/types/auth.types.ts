import type { CurrentSubscription } from './subscription.types'

export type Role = 'ADMIN' | 'STAFF' | 'USER'

export interface User {
  id: number
  name: string
  email: string
  role: Role
  investorStatus?: string
  subscription: CurrentSubscription | null
  canAccessLeads: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}
