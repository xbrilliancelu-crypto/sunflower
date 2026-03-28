# 规范约束区（rules/）

## 概述

本目录定义 AI 协作框架的技术栈规范、架构设计和协作流程，是 AI 协作的核心指导文件集合。所有开发活动都应遵循本目录中定义的规范约束。

## 目录结构

```
rules/
├── base_rules.md               # 基础规则与路由逻辑
├── arch_solutions.md           # 架构设计规范
├── tech_structure_backend.md   # 后端技术栈及工程规范
├── tech_structure_web.md       # Web 端技术栈及工程规范
├── tech_structure_mobile.md    # 移动端技术栈及工程规范
├── ai_collaboration_boundary.md# AI 协作适用边界
├── product.md                  # 产品相关规范
├── web_template/               # Web 端配置模板
└── templates/                  # 设计方案模板与风险评估规范
    ├── detail_solution_template.md  # 详细设计方案模板
    ├── dependency_analysis.md       # 变更风险评估规范
    └── legacy_refactor_strategy.md  # 渐进式重构策略
```

## 核心规范说明

### 1. 基础规则（base_rules.md）

协作框架的核心入口文件，定义：

- 工作区整体说明
- 背景规范查找路由
- AI 编码协作范式
- 版本管理规范
- 质量保障要求

**重要**：所有协作活动都应首先阅读本文件，根据路由逻辑确定后续操作。

### 2. 架构设计规范（arch_solutions.md）

指导系统整体架构设计，包括：

- MVP 需求核心要点分析
- 模块拆分评估
- 工程模块结构设计
- 关键功能点分析
- 高并发与高稳定性设计
- 演进规划与风险控制

### 3. 技术栈规范

| 文件 | 适用端 | 核心内容 |
|-----|-------|---------|
| `tech_structure_backend.md` | 后端 | Java/Spring Boot 工程规范、分层架构、命名规范 |
| `tech_structure_web.md` | Web 端 | React/Umi 工程规范、组件架构、代码规范 |
| `tech_structure_mobile.md` | 移动端 | Taro 多端规范、分包设计、平台适配 |

### 4. 设计方案模板与风险评估规范（templates/）

存放详细技术方案设计过程中所需遵循的模板和规范：

| 文件 | 说明 |
|-----|------|
| `detail_solution_template.md` | 详细设计方案的标准模板 |
| `dependency_analysis.md` | 代码变更的风险评估方法和流程 |
| `legacy_refactor_strategy.md` | 历史代码的渐进式重构策略 |

### 5. Web 端配置模板（web_template/）

存放 Web 端项目的标准配置文件模板：

- ESLint 配置
- Prettier 配置
- Stylelint 配置
- TypeScript 配置

### 6. AI 协作边界说明（ai_collaboration_boundary.md）

定义 AI 协作的适用场景和边界说明，指导合理使用 AI 辅助开发。

## 路由逻辑

根据协作场景，规范查找路由如下：

### Case 1：简单改动场景

- 不自行查找其他默认上下文
- 遵照提示词指示，读取指定背景文档

### Case 2：详细设计方案场景

需要阅读：
1. 架构设计规范：`arch_solutions.md`
2. 详细方案模板：`templates/detail_solution_template.md`
3. 技术栈规范：`tech_structure_*.md`（根据端选择）

### Case 3：需求编码落地场景

需要阅读：
1. 详细设计方案：`../docs/detail_solutions/`
2. 技术栈规范：`tech_structure_*.md`

## 使用建议

1. **首次协作**：完整阅读 `base_rules.md` 理解协作范式
2. **架构设计**：参考 `arch_solutions.md` 进行模块拆分
3. **技术选型**：查阅对应端的 `tech_structure_*.md`
4. **历史代码修改**：遵循 `templates/dependency_analysis.md` 和 `templates/legacy_refactor_strategy.md`

## 版本管理

规范文档的修改需经过评审确认，确保团队认知一致。建议在规范文件头部记录版本信息和更新说明。
