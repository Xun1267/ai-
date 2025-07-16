import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import History from './pages/History'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

const { Content } = Layout

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const location = useLocation()
  
  // 主页面和聊天页面使用独立布局，不显示Header和Footer
  const isCleanLayout = location.pathname === '/chat' || location.pathname === '/'

  if (isCleanLayout) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    )
  }

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/history" 
            element={isAuthenticated ? <History /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  )
}

export default App