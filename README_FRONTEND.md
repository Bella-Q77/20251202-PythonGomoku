# ModernUI - 现代化前端页面

一个基于 React + Vite + Tailwind CSS 构建的现代化交互式前端页面模板。

## ✨ 特性

- 🎨 **现代化设计**: 遵循现代 UI/UX 设计标准，具有良好的视觉层次感
- 📱 **响应式布局**: 完美适配各种 PC 屏幕尺寸
- ⚡ **高性能**: 基于 Vite 构建，提供极快的开发体验和构建速度
- 🎭 **流畅动画**: 精心设计的交互动画和过渡效果
- 🧩 **模块化开发**: 清晰的代码结构，组件化开发方式
- 🌐 **跨浏览器兼容**: 支持所有主流现代浏览器
- 🛡️ **表单验证**: 完整的表单验证和提交反馈机制

## 🛠️ 技术栈

- **框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **语言**: JavaScript + JSX

## 📦 安装

```bash
# 安装依赖
npm install
```

## 🚀 运行

```bash
# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看页面。

## 🏗️ 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.jsx      # 导航栏
│   │   ├── Hero.jsx        # 英雄区域
│   │   ├── Features.jsx    # 功能展示
│   │   ├── ContactForm.jsx # 联系表单
│   │   └── Footer.jsx      # 页脚
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
└── package.json            # 项目配置
```

## 🎯 核心功能

### 导航栏
- 响应式设计，移动端支持汉堡菜单
- 粘性定位，滚动时保持在页面顶部
- 平滑的菜单展开/收起动画

### 英雄区域
- 渐变色背景
- 滚动显示动画效果
- 主要行动召唤按钮

### 功能展示
- 网格布局的功能卡片
- 悬停动画效果
- 滚动触发显示动画

### 联系表单
- 完整的表单验证
- 提交加载状态
- 成功/错误反馈

### 页脚
- 响应式布局
- 社交媒体链接
- 版权信息

## 🎨 自定义主题

可以通过修改 `tailwind.config.js` 文件来自定义主题颜色、字体和动画效果。

## 📄 许可证

MIT
