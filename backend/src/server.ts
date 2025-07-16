import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// 导入配置和工具
import { connectDatabase } from './config/database'
import { logger } from './utils/logger'

// 导入路由
import authRoutes from './routes/auth'
import chatRoutes from './routes/chat'
import userRoutes from './routes/users'

// 加载环境变量
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 创建日志目录
const logsDir = path.join(__dirname, '../../logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

// 安全中间件
app.use(helmet())

// CORS配置
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))

// 请求速率限制
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15分钟
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 限制每个IP 100个请求
  message: {
    success: false,
    message: '请求过于频繁，请稍后再试'
  }
})
app.use(limiter)

// 解析JSON请求体
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 请求日志中间件
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'AI心理咨询服务运行正常',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API路由
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/users', userRoutes)

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在'
  })
})

// 全局错误处理中间件
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('服务器错误:', error)
  
  res.status(error.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? '服务器内部错误' 
      : error.message || '服务器内部错误',
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  })
})

// 启动服务器
const startServer = async () => {
  try {
    // 连接数据库
    await connectDatabase()
    
    // 启动服务器
    app.listen(PORT, () => {
      logger.info(`🚀 AI心理咨询服务器启动成功`)
      logger.info(`📍 服务地址: http://localhost:${PORT}`)
      logger.info(`🌍 环境: ${process.env.NODE_ENV || 'development'}`)
      logger.info(`💾 数据库: ${process.env.MONGODB_URI}`)
      logger.info(`🤖 AI模型: ${process.env.DEEPSEEK_MODEL || 'deepseek-chat'}`)
    })
  } catch (error) {
    logger.error('服务器启动失败:', error)
    process.exit(1)
  }
}

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('收到SIGTERM信号，正在关闭服务器...')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('收到SIGINT信号，正在关闭服务器...')
  process.exit(0)
})

startServer()