import { RequestHandler } from 'express'
import { prisma } from '../../db'
import { subscriptionPlanAdminSelect } from '../../services/subscription.service'
import { parsePlanId, createPlanPayload } from './helpers'

export const getSubscriptionPlans: RequestHandler = async (req, res) => {
  try {
    const includeInactive =
      req.user?.role === 'ADMIN' && req.query.includeInactive === 'true'

    const plans = await prisma.subscriptionPlan.findMany({
      where: includeInactive ? undefined : { isActive: true },
      select: subscriptionPlanAdminSelect,
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
    })

    return res.json(plans)
  } catch (error) {
    console.error('Get Subscription Plans Error:', error)
    return res.status(500).json({ message: 'Failed to fetch subscription plans' })
  }
}

export const createSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const planData = createPlanPayload(req.body)

    const plan = await prisma.subscriptionPlan.create({
      data: planData,
      select: subscriptionPlanAdminSelect,
    })

    return res.status(201).json({ message: 'Subscription plan created successfully', data: plan })
  } catch (error) {
    console.error('Create Subscription Plan Error:', error)

    if (
      error instanceof Error &&
      ['MISSING_PLAN_DETAILS', 'INVALID_AMOUNT', 'INVALID_DURATION'].includes(error.message)
    ) {
      return res.status(400).json({ message: 'Please provide valid plan details' })
    }

    return res.status(500).json({ message: 'Failed to create subscription plan' })
  }
}

export const updateSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const planId = parsePlanId(req.params.id)

    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
      select: { id: true },
    })

    if (!existingPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' })
    }

    const planData = createPlanPayload(req.body)

    const plan = await prisma.subscriptionPlan.update({
      where: { id: planId },
      data: planData,
      select: subscriptionPlanAdminSelect,
    })

    return res.json({ message: 'Subscription plan updated successfully', data: plan })
  } catch (error) {
    console.error('Update Subscription Plan Error:', error)

    if (
      error instanceof Error &&
      ['INVALID_PLAN_ID', 'MISSING_PLAN_DETAILS', 'INVALID_AMOUNT', 'INVALID_DURATION'].includes(error.message)
    ) {
      return res.status(400).json({ message: 'Please provide valid plan details' })
    }

    return res.status(500).json({ message: 'Failed to update subscription plan' })
  }
}

export const archiveSubscriptionPlan: RequestHandler = async (req, res) => {
  try {
    const planId = parsePlanId(req.params.id)

    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
      select: { id: true, isActive: true },
    })

    if (!existingPlan) {
      return res.status(404).json({ message: 'Subscription plan not found' })
    }

    const plan = await prisma.subscriptionPlan.update({
      where: { id: planId },
      data: { isActive: !existingPlan.isActive },
      select: subscriptionPlanAdminSelect,
    })

    return res.json({
      message: plan.isActive
        ? 'Subscription plan activated successfully'
        : 'Subscription plan archived successfully',
      data: plan,
    })
  } catch (error) {
    console.error('Archive Subscription Plan Error:', error)

    if (error instanceof Error && error.message === 'INVALID_PLAN_ID') {
      return res.status(400).json({ message: 'Invalid subscription plan id' })
    }

    return res.status(500).json({ message: 'Failed to update subscription plan status' })
  }
}