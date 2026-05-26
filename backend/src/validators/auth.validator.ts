import { Request, Response, NextFunction } from 'express'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordMinLength = 8

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password } = req.body

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ message: 'Name must be at least 2 characters' })
    return
  }

  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' })
    return
  }

  if (!password || password.length < passwordMinLength) {
    res
      .status(400)
      .json({ message: `Password must be at least ${passwordMinLength} characters` })
    return
  }

  // Enforce industry standards: at least 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/
  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
    return
  }

  // Sanitize
  req.body.name = name.trim()
  req.body.email = email.toLowerCase().trim()

  next()
}

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body

  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' })
    return
  }

  if (!password || typeof password !== 'string') {
    res.status(400).json({ message: 'Password is required' })
    return
  }

  req.body.email = email.toLowerCase().trim()

  next()
}

export const validateAddStaff = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password } = req.body

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ message: 'Name must be at least 2 characters' })
    return
  }

  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' })
    return
  }

  if (!password || password.length < passwordMinLength) {
    res
      .status(400)
      .json({ message: `Password must be at least ${passwordMinLength} characters` })
    return
  }

  req.body.name = name.trim()
  req.body.email = email.toLowerCase().trim()

  next()
}