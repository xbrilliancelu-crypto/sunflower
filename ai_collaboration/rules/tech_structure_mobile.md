# 统一运维平台 - 移动端（mobile）技术栈及工程规范（仅范例 需具体适配修改）

## 1. Taro多端（H5/小程序/安卓）客户端

### 1.1 技术栈版本

| 组件 | 版本 | 说明 |
|------|------|------|

### 1.2 工程目录结构

```
ops-center-mobile/          # Taro客户端工程根目录
├── config/                        # Taro编译配置
│   ├── index.js                  # 主配置文件
│   └── platform/                 # 平台差异化配置
├── src/                          # 源码目录
│   ├── app.config.ts             # 应用配置文件
│   └── constants/                # 常量定义
├── project.config.json           # 微信小程序项目配置
├── project.tt.json               # 抖音小程序项目配置
├── project.rn.json               # React Native配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript配置
└── README.md                     # 项目说明
```

### 1.3 页面结构规范

```
src/pages/
├── home/                         # 首页
├── alarm/                        # 预警列表
│   └── components/              # 页面组件
├── alarm-detail/                 # 预警详情
├── app-device/                   # App设备
├── iot-device/                   # IoT设备
├── login/                        # 登录
├── profile/                      # 个人中心
└── change-password/              # 修改密码
```

### 1.4 分包结构（小程序优化）

```
src/subpackages/
├── module1/                       # 模块1分包
├── module2/                       # 模块2分包
└── module1/                       # 模块3分包
```

### 1.5 命名规范

| 元素类型 | 命名规则 | 示例 |
|---------|---------|------|
| 页面目录 | 业务名/功能名 | alarm/list |
| 页面配置 | 页面名.config.ts | alarm/list.config.ts |
| 页面组件 | 页面名.tsx | alarm/list.tsx |
| 组件目录 | 组件名 | AlarmCard |
| 分包目录 | 业务分包名 | system |

### 1.6 架构模式

- **多端适配**：统一业务逻辑，差异化UI实现
- **分包加载**：小程序分包优化加载性能
- **平台适配器**：不同平台API通过适配器统一接口
- **渐进式功能**：能力检测+功能降级保证基础体验

## 2. 开发规范

### 2.1 通用规范

| 规范类别 | 要求 | 检查工具 |
|---------|------|----------|
| 代码风格 | ESLint + Prettier统一配置 | ESLint |
| 类型安全 | TypeScript严格模式 | TypeScript |
| 提交规范 | Conventional Commits | commitlint |
| 分支管理 | Git Flow简化版 | 流程约定 |

### 2.2 后端特定规范

- **包管理**：统一依赖版本，通过父POM管理
- **API设计**：RESTful风格，统一响应格式
- **异常处理**：全局异常处理器，业务异常分类
- **日志规范**：统一日志格式，关键操作审计日志

### 2.3 前端特定规范

- **组件设计**：函数组件+Hooks，避免Class组件
- **状态管理**：@reduxjs/toolkit
- **样式管理**：less
- **性能优化**：代码分割、懒加载、图片优化

#### Services 业务层规范

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

## 3. 构建与部署

### 3.2 React Web构建配置

```typescript
// vite.config.ts
export default defineConfig({
    plugins: [react()],
    server: { port: 3000 },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    antd: ['antd', '@ant-design/icons']
                }
            }
        }
    }
})
```

### 3.3 Taro构建配置

```javascript
// config/index.js
const config = {
    projectName: 'ops-platform-taro-client',
    framework: 'react',
    compiler: 'webpack5',
    mini: { /* 小程序配置 */ },
    h5: { /* H5配置 */ },
    rn: { /* React Native配置 */ }
}
```

## 4. 环境配置

### 4.1 环境变量规范

| 环境 | 配置文件 | 用途 |
|------|----------|------|
| 开发 | .env.development | 本地开发环境 |
| 测试 | .env.test | 测试环境 |
| 生产 | .env.production | 生产环境 |

### 4.2 配置优先级

1. 环境变量（最高优先级）
2. 配置文件（.env.环境名）
3. 默认配置（代码中默认值）

### 5. 前后端接口对接数据结构规范

**5.1 统一响应数据结构**:

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

**5.2 code统一错误码规范**:

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 代理不存在 |
| 500 | 服务器内部错误 |

**5.3 请求参数规范**: 
身份识别token串统一放在requestHeader中的`Authorization`参数下；业务请求参数统一放在requestBody中，以json格式传递。
