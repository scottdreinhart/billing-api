import { buildApp } from './app/app.js'

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'

async function start(): Promise<void> {
  const app = await buildApp()

  try {
    await app.listen({ port: PORT, host: HOST })
    app.log.info(`Billing API listening on ${HOST}:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
