import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

// 404 handler — mount AFTER all routes
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: AppError = new Error(`Route not found: ${req.originalUrl}`)
  error.statusCode = 404
  error.isOperational = true
  next(error)
}

// Global error handler — mount LAST
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500
  const message = err.isOperational ? err.message : 'Internal server error'

  // Log full error in non-production
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${statusCode} — ${err.message}`)
    console.error(err.stack)
  } else {
    // In production, log only non-sensitive info
    console.error(`[ERROR] ${statusCode} — ${message}`)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}