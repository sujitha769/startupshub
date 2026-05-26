import { Request, Response } from 'express'
import { getAuthSafeUser } from '../../services/subscription.service'

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('token')
  return res.json({ message: 'Logged out successfully' })
}

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await getAuthSafeUser(req.user.id)
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}