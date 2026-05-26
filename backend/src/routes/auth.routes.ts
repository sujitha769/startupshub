import { Router } from 'express'
import {
  register,
  login,
  logout,
  getMe,
  verifyPassword,
  changePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller'
import { protect } from '../middleware/auth.middleware'
import { validateRegister, validateLogin } from '../validators/auth.validator'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)

router.post('/verify-password', protect, verifyPassword)
router.post('/change-password', protect, changePassword)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router