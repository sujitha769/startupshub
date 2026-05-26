export const RAZORPAY_API_BASE_URL =
  process.env.RAZORPAY_API_BASE_URL || 'https://api.razorpay.com/v1'

export interface RazorpayOrderResponse {
  id: string
  amount: number
  currency: string
  receipt: string
}

export const parsePlanId = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('INVALID_PLAN_ID')
  }
  return parsed
}

export const normalizeFeatures = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value.split('\n').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

export const normalizeAmountToPaise = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error('INVALID_AMOUNT')
  }
  return Math.round(parsed * 100)
}

export const normalizeDuration = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('INVALID_DURATION')
  }
  return parsed
}

export const getRazorpayCredentials = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_NOT_CONFIGURED')
  }
  return { keyId, keySecret }
}

export const createRazorpayAuthHeader = (keyId: string, keySecret: string) =>
  `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`

export const createPlanPayload = (body: Record<string, unknown>) => {
  const name = String(body.name || '').trim()
  const description = String(body.description || '').trim()
  if (!name || !description) {
    throw new Error('MISSING_PLAN_DETAILS')
  }
  return {
    name,
    description,
    amount: normalizeAmountToPaise(body.amount),
    currency: (String(body.currency || 'INR').trim() || 'INR').toUpperCase(),
    durationInDays: normalizeDuration(body.durationInDays),
    features: normalizeFeatures(body.features),
    isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
  }
}