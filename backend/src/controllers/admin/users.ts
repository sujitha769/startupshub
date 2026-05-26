import { RequestHandler } from 'express'
import { prisma } from '../../db'

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'USER' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json({ count: users.length, data: users })
  } catch (error) {
    console.error('Get Users Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}