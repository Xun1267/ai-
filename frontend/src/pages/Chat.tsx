import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { addMessage, setTyping, Message } from '../store/slices/chatSlice'
import { chatService } from '../services/chatService'
import { Bot, User, Heart, Send } from 'lucide-react'

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const { messages, isTyping } = useSelector((state: RootState) => state.chat)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    dispatch(addMessage(userMessage))
    setInputValue('')
    setLoading(true)
    dispatch(setTyping(true))

    try {
      const response = await chatService.sendMessage(inputValue.trim())
      
      if (response.success && response.data) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.data.message.content,
          sender: 'ai',
          timestamp: new Date().toISOString(),
          emotion: response.data.message.emotion,
          cbtTechnique: response.data.message.cbtTechnique,
        }

        dispatch(addMessage(aiMessage))
      } else {
        throw new Error(response.message)
      }
    } catch (error: any) {
      console.error('发送消息失败:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，我现在无法回复您。请检查网络连接或稍后再试。',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }
      dispatch(addMessage(errorMessage))
    } finally {
      setLoading(false)
      dispatch(setTyping(false))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user'
    
    return (
      <div key={message.id} className={`message-item ${isUser ? 'user' : ''}`}>
        <div className={`message-avatar ${isUser ? 'user' : 'ai'}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
          <div>{message.content}</div>
          {message.cbtTechnique && (
            <div className="message-cbt">
              <Heart size={10} />
              CBT技术: {message.cbtTechnique}
            </div>
          )}
          <div className="message-time">
            {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-window">
      {/* 头部 */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          <Bot size={24} />
        </div>
        <div className="chat-header-info">
          <h3>AI心理咨询师</h3>
          <p>基于CBT理论为您提供专业指导</p>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-avatar">
              <Heart size={40} />
            </div>
            <div className="welcome-title">
              {isAuthenticated ? "开始您的心理咨询之旅" : "欢迎体验AI心理咨询"}
            </div>
            <div className="welcome-subtitle">
              您好！我是您的AI心理咨询师。请告诉我您今天的感受或遇到的困扰，我会运用CBT理论为您提供专业的指导和支持。
            </div>
            {!isAuthenticated && (
              <div className="welcome-tip">
                💡 提示：您正在使用访客模式，对话记录不会保存
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            {isTyping && (
              <div className="message-item">
                <div className="message-avatar ai">
                  <Bot size={18} />
                </div>
                <div className="message-bubble ai">
                  <div className="typing-indicator">
                    <span>正在思考</span>
                    <div className="typing-dots">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="chat-input">
        <div className="input-container">
          <textarea
            className="input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="请描述您的感受或困扰..."
            disabled={loading}
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
          >
            {loading ? (
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            ) : (
              <>
                <Send size={16} />
                <span style={{ marginLeft: '8px' }}>发送</span>
              </>
            )}
          </button>
        </div>
        <div className="input-tip">
          按 Enter 发送，Shift + Enter 换行
        </div>
      </div>
    </div>
  )
}

export default Chat