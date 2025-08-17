// GraphQL Types
export interface Message {
  id: string
  conversationId: string
  content: string
  type: 'TEXT' | 'WEATHER' | 'KNOWLEDGE'
  role: 'USER' | 'ASSISTANT'
  timestamp: string
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  weather?: Weather
  sources?: string[]
  confidence?: number
}

export interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export interface Weather {
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  source?: string
  tags: string[]
  createdAt: string
  similarity?: number
}

// Input Types
export interface SendMessageInput {
  conversationId: string
  content: string
  type?: 'TEXT' | 'WEATHER' | 'KNOWLEDGE'
}

export interface AddKnowledgeInput {
  title: string
  content: string
  source?: string
  tags: string[]
}

// Response Types
export interface SendMessageResponse {
  userMessage: Message
  botMessage: Message
}

// Store Types
export interface ConversationState {
  currentConversation: Conversation | null
  sidebarOpen: boolean
  settings: AppSettings
}

export interface AppSettings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
  autoScroll: boolean
  soundEnabled: boolean
}

// Component Props
export interface ChatInterfaceProps {
  className?: string
}

export interface ConversationSidebarProps {
  className?: string
}

export interface MessageListProps {
  messages: Message[]
  loading?: boolean
}

export interface WeatherCardProps {
  weather: Weather
}

export interface KnowledgeCardProps {
  sources: string[]
  confidence: number
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  loading: boolean
}

export interface GraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: Array<string | number>
}

// Utility Types
export type MessageRole = 'USER' | 'ASSISTANT'
export type MessageType = 'TEXT' | 'WEATHER' | 'KNOWLEDGE'
export type Theme = 'light' | 'dark'
export type FontSize = 'small' | 'medium' | 'large'