# 移动端技术栈及工程规范

> 本文档隶属于**公共规范层**，负责呈现移动端的统一技术选型，及移动端基础实现规范。
> 各skill所需的明细规范，需参考 `skills/skill_code/references/mobile/` 中的相关详细规范文档；

---

## 1. Taro多端（H5/小程序/安卓）客户端

### 1.1 技术栈版本

| 组件 | 版本 | 说明 |
|------|------|------|
| Node.js | 18.12.1 | 稳定版本 |
| Taro | 3.6.25 | 多端开发框架 |
| Taro UI | 最新版本 | UI组件库 |
| React | 18.x | 函数组件+Hooks |
| TypeScript | 4.x | 类型安全 |

### 1.2 工程目录结构

```
project-mobile/                # Taro客户端工程根目录
├── config/                    # Taro编译配置
│   ├── index.js               # 主配置文件
│   ├── dev.js                 # 开发环境配置
│   ├── prod.js                # 生产环境配置
│   └── platform/              # 平台差异化配置
├── src/                       # 源码目录
│   ├── app.config.ts          # 应用配置文件
│   ├── app.tsx                # 应用入口文件
│   ├── app.scss               # 全局样式
│   ├── pages/                 # 页面文件目录（小程序路由）
│   ├── subpackages/           # 分包目录（性能优化）
│   ├── components/            # 通用组件
│   ├── services/              # 业务服务层
│   ├── utils/                 # 工具函数
│   ├── types/                 # TypeScript类型定义
│   ├── assets/                # 静态资源
│   └── constants/             # 常量定义
├── project.config.json        # 微信小程序项目配置
├── project.tt.json            # 抖音小程序项目配置
├── project.rn.json            # React Native配置
├── package.json               # 项目依赖
├── tsconfig.json              # TypeScript配置
└── README.md                  # 项目说明
```

### 1.3 页面结构规范

```
src/pages/
├── home/                      # 首页
├── module-a/                  # 业务模块A
│   └── components/            # 页面组件
├── module-b/                  # 业务模块B
├── login/                     # 登录
├── profile/                   # 个人中心
└── settings/                  # 设置页面
```

### 1.4 分包结构（小程序优化）

```
src/subpackages/
├── module-c/                  # 业务模块C分包
├── module-d/                  # 业务模块D分包
└── system/                    # 系统设置分包
```

**分包原则**：
- 主包控制在2MB以内
- 非核心功能放入分包
- 分包按业务模块划分

> **详细规范**：具体的分包策略、配置方式等，请参考 `skills/skill_code/references/mobile/taro_structure.md`

### 1.5 命名规范

| 元素类型 | 命名规则 | 示例 |
|---------|---------|------|
| 页面目录 | 业务名/功能名 | module-a/list |
| 页面配置 | 页面名.config.ts | module-a/list.config.ts |
| 页面组件 | 页面名.tsx | module-a/list.tsx |
| 组件目录 | 组件名 | ItemCard |
| 分包目录 | 业务分包名 | module-c |

### 1.6 架构模式

- **多端适配**：统一业务逻辑，差异化UI实现
- **分包加载**：小程序分包优化加载性能
- **平台适配器**：不同平台API通过适配器统一接口
- **渐进式功能**：能力检测+功能降级保证基础体验

---

## 2. 开发规范

### 2.1 通用规范

| 规范类别 | 要求 | 检查工具 |
|---------|------|----------|
| 代码风格 | ESLint + Prettier统一配置 | ESLint |
| 类型安全 | TypeScript严格模式 | TypeScript |
| 提交规范 | Conventional Commits | commitlint |
| 分支管理 | Git Flow简化版 | 流程约定 |

### 2.2 组件设计规范

- **函数组件+Hooks**：避免Class组件
- **组件复用**：提取通用组件，避免重复代码
- **Props类型定义**：必须定义Props类型

> **详细规范**：具体的组件设计规范、最佳实践等，请参考 `skills/skill_code/references/mobile/taro_structure.md`

### 2.3 Services业务层规范

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

---

## 3. 跨平台适配规范

### 3.1 平台差异处理

**条件编译**：
```javascript
if (process.env.TARO_ENV === 'weapp') {
  // 微信小程序专属逻辑
} else if (process.env.TARO_ENV === 'h5') {
  // H5专属逻辑
} else if (process.env.TARO_ENV === 'rn') {
  // React Native专属逻辑
}
```

**API适配器模式**：
```typescript
// 统一API接口
const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none'
  });
};
```

> **详细规范**：具体的跨平台兼容性处理、API适配等，请参考 `skills/skill_code/references/mobile/cross_platform.md`

### 3.2 平台特性适配

| 平台 | 特性 | 适配要点 |
|------|------|----------|
| **H5** | 浏览器环境 | 路由、缓存、DOM操作 |
| **微信小程序** | 微信生态 | 登录、支付、分享 |
| **抖音小程序** | 抖音生态 | 登录、视频、分享 |
| **React Native** | 原生能力 | 原生模块、导航 |

---

## 4. 小程序限制说明

### 4.1 包大小限制

| 平台 | 主包限制 | 分包限制 | 总包限制 |
|------|---------|---------|---------|
| 微信小程序 | 2MB | 2MB | 20MB |
| 抖音小程序 | 2MB | 2MB | 16MB |

**应对策略**：
- 图片压缩、CDN托管
- 分包加载
- 代码压缩优化

### 4.2 请求限制

| 限制项 | 限制值 | 应对策略 |
|--------|--------|----------|
| 并发请求数 | 10个 | 请求队列管理 |
| 请求超时 | 60秒 | 超时重试机制 |
| 域名白名单 | 需配置 | 提前配置服务器域名 |

### 4.3 存储限制

| 存储类型 | 限制值 | 应对策略 |
|---------|--------|----------|
| 本地缓存 | 10MB | 数据压缩、清理策略 |
| 文件存储 | 200MB | 文件上传到服务器 |

### 4.4 渲染限制

- setData数据大小限制
- 避免频繁setData
- 避免大列表渲染

> **详细规范**：具体的小程序限制、优化策略等，请参考 `skills/skill_code/references/mobile/mini_program_limit.md`

---

## 5. 构建与部署

### 5.1 构建配置

```javascript
// config/index.js
const config = {
    projectName: 'project-mobile',
    framework: 'react',
    compiler: 'webpack5',
    mini: { 
        // 小程序配置
        enableSourceMap: false, // 生产环境关闭sourceMap
        optimizeMainPackage: {
            enable: true
        }
    },
    h5: { 
        // H5配置
        router: {
            mode: 'browser'
        },
        enableSourceMap: false
    },
    rn: { 
        // React Native配置
    }
}
```

### 5.2 环境配置

| 环境 | 配置文件 | 用途 |
|------|----------|------|
| 开发 | .env.development | 本地开发环境 |
| 测试 | .env.test | 测试环境 |
| 生产 | .env.production | 生产环境 |

### 5.3 构建命令

```bash
# H5构建
npm run build:h5

# 微信小程序构建
npm run build:weapp

# 抖音小程序构建
npm run build:tt

# React Native构建
npm run build:rn
```

---

## 6. 性能优化

### 6.1 分包加载优化

- 主包只保留核心功能
- 按需加载分包
- 分包预加载

### 6.2 图片优化

- 使用WebP格式
- 图片懒加载
- 图片压缩

### 6.3 代码优化

- 避免大对象setData
- 使用虚拟列表
- 减少不必要的渲染

> **详细规范**：具体的性能优化策略、最佳实践等，请参考 `skills/skill_code/references/mobile/taro_structure.md`

---

## 7. 明细规范索引

本文档定义移动端技术选型和框架级规范，具体的实现细节和最佳实践请参考以下明细规范：

| 规范名称 | 路径 | 说明 |
|---------|------|------|
| Taro项目结构规范 | `skills/skill_code/references/mobile/taro_structure.md` | 详细的目录结构、配置、最佳实践 |
| 跨平台兼容性处理 | `skills/skill_code/references/mobile/cross_platform.md` | 详细的平台差异处理、API适配 |
| 小程序限制说明 | `skills/skill_code/references/mobile/mini_program_limit.md` | 详细的小程序限制、优化策略 |

---

**版本记录**
- v1.0：移动端技术栈及工程规范初始版本
- 创建日期：2026年1月29日
- 适用范围：所有移动端开发工作
