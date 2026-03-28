# Web 端代码模块

## 概述

本目录存放 AI 协作框架 v1.0 的 Web 端（管理后台）代码，作为项目的前端展示层，负责提供用户交互界面和业务操作入口。

## 目录结构规范

```
web/
├── public/                     # 静态资源（不参与构建）
├── src/                        # 源码目录
│   ├── app.tsx                 # 根组件
│   ├── global.less             # 全局样式
│   ├── utils/                  # 工具函数
│   ├── assets/                 # 静态资源（参与构建）
│   ├── pages/                  # 页面组件分包
│   ├── services/               # 业务服务层
│   └── contexts/               # React Context
├── config/                     # 配置目录
├── .umirc.ts                   # Umi 配置文件
└── README.md                   # 项目说明
```

## 技术栈

- **框架**: React + TypeScript
- **构建工具**: Umi 4.x
- **UI组件库**: Ant Design / Ant Design Pro
- **状态管理**: Umi 内置状态管理（useModel）
- **样式方案**: Less

## 开发规范

详细的技术栈及工程规范请参阅：`ai_collaboration/rules/tech_structure_web.md`

## 相关文档

| 文档类型 | 路径 |
|---------|------|
| 技术规范 | `../ai_collaboration/rules/tech_structure_web.md` |
| 架构设计 | `../ai_collaboration/rules/arch_solutions.md` |
| 任务列表 | `../ai_collaboration/tasks/` |
| 接口文档 | `../ai_collaboration/docs/api_docs/` |
