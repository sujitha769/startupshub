import { RequestHandler } from 'express'
import { prisma } from '../db'

// POST /api/investor/apply
export const applyForAccess: RequestHandler = async (req: any, res) => {
  try {
    const userId = req.user.id
    const { linkedin, investmentExperience, pastInvestments, ticketSize } = req.body

    const existingApplication = await prisma.investorApplication.findUnique({
      where: { userId },
    })

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied.' })
    }

    const application = await prisma.investorApplication.create({
      data: {
        userId,
        linkedin,
        investmentExperience,
        pastInvestments,
        ticketSize,
        status: 'PENDING',
      },
    })

    await prisma.user.update({
      where: { id: userId },
      data: { investorStatus: 'PENDING' },
    })

    res.status(201).json({ message: 'Application submitted', application })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// GET /api/admin/investors
export const getInvestorApplications: RequestHandler = async (req, res) => {
  try {
    const applications = await prisma.investorApplication.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// PUT /api/admin/investors/:userId/status
export const updateApplicationStatus: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params
    const { status } = req.body

    const application = await prisma.investorApplication.update({
      where: { userId: parseInt(userId as string) },
      data: { status },
    })

    await prisma.user.update({
      where: { id: parseInt(userId as string) },
      data: { investorStatus: status },
    })

    res.json({ message: 'Application status updated', application })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// GET /api/admin/investors/pending-count
export const getPendingCount: RequestHandler = async (req, res) => {
  try {
    const count = await prisma.investorApplication.count({
      where: { status: 'PENDING' },
    })
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
