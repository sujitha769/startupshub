import { Router } from 'express'
import { getFunding } from '../controllers/funding.controller'

const router = Router()

// @route   GET /api/funding
// @desc    Get all funding opportunities
// @access  Public
router.get('/', getFunding)

export default router
