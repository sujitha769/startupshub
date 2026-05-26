import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../../db'
import { parseId } from './helpers'

export const addStaff: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const staff = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'STAFF' },
      select: { id: true, name: true, email: true, role: true },
    })

    return res.status(201).json({ message: 'Staff created successfully', data: staff })
  } catch (error) {
    console.error('Add Staff Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllStaff: RequestHandler = async (_req, res) => {
  try {
    const staffList = await prisma.user.findMany({
      where: { role: 'STAFF' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json({ count: staffList.length, data: staffList })
  } catch (error) {
    console.error('Get Staff Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteStaff: RequestHandler = async (req, res) => {
  try {
    const staffId = parseId(req.params.id)

    const staff = await prisma.user.findUnique({
      where: { id: staffId },
      select: { id: true, role: true },
    })

    if (!staff || staff.role !== 'STAFF') {
      return res.status(404).json({ message: 'Staff not found' })
    }

    await prisma.user.delete({ where: { id: staffId } })

    return res.status(200).json({ message: 'Staff deleted successfully' })
  } catch (error: any) {
    console.error('Delete Staff Error:', error)

    if (error.message === 'INVALID_ID') {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}