# Todo 全栈应用

一个功能完整的 Todo 应用，使用 React 18 + Tailwind CSS + Vite（前端）和 Express + TypeScript（后端）构建。

## 功能特性

- ✅ 新增任务
- 📋 任务列表展示
- ✓ 标记完成/未完成
- 🗑️ 删除任务（带确认）
- ✏️ 双击编辑任务
- 🔍 筛选任务（全部/进行中/已完成）
- 📅 排序任务（创建时间升序/降序）
- 💾 localStorage 降级存储
- 📱 响应式设计

## 技术栈

### 前端
- React 18
- TypeScript
- Tailwind CSS
- Vite
- localStorage 降级存储

### 后端
- Express
- TypeScript
- CORS

## 项目结构

```
todo-fullstack/
├── server/          # 后端服务
├── client/          # 前端应用
└── package.json     # 根目录配置
```

## 快速开始

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd server && npm install

# 安装前端依赖
cd ../client && npm install
```

### 开发模式

```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:server  # 启动后端服务（端口 3001）
npm run dev:client  # 启动前端服务（端口 5173）
```

### 生产构建

```bash
npm run build
```

### 生产运行

```bash
npm start
```

## API 接口

### 获取所有任务
```
GET /api/todos
```

### 添加任务
```
POST /api/todos
Content-Type: application/json

{
  "title": "任务标题"
}
```

### 更新任务
```
PATCH /api/todos/:id
Content-Type: application/json

{
  "title": "更新后的标题",
  "completed": true
}
```

### 删除任务
```
DELETE /api/todos/:id
```

## 浏览器访问

开发模式下访问：http://localhost:5173

## 组件说明

- `AddTodo.tsx` - 新增任务组件
- `FilterBar.tsx` - 筛选排序组件
- `TodoItem.tsx` - 单个任务项组件
- `TodoList.tsx` - 任务列表组件