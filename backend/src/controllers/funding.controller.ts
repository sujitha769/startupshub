import { RequestHandler } from 'express'
import { prisma } from '../db'

// GET /api/funding
export const getFunding: RequestHandler = async (req, res) => {
  try {
    const funding = await prisma.fundingOpportunity.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(funding)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/admin/funding
export const createFunding: RequestHandler = async (req, res) => {
  try {
    const funding = await prisma.fundingOpportunity.create({
      data: req.body,
    })
    res.status(201).json(funding)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// PUT /api/admin/funding/:id
export const updateFunding: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const funding = await prisma.fundingOpportunity.update({
      where: { id: parseInt(id as string) },
      data: req.body,
    })
    res.json(funding)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// DELETE /api/admin/funding/:id
export const deleteFunding: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.fundingOpportunity.delete({
      where: { id: parseInt(id as string) },
    })
    res.json({ message: 'Funding deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
