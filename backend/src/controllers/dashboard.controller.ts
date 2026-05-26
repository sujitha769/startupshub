import { RequestHandler } from 'express'
import { prisma } from '../db'

export const getDashboardStats: RequestHandler = async (_req, res) => {
  try {
    const [leads, funding, startups] = await Promise.all([
      prisma.lead.count(),
      prisma.fundingOpportunity.count(),
      prisma.startupRaising.count(),
    ])

    res.json({ leads, funding, startups })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
