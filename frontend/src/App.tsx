import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

import { Header, Chat, ChatHistory } from './Components'

import { getDate } from './lib/utils'
import { ServerIo } from './lib/constants'
import type { Message, OnChange, OnKeyDown } from './lib/models'

import './App.css'

const socket = io(ServerIo)

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hey there! 👋 Thank you for reaching out to us today. How can I help?',
      time: getDate(),
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: 'user', text: input, time: getDate() }])
    setInput('')
  }

  const handleChange: OnChange = e => setInput(e.target.value)

  const handleKeyDown: OnKeyDown = e => e.key === 'Enter' && handleSend()

  useEffect(() => {
    socket.on('connected', (msm: string) => console.log(msm))
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-96 h-[600px] rounded-2xl shadow-lg bg-white overflow-hidden border flex flex-col">
        <Header />

        <ChatHistory messages={messages} />
        <Chat
          input={input}
          onSend={handleSend}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default App
