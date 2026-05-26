import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '../../db'
import { sendPasswordResetEmail } from '../../utils/mailer'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const generic = () => res.json({ message: 'If that email is registered, a reset link has been sent.' })

    if (!email) return res.status(400).json({ message: 'Email is required' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return generic()

    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    })

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt },
    })

    const resetLink = `${CLIENT_URL}/reset-password?token=${token}`

    try { await sendPasswordResetEmail(user.email, resetLink) } catch (e) { console.error('Failed to send reset email', e) }

    return generic()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      })
    }

    const record = await prisma.passwordResetToken.findUnique({ where: { token } })

    if (!record || record.used || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' })
    }

    const hashed = await bcrypt.hash(password, 10)

    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { password: hashed } }),
      prisma.passwordResetToken.update({ where: { id: record.id }, data: { used: true } }),
    ])

    return res.json({ message: 'Password reset successfully. You can now log in.' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}