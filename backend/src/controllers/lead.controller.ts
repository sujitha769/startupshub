import { Request, Response } from 'express'
import { prisma } from '../db'
import { userHasLeadAccess } from '../services/subscription.service'

// GET /api/leads
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        domain: true,
        budget: true,
        location: true,
        shortDescription: true,
        projectType: true,
      },
    })
    res.json(leads)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// GET /api/leads/:id
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (req.user && req.user.role === 'USER') {
      const hasLeadAccess = await userHasLeadAccess(req.user.id, req.user.role)

      if (!hasLeadAccess) {
        return res.status(403).json({
          code: 'SUBSCRIPTION_REQUIRED',
          message: 'Please upgrade to Pro to view full lead details',
        })
      }
    }

    const lead = await prisma.lead.findUnique({
      where: { id: parseInt(id as string) }
    })
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' })
    }
    
    res.json(lead)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/leads
export const createLead = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body }
    if (data.numberOfOpenings) data.numberOfOpenings = parseInt(data.numberOfOpenings)
    if (typeof data.portfolioRequired === 'string') data.portfolioRequired = data.portfolioRequired === 'true'
    
    const lead = await prisma.lead.create({ data })
    res.status(201).json(lead)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// PUT /api/leads/:id
export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = { ...req.body }
    if (data.numberOfOpenings) data.numberOfOpenings = parseInt(data.numberOfOpenings)
    if (typeof data.portfolioRequired === 'string') data.portfolioRequired = data.portfolioRequired === 'true'
      
    const lead = await prisma.lead.update({
      where: { id: parseInt(id as string) },
      data
    })
    res.json(lead)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// DELETE /api/leads/:id
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.lead.delete({
      where: { id: parseInt(id as string) }
    })
    res.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
