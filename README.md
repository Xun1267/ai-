# AI心理咨询网站

基于CBT理论的AI心理咨询平台，为用户提供专业的心理健康支持。

## 技术架构

### 前端 (Frontend)
- **框架**: React.js + TypeScript
- **UI库**: Ant Design
- **状态管理**: Redux Toolkit
- **样式**: Tailwind CSS
- **构建工具**: Vite

### 后端 (Backend)
- **运行环境**: Node.js
- **框架**: Express.js
- **数据库**: MongoDB
- **身份验证**: JWT
- **AI服务**: OpenAI API

## 项目结构

```
ai-psychology-counseling/
├── frontend/                 # 前端应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── store/          # 状态管理
│   │   ├── services/       # API服务
│   │   ├── utils/          # 工具函数
│   │   └── types/          # TypeScript类型定义
│   ├── public/
│   └── package.json
├── backend/                 # 后端API
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由定义
│   │   ├── middleware/     # 中间件
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   └── package.json
└── docs/                   # 项目文档
```

## 核心功能

### 1. 用户管理
- 用户注册/登录
- 个人资料管理
- 隐私设置

### 2. AI对话系统
- 实时对话界面
- CBT理论指导
- 情绪识别与分析
- 个性化建议

### 3. 数据管理
- 对话历史记录
- 情绪变化追踪
- 进度评估报告

### 4. 安全与隐私
- 数据加密存储
- 用户隐私保护
- 安全的API通信

## 开发计划

1. **第一阶段**: 基础架构搭建
2. **第二阶段**: 用户系统开发
3. **第三阶段**: AI对话功能实现
4. **第四阶段**: CBT理论集成
5. **第五阶段**: 测试与优化

## 环境要求

- Node.js >= 16.0.0
- MongoDB >= 4.4
- 现代浏览器支持

## 快速开始

详细的安装和运行说明请参考各模块的README文件。