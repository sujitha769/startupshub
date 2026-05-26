import { Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../../db'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/

export const verifyPassword = async (req: any, res: Response) => {
  try {
    const { password } = req.body
    if (!password) return res.status(400).json({ message: 'Password is required' })

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' })

    return res.json({ message: 'Password verified' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const changePassword = async (req: any, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' })
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      })
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' })

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashedPassword } })

    return res.json({ message: 'Password changed successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}