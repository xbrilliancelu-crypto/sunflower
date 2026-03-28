# Web前端技术栈及工程规范

> 本文档隶属于**公共规范层**，负责呈现Web端的统一技术选型，及Web端基础实现规范。
> 各skill所需的明细规范，需参考 `skills/skill_code/references/frontend/` 中的相关详细规范文档；

---

## 1. React Web

### 1.1 技术栈版本

| 组件 | 版本 | 说明 |
|------|------|------|
| Node.js | 20.20.0 | 稳定版本 |
| React | 18.2.0 | 函数组件+Hooks |
| TypeScript | 4.7 | 类型安全 |
| Ant Design | 5.26.4 | UI组件库（Ant Design Pro脚手架） |
| Umi | 4 | 路由管理、网络框架、状态管理、构建工具 |
| ESLint | 7.1.0 | 代码 linting 工具 |
| Prettier | 2.3.2 | 代码格式化工具 |
| Stylelint | 13.0.0 | 样式 linting 工具 |

### 1.2 工程目录结构

```
project-web/                   # React Web工程根目录
├── public/                    # 静态资源（不参与构建）
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                       # 源码目录
│   ├── app.tsx                # 根组件
│   ├── global.less            # 全局样式
│   ├── global.style.ts        # 样式生成模板函数
│   ├── global.tsx             # 全局基础配置
│   ├── loading.tsx            # 全局加载样式配置
│   ├── manifest.json          # 全局素材
│   ├── requestErrorConfig.ts  # 全局拦截器逻辑
│   ├── typings.d.ts           # 资源类型定义文件
│   ├── components/            # 通用组件管理
│   ├── common/                # 通用页面
│   ├── styles/                # 通用样式文件
│   ├── constants/             # 通用常量定义
│   ├── store/                 # 状态管理
│   ├── hooks/                 # 自定义Hooks
│   ├── utils/                 # 工具函数
│   ├── assets/                # 静态资源（参与构建）
│   ├── pages/                 # 页面组件分包
│   │   ├── dashboard/         # 仪表盘模块
│   │   ├── module-a/          # 业务模块A
│   │   ├── module-b/          # 业务模块B
│   │   ├── system/            # 系统设置模块
│   │   └── admin/             # 管理端应用（主包）
│   ├── services/              # 业务服务层
│   │   ├── module-a/          # 各个业务逻辑包
│   │   │   ├── index.ts       # 业务接口入口
│   │   │   └── data.d.ts      # 业务包内的TS类型定义
│   │   └── App.d.ts           # 通用的TS类型定义
│   └── contexts/              # React Context
├── .umirc.ts                  # Umi配置文件
├── config/                    # Umi配置目录
│   ├── config.ts              # 主配置文件
│   └── routes.ts              # 路由配置集中管理
├── tsconfig.json              # TypeScript配置
├── package.json               # 项目依赖
├── .eslintrc.js               # ESLint配置
├── .prettierrc.js             # Prettier配置
├── .stylelintrc.js            # Stylelint配置
├── .env                       # 环境变量
├── .env.local                 # 本地环境变量
└── README.md                  # 项目说明
```

### 1.3 页面结构规范

```
src/pages/
├── dashboard/                 # 首页仪表盘页面
├── module-a/                  # 业务模块A
├── module-b/                  # 业务模块B
├── module-c/                  # 业务模块C
├── admin/                     # 管理端入口（主包）
└── system/                    # 系统管理功能页面
```

### 1.4 组件分层架构

```
src/components/
├── common/                    # 基础通用组件
├── business/                  # 业务组件
├── charts/                    # 图表组件
└── layout/                    # 布局组件
```

**组件分类原则**：

| 类型 | 目录 | 说明 | 示例 |
|------|------|------|------|
| 页面组件 | pages/ | 路由级组件，对应一个路由地址 | Dashboard、ModuleA |
| 业务组件 | components/business/ | 包含业务逻辑，可复用于多个页面 | UserForm、RoleSelect |
| 通用组件 | components/common/ | 无业务逻辑，纯展示和交互 | SearchForm、StatusTag |
| 布局组件 | components/layout/ | 页面布局结构 | Header、Sidebar、Footer |

> **详细规范**：具体的组件结构、设计原则、最佳实践等，请参考 `skills/skill_code/references/frontend/component_structure.md`

### 1.5 命名规范

| 元素类型 | 命名规则 | 示例 |
|---------|---------|------|
| 页面目录 | 业务名 | Dashboard |
| 页面组件 | 页面名/index.tsx | Dashboard/index.tsx |
| 组件目录 | 组件名 | MetricPanel |
| 组件文件 | 组件名.tsx | MetricPanel.tsx |
| Hook文件 | use功能名.ts | useDashboardData.ts |
| 服务文件 | 模块名.service.ts | moduleA.service.ts |

> **详细规范**：具体的命名规则、最佳实践等，请参考 `skills/skill_code/references/frontend/naming_convention.md`

### 1.6 架构模式

- **组件化开发**：原子设计理念，组件复用
- **单向数据流**：Umi 4.x内置状态管理
- **分层架构**：页面→组件→服务→工具
- **代码分割**：Umi内置路由懒加载优化首屏性能

### 1.7 代码规范工具配置

#### ESLint配置
- **版本**：7.1.0
- **规则文件路径**：`/rules/common/web_template/.eslintrc.js`
- **配置说明**：
  - 继承Umi 4.x推荐的ESLint配置
  - 支持TypeScript语法检查
  - 包含React Hooks规则检查

#### Prettier配置
- **版本**：2.3.2
- **规则文件路径**：`/rules/common/web_template/.prettierrc.js` 和 `/rules/common/web_template/.prettierignore`
- **配置说明**：
  - 统一代码格式化规则
  - 与ESLint规则协同工作
  - 支持自动格式化

#### Stylelint配置
- **版本**：13.0.0
- **规则文件路径**：`/rules/common/web_template/.stylelintrc.js`
- **配置说明**：
  - CSS/SCSS样式规范检查
  - 支持CSS Modules
  - 自动修复常见样式问题

### 1.8 开发工具集成

```json
// package.json scripts配置示例
"scripts": {
  "lint": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
  "lint:styles": "stylelint src/**/*.{css,less,scss}",
  "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,less,scss,json}",
  "lint:fix": "npm run lint && npm run format"
}
```

### 1.9 开发环境配置

- **IDE配置**：推荐使用VS Code，安装ESLint、Prettier、Stylelint插件
- **Git Hooks**：配置pre-commit钩子自动运行lint检查
- **持续集成**：在CI/CD流程中集成lint检查步骤

### 1.10 Services接口规范

**目录结构要求**：
```
services/
├── module-a/                  # 业务逻辑包
│   ├── index.ts               # 接口入口，所有方法以 Service 结尾
│   └── data.d.ts              # 类型定义
└── App.d.ts                   # 通用类型
```

**命名规范**：

| 规范项 | 要求 | 示例 |
|-------|------|------|
| 方法命名 | 以 `Service` 结尾 | `getItemListService`、`createItemService` |
| 返回值类型 | 必须显式定义 | `Promise<ItemListResponse>` |
| 入参类型 | 必须显式定义，禁止用 `any` | `params: CreateItemParams` |
| 文件命名 | 统一为 `index.ts` | `services/module-a/index.ts` |

**代码示例**：
```typescript
// services/module-a/index.ts
import { request } from '@umijs/max';
import type { ItemListResponse, CreateItemParams, CreateItemResponse } from './data.d';

/**
 * 获取项目列表
 * @param params 查询参数
 * @returns 项目列表数据
 */
export async function getItemListService(params: GetItemListParams): Promise<ItemListResponse> {
  return request('/api/module-a/item/list', {
    method: 'GET',
    params,
  });
}

/**
 * 创建新项目
 * @param params 创建项目参数
 * @returns 创建结果
 */
export async function createItemService(params: CreateItemParams): Promise<CreateItemResponse> {
  return request('/api/module-a/item/create', {
    method: 'POST',
    data: params,
  });
}
```

> **详细规范**：具体的Services层实现、类型定义、最佳实践等，请参考 `skills/skill_code/references/frontend/service_layer.md`

---

## 2. 状态管理规范

### 2.1 强制使用Umi 4.x内置状态管理

**核心原则**：
- 使用 `useModel` Hook进行状态管理
- 避免过度使用全局状态
- 保持状态的最小化原则

> **详细规范**：具体的状态管理实现、最佳实践等，请参考 `skills/skill_code/references/frontend/state_management.md`

---

## 3. 样式规范

### 3.1 样式编写规范

- 使用Less作为样式预处理器
- 支持CSS Modules
- 遵循BEM命名规范

> **详细规范**：具体的样式编写规范、最佳实践等，请参考 `skills/skill_code/references/frontend/style_guide.md`

---

## 4. 自定义Hooks规范

### 4.1 Hooks设计原则

- 遵循React Hooks规则
- 保持单一职责
- 提供清晰的返回值类型

> **详细规范**：具体的Hooks实现、最佳实践等，请参考 `skills/skill_code/references/frontend/hooks_guide.md`

---

## 5. 通用组件要求

### 5.1 推荐组件库

- **优先使用Pro Components**：
  - ProTable组件替代Table组件
  - ProForm组件替代Form组件
- **其他组件优先使用Ant Design组件**

### 5.2 组件封装原则

- 保持组件的通用性和可复用性
- 提供清晰的Props类型定义
- 编写组件文档和示例

---

## 6. 工程模板文件

### 6.1 请求错误配置模板

- **模板路径**：`/rules/common/web_template/requestErrorConfig.ts`
- **使用方式**：新项目初始化时直接复制此文件作为基础配置
- **功能说明**：
  - 统一错误处理机制
  - 支持业务错误和网络错误分类处理
  - 包含请求拦截器和响应拦截器配置
  - 自动添加认证令牌和API前缀

---

## 7. 明细规范索引

本文档定义Web前端技术选型和框架级规范，具体的实现细节和最佳实践请参考以下明细规范：

| 规范名称 | 路径 | 说明 |
|---------|------|------|
| 组件结构规范 | `skills/skill_code/references/frontend/component_structure.md` | 详细的组件分类、设计原则、最佳实践 |
| 自定义Hooks规范 | `skills/skill_code/references/frontend/hooks_guide.md` | 详细的Hooks实现、使用场景、最佳实践 |
| 状态管理规范 | `skills/skill_code/references/frontend/state_management.md` | 详细的状态管理实现、最佳实践 |
| Services层规范 | `skills/skill_code/references/frontend/service_layer.md` | 详细的Services实现、类型定义、最佳实践 |
| 样式规范 | `skills/skill_code/references/frontend/style_guide.md` | 详细的样式编写、CSS Modules使用、最佳实践 |
| 命名规范 | `skills/skill_code/references/frontend/naming_convention.md` | 详细的命名规则、最佳实践 |

---

**版本记录**
- v1.0：Web前端技术栈及工程规范初始版本
- 创建日期：2026年1月29日
- 适用范围：所有Web前端开发工作
