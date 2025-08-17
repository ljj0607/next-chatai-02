'use client'

import React, { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Divider,
  Chip
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CONVERSATIONS, CREATE_CONVERSATION, DELETE_CONVERSATION } from '@/graphql/mutations'
import { useConversationStore } from '@/store/conversationStore'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export function ConversationSidebar() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const { currentConversation, setCurrentConversation } = useConversationStore()
  
  const { data, loading, refetch } = useQuery(GET_CONVERSATIONS, {
    pollInterval: 10000
  })
  
  const [createConversation] = useMutation(CREATE_CONVERSATION, {
    onCompleted: (data) => {
      setCurrentConversation(data.createConversation)
      setOpen(false)
      setTitle('')
      refetch()
    }
  })
  
  const [deleteConversation] = useMutation(DELETE_CONVERSATION, {
    onCompleted: () => {
      refetch()
    }
  })
  
  const conversations: Conversation[] = data?.conversations || []
  
  const handleCreateConversation = () => {
    createConversation({
      variables: {
        title: title.trim() || '新对话'
      }
    })
  }
  
  const handleDeleteConversation = (id: string) => {
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
    }
    deleteConversation({
      variables: { id }
    })
  }
  
  return (
    <>
      <Paper 
        sx={{ 
          width: 320, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 0,
          borderRight: 1,
          borderColor: 'divider'
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChatIcon color="primary" />
              对话列表
            </Typography>
            <IconButton size="small">
              <SettingsIcon />
            </IconButton>
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            新建对话
          </Button>
        </Box>
        
        {/* Conversation List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">加载中...</Typography>
            </Box>
          ) : conversations.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">暂无对话</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {conversations.map((conversation) => (
                <ListItem
                  key={conversation.id}
                  button
                  selected={currentConversation?.id === conversation.id}
                  onClick={() => setCurrentConversation(conversation)}
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      bgcolor: 'primary.50',
                      borderRight: 3,
                      borderRightColor: 'primary.main'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" noWrap>
                        {conversation.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={`${conversation.messageCount} 消息`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(new Date(conversation.updatedAt), {
                            addSuffix: true,
                            locale: zhCN
                          })}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteConversation(conversation.id)
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        
        {/* Footer */}
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            ChatAI v1.0.0
          </Typography>
        </Box>
      </Paper>
      
      {/* Create Conversation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>创建新对话</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="对话标题"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入对话标题(可选)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleCreateConversation} variant="contained">
            创建
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}