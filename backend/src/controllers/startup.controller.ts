import { RequestHandler } from 'express'
import { prisma } from '../db'

export const getStartups: RequestHandler = async (req: any, res) => {
  try {
    const user = req.user

    // Admin/Staff bypass check
    if (user.role === 'ADMIN' || user.role === 'STAFF') {
      const startups = await prisma.startupRaising.findMany({
        orderBy: { createdAt: 'desc' },
      })
      return res.json(startups)
    }

    // Investor Check
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { investorStatus: true },
    })

    if (!dbUser || dbUser.investorStatus !== 'APPROVED') {
      return res.status(403).json({ message: 'Access Denied: You must be an approved investor to view startups.' })
    }

    const startups = await prisma.startupRaising.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return res.json(startups)

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/admin/startups
export const createStartup: RequestHandler = async (req, res) => {
  try {
    const startup = await prisma.startupRaising.create({
      data: req.body,
    })
    res.status(201).json(startup)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// PUT /api/admin/startups/:id
export const updateStartup: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const startup = await prisma.startupRaising.update({
      where: { id: parseInt(id as string) },
      data: req.body,
    })
    res.json(startup)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// DELETE /api/admin/startups/:id
export const deleteStartup: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.startupRaising.delete({
      where: { id: parseInt(id as string) },
    })
    res.json({ message: 'Startup deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
