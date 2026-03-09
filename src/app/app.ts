import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import sensible from '@fastify/sensible'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { healthRoutes } from '@/routes/health.js'

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  })

  // ── Plugins ──
  await app.register(cors, { origin: true })
  await app.register(helmet)
  await app.register(sensible)
  await app.register(rateLimit, { max: 100, timeWindow: '1 minute' })

  // ── OpenAPI docs ──
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Billing API',
        version: '1.0.0',
        description: 'Billing API — Fastify + TypeScript',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
  })
  await app.register(swaggerUi, { routePrefix: '/docs' })

  // ── Routes ──
  await app.register(healthRoutes)

  return app
}
