# 渐进式重构策略

本文档定义了对历史代码进行重构时的策略和原则，确保在改善代码质量的同时最小化风险。

## 1. 历史代码修改原则

### 1.1 最小侵入原则

- **优先新增代码**，避免修改历史代码
- **新增方法**而非修改方法签名
- **保留旧方法**并标记 `@Deprecated`，逐步迁移调用方
- **避免大规模重构**，采用渐进式小步改进

### 1.2 向后兼容原则

- 保持接口签名不变
- 新增参数使用默认值或重载方法
- 废弃方法至少保留一个版本周期
- 在废弃方法上添加迁移说明注释

### 1.3 可测试原则

- 重构前确保有测试覆盖
- 重构过程中保持测试通过
- 重构后补充新功能的测试

## 2. 循环依赖处理规范

### 2.1 循环依赖识别

当发现以下情况时，可能存在循环依赖：

```java
// ServiceA 注入了 ServiceB
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

// ServiceB 也注入了 ServiceA
@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}
```

### 2.2 循环依赖解决方案

#### 方案一：提取公共逻辑到独立Service

```java
// 提取公共逻辑到新Service
@Service
public class CommonService {
    public void commonMethod() { ... }
}

// ServiceA 和 ServiceB 都依赖 CommonService
@Service
public class ServiceA {
    @Autowired
    private CommonService commonService;
}
```

#### 方案二：使用事件驱动解耦

```java
// 使用Spring事件替代直接调用
public class OrderEvent extends ApplicationEvent {
    private Long orderId;
}

@Service
public class ServiceA {
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    public void doSomething() {
        eventPublisher.publishEvent(new OrderEvent(orderId));
    }
}

@Service
public class ServiceB {
    @EventListener
    public void handleOrderEvent(OrderEvent event) {
        // 处理事件
    }
}
```

#### 方案三：使用 @Lazy 延迟加载（临时方案）

```java
@Service
public class ServiceA {
    @Autowired
    @Lazy
    private ServiceB serviceB;
}
```

> 注意：@Lazy 只是临时解决方案，应最终采用方案一或方案二解决根本问题。

### 2.3 循环依赖处理流程

1. **识别循环依赖**：分析依赖关系图
2. **评估影响**：确定循环依赖的范围
3. **选择方案**：根据业务逻辑选择合适的解决方案
4. **设计方案**：在详细设计文档中说明解决方案
5. **逐步实施**：小步重构，保持测试通过

## 3. 大型Service拆分策略

### 3.1 拆分时机

当Service出现以下情况时，应考虑拆分：

- 代码量超过500行
- 职责不单一，涉及多个业务领域
- 测试困难，依赖过多
- 修改频繁，经常产生冲突

### 3.2 拆分策略

#### 按业务能力拆分

```
OrderService (2800行)
    ├── OrderCreateService（订单创建）
    ├── OrderQueryService（订单查询）
    ├── OrderUpdateService（订单更新）
    └── OrderCancelService（订单取消）
```

#### 提取Manager层

```
将可复用的业务逻辑提取到Manager层：

OrderService
    └── OrderManager（复用逻辑）
    └── PaymentManager（支付相关）
    └── InventoryManager（库存相关）
```

### 3.3 拆分步骤

1. **分析职责**：识别Service中的不同职责
2. **创建新Service**：按职责创建新的Service类
3. **迁移代码**：逐步将代码迁移到新Service
4. **更新调用**：修改调用方使用新Service
5. **废弃旧方法**：标记旧方法为@Deprecated
6. **清理代码**：在确保无调用后删除旧代码

## 4. 数据库变更规范

### 4.1 表结构变更

- 新增字段：使用默认值，避免NOT NULL约束
- 修改字段：先新增新字段，迁移数据后删除旧字段
- 删除字段：先标记为废弃，确认无使用后再删除

### 4.2 数据迁移

- 编写迁移脚本存放在 `./ai_collaboration/scripts/db/` 目录
- 迁移脚本需有回滚脚本
- 大数据量迁移需分批执行
- 迁移前备份相关数据

## 5. 重构记录

建议在 `./ai_collaboration/docs/` 目录下创建重构记录文档，记录：

- 重构原因和目标
- 影响范围评估
- 实施步骤
- 测试验证结果
- 回滚方案
