import { Router } from 'express'
import {
  addStaff,
  getAllStaff,
  getAllUsers,
  deleteStaff,
  setupAdmin,
  addLead,
} from '../controllers/admin.controller'

import {
  protect,
  adminOnly,
  adminOrStaff,
} from '../middleware/auth.middleware'

import { validateAddStaff } from '../validators/auth.validator'

const router = Router()

// ─── PUBLIC ─────────────────────────────────────────────
router.post('/setup', validateAddStaff, setupAdmin)

// ─── PROTECTED ──────────────────────────────────────────
router.use(protect)


// 👑 ADMIN ONLY
router.post('/staff', adminOnly, validateAddStaff, addStaff)
router.get('/staff', adminOnly, getAllStaff)
router.delete('/staff/:id', adminOnly, deleteStaff)
router.get('/users', adminOnly, getAllUsers)


import { createHighlight, updateHighlight, deleteHighlight } from '../controllers/highlight.controller'


// 👨‍💼 ADMIN + STAFF
router.post('/leads', adminOrStaff, addLead)

// Highlights
router.post('/highlights', adminOnly, createHighlight)
router.put('/highlights/:id', adminOnly, updateHighlight)
router.delete('/highlights/:id', adminOnly, deleteHighlight)




// Funding (Admin + Staff)
import { createFunding, updateFunding, deleteFunding } from '../controllers/funding.controller'
router.post('/funding', adminOrStaff, createFunding)
router.put('/funding/:id', adminOrStaff, updateFunding)
router.delete('/funding/:id', adminOrStaff, deleteFunding)

// Startups Raising (Admin + Staff)
import { createStartup, updateStartup, deleteStartup } from '../controllers/startup.controller'
router.post('/startups', adminOrStaff, createStartup)
router.put('/startups/:id', adminOrStaff, updateStartup)
router.delete('/startups/:id', adminOrStaff, deleteStartup)

// Investors Management (Admin Only)
import { getInvestorApplications, updateApplicationStatus, getPendingCount } from '../controllers/investor.controller'
router.get('/investors/pending-count', adminOnly, getPendingCount)
router.get('/investors', adminOnly, getInvestorApplications)
router.put('/investors/:userId/status', adminOnly, updateApplicationStatus)

export default router