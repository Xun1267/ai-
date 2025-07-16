import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Heart, Sparkles } from 'lucide-react'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleStartChat = () => {
    setIsClicked(true)
    setTimeout(() => {
      navigate('/chat')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="text-center relative z-10">
        {/* 主按钮区域 */}
        <div 
          className={`relative transition-all duration-500 ${isClicked ? 'scale-110' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 光环效果 */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl transition-all duration-300 ${isHovered ? 'scale-125 opacity-30' : 'scale-100'}`}></div>
          
          {/* 主按钮 */}
          <button
            onClick={handleStartChat}
            className={`
              relative bg-gradient-to-r from-blue-500 to-purple-600 
              text-white font-medium text-xl px-16 py-6 rounded-full 
              shadow-2xl transition-all duration-300 transform
              hover:shadow-3xl hover:scale-105 active:scale-95
              flex items-center gap-4 group
              ${isClicked ? 'animate-pulse' : ''}
            `}
          >
            {/* 图标 */}
            <div className="relative">
              <MessageCircle className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
              {isHovered && (
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-ping" />
              )}
            </div>
            
            {/* 文字 */}
            <span className="relative">
              {isClicked ? '正在进入...' : '开始心理咨询'}
            </span>

            {/* 心形装饰 */}
            <Heart className={`w-6 h-6 text-pink-300 transition-all duration-300 ${isHovered ? 'scale-110 text-pink-200' : ''}`} />
          </button>

          {/* 底部提示文字 */}
          <div className={`mt-8 transition-all duration-500 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-2'}`}>
            <p className="text-gray-600 text-lg font-light">
              {isHovered ? '✨ 点击开始您的心理健康之旅' : '💝 温暖陪伴，专业倾听'}
            </p>
          </div>
        </div>

        {/* 浮动装饰元素 */}
        <div className="absolute top-20 left-20 animate-bounce delay-500">
          <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce delay-1000">
          <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-700">
          <div className="w-1 h-1 bg-pink-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  )
}

export default Home