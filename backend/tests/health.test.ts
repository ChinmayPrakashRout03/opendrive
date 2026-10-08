import assert from 'node:assert'
import { app } from '../src/app.js'

async function run() {
  console.log('Running health check test...')
  const server = app.listen(0, async () => {
    const addr = server.address()
    if (!addr || typeof addr === 'string') {
      server.close()
      process.exit(1)
    }
    const url = `http://localhost:${addr.port}/health`
    try {
      const res = await fetch(url)
      const data = await res.json() as { status: string }
      assert.strictEqual(res.status, 200, 'Expected status 200')
      assert.strictEqual(data.status, 'ok', 'Expected { status: "ok" }')
      console.log('✓ GET /health passed')
    } catch (err) {
      console.error('✗ Health check test failed:', err)
      process.exitCode = 1
    } finally {
      server.close()
    }
  })
}

run()
