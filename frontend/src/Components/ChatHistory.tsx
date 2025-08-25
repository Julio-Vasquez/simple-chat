import { getInitials } from '../lib/utils'
import type { MessagesProps } from '../lib/models'

export const ChatHistory = ({ messages }: MessagesProps) => {
  return (
    <div className="p-4 space-y-4 overflow-y-auto text-sm flex-1">
      {messages.map((msg, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex items-start space-x-2">
            <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
              {getInitials(msg.sender)}
            </div>

            <div
              className={`bg-gray-100 rounded-xl p-3 max-w-xs ${
                msg.sender === 'user' ? 'ml-auto bg-blue-100' : ''
              }`}
            >
              {msg.text}
            </div>
          </div>
          <span className="text-xs text-gray-400 mt-1 ml-10">{msg.time}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatHistory
