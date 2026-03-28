# API 文档格式

## 1. API 文档结构

### 1.1 文档模板

```markdown
# {模块名称} 接口文档

## 1. 概述
[模块功能说明]

## 2. 接口列表

### 2.1 {接口名称}

**接口描述**：[接口功能说明]

**请求方式**：`POST` / `GET` / `PUT` / `DELETE`

**接口地址**：`/api/{module}/{action}`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 主键ID |

**请求示例**：
```json
{
  "id": 1,
  "name": "示例"
}
```

**响应参数**：

| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | Integer | 响应码 |
| message | String | 响应信息 |
| data | Object | 响应数据 |

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "示例"
  }
}
```

## 3. 数据模型

## 4. 错误码
```

---

## 2. 请求参数说明

### 2.1 参数表格格式

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|--------|
| id | Long | 是 | 主键ID | 1 |
| name | String | 是 | 名称，长度1-50 | "测试规则" |
| status | Integer | 否 | 状态，默认为1 | 1 |
| createTime | DateTime | 否 | 创建时间 | "2026-03-04 12:00:00" |

### 2.2 参数类型说明

| 类型 | 说明 | 示例 |
|------|------|------|
| Long | 长整型 | 123456789 |
| Integer | 整型 | 1 |
| String | 字符串 | "文本内容" |
| Boolean | 布尔值 | true / false |
| DateTime | 日期时间 | "2026-03-04 12:00:00" |
| Object | 对象 | {"key": "value"} |
| Array | 数组 | [1, 2, 3] |

---

## 3. 响应格式说明

### 3.1 统一响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 业务数据
  }
}
```

### 3.2 分页响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      { "id": 1, "name": "项目1" },
      { "id": 2, "name": "项目2" }
    ],
    "total": 100,
    "current": 1,
    "pageSize": 10
  }
}
```

### 3.3 响应码说明

| 响应码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/登录过期 |
| 403 | 无权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 4. 接口文档示例

### 4.1 创建接口

```markdown
### 2.1 创建采集器

**接口描述**：创建新的采集器配置

**请求方式**：`POST`

**接口地址**：`/api/collector/create`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 采集器名称，长度1-50 |
| type | String | 是 | 采集类型：HTTP/MQTT/FILE |
| config | Object | 是 | 采集配置 |
| interval | Integer | 否 | 采集间隔（秒），默认60 |

**请求示例**：
```json
{
  "name": "服务器监控采集器",
  "type": "HTTP",
  "config": {
    "url": "http://localhost:8080/metrics",
    "method": "GET",
    "timeout": 5000
  },
  "interval": 60
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1
  }
}
```
```

### 4.2 查询接口

```markdown
### 2.2 查询采集器列表

**接口描述**：分页查询采集器列表

**请求方式**：`GET`

**接口地址**：`/api/collector/list`

**请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 否 | 采集器名称，支持模糊查询 |
| type | String | 否 | 采集类型 |
| status | Integer | 否 | 状态：1-启用, 0-禁用 |
| current | Integer | 否 | 当前页码，默认1 |
| pageSize | Integer | 否 | 每页条数，默认10 |

**请求示例**：
```
GET /api/collector/list?name=服务器&type=HTTP&current=1&pageSize=10
```

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "服务器监控采集器",
        "type": "HTTP",
        "status": 1,
        "createTime": "2026-03-04 12:00:00"
      }
    ],
    "total": 1,
    "current": 1,
    "pageSize": 10
  }
}
```
```

---

## 5. 数据模型定义

### 5.1 模型定义格式

```markdown
## 3. 数据模型

### 3.1 CollectorEntity

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | Long | 主键ID |
| name | String | 采集器名称 |
| type | String | 采集类型 |
| config | String | 采集配置（JSON） |
| status | Integer | 状态：1-启用, 0-禁用 |
| createTime | DateTime | 创建时间 |
| modifyTime | DateTime | 修改时间 |
| delFlag | Integer | 删除标识：0-正常, 1-删除 |
```

### 5.2 枚举定义

```markdown
### 3.2 CollectorType

| 值 | 说明 |
|------|------|
| HTTP | HTTP接口采集 |
| MQTT | MQTT消息采集 |
| FILE | 文件采集 |
```

---

## 6. 错误码定义

```markdown
## 4. 错误码

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 10001 | 采集器名称已存在 | 创建时名称重复 |
| 10002 | 采集器不存在 | 更新/删除时ID无效 |
| 10003 | 采集器配置无效 | 配置JSON格式错误 |
| 10004 | 采集器正在运行 | 无法删除运行中的采集器 |
```
