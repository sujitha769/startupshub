import { Request, Response } from 'express'
import { prisma } from '../db'

// GET /api/highlights
export const getHighlights = async (req: Request, res: Response) => {
  try {
    const highlights = await prisma.highlight.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.json(highlights)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/admin/highlights
export const createHighlight = async (req: Request, res: Response) => {
  try {
    const highlight = await prisma.highlight.create({
      data: req.body,
    })
    res.status(201).json(highlight)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// PUT /api/admin/highlights/:id
export const updateHighlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const highlight = await prisma.highlight.update({
      where: { id: parseInt(id as string) },
      data: req.body,
    })
    res.json(highlight)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// DELETE /api/admin/highlights/:id
export const deleteHighlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.highlight.delete({
      where: { id: parseInt(id as string) },
    })
    res.json({ message: 'Highlight deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
