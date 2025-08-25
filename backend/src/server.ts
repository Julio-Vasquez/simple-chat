import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import type { Server as ServerHttp } from 'node:http'
import type { Express, Response, Request } from 'express'

/*
 * Core Server Setup
 */
import { setupSocket } from './socket'

/**
 * Environments
 */

import { METHODS, ORIGIN, PORT } from './constants'

/**
 * Models
 */
import { UserQueryParams } from './models'

/*
 * Express Instance and CORS Configuration
 */
const app: Express = express()

app.use(cors({ origin: ORIGIN, methods: METHODS }))

/**
 * Routes
 */

// req.params, res.body , req.body
app.get(
  '/',
  ({ query }: Request<{}, {}, {}, UserQueryParams>, res: Response) => {
    if (query.name) return res.send(`Hey ${query.name}`)
    return res.send('Hello World!')
  }
)

/*
 * Server Creation and Configuration
 */
const server: ServerHttp = createServer(app)

/*
 * Socket.IO Server Configuration
 */
const socketIo = new Server(server, {
  cors: { origin: ORIGIN, methods: METHODS },
})

/*
 * Socket.IO Server Event Handlers
 */
setupSocket(socketIo)

/*
 * Start the Server
 */
server.listen(PORT, () => {
  console.log(`🚀Server Running on=> http://localhost:${PORT} 🚀`)
})
