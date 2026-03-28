# 统一运维平台 - 管理端（web）技术栈及工程规范（仅范例 需具体适配修改）

## 1. React Web

### 1.1 技术栈版本

| 组件 | 版本 | 说明 |
|------|------|------|

### 1.2 工程目录结构

```
ops-center-web/          # React Web工程根目录
├── public/                      # 静态资源（不参与构建）
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                         # 源码目录
│   ├── app.tsx                  # 根组件
│   ├── global.less              # 全局样式
│   ├── global.style.ts          # 样式生成模板函数
│   ├── utils/                   # 工具函数
│   ├── assets/                  # 静态资源（参与构建）
│   ├── pages/                   # 页面组件分包
│   │   ├── dashboard/           # 仪表盘模块（名称自定义）
│   │   └── admin/               # 管理端应用（主包）
│   ├── services/                # 业务服务层
│   │   ├── collector/           # 各个业务逻辑包（名称自定义）
│   │   │   ├── index.ts         # 业务接口入口
│   │   │   └── data.d.ts        # 业务包内的TS类型定义
│   │   ├── App.d.ts             # 通用的TS类型定义
│   └── contexts/                # React Context
├── .umirc.ts                   # Umi配置文件
├── config/                      # Umi配置目录
│   ├── config.ts               # 主配置文件
│   └── routes.ts               # 路由配置集中管理
├── tsconfig.json                # TypeScript配置
├── .stylelintrc.js              # Stylelint配置
├── .env                         # 环境变量
├── .env.local                   # 本地环境变量
└── README.md                    # 项目说明
```

### 1.3 页面结构规范

```
src/pages/
├── dashboard/                   # 首页仪表盘页面
└── system/                      # 系统管理功能页面
```

### 1.4 组件分层架构

```
src/components/
├── common/                      # 基础通用组件
└── layout/                      # 布局组件
```

### 1.5 命名规范

| 元素类型 | 命名规则 | 示例 |
|---------|---------|------|
| 页面目录 | 业务名 | Dashboard |
| 页面组件 | 页面名/index.tsx | Dashboard/index.tsx |
| 组件目录 | 组件名 | MetricPanel |
| 组件文件 | 组件名.tsx | MetricPanel.tsx |
| Hook文件 | use功能名.ts | useDashboardData.ts |
| 服务文件 | 模块名.service.ts | alarm.service.ts |

### 1.6 架构模式

- **组件化开发**：原子设计理念，组件复用
- **单向数据流**：Umi 4.x内置状态管理
- **分层架构**：页面→组件→服务→工具
- **代码分割**：Umi内置路由懒加载优化首屏性能

### 1.7 代码规范工具配置

#### ESLint配置
- **版本**：7.1.0
- **规则文件路径**：`/rules/web_template/.eslintrc.js`
- **配置说明**：
  - 继承Umi 4.x推荐的ESLint配置
  - 支持TypeScript语法检查
  - 包含React Hooks规则检查

#### Prettier配置
- **版本**：2.3.2
- **规则文件路径**：`/rules/web_template/.prettierrc.js` 和 `/rules/web_template/.prettierignore`
- **配置说明**：
  - 统一代码格式化规则
  - 与ESLint规则协同工作
  - 支持自动格式化

#### Stylelint配置
- **版本**：13.0.0
- **规则文件路径**：`/rules/web_template/.stylelintrc.js`
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
- **Git Hooks**：配置pre-commit钩子自动运行lint和sonar检查
- **持续集成**：在CI/CD流程中已集成lint检查步骤

### 1.10 工程模板文件

#### Services 接口规范

**目录结构要求**：
```
services/
├── collector/                   # 业务逻辑包
│   ├── index.ts                 # 接口入口，所有方法以 Service 结尾
│   └── data.d.ts                # 类型定义
└── App.d.ts                     # 通用类型
```

**命名规范**：
| 规范项 | 要求 | 示例 |
|-------|------|------|
| 方法命名 | 以 `Service` 结尾 | `getTaskListService`、`createTaskService` |
| 返回值类型 | 必须显式定义 | `Promise<TaskListResponse>` |
| 入参类型 | 必须显式定义，禁止用 `any` | `params: CreateTaskParams` |
| 文件命名 | 统一为 `index.ts` | `services/collector/index.ts` |

**代码示例**：
```typescript
// services/collector/index.ts
import { request } from '@umijs/max';
import type { TaskListResponse, CreateTaskParams, CreateTaskResponse } from './data.d';

/**
 * 获取任务列表
 * @param params 查询参数
 * @returns 任务列表数据
 */
export async function getTaskListService(params: GetTaskListParams): Promise<TaskListResponse> {
  return request('/api/collector/task/list', {
    method: 'GET',
    params,
  });
}

/**
 * 创建新任务
 * @param params 创建任务参数
 * @returns 创建结果
 */
export async function createTaskService(params: CreateTaskParams): Promise<CreateTaskResponse> {
  return request('/api/collector/task/create', {
    method: 'POST',
    data: params,
  });
}
```

#### 特定关键的编码要求模板
- **模板路径**：`/rules/web_template/xxxxx.ts`
- **使用方式**：新项目初始化时直接复制此文件作为基础配置
- **功能说明**：
  - desc


### 2. 前后端接口对接数据结构规范

**2.1 统一响应数据结构**:

翻页列表类接口的响应数据结构示例如下，

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "agent-001",
        "version": "v2.1.0",
        "hostname": "hz-prod-node1",
        "ipAddress": "192.168.1.101",
        "lastHeartbeat": "2024-01-15 10:05:23",
        "connectionStatus": "connected",
        "healthStatus": "healthy"
      }
    ],
    "total": 4,
    "current": 1,
    "pageSize": 10
  }
}
```

非翻页列表类接口的响应数据结构示例如下（动作型接口只需成功与否时data可为空，code为200即为成功），

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "value1": 4,
    "value2": "value2",
    "resultJSON": {
      "key1": "value1",
      "key2": "value2"
    }
  }
}
```

**2.2 code统一错误码规范**:

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 代理不存在 |
| 500 | 服务器内部错误 |

**2.3 请求参数规范**: 
身份识别token串统一放在requestHeader中的`Authorization`参数下；业务请求参数优先放在requestBody中，以json格式传递（特殊情况下，Get请求也适当允许参数直接拼装到uri后面）


### 3. 推荐重要写法规范

**3.1 必需使用状态管理**:
- 强制使用Umi 4.x内置状态管理（Umi-useModel）

**3.2 部分通用组件要求**:
- 优先使用pro-table组件替代table组件
- 优先使用pro-form组件替代form组件
- 其他组件优先使用antd组件
