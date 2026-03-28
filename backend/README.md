# Backend 端代码模块

## 概述

本目录存放 AI 协作框架 v1.0 的后端服务代码，作为项目的核心业务处理层，负责提供 API 接口、业务逻辑处理、数据持久化等核心能力。

## 目录结构规范

```
backend/
├── pom.xml                     # 父 POM（包管理）
├── xxx-common/                 # 通用设施模块
├── xxx-infrastructure/         # 基础设施模块
├── xxx-business/               # 业务逻辑模块
│   └── src/main/java/com/xxx/
│       ├── api/                # API 层（Controller、Request、VO）
│       ├── service/            # 服务层（业务逻辑整合）
│       ├── manager/            # 管理器层（业务能力组件）
│       ├── dao/                # 数据访问层（Mapper、Entity）
│       └── common/             # 模块内公共逻辑
└── xxx-deploy/                 # 部署启动模块
```

## 技术栈

- **语言**: Java 17+
- **框架**: Spring Boot 3.x
- **ORM**: MyBatis-Plus
- **数据库**: PostgreSQL / MySQL
- **中间件**: Redis、RabbitMQ、Kafka

## 架构模式

- **分层架构**: API → Service → Manager → DAO
- **模块化设计**: 单体应用多模块，支持渐进式演进
- **事件驱动**: 业务模块间采用事件通知模型解耦

## 开发规范

详细的技术栈及工程规范请参阅：`ai_collaboration/rules/tech_structure_backend.md`

## 相关文档

| 文档类型 | 路径 |
|---------|------|
| 技术规范 | `../ai_collaboration/rules/tech_structure_backend.md` |
| 架构设计 | `../ai_collaboration/rules/arch_solutions.md` |
| 变更风险评估 | `../ai_collaboration/rules/templates/dependency_analysis.md` |
| 渐进式重构策略 | `../ai_collaboration/rules/templates/legacy_refactor_strategy.md` |
| 任务列表 | `../ai_collaboration/tasks/` |
| 接口文档 | `../ai_collaboration/docs/api_docs/` |
