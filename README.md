# Next ChatAI - 前端界面

基于 Next.js、GraphQL 的智能聊天工具前端界面，提供现代化的用户体验。

## 功能特性

- 🎨 **现代化界面**: 基于 Material-UI 的响应式设计
- 🔄 **实时通信**: GraphQL 订阅和轮询更新
- 💬 **智能对话**: 支持多轮对话和上下文理解
- 🌤️ **天气展示**: 可视化天气信息卡片
- 🧠 **知识问答**: RAG 检索结果展示
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🌙 **主题切换**: 支持明暗主题模式
- 💾 **状态持久化**: 本地存储对话状态

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 组件库**: Material-UI (MUI) v5
- **状态管理**: Zustand
- **GraphQL 客户端**: Apollo Client
- **样式方案**: Emotion (CSS-in-JS)
- **类型检查**: TypeScript
- **代码生成**: GraphQL Code Generator
- **测试框架**: Jest + React Testing Library

## 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone https://github.com/ljj0607/next-chatai-02.git
cd next-chatai-02

# 安装依赖
npm install

# 复制环境变量模板
cp .env.local.example .env.local
```

### 2. 配置环境变量

编辑 `.env.local` 文件：

```env
# GraphQL API 端点
GRAPHQL_ENDPOINT=http://localhost:8787/graphql

# 生产环境端点
# GRAPHQL_ENDPOINT=https://your-workers-domain.your-subdomain.workers.dev/graphql
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 4. 生成 GraphQL 类型

```bash
# 根据 GraphQL Schema 生成类型定义
npm run codegen
```

### 5. 构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页
│   └── apollo-wrapper.tsx # Apollo 客户端配置
├── components/            # React 组件
│   ├── ChatInterface.tsx # 聊天界面主组件
│   ├── ConversationSidebar.tsx # 对话侧边栏
│   ├── MessageList.tsx    # 消息列表
│   ├── WeatherCard.tsx    # 天气信息卡片
│   └── KnowledgeCard.tsx  # 知识检索卡片
├── store/                 # 状态管理
│   └── conversationStore.ts # 对话状态存储
├── graphql/               # GraphQL 相关
│   └── mutations.ts       # 查询和变更定义
├── theme/                 # 主题配置
│   └── index.ts          # Material-UI 主题
└── types/                 # TypeScript 类型定义
    └── index.ts
```

## 主要组件说明

### ChatInterface
聊天界面的核心组件，负责：
- 消息发送和接收
- 实时消息更新
- 输入框和发送按钮
- 消息类型处理（文本、天气、知识）

### ConversationSidebar
对话管理侧边栏，功能包括：
- 对话列表展示
- 新建对话
- 删除对话
- 对话状态管理

### WeatherCard
天气信息展示卡片：
- 温度和天气描述
- 湿度、风速等详细信息
- 根据温度动态调整颜色
- 天气图标展示

### KnowledgeCard
知识检索结果卡片：
- 置信度可视化
- 参考来源列表
- 匹配度评分

## API 集成

项目通过 GraphQL 与后端服务通信，主要操作包括：

### 查询操作
- `GetConversations`: 获取对话列表
- `GetMessages`: 获取对话消息
- `GetWeather`: 获取天气信息
- `SearchKnowledge`: 搜索知识库

### 变更操作
- `SendMessage`: 发送消息
- `CreateConversation`: 创建对话
- `DeleteConversation`: 删除对话
- `AddKnowledge`: 添加知识条目

## 状态管理

使用 Zustand 进行状态管理：

```typescript
// 对话状态
const { currentConversation, setCurrentConversation } = useConversationStore()

// 设置状态
const { settings, updateSettings } = useConversationStore()
```

## 样式和主题

### 自定义主题
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#f50057' }
  },
  typography: {
    fontFamily: 'system-ui, sans-serif'
  }
})
```

### 响应式设计
```typescript
const isMobile = useMediaQuery(theme.breakpoints.down('md'))
```

## 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

### 测试示例
```typescript
import { render, screen } from '@testing-library/react'
import { ChatInterface } from '@/components/ChatInterface'

test('renders chat interface', () => {
  render(<ChatInterface />)
  expect(screen.getByPlaceholderText('输入消息...')).toBeInTheDocument()
})
```

## 开发步骤详解

### 1. 项目初始化
- 创建 Next.js 项目
- 配置 TypeScript
- 安装必要依赖

### 2. UI 框架设置
- 集成 Material-UI
- 配置主题系统
- 设置响应式布局

### 3. GraphQL 集成
- 配置 Apollo Client
- 定义查询和变更
- 设置错误处理

### 4. 组件开发
- 聊天界面组件
- 消息组件
- 特殊卡片组件

### 5. 状态管理
- 设置 Zustand store
- 实现状态持久化
- 管理 UI 状态

### 6. 优化和测试
- 性能优化
- 单元测试
- 集成测试

## 部署指南

### Vercel 部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 自定义部署
```bash
# 构建
npm run build

# 导出静态文件（可选）
npm run export
```

## 环境变量配置

### 开发环境
```env
GRAPHQL_ENDPOINT=http://localhost:8787/graphql
NEXT_PUBLIC_APP_NAME=ChatAI Dev
```

### 生产环境
```env
GRAPHQL_ENDPOINT=https://your-api.workers.dev/graphql
NEXT_PUBLIC_APP_NAME=ChatAI
```

## 性能优化

### 代码分割
```typescript
// 动态导入组件
const WeatherCard = dynamic(() => import('./WeatherCard'), {
  loading: () => <CircularProgress />
})
```

### 图片优化
```typescript
import Image from 'next/image'

<Image
  src="/weather-icon.png"
  alt="Weather"
  width={40}
  height={40}
  priority
/>
```

## 故障排除

### 常见问题

1. **GraphQL 连接失败**
   - 检查后端服务是否启动
   - 验证 GRAPHQL_ENDPOINT 配置
   - 检查 CORS 设置

2. **消息不显示**
   - 检查 Apollo Client 缓存
   - 验证 GraphQL 查询语法
   - 查看浏览器控制台错误

3. **样式问题**
   - 检查 Material-UI 主题配置
   - 验证 CSS 类名
   - 确认响应式断点

### 调试技巧

```typescript
// Apollo Client 调试
const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  connectToDevTools: true // 开发工具
})

// 组件调试
const ChatInterface = () => {
  console.log('Rendering ChatInterface')
  // ...
}
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

MIT License