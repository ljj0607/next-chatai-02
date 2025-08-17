'use client'

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Source as SourceIcon,
  Psychology as KnowledgeIcon,
  TrendingUp as ConfidenceIcon
} from '@mui/icons-material'

interface KnowledgeCardProps {
  sources: string[]
  confidence: number
}

export function KnowledgeCard({ sources, confidence }: KnowledgeCardProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'success'
    if (conf >= 0.6) return 'warning' 
    return 'error'
  }
  
  const getConfidenceText = (conf: number) => {
    if (conf >= 0.8) return '高置信度'
    if (conf >= 0.6) return '中等置信度'
    return '低置信度'
  }
  
  return (
    <Card 
      sx={{ 
        mt: 1,
        bgcolor: 'primary.50',
        border: '1px solid',
        borderColor: 'primary.200'
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* 头部 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <KnowledgeIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600 }}>
            知识库检索结果
          </Typography>
        </Box>
        
        {/* 置信度 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ConfidenceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                匹配置信度
              </Typography>
            </Box>
            <Chip 
              label={getConfidenceText(confidence)}
              size="small"
              color={getConfidenceColor(confidence)}
              variant="outlined"
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={confidence * 100}
            color={getConfidenceColor(confidence)}
            sx={{ height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {Math.round(confidence * 100)}%
          </Typography>
        </Box>
        
        {/* 来源列表 */}
        {sources.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <SourceIcon sx={{ fontSize: 14 }} />
              参考来源 ({sources.length})
            </Typography>
            <List dense sx={{ p: 0 }}>
              {sources.slice(0, 3).map((source, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Box 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        bgcolor: 'primary.main', 
                        borderRadius: '50%' 
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {source.length > 50 ? source.substring(0, 50) + '...' : source}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              {sources.length > 3 && (
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }} />
                  <ListItemText 
                    primary={
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        及其他 {sources.length - 3} 个来源...
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}