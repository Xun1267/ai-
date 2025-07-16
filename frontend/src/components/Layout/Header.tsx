import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Avatar, Dropdown, Space } from 'antd'
import { MessageCircle, User, LogOut, History, Home } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User className="w-4 h-4" />,
      label: '个人资料',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'history',
      icon: <History className="w-4 h-4" />,
      label: '对话记录',
      onClick: () => navigate('/history'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  const menuItems = [
    {
      key: 'home',
      icon: <Home className="w-4 h-4" />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'chat',
      icon: <MessageCircle className="w-4 h-4" />,
      label: <Link to="/chat">开始咨询</Link>,
    },
  ]

  return (
    <AntHeader className="bg-white shadow-sm border-b px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8" title="返回首页">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-white" aria-label="AI心理咨询图标" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI心理咨询
          </span>
        </Link>
        
        <Menu
          mode="horizontal"
          items={menuItems}
          className="border-none bg-transparent"
          style={{ minWidth: 0, flex: 'auto' }}
        />
      </div>

      <div className="flex items-center">
        {isAuthenticated ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors" title="用户菜单">
              <Avatar size={32} icon={<User />} alt="用户头像" />
              <span className="text-gray-700">{user?.name}</span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Link to="/login">
              <Button type="text">登录</Button>
            </Link>
          </Space>
        )}
      </div>
    </AntHeader>
  )
}

export default Header