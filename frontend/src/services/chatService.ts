import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// 请求拦截器 - 添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface ChatResponse {
  message: string
  emotion?: string
  cbtTechnique?: string
  sessionId: string
}

// 聊天服务
export const chatService = {
  // 发送消息
  sendMessage: async (message: string, conversationId?: string) => {
    const response = await api.post('/chat/send', { 
      message,
      conversationId 
    })
    return response.data
  },

  // 获取对话历史
  getConversations: async (page = 1, limit = 10) => {
    const response = await api.get('/chat/conversations', {
      params: { page, limit }
    })
    return response.data
  },

  // 获取特定对话详情
  getConversation: async (conversationId: string) => {
    const response = await api.get(`/chat/conversations/${conversationId}`)
    return response.data
  },

  // 创建新对话
  createConversation: async (title?: string) => {
    const response = await api.post('/chat/conversations', { title })
    return response.data
  },

  // 删除对话
  deleteConversation: async (conversationId: string) => {
    const response = await api.delete(`/chat/conversations/${conversationId}`)
    return response.data
  }
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

export const userService = {
  updateProfile: async (data: any) => {
    const response = await api.put('/user/profile', data)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/user/profile')
    return response.data
  },
}

export default api