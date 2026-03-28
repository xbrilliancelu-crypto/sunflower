# 前端 Services 层规范

## 1. 目录结构

```
services/
├── collector/                   # 业务模块包
│   ├── index.ts                 # 接口入口，所有方法以 Service 结尾
│   └── data.d.ts                # 类型定义
├── alarm/                       # 报警模块
│   ├── index.ts
│   └── data.d.ts
└── App.d.ts                     # 通用类型
```

---

## 2. 命名规范

### 2.1 方法命名

| 规范项 | 要求 | 示例 |
|-------|------|------|
| 方法命名 | 以 `Service` 结尾 | `getTaskListService`、`createTaskService` |
| 返回值类型 | 必须显式定义 | `Promise<TaskListResponse>` |
| 入参类型 | 必须显式定义，禁止用 `any` | `params: CreateTaskParams` |
| 文件命名 | 统一为 `index.ts` | `services/collector/index.ts` |

### 2.2 命名前缀规范

| 操作类型 | 命名前缀 | 示例 |
|----------|----------|------|
| 获取列表 | get + List | getTaskListService |
| 获取详情 | get + Detail | getTaskDetailService |
| 获取分页 | get + Page | getTaskPageService |
| 创建 | create | createTaskService |
| 更新 | update | updateTaskService |
| 删除 | delete | deleteTaskService |
| 操作类 | 动词 | startTaskService |

---

## 3. 代码规范

### 3.1 标准模板

```typescript
// services/collector/index.ts
import { request } from '@umijs/max';
import type { 
  TaskListResponse, 
  TaskDetailResponse,
  CreateTaskParams,
  CreateTaskResponse 
} from './data.d';

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
 * 获取任务详情
 * @param id 任务ID
 * @returns 任务详情数据
 */
export async function getTaskDetailService(id: number): Promise<TaskDetailResponse> {
  return request(`/api/collector/task/${id}`, {
    method: 'GET',
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

/**
 * 更新任务
 * @param params 更新参数
 * @returns 更新结果
 */
export async function updateTaskService(params: UpdateTaskParams): Promise<CommonResponse> {
  return request('/api/collector/task/update', {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除任务
 * @param id 任务ID
 * @returns 删除结果
 */
export async function deleteTaskService(id: number): Promise<CommonResponse> {
  return request(`/api/collector/task/${id}`, {
    method: 'DELETE',
  });
}
```

### 3.2 类型定义文件

```typescript
// services/collector/data.d.ts

import type { CommonResponse, PageVO } from '../App.d';

// ========== 请求参数类型 ==========

/** 获取任务列表参数 */
export interface GetTaskListParams {
  /** 任务名称 */
  name?: string;
  /** 任务状态 */
  status?: number;
}

/** 创建任务参数 */
export interface CreateTaskParams {
  /** 任务名称 */
  name: string;
  /** 任务配置 */
  config: TaskConfig;
  /** 采集间隔（秒） */
  interval: number;
}

/** 更新任务参数 */
export interface UpdateTaskParams extends CreateTaskParams {
  /** 任务ID */
  id: number;
}

// ========== 响应数据类型 ==========

/** 任务列表响应 */
export interface TaskListResponse extends CommonResponse {
  data: PageVO<TaskItem>;
}

/** 任务详情响应 */
export interface TaskDetailResponse extends CommonResponse {
  data: TaskDetail;
}

/** 创建任务响应 */
export interface CreateTaskResponse extends CommonResponse {
  data: {
    id: number;
  };
}

// ========== 数据对象类型 ==========

/** 任务列表项 */
export interface TaskItem {
  id: number;
  name: string;
  status: number;
  createTime: string;
}

/** 任务详情 */
export interface TaskDetail extends TaskItem {
  config: TaskConfig;
  interval: number;
  modifyTime: string;
}

/** 任务配置 */
export interface TaskConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
}
```

---

## 4. 禁止事项

### 4.1 禁止使用 any

```typescript
// 禁止！
export async function getTaskListService(params: any): Promise<any> {
  return request('/api/task/list');
}

// 正确
export async function getTaskListService(params: GetTaskListParams): Promise<TaskListResponse> {
  return request('/api/task/list', {
    method: 'GET',
    params,
  });
}
```

### 4.2 禁止省略返回类型

```typescript
// 禁止！
export async function getTaskListService(params: GetTaskListParams) {
  return request('/api/task/list');
}

// 正确
export async function getTaskListService(params: GetTaskListParams): Promise<TaskListResponse> {
  return request('/api/task/list', {
    method: 'GET',
    params,
  });
}
```

### 4.3 禁止内联类型

```typescript
// 禁止！
export async function createTaskService(params: {
  name: string;
  config: { url: string };
}): Promise<{ code: number }> {
  return request('/api/task/create', { data: params });
}

// 正确：在 data.d.ts 中定义类型
export async function createTaskService(params: CreateTaskParams): Promise<CreateTaskResponse> {
  return request('/api/task/create', {
    method: 'POST',
    data: params,
  });
}
```

---

## 5. 最佳实践

### 5.1 统一响应类型

```typescript
// App.d.ts - 通用响应类型
export interface CommonResponse {
  code: number;
  message: string;
  data?: any;
}

export interface PageVO<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}
```

### 5.2 错误处理

```typescript
// 在 requestErrorConfig.ts 中统一处理
// Services 层只需正常返回，不需要单独处理错误

export async function getTaskListService(params: GetTaskListParams): Promise<TaskListResponse> {
  return request('/api/task/list', {
    method: 'GET',
    params,
  });
}
```

### 5.3 请求配置

```typescript
// 支持自定义配置
export async function uploadFileService(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  return request('/api/file/upload', {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
```
