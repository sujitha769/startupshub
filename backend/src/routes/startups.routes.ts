import { Router } from 'express'
import { getStartups } from '../controllers/startup.controller'
import { applyForAccess } from '../controllers/investor.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)

// @route   GET /api/startups
// @desc    Get all startups (Protected by investorStatus logic inside controller)
// @access  Private (Approved Investors, Admin, Staff)
router.get('/', getStartups)

export default router
