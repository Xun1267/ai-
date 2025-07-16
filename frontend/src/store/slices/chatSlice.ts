import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: string
  emotion?: string
  cbtTechnique?: string
}

interface ChatState {
  messages: Message[]
  isTyping: boolean
  currentSessionId: string | null
  loading: boolean
}

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  currentSessionId: null,
  loading: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload
    },
    setCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSessionId = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { 
  addMessage, 
  setMessages, 
  setTyping, 
  setCurrentSession, 
  clearMessages, 
  setLoading 
} = chatSlice.actions

export default chatSlice.reducer