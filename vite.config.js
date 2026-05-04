/* global process */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import aiPlaygroundHandler from './api/ai-playground.js'

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/ai-playground', async (req, res) => {
        let rawBody = ''

        req.on('data', (chunk) => {
          rawBody += chunk
        })

        req.on('end', async () => {
          try {
            req.body = rawBody ? JSON.parse(rawBody) : {}

            const response = {
              setHeader: (...args) => res.setHeader(...args),
              status(code) {
                res.statusCode = code
                return this
              },
              json(payload) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(payload))
                return this
              },
              end(payload = '') {
                res.end(payload)
                return this
              },
            }

            await aiPlaygroundHandler(req, response)
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error.message || 'Local API failed' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  Object.entries(env).forEach(([key, value]) => {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  })

  return {
    plugins: [
      localApiPlugin(),
      react(),
      tailwindcss(),
    ],
    server: {
      allowedHosts: [
        "fifth-puts-sand-grants.trycloudflare.com"
      ]
    }
  }
})
