# AI心理咨询平台

一个基于现代Web技术栈构建的AI心理咨询平台，提供24小时在线心理健康支持服务。

## 🌟 项目特色

- 🎨 **现代化UI设计** - 采用渐变背景和毛玻璃效果，提供温馨舒适的用户体验
- 💬 **实时聊天功能** - 基于WebSocket的实时消息传输
- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- 🔒 **隐私保护** - 严格保护用户隐私和数据安全
- ⚡ **快速响应** - 优化的性能和加载速度

## 🛠️ 技术栈

### 前端
- **React 18** - 现代化前端框架
- **TypeScript** - 类型安全的JavaScript
- **Redux Toolkit** - 状态管理
- **Tailwind CSS** - 实用优先的CSS框架
- **Ant Design** - 企业级UI组件库
- **Vite** - 快速的构建工具
- **Lucide React** - 美观的图标库

### 后端
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **TypeScript** - 类型安全的JavaScript
- **Socket.io** - 实时通信
- **Winston** - 日志管理

## 📦 项目结构

```
ai心理咨询/
├── frontend/                 # 前端应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── store/          # Redux状态管理
│   │   ├── services/       # API服务
│   │   └── App.tsx         # 主应用组件
│   ├── public/             # 静态资源
│   └── package.json        # 前端依赖
├── backend/                 # 后端应用
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── middleware/     # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由处理
│   │   ├── services/       # 业务逻辑
│   │   └── server.ts       # 服务器入口
│   └── package.json        # 后端依赖
├── start-dev.bat           # Windows开发启动脚本
├── start-dev.sh            # Linux/Mac开发启动脚本
└── README.md               # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 启动开发服务器

#### 方式一：使用启动脚本（推荐）

**Windows:**
```bash
start-dev.bat
```

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### 方式二：手动启动

```bash
# 启动后端服务器（端口3001）
cd backend
npm run dev

# 启动前端开发服务器（端口5173）
cd frontend
npm run dev
```

### 访问应用

- 前端应用：http://localhost:5173
- 后端API：http://localhost:3001

## 🎯 主要功能

### 1. 主页面
- 极简设计，只有一个精美的"开始咨询"按钮
- 渐变背景和动画效果
- 响应式布局，适配所有设备

### 2. 聊天界面
- 实时消息传输
- 毛玻璃效果的聊天窗口
- 用户和AI消息的差异化显示
- 打字指示器和加载动画
- 消息时间戳显示

### 3. 用户系统
- 用户注册和登录
- 个人资料管理
- 聊天历史记录

## 🎨 设计特色

### 视觉设计
- **渐变背景** - 温暖的蓝紫色渐变
- **毛玻璃效果** - 现代化的半透明设计
- **动画交互** - 流畅的过渡和悬停效果
- **响应式布局** - 完美适配各种屏幕尺寸

### 用户体验
- **直观导航** - 简洁明了的界面布局
- **快速响应** - 优化的性能和加载速度
- **无障碍支持** - 考虑视觉障碍用户的需求
- **移动优先** - 优先考虑移动设备体验

## 📱 响应式设计

项目采用移动优先的响应式设计策略：

- **手机端** (< 768px) - 全屏布局，优化触摸交互
- **平板端** (768px - 1024px) - 适中的布局和字体大小
- **桌面端** (> 1024px) - 宽屏布局，充分利用屏幕空间

## 🔧 开发指南

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier配置
- 组件采用函数式编程风格
- 使用Hooks进行状态管理

### 项目约定
- 组件文件使用PascalCase命名
- 工具函数使用camelCase命名
- 常量使用UPPER_SNAKE_CASE命名
- CSS类名使用kebab-case命名

## 🚀 部署

### 构建生产版本

```bash
# 构建前端
cd frontend
npm run build

# 构建后端
cd backend
npm run build
```

### 部署选项

1. **Vercel** (推荐用于前端)
2. **Netlify** (适合静态部署)
3. **Railway** (全栈部署)
4. **Docker** (容器化部署)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://reactjs.org/) - 前端框架
- [Ant Design](https://ant.design/) - UI组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide](https://lucide.dev/) - 图标库
- [Vite](https://vitejs.dev/) - 构建工具

## 📞 联系我们

如果您有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/Xun1267/ai-/issues)
- 发送邮件至：support@ai-psychology.com

---

**注意**: 本平台仅提供心理健康信息和支持，不能替代专业医疗诊断和治疗。如有严重心理问题，请及时寻求专业医疗帮助。