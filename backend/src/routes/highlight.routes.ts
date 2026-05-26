import { Router } from 'express'
import { getHighlights } from '../controllers/highlight.controller'

const router = Router()

// GET /api/highlights (public)
router.get('/', getHighlights)

export default router
