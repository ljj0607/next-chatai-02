import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

interface ConversationStore {
  currentConversation: Conversation | null
  setCurrentConversation: (conversation: Conversation | null) => void
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Settings
  settings: {
    theme: 'light' | 'dark'
    fontSize: 'small' | 'medium' | 'large'
    autoScroll: boolean
    soundEnabled: boolean
  }
  updateSettings: (settings: Partial<ConversationStore['settings']>) => void
}

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set, get) => ({
      currentConversation: null,
      setCurrentConversation: (conversation) => 
        set({ currentConversation: conversation }),
      
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      settings: {
        theme: 'light',
        fontSize: 'medium',
        autoScroll: true,
        soundEnabled: false
      },
      updateSettings: (newSettings) => 
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
    }),
    {
      name: 'conversation-store',
      partialize: (state) => ({
        currentConversation: state.currentConversation,
        settings: state.settings
      })
    }
  )
)
