import type { ChatProps } from '../lib/models'

export const Chat = ({ input, onSend, onChange, onKeyDown }: ChatProps) => (
  <div className="border-t px-4 py-2 flex items-center gap-2">
    <input
      type="text"
      value={input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Message"
      className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onSend}
      className="text-blue-600 hover:text-blue-800 text-lg"
    >
      ➤
    </button>
  </div>
)
