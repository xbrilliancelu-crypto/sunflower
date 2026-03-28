# 唯一标识符接口文档

## 页面功能

唯一标识符页面用于获取设备类型的唯一标识符列表，包括以下功能：

- **标识符列表展示**：展示所有设备的唯一标识符
- **设备选择**：在采集端配置时选择设备类型

## 数据模型

### UniqueIdentifierOption 唯一标识符选项

| 字段 | 类型 | 说明 |
|------|------|------|
| value | string | 唯一标识符值 |
| label | string | 唯一标识符标签 |
| description | string | 描述信息 |

## 接口列表

### 1. 获取唯一标识符列表

**接口地址**: `GET /api/collector/unique-identifier/list`

**请求参数**: 无

**响应数据**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "value": "DEVICE:device-001",
      "label": "DEVICE:device-001",
      "description": "食品安全检测设备001"
    },
    {
      "value": "DEVICE:device-002",
      "label": "DEVICE:device-002",
      "description": "食品安全检测设备002"
    },
    {
      "value": "DEVICE:device-003",
      "label": "DEVICE:device-003",
      "description": "食品安全检测设备003"
    },
    {
      "value": "DEVICE:device-004",
      "label": "DEVICE:device-004",
      "description": "食品安全检测设备004"
    },
    {
      "value": "DEVICE:device-005",
      "label": "DEVICE:device-005",
      "description": "食品安全检测设备005"
    }
  ]
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 500 | 服务器内部错误 |
