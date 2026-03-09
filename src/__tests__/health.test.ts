import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from '../app/app.js'
import type { FastifyInstance } from 'fastify'

describe('Health routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await buildApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('GET /health returns 200 with status ok', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.status).toBe('ok')
    expect(body.uptime).toBeGreaterThan(0)
    expect(body.timestamp).toBeDefined()
  })

  it('GET /ready returns 200 with ready true', async () => {
    const response = await app.inject({ method: 'GET', url: '/ready' })
    expect(response.statusCode).toBe(200)
    expect(response.json().ready).toBe(true)
  })
})
