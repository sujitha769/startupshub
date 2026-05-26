import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: number
  role: 'ADMIN' | 'STAFF' | 'USER'
}

// Extend Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

// 🔐 Protect route (login required)
export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// 👑 Admin only
export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

// 👨‍💼 Admin + Staff
export const adminOrStaff = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === 'ADMIN' || req.user?.role === 'STAFF') {
    next()
  } else {
    return res.status(403).json({ message: 'Access denied' })
  }
}