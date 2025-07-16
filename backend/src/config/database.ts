import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-psychology'
    
    await mongoose.connect(mongoURI)
    
    logger.info('MongoDB 连接成功')
  } catch (error) {
    logger.error('MongoDB 连接失败:', error)
    process.exit(1)
  }
}

// 监听连接事件
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB 连接断开')
})

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB 连接错误:', error)
})