import app from './app'
import { prisma } from './db'

const PORT = parseInt(process.env.PORT || '5000', 10)

const startServer = async () => {
  try {
    // Verify DB connection on startup
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`)
    })

    // ─── Graceful Shutdown ─────────────────────────────────────────────────
    const shutdown = async (signal: string) => {
      console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`)
      server.close(async () => {
        await prisma.$disconnect()
        console.log('🔌 Database disconnected. Process exiting.')
        process.exit(0)
      })
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))

    // ─── Unhandled Rejections ──────────────────────────────────────────────
    process.on('unhandledRejection', (reason: unknown) => {
      console.error('💥 Unhandled Rejection:', reason)
      server.close(async () => {
        await prisma.$disconnect()
        process.exit(1)
      })
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

startServer()