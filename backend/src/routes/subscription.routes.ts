import { Router } from 'express'
import {
  archiveSubscriptionPlan,
  createSubscriptionOrder,
  createSubscriptionPlan,
  getSubscriptionPlans,
  updateSubscriptionPlan,
  verifySubscriptionPayment,
} from '../controllers/subscription.controller'
import { adminOnly, protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)

router.get('/plans', getSubscriptionPlans)
router.post('/plans', adminOnly, createSubscriptionPlan)
router.put('/plans/:id', adminOnly, updateSubscriptionPlan)
router.patch('/plans/:id/archive', adminOnly, archiveSubscriptionPlan)

router.post('/checkout/order', createSubscriptionOrder)
router.post('/checkout/verify', verifySubscriptionPayment)

export default router
