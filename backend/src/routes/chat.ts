import express from 'express'
import { Conversation } from '../models/Conversation'
import { AIService } from '../services/aiService'
import { auth, optionalAuth, AuthRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

const router = express.Router()
const aiService = new AIService()

// 发送消息（支持匿名和登录用户）
router.post('/send', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { message, conversationId } = req.body
    const userId = req.user?._id

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '消息内容不能为空'
      })
    }

    let conversation
    
    if (userId && conversationId) {
      // 登录用户，查找现有对话
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId: userId
      })
    }

    // 如果没有找到对话且用户已登录，创建新对话
    if (!conversation && userId) {
      conversation = new Conversation({
        userId: userId,
        title: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
        messages: []
      })
    }

    // 构建对话历史（包括当前消息）
    const conversationHistory = conversation ? [...conversation.messages] : []
    conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    })

    // 调用AI服务生成回复
    const aiResponse = await aiService.generateResponse(message, conversationHistory)

    // 添加AI回复到历史
    const assistantMessage = {
      role: 'assistant' as const,
      content: aiResponse.message,
      timestamp: new Date().toISOString(),
      emotion: aiResponse.emotion,
      cbtTechnique: aiResponse.cbtTechnique
    }

    if (conversation) {
      // 保存到数据库（仅限登录用户）
      conversation.messages.push(
        {
          role: 'user',
          content: message,
          timestamp: new Date()
        },
        assistantMessage
      )
      await conversation.save()
    }

    res.json({
      success: true,
      data: {
        message: assistantMessage,
        conversationId: conversation?._id,
        isGuest: !userId
      }
    })

  } catch (error) {
    logger.error('发送消息错误:', error)
    res.status(500).json({
      success: false,
      message: 'AI服务暂时不可用，请稍后重试'
    })
  }
})

// 获取对话历史（仅限登录用户）
router.get('/conversations', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!._id
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const conversations = await Conversation.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('title createdAt updatedAt isActive')

    const total = await Conversation.countDocuments({ userId })

    res.json({
      success: true,
      data: {
        conversations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    logger.error('获取对话历史错误:', error)
    res.status(500).json({
      success: false,
      message: '获取对话历史失败'
    })
  }
})

// 获取特定对话详情（仅限登录用户）
router.get('/conversations/:id', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!._id
    const conversationId = req.params.id

    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: userId
    })

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: '对话不存在'
      })
    }

    res.json({
      success: true,
      data: { conversation }
    })
  } catch (error) {
    logger.error('获取对话详情错误:', error)
    res.status(500).json({
      success: false,
      message: '获取对话详情失败'
    })
  }
})

// 创建新对话（仅限登录用户）
router.post('/conversations', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!._id
    const { title } = req.body

    const conversation = new Conversation({
      userId: userId,
      title: title || '新对话',
      messages: []
    })

    await conversation.save()

    res.status(201).json({
      success: true,
      data: { conversation }
    })
  } catch (error) {
    logger.error('创建对话错误:', error)
    res.status(500).json({
      success: false,
      message: '创建对话失败'
    })
  }
})

// 删除对话（仅限登录用户）
router.delete('/conversations/:id', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!._id
    const conversationId = req.params.id

    const conversation = await Conversation.findOneAndDelete({
      _id: conversationId,
      userId: userId
    })

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: '对话不存在'
      })
    }

    res.json({
      success: true,
      message: '对话已删除'
    })
  } catch (error) {
    logger.error('删除对话错误:', error)
    res.status(500).json({
      success: false,
      message: '删除对话失败'
    })
  }
})

export default router