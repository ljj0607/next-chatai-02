'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Send as SendIcon,
  Menu as MenuIcon
} from '@mui/icons-material'
import { useMutation, useQuery } from '@apollo/client'
import { MessageList } from './MessageList'
import { SEND_MESSAGE, GET_MESSAGES } from '@/graphql/mutations'
import { useConversationStore } from '@/store/conversationStore'
import { WeatherCard } from './WeatherCard'
import { KnowledgeCard } from './KnowledgeCard'

interface Message {
  id: string
  content: string
  role: 'USER' | 'ASSISTANT'
  type: 'TEXT' | 'WEATHER' | 'KNOWLEDGE'
  timestamp: string
  metadata?: any
}

export function ChatInterface() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentConversation, setCurrentConversation } = useConversationStore()
  
  const { data: messagesData, loading: messagesLoading, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId: currentConversation?.id || '' },
    skip: !currentConversation?.id,
    pollInterval: 5000
  })
  
  const [sendMessage, { loading: sendLoading }] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      setIsTyping(false)
      refetch()
    },
    onError: (error) => {
      setIsTyping(false)
      console.error('Send message error:', error)
    }
  })
  
  const messages: Message[] = messagesData?.messages || []
  
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = async () => {
    if (!message.trim() || sendLoading) return
    
    if (!currentConversation) {
      // Create new conversation if none exists
      const newConv = {
        id: `conv_${Date.now()}`,
        title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messageCount: 0
      }
      setCurrentConversation(newConv)
    }
    
    const messageText = message
    setMessage('')
    setIsTyping(true)
    
    try {
      await sendMessage({
        variables: {
          input: {
            conversationId: currentConversation?.id || `conv_${Date.now()}`,
            content: messageText,
            type: 'TEXT'
          }
        }
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setIsTyping(false)
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const renderMessage = (msg: Message) => {
    const isUser = msg.role === 'USER'
    
    return (
      <Box
        key={msg.id}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2
        }}
      >
        <Paper
          sx={{
            p: 2,
            maxWidth: '70%',
            bgcolor: isUser ? 'primary.main' : 'grey.100',
            color: isUser ? 'white' : 'text.primary',
            borderRadius: 2,
            borderTopRightRadius: isUser ? 1 : 2,
            borderTopLeftRadius: isUser ? 2 : 1
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            {msg.content}
          </Typography>
          
          {msg.type === 'WEATHER' && msg.metadata?.weather && (
            <WeatherCard weather={msg.metadata.weather} />
          )}
          
          {msg.type === 'KNOWLEDGE' && msg.metadata && (
            <KnowledgeCard 
              sources={msg.metadata.sources || []} 
              confidence={msg.metadata.confidence || 0}
            />
          )}
          
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    )
  }
  
  if (!currentConversation) {
    return (
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3 
      }}>
        <Typography variant="h5" color="text.secondary">
          选择或创建一个对话开始聊天
        </Typography>
      </Box>
    )
  }
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {currentConversation.title}
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messagesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {messages.map(renderMessage)}
            
            {isTyping && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Paper sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI正在思考...
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>
      
      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            disabled={sendLoading}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim() || sendLoading}
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&.Mui-disabled': { bgcolor: 'grey.300' }
            }}
          >
            {sendLoading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}