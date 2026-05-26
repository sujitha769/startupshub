import { RequestHandler } from 'express'
import { createHmac, timingSafeEqual } from 'crypto'
import { prisma } from '../../db'
import {
  addDays,
  getAuthSafeUser,
  getRenewalBaseDate,
  subscriptionPlanAdminSelect,
} from '../../services/subscription.service'
import {
  parsePlanId,
  getRazorpayCredentials,
  createRazorpayAuthHeader,
  RAZORPAY_API_BASE_URL,
  RazorpayOrderResponse,
} from './helpers'

export const createSubscriptionOrder: RequestHandler = async (req, res) => {
  try {
    if (req.user?.role !== 'USER') {
      return res.status(403).json({ message: 'Only users can purchase subscriptions' })
    }

    const planId = parsePlanId(req.body.planId)
    const plan = await prisma.subscriptionPlan.findFirst({
      where: { id: planId, isActive: true },
      select: subscriptionPlanAdminSelect,
    })

    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' })
    }

    const { keyId, keySecret } = getRazorpayCredentials()
    const receipt = `sub_${req.user.id}_${Date.now()}`

    const response = await fetch(`${RAZORPAY_API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: createRazorpayAuthHeader(keyId, keySecret),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: plan.amount,
        currency: plan.currency,
        receipt,
        notes: {
          userId: String(req.user.id),
          planId: String(plan.id),
          planName: plan.name,
        },
      }),
    })

    if (!response.ok) {
      const responseBody = await response.text()
      console.error('Razorpay Order Create Error:', responseBody)
      return res.status(502).json({ message: 'Unable to create payment order right now' })
    }

    const order = (await response.json()) as RazorpayOrderResponse

    await prisma.subscriptionPayment.create({
      data: {
        userId: req.user.id,
        planId: plan.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        razorpayOrderId: order.id,
        status: 'CREATED',
      },
    })

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { name: true, email: true },
    })

    return res.status(201).json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId, plan, user })
  } catch (error) {
    console.error('Create Subscription Order Error:', error)

    if (
      error instanceof Error &&
      ['INVALID_PLAN_ID', 'RAZORPAY_NOT_CONFIGURED'].includes(error.message)
    ) {
      return res.status(400).json({
        message:
          error.message === 'RAZORPAY_NOT_CONFIGURED'
            ? 'Payment gateway is not configured'
            : 'Please select a valid subscription plan',
      })
    }

    return res.status(500).json({ message: 'Failed to create subscription order' })
  }
}

export const verifySubscriptionPayment: RequestHandler = async (req, res) => {
  try {
    if (req.user?.role !== 'USER') {
      return res.status(403).json({ message: 'Only users can purchase subscriptions' })
    }

    const planId = parsePlanId(req.body.planId)
    const razorpayOrderId = String(req.body.razorpayOrderId || '').trim()
    const razorpayPaymentId = String(req.body.razorpayPaymentId || '').trim()
    const razorpaySignature = String(req.body.razorpaySignature || '').trim()

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing payment verification details' })
    }

    const payment = await prisma.subscriptionPayment.findFirst({
      where: { userId: req.user.id, planId, razorpayOrderId },
      include: { plan: { select: subscriptionPlanAdminSelect } },
    })

    if (!payment) {
      return res.status(404).json({ message: 'Payment order not found' })
    }

    if (payment.status === 'VERIFIED' && payment.razorpayPaymentId === razorpayPaymentId) {
      const user = await getAuthSafeUser(req.user.id)
      return res.json({ message: 'Subscription already verified', user })
    }

    const { keySecret } = getRazorpayCredentials()
    const expectedSignature = createHmac('sha256', keySecret)
      .update(`${payment.razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    const expectedSignatureBuffer = Buffer.from(expectedSignature)
    const receivedSignatureBuffer = Buffer.from(razorpaySignature)
    const isValidSignature =
      expectedSignatureBuffer.length === receivedSignatureBuffer.length &&
      timingSafeEqual(expectedSignatureBuffer, receivedSignatureBuffer)

    if (!isValidSignature) {
      await prisma.subscriptionPayment.update({
        where: { id: payment.id },
        data: { status: 'FAILED', razorpayPaymentId, razorpaySignature },
      })
      return res.status(400).json({ message: 'Payment verification failed' })
    }

    const currentDate = new Date()

    await prisma.$transaction(async (tx) => {
      await tx.userSubscription.updateMany({
        where: { userId: req.user!.id, status: 'ACTIVE', expiresAt: { lt: currentDate } },
        data: { status: 'EXPIRED' },
      })

      const activeSubscription = await tx.userSubscription.findFirst({
        where: { userId: req.user!.id, status: 'ACTIVE', expiresAt: { gte: currentDate } },
        orderBy: { expiresAt: 'desc' },
        select: { id: true, planId: true, startedAt: true, expiresAt: true },
      })

      const renewalBaseDate = getRenewalBaseDate(activeSubscription, payment.planId)
      const nextExpiryDate = addDays(renewalBaseDate, payment.plan.durationInDays)

      let subscriptionId: number

      if (activeSubscription && activeSubscription.planId === payment.planId) {
        const updatedSubscription = await tx.userSubscription.update({
          where: { id: activeSubscription.id },
          data: { status: 'ACTIVE', startedAt: activeSubscription.startedAt || currentDate, expiresAt: nextExpiryDate },
          select: { id: true },
        })
        subscriptionId = updatedSubscription.id
      } else {
        if (activeSubscription) {
          await tx.userSubscription.updateMany({
            where: { userId: req.user!.id, status: 'ACTIVE' },
            data: { status: 'CANCELLED' },
          })
        }

        const createdSubscription = await tx.userSubscription.create({
          data: { userId: req.user!.id, planId: payment.planId, status: 'ACTIVE', startedAt: currentDate, expiresAt: nextExpiryDate },
          select: { id: true },
        })
        subscriptionId = createdSubscription.id
      }

      await tx.subscriptionPayment.update({
        where: { id: payment.id },
        data: { subscriptionId, razorpayPaymentId, razorpaySignature, status: 'VERIFIED' },
      })
    })

    const user = await getAuthSafeUser(req.user.id)
    return res.json({ message: 'Subscription activated successfully', user })
  } catch (error) {
    console.error('Verify Subscription Payment Error:', error)

    if (
      error instanceof Error &&
      ['INVALID_PLAN_ID', 'RAZORPAY_NOT_CONFIGURED'].includes(error.message)
    ) {
      return res.status(400).json({
        message:
          error.message === 'RAZORPAY_NOT_CONFIGURED'
            ? 'Payment gateway is not configured'
            : 'Invalid subscription plan selected',
      })
    }

    return res.status(500).json({ message: 'Failed to verify payment' })
  }
}