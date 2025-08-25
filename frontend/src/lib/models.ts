import type { ChangeEvent, KeyboardEvent } from 'react'

export type OnChange = (e: ChangeEvent<HTMLInputElement>) => void
export type OnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => void

export interface ChatProps {
  input: string
  onSend: () => void
  onChange: OnChange
  onKeyDown: OnKeyDown
}

export interface Message {
  sender: string
  text: string
  time: string
}

export type MessagesProps = {
  messages: Message[]
}
