import { Router } from 'express'
import { applyForAccess } from '../controllers/investor.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)

// @route   POST /api/investor/apply
// @desc    Apply for investor access
// @access  Private
router.post('/apply', applyForAccess)

export default router
