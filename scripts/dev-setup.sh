#!/bin/bash

set -e

echo "🎆 初始化 Next.js ChatAI 开发环境..."

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装 Node.js (https://nodejs.org/)"
    exit 1
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "📄 创建环境变量文件..."
    cp .env.local.example .env.local
    echo "⚠️  请编辑 .env.local 文件并填入你的 GraphQL 端点"
fi

# 生成 GraphQL 类型
echo "🔄 生成 GraphQL 类型..."
if command -v wrangler &> /dev/null; then
    echo "检测到后端服务，正在生成类型..."
    npm run codegen || echo "⚠️  无法连接到后端服务，请先启动后端服务"
else
    echo "⚠️  未检测到 Wrangler，跳过类型生成"
fi

echo "✅ 开发环境设置完成！"
echo "🚀 现在你可以运行: npm run dev"
echo "🔗 访问: http://localhost:3000"