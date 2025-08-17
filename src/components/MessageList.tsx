'use client'

import React from 'react'
import { Box, Typography, Paper, Chip } from '@mui/material'
import { WeatherCard } from './WeatherCard'
import { KnowledgeCard } from './KnowledgeCard'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  content: string
  role: 'USER' | 'ASSISTANT'
  type: 'TEXT' | 'WEATHER' | 'KNOWLEDGE'
  timestamp: string
  metadata?: any
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'WEATHER':
        return (
          <>
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {message.metadata?.weather && (
              <WeatherCard weather={message.metadata.weather} />
            )}
          </>
        )
      case 'KNOWLEDGE':
        return (
          <>
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {message.metadata && (
              <KnowledgeCard 
                sources={message.metadata.sources || []} 
                confidence={message.metadata.confidence || 0}
              />
            )}
          </>
        )
      default:
        return <ReactMarkdown>{message.content}</ReactMarkdown>
    }
  }
  
  const getMessageTypeChip = (type: string) => {
    const typeMap = {
      TEXT: { label: '文本', color: 'default' as const },
      WEATHER: { label: '天气', color: 'info' as const },
      KNOWLEDGE: { label: '知识', color: 'success' as const }
    }
    
    const config = typeMap[type as keyof typeof typeMap] || typeMap.TEXT
    return (
      <Chip 
        label={config.label} 
        size="small" 
        color={config.color}
        sx={{ ml: 1, height: 18, fontSize: '0.7rem' }}
      />
    )
  }
  
  return (
    <Box sx={{ p: 2 }}>
      {messages.map((message) => {
        const isUser = message.role === 'USER'
        
        return (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '75%',
                bgcolor: isUser ? 'primary.main' : 'grey.50',
                color: isUser ? 'white' : 'text.primary',
                borderRadius: 2,
                borderTopRightRadius: isUser ? 0.5 : 2,
                borderTopLeftRadius: isUser ? 2 : 0.5,
                position: 'relative',
                '& .message-content': {
                  '& p': { margin: 0 },
                  '& p + p': { marginTop: 1 },
                  '& pre': {
                    bgcolor: isUser ? 'rgba(255,255,255,0.1)' : 'grey.100',
                    p: 1,
                    borderRadius: 1,
                    overflow: 'auto'
                  },
                  '& code': {
                    bgcolor: isUser ? 'rgba(255,255,255,0.1)' : 'grey.100',
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontSize: '0.9em'
                  },
                  '& blockquote': {
                    borderLeft: isUser ? '3px solid rgba(255,255,255,0.3)' : '3px solid #ddd',
                    pl: 2,
                    ml: 0,
                    fontStyle: 'italic'
                  }
                }
              }}
            >
              <Box className="message-content">
                {renderMessageContent(message)}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mt: 1,
                opacity: 0.8
              }}>
                <Typography variant="caption">
                  {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
                
                {!isUser && getMessageTypeChip(message.type)}
              </Box>
            </Paper>
          </Box>
        )
      })}
    </Box>
  )
}