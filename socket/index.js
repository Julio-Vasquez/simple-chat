import express from 'express'
import { Server } from 'socket.io'
import { dirname } from 'node:path'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const server = createServer(app)
const socketIo = new Server(server, {
  cors: { origin: '*' },
})

socketIo.on('connection', socket => {
  console.log('✅ Conexión abierta')

  socket.on('whatsapp', data => {
    console.log('📩 Mensaje recibido:', data)

    socketIo.emit('whatsapp', { message: 'Hey bro' })
  })
})

socketIo.on('disconnect', socket => {
  console.log('🔌 Conexión cerrada')
})

socketIo.on('error', err => {
  console.error('❌ Error:', err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/io', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

server.listen(3000, () => console.log('Server running on port 3000'))
