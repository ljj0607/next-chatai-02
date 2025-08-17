import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { ChatInterface } from '@/components/ChatInterface'
import { GET_MESSAGES, SEND_MESSAGE } from '@/graphql/mutations'
import { useConversationStore } from '@/store/conversationStore'

// Mock the store
jest.mock('@/store/conversationStore')
const mockUseConversationStore = useConversationStore as jest.MockedFunction<typeof useConversationStore>

const mocks = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        conversationId: 'test-conv-1'
      }
    },
    result: {
      data: {
        messages: [
          {
            id: '1',
            conversationId: 'test-conv-1',
            content: '你好',
            type: 'TEXT',
            role: 'USER',
            timestamp: '2024-01-01T00:00:00Z',
            metadata: null
          },
          {
            id: '2',
            conversationId: 'test-conv-1',
            content: '你好！我是AI助手，有什么可以帮助您的吗？',
            type: 'TEXT',
            role: 'ASSISTANT',
            timestamp: '2024-01-01T00:00:01Z',
            metadata: null
          }
        ]
      }
    }
  },
  {
    request: {
      query: SEND_MESSAGE,
      variables: {
        input: {
          conversationId: 'test-conv-1',
          content: '今天天气怎么样？',
          type: 'TEXT'
        }
      }
    },
    result: {
      data: {
        sendMessage: {
          userMessage: {
            id: '3',
            conversationId: 'test-conv-1',
            content: '今天天气怎么样？',
            type: 'TEXT',
            role: 'USER',
            timestamp: '2024-01-01T00:00:02Z',
            metadata: null
          },
          botMessage: {
            id: '4',
            conversationId: 'test-conv-1',
            content: '北京当前天气：晴天，温度25°C，湿度60%，风速3m/s',
            type: 'WEATHER',
            role: 'ASSISTANT',
            timestamp: '2024-01-01T00:00:03Z',
            metadata: {
              weather: {
                city: '北京',
                temperature: 25,
                description: '晴天',
                humidity: 60,
                windSpeed: 3,
                icon: '01d'
              }
            }
          }
        }
      }
    }
  }
]

describe('ChatInterface', () => {
  beforeEach(() => {
    mockUseConversationStore.mockReturnValue({
      currentConversation: {
        id: 'test-conv-1',
        title: '测试对话',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        messageCount: 2
      },
      setCurrentConversation: jest.fn(),
      sidebarOpen: true,
      setSidebarOpen: jest.fn(),
      settings: {
        theme: 'light',
        fontSize: 'medium',
        autoScroll: true,
        soundEnabled: false
      },
      updateSettings: jest.fn()
    })
  })

  it('renders chat interface with messages', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface />
      </MockedProvider>
    )

    // 检查标题
    expect(screen.getByText('测试对话')).toBeInTheDocument()
    
    // 检查输入框
    expect(screen.getByPlaceholderText('输入消息...')).toBeInTheDocument()
    
    // 等待消息加载
    await waitFor(() => {
      expect(screen.getByText('你好')).toBeInTheDocument()
      expect(screen.getByText('你好！我是AI助手，有什么可以帮助您的吗？')).toBeInTheDocument()
    })
  })

  it('sends message when form is submitted', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface />
      </MockedProvider>
    )

    const input = screen.getByPlaceholderText('输入消息...')
    const sendButton = screen.getByRole('button')

    // 输入消息
    fireEvent.change(input, { target: { value: '今天天气怎么样？' } })
    
    // 发送消息
    fireEvent.click(sendButton)

    // 检查输入框是否被清空
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('sends message when Enter key is pressed', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface />
      </MockedProvider>
    )

    const input = screen.getByPlaceholderText('输入消息...')

    // 输入消息
    fireEvent.change(input, { target: { value: '测试消息' } })
    
    // 按下 Enter 键
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    // 检查输入框是否被清空
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('shows no conversation message when no conversation is selected', () => {
    mockUseConversationStore.mockReturnValue({
      currentConversation: null,
      setCurrentConversation: jest.fn(),
      sidebarOpen: true,
      setSidebarOpen: jest.fn(),
      settings: {
        theme: 'light',
        fontSize: 'medium',
        autoScroll: true,
        soundEnabled: false
      },
      updateSettings: jest.fn()
    })

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ChatInterface />
      </MockedProvider>
    )

    expect(screen.getByText('选择或创建一个对话开始聊天')).toBeInTheDocument()
  })
})