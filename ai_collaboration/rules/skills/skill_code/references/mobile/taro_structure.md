# Taro 项目结构

## 1. 目录结构

### 1.1 标准项目结构

```
ops-center-mobile/
├── config/                        # 编译配置
│   ├── index.js                  # 主配置
│   ├── dev.js                    # 开发环境
│   ├── prod.js                   # 生产环境
│   └── platform/                 # 平台差异化配置
│
├── src/                          # 源码目录
│   ├── app.config.ts             # 应用配置
│   ├── app.tsx                   # 应用入口
│   ├── app.scss                  # 全局样式
│   │
│   ├── pages/                    # 页面目录
│   │   ├── home/                 # 首页
│   │   │   ├── index.tsx
│   │   │   ├── index.config.ts
│   │   │   └── index.scss
│   │   ├── alarm/                # 报警列表
│   │   ├── login/                # 登录
│   │   └── profile/              # 个人中心
│   │
│   ├── subpackages/              # 分包目录
│   │   ├── system/               # 系统设置分包
│   │   └── report/               # 报表分包
│   │
│   ├── components/               # 通用组件
│   │   ├── common/               # 基础组件
│   │   └── business/             # 业务组件
│   │
│   ├── services/                 # 接口服务
│   │   ├── alarm/
│   │   │   ├── index.ts
│   │   │   └── data.d.ts
│   │   └── App.d.ts
│   │
│   ├── store/                    # 状态管理
│   │   ├── index.ts
│   │   └── modules/
│   │
│   ├── hooks/                    # 自定义Hooks
│   │   └── useRequest.ts
│   │
│   ├── utils/                    # 工具函数
│   │   ├── request.ts
│   │   └── storage.ts
│   │
│   ├── constants/                # 常量定义
│   │   └── index.ts
│   │
│   ├── types/                    # 类型定义
│   │   └── global.d.ts
│   │
│   └── assets/                   # 静态资源
│       ├── images/
│       └── icons/
│
├── project.config.json           # 小程序配置
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. 页面结构规范

### 2.1 页面目录结构

```
pages/
├── home/                         # 首页模块
│   ├── index.tsx                 # 页面组件
│   ├── index.config.ts           # 页面配置
│   ├── index.scss                # 页面样式
│   └── components/               # 页面私有组件
│       └── MetricCard/
│           ├── index.tsx
│           └── index.scss
│
├── alarm/                        # 报警模块
│   ├── index.tsx                 # 报警列表
│   ├── detail.tsx                # 报警详情
│   ├── index.config.ts
│   └── index.scss
```

### 2.2 页面组件模板

```typescript
// pages/home/index.tsx
import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { getHomeDataService } from '@/services/home';
import type { HomeData } from '@/services/home/data.d';
import './index.scss';

/**
 * 首页
 */
const Home: React.FC = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getHomeDataService();
      setData(result.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="home-page">
      <View className="header">
        <Text className="title">统一运维平台</Text>
      </View>
      <View className="content">
        {loading ? (
          <Text>加载中...</Text>
        ) : (
          <Text>{data?.title}</Text>
        )}
      </View>
    </View>
  );
};

export default Home;
```

### 2.3 页面配置

```typescript
// pages/home/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundTextStyle: 'dark',
});
```

---

## 3. 分包配置

### 3.1 分包配置

```typescript
// app.config.ts
export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/alarm/index',
    'pages/login/index',
    'pages/profile/index',
  ],
  subpackages: [
    {
      root: 'subpackages/system',
      pages: [
        'settings/index',
        'about/index',
      ],
    },
    {
      root: 'subpackages/report',
      pages: [
        'list/index',
        'detail/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '统一运维平台',
    navigationBarTextStyle: 'black',
  },
});
```

### 3.2 分包原则

| 原则 | 说明 |
|------|------|
| 主包大小 | 主包不超过2MB |
| 分包大小 | 单个分包不超过2MB |
| 总大小 | 总大小不超过20MB |
| 按需加载 | 非常用页面放入分包 |

---

## 4. 组件规范

### 4.1 组件目录

```
components/
├── common/                       # 通用组件
│   ├── Loading/
│   │   ├── index.tsx
│   │   └── index.scss
│   └── Empty/
│       ├── index.tsx
│       └── index.scss
│
└── business/                     # 业务组件
    ├── AlarmCard/
    │   ├── index.tsx
    │   ├── index.scss
    │   └── types.d.ts
    └── MetricPanel/
        └── index.tsx
```

### 4.2 组件模板

```typescript
// components/business/AlarmCard/index.tsx
import { View, Text } from '@tarojs/components';
import type { AlarmCardProps } from './types';
import './index.scss';

/**
 * 报警卡片组件
 */
const AlarmCard: React.FC<AlarmCardProps> = ({
  title,
  level,
  time,
  onClick,
}) => {
  return (
    <View className="alarm-card" onClick={onClick}>
      <View className="alarm-card__header">
        <Text className="alarm-card__title">{title}</Text>
        <Text className={`alarm-card__level alarm-card__level--${level}`}>
          {level === 'critical' ? '紧急' : level === 'warning' ? '告警' : '正常'}
        </Text>
      </View>
      <View className="alarm-card__body">
        <Text className="alarm-card__time">{time}</Text>
      </View>
    </View>
  );
};

export default AlarmCard;
```

---

## 5. Services 层规范

### 5.1 接口定义

```typescript
// services/alarm/index.ts
import Taro from '@tarojs/taro';
import type { AlarmListResponse, AlarmDetailResponse } from './data.d';

const BASE_URL = '/api';

/**
 * 获取报警列表
 */
export async function getAlarmListService(
  params: AlarmListParams
): Promise<AlarmListResponse> {
  return Taro.request({
    url: `${BASE_URL}/alarm/list`,
    method: 'GET',
    data: params,
  }).then((res) => res.data);
}

/**
 * 获取报警详情
 */
export async function getAlarmDetailService(
  id: number
): Promise<AlarmDetailResponse> {
  return Taro.request({
    url: `${BASE_URL}/alarm/${id}`,
    method: 'GET',
  }).then((res) => res.data);
}
```

### 5.2 类型定义

```typescript
// services/alarm/data.d.ts
export interface AlarmItem {
  id: number;
  title: string;
  level: 'critical' | 'warning' | 'normal';
  status: number;
  createTime: string;
}

export interface AlarmListParams {
  status?: number;
  page?: number;
  pageSize?: number;
}

export interface AlarmListResponse {
  code: number;
  message: string;
  data: {
    list: AlarmItem[];
    total: number;
  };
}
```

---

## 6. 样式规范

### 6.1 样式编写

```scss
// pages/home/index.scss
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
  
  .header {
    padding: 20px;
    background: #fff;
    
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  
  .content {
    padding: 20px;
  }
}
```

### 6.2 尺寸单位

| 单位 | 说明 |
|------|------|
| px | 按750设计稿编写，编译时自动转换 |
| rpx | 小程序原生单位 |
| % | 百分比 |
