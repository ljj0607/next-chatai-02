'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Chat as ChatIcon,
  WbSunny as WeatherIcon,
  MenuBook as KnowledgeIcon,
  Assessment as AnalyticsIcon
} from '@mui/icons-material'
import { ChatInterface } from '@/components/ChatInterface'
import { ConversationSidebar } from '@/components/ConversationSidebar'
import { useConversationStore } from '@/store/conversationStore'

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [showChat, setShowChat] = useState(false)
  const { currentConversation } = useConversationStore()

  const features = [
    {
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      title: '智能对话',
      description: '基于先进AI模型的自然语言对话，支持多轮上下文理解'
    },
    {
      icon: <WeatherIcon sx={{ fontSize: 40 }} />,
      title: '天气查询',
      description: '实时获取全球城市天气信息，包括温度、湿度、风速等'
    },
    {
      icon: <KnowledgeIcon sx={{ fontSize: 40 }} />,
      title: '知识问答',
      description: '基于RAG技术的知识库检索，提供准确的信息查询'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: '数据分析',
      description: '智能数据分析和可视化，帮助您更好地理解信息'
    }
  ]

  if (showChat || currentConversation) {
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {!isMobile && <ConversationSidebar />}
        <Box sx={{ flex: 1 }}>
          <ChatInterface />
        </Box>
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ChatAI 智能助手
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          基于AI的智能聊天工具
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          集成天气查询、知识问答、数据分析等多种功能的智能对话系统
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowChat(true)}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          开始对话
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom>
          技术特性
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🚀 边缘计算
            </Typography>
            <Typography variant="body2">
              基于Cloudflare Workers的全球边缘部署
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🧠 多模型支持
            </Typography>
            <Typography variant="body2">
              集成OpenAI GPT和Anthropic Claude
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              📊 GraphQL API
            </Typography>
            <Typography variant="body2">
              现代化的API接口设计和类型安全
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}