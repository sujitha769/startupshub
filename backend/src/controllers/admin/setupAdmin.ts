import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../../db'

export const setupAdmin: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    })

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'ADMIN' },
      select: { id: true, name: true, email: true, role: true },
    })

    return res.status(201).json({ message: 'Admin created successfully', data: admin })
  } catch (error) {
    console.error('Setup Admin Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}