import { Router } from 'express'
import { protect, adminOrStaff } from '../middleware/auth.middleware'
import { getLeads, getLeadById, createLead, updateLead, deleteLead } from '../controllers/lead.controller'

const router = Router()

// All lead routes require login
router.use(protect)

// GET /api/leads - Read-only for all users (Admin/Staff/User)
router.get('/', getLeads)

// GET /api/leads/:id - Read-only for all users
router.get('/:id', getLeadById)

// POST /api/leads - Admin and Staff only
router.post('/', adminOrStaff, createLead)

// PUT /api/leads/:id - Admin and Staff only
router.put('/:id', adminOrStaff, updateLead)

// DELETE /api/leads/:id - Admin and Staff only
router.delete('/:id', adminOrStaff, deleteLead)

export default router