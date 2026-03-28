# Sunflower - 向日葵AI研发协作脚手架 v1.1（ai_collaboration核心协作工件说明）

## 概述

本目录是 AI 协作框架 v1.0 的核心支撑模块，集中管理项目的需求文档、技术规范、任务规划和辅助脚本等协作资源。通过标准化的文档结构和协作流程，实现 AI 与开发人员的高效协作。

## 目录结构

```
ai_collaboration/
├── docs/                       # 文档资料区
│   ├── detail_solutions/       # 详细技术方案文档
│   ├── api_docs/               # 接口定义文档
│   ├── sprints/                # 冲刺需求说明文档
│   └── reports/                # 各类分析报告
├── rules/                      # 规范约束区
│   ├── base_rules.md           # 基础规则与路由逻辑
│   ├── arch_solutions.md       # 架构设计规范
│   ├── tech_structure_*.md     # 各端技术栈规范
│   └── templates/              # 设计方案模板与风险评估规范
│       ├── detail_solution_template.md  # 详细设计方案模板
│       ├── dependency_analysis.md       # 变更风险评估规范
│       └── legacy_refactor_strategy.md  # 渐进式重构策略
├── tasks/                      # 任务规划区
│   └── README.md               # 任务管理说明
├── scripts/                    # 脚本工具区
│   ├── db/                     # 数据库变更脚本
│   └── README.md               # 脚本管理说明
└── README.md                   # 本文档
```

## 核心组件说明

### 1. 文档资料区（docs/）

集中存放项目的各类文档资料，支持 AI 协作过程中的知识传递和方案记录：

| 子目录 | 说明 |
|-------|------|
| `detail_solutions/` | 详细技术方案文档，用于需求落地的技术设计 |
| `api_docs/` | 接口定义文档，前后端对接的契约依据 |
| `sprints/` | 冲刺需求说明文档，迭代需求的详细描述 |
| `reports/` | 各类分析报告，如依赖分析、风险评估等 |

### 2. 规范约束区（rules/）

定义项目的技术栈规范、架构设计和协作流程，是 AI 协作的核心指导文件：

| 文件/目录 | 说明 |
|----------|------|
| `base_rules.md` | 基础规则与路由逻辑，定义协作范式的核心入口 |
| `arch_solutions.md` | 架构设计规范，指导系统整体架构设计 |
| `tech_structure_backend.md` | 后端技术栈及工程规范 |
| `tech_structure_web.md` | Web 端技术栈及工程规范 |
| `tech_structure_mobile.md` | 移动端技术栈及工程规范 |
| `templates/` | 设计方案模板与风险评估规范 |
| `ai_collaboration_boundary.md` | AI 协作适用边界说明 |

### 3. 任务规划区（tasks/）

管理具体的落地开发任务拆解，支持分而治之的开发策略：

- 每次开发前进行任务细化拆解
- 任务列表支持勾选进度追踪
- 完成一个勾选一个，实现留痕管理

### 4. 脚本工具区（scripts/）

存放工程所需的各种脚本资源：

- 数据库变更脚本
- 初始化脚本
- 工具组件脚本

## 协作范式

AI 协作遵循"设计方案先行、任务拆解落地"的范式：

1. **方案设计阶段**：阅读 `base_rules.md` 确定协作场景，生成详细设计方案
2. **任务拆解阶段**：基于设计方案生成任务列表，明确开发目标
3. **编码落地阶段**：按任务列表逐项实现，完成一项勾选一项

## 相关文档

详细信息请参阅各子目录的 README.md 或对应的规范文档。
