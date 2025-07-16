import React from 'react'
import { Card, Typography, Empty } from 'antd'

const { Title } = Typography

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Title level={2} className="mb-6">对话记录</Title>
        <Card>
          <Empty description="对话记录功能开发中..." />
        </Card>
      </div>
    </div>
  )
}

export default History