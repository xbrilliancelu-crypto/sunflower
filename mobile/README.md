# Mobile 端代码模块

## 概述

本目录存放 AI 协作框架 v1.0 的移动端代码，支持多端（H5/小程序/App）应用开发，为用户提供便捷的移动端业务操作能力。

## 目录结构规范

```
mobile/
├── config/                     # Taro 编译配置
│   ├── index.js                # 主配置文件
│   └── platform/               # 平台差异化配置
├── src/                        # 源码目录
│   ├── app.config.ts           # 应用配置文件
│   ├── pages/                  # 页面组件
│   ├── subpackages/            # 分包模块（小程序优化）
│   ├── services/               # 业务服务层
│   └── constants/              # 常量定义
├── project.config.json         # 微信小程序项目配置
├── package.json                # 项目依赖
└── README.md                   # 项目说明
```

## 技术栈

- **框架**: Taro + React + TypeScript
- **多端支持**: H5 / 微信小程序 / 支付宝小程序 / App
- **UI组件库**: Taro UI
- **状态管理**: Redux Toolkit

## 多端构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:weapp

# App 构建
npm run build:app
```

## 开发规范

详细的技术栈及工程规范请参阅：`ai_collaboration/rules/tech_structure_mobile.md`

## 相关文档

| 文档类型 | 路径 |
|---------|------|
| 技术规范 | `../ai_collaboration/rules/tech_structure_mobile.md` |
| 架构设计 | `../ai_collaboration/rules/arch_solutions.md` |
| 任务列表 | `../ai_collaboration/tasks/` |
| 接口文档 | `../ai_collaboration/docs/api_docs/` |
