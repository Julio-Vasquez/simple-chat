import type { Server } from 'socket.io'

import { onlineUsers } from './db'
import { generateRoomName } from './util'
import type { MessagePayload, RegisterUser, TargetUserId } from './models'

/*
 * Sets up all Socket.IO server-side event handlers
 * using dependency injection (DI) to decouple the module.
 */
export const setupSocket = (socketIo: Server) => {
  socketIo.on('connection', socket => {
    console.log('🔌 New client connected:', socket.id)

    socket.emit('connected', 'Connection successful!')

    // 1. Register a user on connect
    // The client should emit a 'register' event with their user ID.
    socket.on('register', ({ username, userId }: RegisterUser) => {
      onlineUsers.set(userId, { socketId: socket.id, username })
      console.log(`👤 User ${userId} online. Socket ID: ${socket.id}`)
    })

    // 2. A user wants to start a chat with another user
    socket.on('join-private-chat', ({ targetUserId }: TargetUserId) => {
      const targetSocketId = onlineUsers.get(targetUserId)

      if (targetSocketId) {
        // Create a unique room name for the conversation
        // The name should be the same for both users, regardless of who requests first.
        const roomName = generateRoomName([socket.id, targetSocketId.socketId])

        // Join both users to the room
        socket.join(roomName)
        socket.to(targetSocketId.socketId).emit('join-room', { room: roomName })

        console.log(`💬 Private chat started in room: ${roomName}`)
      } else {
        socket.emit('error', 'The other user is not online.')
      }
    })

    // 3. When a message is received, send it only to the room
    socket.on('send-message', ({ room, message }: MessagePayload) => {
      // If the room exists, send the message to everyone in it, except the sender.
      socket.to(room).emit('receive-message', { message, sender: socket.id })
    })

    socketIo.on('disconnect', () => {
      for (const [userId, sender] of onlineUsers.entries()) {
        if (sender.socketId === socket.id) {
          // Remove the user from the online list
          onlineUsers.delete(userId)
          console.log(`🔌 User ${userId} has disconnected.`)
          return // Stop the loop once the user is found and deleted
        }
      }
      console.log('🔌 Connection closed')
    })

    socketIo.on('error', err => console.error('❌ Error:', err))
  })
}
