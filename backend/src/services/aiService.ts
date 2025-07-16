import axios from 'axios'
import { logger } from '../utils/logger'

export interface AIResponse {
  message: string
  emotion?: string
  cbtTechnique?: string
}

export class AIService {
  private apiKey!: string
  private model!: string
  private baseURL!: string
  private initialized: boolean = false

  constructor() {
    // 延迟初始化，在第一次使用时才读取环境变量
  }

  private initialize() {
    if (!this.initialized) {
      this.apiKey = process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY || ''
      this.model = process.env.OPENAI_MODEL || process.env.DEEPSEEK_MODEL || 'gpt-4o-mini'
      this.baseURL = process.env.OPENAI_BASE_URL || process.env.DEEPSEEK_BASE_URL || 'https://api.chatanywhere.tech'
      
      // 调试日志
      console.log('🔧 AI服务配置:')
      console.log(`   API Key: ${this.apiKey ? this.apiKey.substring(0, 10) + '...' : '未设置'}`)
      console.log(`   模型: ${this.model}`)
      console.log(`   基础URL: ${this.baseURL}`)
      
      this.initialized = true
    }
  }

  async generateResponse(userMessage: string, conversationHistory: any[] = []): Promise<AIResponse> {
    // 确保服务已初始化
    this.initialize()
    
    try {
      const systemPrompt = this.buildSystemPrompt()
      const messages = this.buildMessages(systemPrompt, userMessage, conversationHistory)

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages,
          max_tokens: 1000,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      )

      const aiMessage = response.data.choices[0]?.message?.content || '抱歉，我现在无法回复您。'
      
      // 分析情绪和CBT技术
      const analysis = this.analyzeResponse(userMessage, aiMessage)

      return {
        message: aiMessage,
        emotion: analysis.emotion,
        cbtTechnique: analysis.cbtTechnique,
      }
    } catch (error: any) {
      logger.error('AI服务调用失败: ' + (error.message || '未知错误'))
      if (error.response) {
        logger.error('API响应错误: ' + JSON.stringify(error.response.data || {}))
        logger.error('API状态码: ' + (error.response.status || '未知'))
        if (error.response.status === 401) {
          logger.error('API密钥认证失败，请检查DEEPSEEK_API_KEY配置')
        }
      } else if (error.request) {
        logger.error('无API响应，可能是网络问题')
      } else {
        logger.error('API配置错误: ' + (error.message || '未知'))
      }
      
      // 直接抛出错误，不使用备用回复
      throw new Error('AI 服务暂时不可用，请稍后重试')
    }
  }

  private buildSystemPrompt(): string {
    return `你是一位专业的AI心理咨询师，专门运用认知行为疗法(CBT)理论为用户提供心理健康支持。

你的职责：
1. 运用CBT理论帮助用户识别和改变负面思维模式
2. 提供情感支持和专业指导
3. 帮助用户建立健康的应对策略
4. 保持专业、温暖、非评判的态度

CBT核心技术：
- 思维记录：帮助识别自动化思维
- 认知重构：挑战和改变负面思维
- 行为实验：测试负面预期
- 问题解决：制定具体行动计划
- 放松训练：管理焦虑和压力
- 暴露疗法：逐步面对恐惧

回复要求：
1. 保持温暖、专业的语调
2. 使用CBT技术进行指导
3. 提供具体、可操作的建议
4. 避免诊断或开处方
5. 鼓励用户寻求专业帮助（如需要）
6. 回复长度控制在200-400字

重要提醒：
- 如果用户表达自杀或自伤想法，立即建议寻求紧急专业帮助
- 不要提供医疗诊断或药物建议
- 保持专业边界，不涉及个人信息`
  }

  private buildMessages(systemPrompt: string, userMessage: string, history: any[]) {
    const messages = [
      { role: 'system', content: systemPrompt }
    ]

    // 添加对话历史（最近5轮）
    const recentHistory = history.slice(-10)
    for (const msg of recentHistory) {
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })
    }

    // 添加当前用户消息
    messages.push({ role: 'user', content: userMessage })

    return messages
  }

  private analyzeResponse(userMessage: string, aiResponse: string) {
    // 简单的情绪和技术识别逻辑
    const emotions = {
      '焦虑': ['担心', '紧张', '害怕', '恐惧', '不安'],
      '抑郁': ['难过', '沮丧', '绝望', '无助', '空虚'],
      '愤怒': ['生气', '愤怒', '恼火', '烦躁', '愤恨'],
      '压力': ['压力', '疲惫', '累', '忙', '负担'],
    }

    const techniques = {
      '认知重构': ['想法', '思维', '认知', '重新思考'],
      '行为激活': ['行动', '活动', '做些', '尝试'],
      '放松训练': ['放松', '深呼吸', '冥想', '平静'],
      '问题解决': ['解决', '计划', '步骤', '方法'],
    }

    let detectedEmotion = '中性'
    let detectedTechnique = '倾听与共情'

    // 检测情绪
    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => userMessage.includes(keyword))) {
        detectedEmotion = emotion
        break
      }
    }

    // 检测CBT技术
    for (const [technique, keywords] of Object.entries(techniques)) {
      if (keywords.some(keyword => aiResponse.includes(keyword))) {
        detectedTechnique = technique
        break
      }
    }

    return {
      emotion: detectedEmotion,
      cbtTechnique: detectedTechnique,
    }
  }
}

export const aiService = new AIService()