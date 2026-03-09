/**
 * Pino logger — structured JSON logging.
 * Used outside of Fastify request context (background jobs, scripts).
 */

import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
})
