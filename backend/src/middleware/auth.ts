import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, IUser } from '../models/User'
import { logger } from '../utils/logger'

export interface AuthRequest extends Request {
  user?: IUser
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: '访问被拒绝，请提供有效的token' 
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '用户不存在' 
      })
    }

    req.user = user
    next()
  } catch (error) {
    logger.error('认证中间件错误:', error)
    res.status(401).json({ 
      success: false, 
      message: 'Token无效' 
    })
  }
}

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
      const user = await User.findById(decoded.userId)
      if (user) {
        req.user = user
      }
    }
    
    next()
  } catch (error) {
    // 可选认证失败时不阻止请求继续
    next()
  }
}