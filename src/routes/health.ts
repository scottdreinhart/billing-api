import type { FastifyInstance } from 'fastify'

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', {
    schema: {
      tags: ['System'],
      summary: 'Health check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'string' },
          },
        },
      },
    },
    handler: async (_request, _reply) => {
      return {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      }
    },
  })

  app.get('/ready', {
    schema: {
      tags: ['System'],
      summary: 'Readiness check',
      response: {
        200: {
          type: 'object',
          properties: {
            ready: { type: 'boolean' },
          },
        },
      },
    },
    handler: async (_request, _reply) => {
      // TODO: check database connectivity, external service health, etc.
      return { ready: true }
    },
  })
}
