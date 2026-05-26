import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import { notFound, globalErrorHandler } from './middleware/error.middleware'
import leadRoutes from './routes/lead.routes'
import highlightRoutes from './routes/highlight.routes'

import dashboardRoutes from './routes/dashboard.routes'
import subscriptionRoutes from './routes/subscription.routes'

const app = express()
app.set('trust proxy', 1)

// ─── Security Middleware ────────────────────────────────────────────────────
app.use(helmet()) // Sets secure HTTP headers

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost:5173 and localhost:5174 for development
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5174', 'http://localhost:5173', 'https://startupshubapp.netlify.app']
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

// ─── Rate Limiting ──────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 500 : 20, // High limit for dev
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(globalLimiter)

// ─── Body Parsers ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))       // Prevent large payload attacks
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ─── Health Check ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/highlights', highlightRoutes)

app.use('/api/dashboard', dashboardRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/funding', require('./routes/funding.routes').default)
app.use('/api/startups', require('./routes/startups.routes').default)
app.use('/api/investor', require('./routes/investor.routes').default)
// ─── Error Handling ─────────────────────────────────────────────────────────
app.use(notFound)
app.use(globalErrorHandler)

export default app
