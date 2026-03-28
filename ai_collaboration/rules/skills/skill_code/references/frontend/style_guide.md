# 样式规范

## 1. 样式方案

### 1.1 样式技术栈

| 技术 | 用途 | 说明 |
|------|------|------|
| Less | 样式编写 | CSS预处理器 |
| CSS Modules | 样式隔离 | 自动生成唯一类名 |
| Ant Design | 组件样式 | UI组件库 |

### 1.2 样式文件命名

```
组件名/
├── index.tsx           # 组件文件
├── index.less          # 样式文件（同名）
└── types.d.ts          # 类型定义
```

---

## 2. Less 编写规范

### 2.1 基础规范

```less
// index.less

// 使用类选择器，避免标签选择器
.container {
  display: flex;
  flex-direction: column;
  
  // 嵌套子元素
  .header {
    padding: 16px;
    background: #fff;
    
    .title {
      font-size: 16px;
      font-weight: 500;
    }
  }
  
  .content {
    flex: 1;
    padding: 16px;
  }
}
```

### 2.2 变量使用

```less
// 定义变量
@primary-color: #1890ff;
@text-color: #333;
@border-radius: 4px;

// 使用变量
.button {
  background-color: @primary-color;
  color: #fff;
  border-radius: @border-radius;
  
  &:hover {
    opacity: 0.8;
  }
}
```

### 2.3 混入使用

```less
// 定义混入
.ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 使用混入
.title {
  .ellipsis();
  max-width: 200px;
}

.modal {
  .flex-center();
  width: 400px;
  height: 300px;
}
```

---

## 3. CSS Modules 使用

### 3.1 基础用法

```typescript
// index.tsx
import React from 'react';
import styles from './index.less';

const Component: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>标题</h1>
      </header>
      <main className={styles.content}>
        内容
      </main>
    </div>
  );
};
```

### 3.2 多类名处理

```typescript
import classNames from 'classnames';
import styles from './index.less';

const Component: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div
      className={classNames(styles.item, {
        [styles.active]: active,
      })}
    >
      内容
    </div>
  );
};
```

### 3.3 全局类名

```less
// index.less
.container {
  // 局部类名
  
  :global {
    // 全局类名（不会被转换）
    .ant-btn {
      margin-right: 8px;
    }
  }
}
```

---

## 4. 布局规范

### 4.1 Flex 布局

```less
// 水平居中
.flex-center-h {
  display: flex;
  justify-content: center;
}

// 垂直居中
.flex-center-v {
  display: flex;
  align-items: center;
}

// 完全居中
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 两端对齐
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### 4.2 常用布局模板

```less
// 页面布局
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  .header {
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
  }
  
  .footer {
    flex-shrink: 0;
  }
}

// 左右布局
.layout-lr {
  display: flex;
  
  .sidebar {
    flex-shrink: 0;
    width: 200px;
  }
  
  .main {
    flex: 1;
    min-width: 0; // 防止内容撑开
  }
}
```

---

## 5. 响应式设计

### 5.1 断点定义

```less
// 断点变量
@screen-xs: 480px;
@screen-sm: 576px;
@screen-md: 768px;
@screen-lg: 992px;
@screen-xl: 1200px;
@screen-xxl: 1600px;

// 响应式混入
.respond-to(@breakpoint, @rules) {
  @media (min-width: @breakpoint) {
    @rules();
  }
}

// 使用
.container {
  padding: 16px;
  
  .respond-to(@screen-md, {
    padding: 24px;
  });
  
  .respond-to(@screen-lg, {
    padding: 32px;
  });
}
```

### 5.2 移动端适配

```less
// 移动端优先
.container {
  width: 100%;
  padding: 12px;
  
  // 平板
  @media (min-width: 768px) {
    width: 750px;
    margin: 0 auto;
    padding: 16px;
  }
  
  // 桌面
  @media (min-width: 992px) {
    width: 960px;
    padding: 24px;
  }
}
```

---

## 6. 样式命名规范

### 6.1 BEM 命名法

```less
// Block（块）
.card {
  // Element（元素）
  &__header {
    padding: 16px;
  }
  
  &__body {
    padding: 16px;
  }
  
  // Modifier（修饰符）
  &--primary {
    background: #1890ff;
  }
  
  &--small {
    padding: 8px;
  }
}
```

### 6.2 语义化命名

```less
// 推荐：语义化命名
.page-header { }
.page-content { }
.sidebar-menu { }
.form-actions { }

// 不推荐：表现性命名
.red-text { }
.big-box { }
.left-panel { }
```

---

## 7. 样式检查清单

### 7.1 编写规范

- [ ] 使用 Less 编写样式
- [ ] 使用 CSS Modules 隔离
- [ ] 类名语义化
- [ ] 避免行内样式

### 7.2 性能优化

- [ ] 避免过深嵌套（< 3层）
- [ ] 避免使用通配符选择器
- [ ] 合并相同样式
- [ ] 使用简写属性

### 7.3 兼容性

- [ ] 添加必要的前缀
- [ ] 考虑浏览器兼容
- [ ] 移动端适配
