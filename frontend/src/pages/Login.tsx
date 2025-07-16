import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd'
import { Mail, Lock, LogIn } from 'lucide-react'
import { useAppDispatch } from '../store/hooks'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authService } from '../services/chatService'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    dispatch(loginStart())

    try {
      const response = await authService.login(values.email, values.password)
      
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }))
      
      message.success('登录成功！')
      navigate('/chat')
    } catch (error: any) {
      dispatch(loginFailure())
      message.error(error.response?.data?.message || '登录失败，请检查邮箱和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <Title level={2} className="mb-2">欢迎回来</Title>
          <Text className="text-gray-600">登录您的账户开始心理咨询</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="邮箱地址"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input 
              prefix={<Mail className="w-4 h-4 text-gray-400" />}
              placeholder="请输入邮箱地址"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位字符' }
            ]}
          >
            <Input.Password 
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full h-12 text-lg"
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider>或</Divider>

        <div className="text-center">
          <Text className="text-gray-600">
            还没有账户？{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              立即注册
            </Link>
          </Text>
        </div>

        <div className="mt-6 text-center">
          <Text className="text-xs text-gray-500">
            登录即表示您同意我们的{' '}
            <Link to="/terms" className="text-blue-500">服务条款</Link>
            {' '}和{' '}
            <Link to="/privacy" className="text-blue-500">隐私政策</Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Login