import WebSocket from 'ws'

const socket = new WebSocket('wss://gateway.discord.gg')

socket.on('open', () => {
  console.log('✅ Conexión abierta')
})

socket.on('message', data => {
  console.log('📩 Mensaje recibido:', data.toString())
  try {
    const parsed = JSON.parse(data)
    console.log('📩 Mensaje recibido:', parsed)
  } catch (err) {
    console.log('Mensaje recibido (sin parsear):', data.toString())
  }
})

socket.on('error', err => {
  console.error('❌ Error:', err)
})

socket.on('close', () => {
  console.log('🔌 Conexión cerrada')
})
