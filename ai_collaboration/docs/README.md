# 文档资料区（docs/）

## 概述

本目录集中管理 AI 协作框架的各类产出的文档资料，作为项目知识库的核心组成部分，支持需求传递、方案记录和知识沉淀。
这些产出的文档资料，也可能作为后续 AI 协作的输入，用于指导 AI 生成对应的代码。

## 目录结构

```
docs/
├── detail_solutions/           # 详细技术方案文档
├── api_docs/                   # 接口定义文档
├── sprints/                    # 冲刺需求说明文档
└── reports/                    # 各类分析报告
```

## 子目录说明

### 1. detail_solutions/ - 详细技术方案

存放需求落地前的详细技术设计方案，包括：

- 模块拆分设计
- 数据流模型定义
- 关键功能点分析
- 技术选型决策

**文档命名规范**：`{模块名}_{功能名}_方案.md`

**参考模板**：`../rules/templates/detail_solution_template.md`

### 2. api_docs/ - 接口定义文档

存放前后端对接的接口定义文档，作为开发契约依据：

- 接口地址
- 请求参数
- 响应数据
- 错误码定义

**文档命名规范**：以模块名作为前缀，例如 `collector_management.md`

### 3. sprints/ - 冲刺需求说明

存放各迭代的冲刺需求说明文档：

- 需求背景
- 功能范围
- 验收标准
- 交付时间

### 4. reports/ - 分析报告

存放各类技术分析报告：

- 依赖影响分析
- 风险评估报告
- 性能分析报告
- 技术债务清单

## 文档规范

### 接口文档格式示例

```
接口名称

（1）接口地址: `POST /api/xxx/xxx`

（2）请求参数:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 代理ID |
| config | object | 是 | 配置项 |

（3）响应数据:
{
    "code": 200,
    "message": "success",
    "data": null
}
```

## 使用指南

1. **方案设计时**：参考 `../rules/templates/detail_solution_template.md` 模板编写技术方案文档，存放于 `detail_solutions/`
2. **接口定义时**：按照统一格式编写接口文档，存放于 `api_docs/`
3. **需求迭代时**： `sprints/` 下保存各个迭代的需求说明文档（prd）
4. **分析评估时**：在 `reports/` 下记录各种可用的整体分析报告

## 相关文档

- 架构设计规范：`../rules/arch_solutions.md`
- 详细方案模板：`../rules/templates/detail_solution_template.md`
- 基础规则：`../rules/base_rules.md`
