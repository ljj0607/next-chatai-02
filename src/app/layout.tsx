import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from './apollo-wrapper'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatAI - 智能聊天助手',
  description: '基于AI的智能聊天工具，支持天气查询和知识问答',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}