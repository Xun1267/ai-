import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { auth, AuthRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

const router = express.Router()

// 注册
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 检查用户是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册'
      })
    }

    // 创建新用户
    const user = new User({ name, email, password })
    await user.save()

    // 生成JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    )

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      }
    })
  } catch (error) {
    logger.error('注册错误:', error)
    res.status(500).json({
      success: false,
      message: '注册失败，请稍后重试'
    })
  }
})

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 查找用户（包含密码字段）
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      })
    }

    // 验证密码
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      })
    }

    // 生成JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    )

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      }
    })
  } catch (error) {
    logger.error('登录错误:', error)
    res.status(500).json({
      success: false,
      message: '登录失败，请稍后重试'
    })
  }
})

// 获取当前用户信息
router.get('/me', auth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      }
    })
  } catch (error) {
    logger.error('获取用户信息错误:', error)
    res.status(500).json({
      success: false,
      message: '获取用户信息失败'
    })
  }
})

// 登出（客户端处理，服务端记录日志）
router.post('/logout', auth, async (req: AuthRequest, res) => {
  try {
    logger.info(`用户 ${req.user!.email} 登出`)
    res.json({
      success: true,
      message: '登出成功'
    })
  } catch (error) {
    logger.error('登出错误:', error)
    res.status(500).json({
      success: false,
      message: '登出失败'
    })
  }
})

export default router