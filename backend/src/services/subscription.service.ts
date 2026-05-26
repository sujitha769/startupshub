import { Prisma, Role, UserSubscription } from '../generated/prisma'
import { prisma } from '../db'

const subscriptionPlanSummarySelect = {
  id: true,
  name: true,
  description: true,
  amount: true,
  currency: true,
  durationInDays: true,
  features: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SubscriptionPlanSelect

const activeSubscriptionSelect = {
  id: true,
  status: true,
  startedAt: true,
  expiresAt: true,
  plan: {
    select: subscriptionPlanSummarySelect,
  },
} satisfies Prisma.UserSubscriptionSelect

type ActiveSubscriptionRecord = Prisma.UserSubscriptionGetPayload<{
  select: typeof activeSubscriptionSelect
}>

const now = () => new Date()

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

export const syncExpiredSubscriptions = async (userId: number) => {
  await prisma.userSubscription.updateMany({
    where: {
      userId,
      status: 'ACTIVE',
      expiresAt: {
        lt: now(),
      },
    },
    data: {
      status: 'EXPIRED',
    },
  })
}

export const getActiveSubscriptionForUser = async (userId: number) => {
  await syncExpiredSubscriptions(userId)

  return prisma.userSubscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      expiresAt: {
        gte: now(),
      },
    },
    orderBy: {
      expiresAt: 'desc',
    },
    select: activeSubscriptionSelect,
  })
}

export const serializeCurrentSubscription = (
  subscription: ActiveSubscriptionRecord | null
) => {
  if (!subscription) {
    return null
  }

  return {
    ...subscription,
    canAccessLeads:
      subscription.expiresAt instanceof Date
        ? subscription.expiresAt >= now()
        : false,
  }
}

export const userHasLeadAccess = async (userId: number, role: Role) => {
  if (role === 'ADMIN' || role === 'STAFF') {
    return true
  }

  const subscription = await getActiveSubscriptionForUser(userId)
  return Boolean(subscription)
}

export const getAuthSafeUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      investorStatus: true,
      createdAt: true,
    },
  })

  if (!user) {
    return null
  }

  const activeSubscription = await getActiveSubscriptionForUser(userId)
  const subscription = serializeCurrentSubscription(activeSubscription)

  return {
    ...user,
    subscription,
    canAccessLeads:
      user.role === 'ADMIN' || user.role === 'STAFF'
        ? true
        : Boolean(subscription?.canAccessLeads),
  }
}

export const getRenewalBaseDate = (
  activeSubscription: Pick<UserSubscription, 'planId' | 'expiresAt'> | null,
  nextPlanId: number
) => {
  const currentDate = now()

  if (
    activeSubscription?.expiresAt &&
    activeSubscription.planId === nextPlanId &&
    activeSubscription.expiresAt > currentDate
  ) {
    return activeSubscription.expiresAt
  }

  return currentDate
}

export const subscriptionPlanAdminSelect = {
  ...subscriptionPlanSummarySelect,
} satisfies Prisma.SubscriptionPlanSelect
