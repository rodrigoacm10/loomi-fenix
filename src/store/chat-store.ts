import { create } from 'zustand'
import { ChatMessage, ConversationAnalysis } from '@/types/chat'
import { chatService } from '@/services/chat'

interface ChatState {
  messages: ChatMessage[]
  author: string | null
  iaSuggestion: string | null
  conversationAnalysis: ConversationAnalysis | null
  loading: boolean
  error: string | null

  fetchChatData: () => Promise<void>
  sendMessage: ({
    author,
    content,
  }: {
    author: string
    content: string
  }) => Promise<void>
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  author: null,
  iaSuggestion: null,
  conversationAnalysis: null,
  loading: false,
  error: null,

  fetchChatData: async () => {
    set({ loading: true, error: null })
    try {
      const data = await chatService.getChatData()
      const author = data.messages.find(
        (msg) => msg.type === 'assistant_message',
      )?.author
      set({
        messages: data.messages || [],
        author,
        iaSuggestion: data.iaSuggestion,
        conversationAnalysis: data.conversationAnalysis,
        loading: false,
      })
    } catch (error) {
      console.error('Failed to fetch chat data:', error)
      set({ error: 'Failed to fetch chat data', loading: false })
    }
  },

  sendMessage: async ({
    author,
    content,
  }: {
    author: string
    content: string
  }) => {
    try {
      const newMessage = await chatService.sendMessage(author, content)
      set((state) => ({
        messages: [...state.messages, newMessage],
      }))
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  },
}))
