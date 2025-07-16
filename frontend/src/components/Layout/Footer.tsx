import React from 'react'
import { Layout, Typography, Space, Divider } from 'antd'
import { Heart, Shield, Phone, Mail } from 'lucide-react'

const { Footer: AntFooter } = Layout
const { Text, Link } = Typography

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <Text className="text-xl font-bold text-white">AI心理咨询</Text>
            </div>
            <Text className="text-gray-300 mb-4">
              基于CBT认知行为疗法的专业AI心理咨询平台，为您提供24小时不间断的心理健康支持服务。
            </Text>
            <div className="flex items-center text-gray-300">
              <Shield className="w-4 h-4 mr-2" />
              <Text className="text-gray-300">您的隐私和数据安全是我们的首要关注</Text>
            </div>
          </div>

          {/* 服务信息 */}
          <div>
            <Text className="text-lg font-semibold text-white mb-4 block">服务特色</Text>
            <Space direction="vertical" className="text-gray-300">
              <Text className="text-gray-300">• CBT理论指导</Text>
              <Text className="text-gray-300">• 24小时在线服务</Text>
              <Text className="text-gray-300">• 隐私保护</Text>
              <Text className="text-gray-300">• 个性化建议</Text>
              <Text className="text-gray-300">• 情绪追踪</Text>
            </Space>
          </div>

          {/* 联系方式 */}
          <div>
            <Text className="text-lg font-semibold text-white mb-4 block">联系我们</Text>
            <Space direction="vertical" className="text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <Text className="text-gray-300">400-123-4567</Text>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <Text className="text-gray-300">support@ai-psychology.com</Text>
              </div>
            </Space>
          </div>
        </div>

        <Divider className="border-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <Text className="text-gray-400 text-sm">
            © 2024 AI心理咨询平台. 保留所有权利.
          </Text>
          <Space className="text-gray-400 text-sm">
            <Link className="text-gray-400 hover:text-white">隐私政策</Link>
            <Link className="text-gray-400 hover:text-white">服务条款</Link>
            <Link className="text-gray-400 hover:text-white">免责声明</Link>
          </Space>
        </div>

        <div className="mt-4 text-center">
          <Text className="text-xs text-gray-500">
            本平台仅提供心理健康信息和支持，不能替代专业医疗诊断和治疗。如有严重心理问题，请及时寻求专业医疗帮助。
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer