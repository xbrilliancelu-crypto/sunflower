# 后端命名规范

## 1. 包命名规范

### 1.1 基础包结构

```
com.zjnut.ops.{模块名}
├── api/                    # API层
│   ├── controller/         # 控制器
│   ├── scheduler/          # 调度器
│   └── listener/           # 监听器
│       └── event/          # 事件对象
├── service/                # Service层
│   ├── impl/               # 实现类
│   └── dto/                # 数据传输对象
├── manager/                # Manager层
│   └── bo/                 # 业务对象
├── dao/                    # DAO层
│   ├── mapper/             # Mapper接口
│   └── entity/             # 实体对象
└── common/                 # 模块内公共
    ├── config/             # 配置类
    └── enums/              # 枚举类
```

### 1.2 模块名命名

| 模块 | 包名 |
|------|------|
| 采集模块 | com.zjnut.ops.collector |
| 报警引擎 | com.zjnut.ops.alarm.engine |
| 报警执行 | com.zjnut.ops.alarm.execution |
| 工单模块 | com.zjnut.ops.workorder |
| 权限模块 | com.zjnut.ops.permission |

---

## 2. 类命名规范

### 2.1 各层类命名

| 元素类型 | 命名规则 | 示例 |
|----------|----------|------|
| Controller | XXXController | AlarmRuleController |
| Scheduler | XXXScheduler | MetricCollectScheduler |
| Listener | XXXListener | AlarmEventListener |
| Service接口 | XXXService | AlarmRuleService |
| Service实现 | XXXServiceImpl | AlarmRuleServiceImpl |
| Manager | XXXManager | AlarmEventManager |
| Mapper | XXXMapper | AlarmRuleMapper |
| Entity | XXXEntity | AlarmRuleEntity |

### 2.2 数据对象命名

| 对象类型 | 命名规则 | 用途 | 示例 |
|----------|----------|------|------|
| Entity | XXXEntity | 数据库映射对象 | AlarmRuleEntity |
| DTO | XXXDTO | Service层传输对象 | AlarmEventDTO |
| BO | XXXBO | Manager层业务对象 | AlarmRuleModifyBO |
| VO | XXXVO | 视图对象（返回前端） | AlarmRuleVO |
| Request | XXXRequest | 请求对象 | AlarmRuleCreateRequest |

---

## 3. 方法命名规范

### 3.1 Service层方法命名

| 操作类型 | 命名前缀 | 示例 |
|----------|----------|------|
| 新增 | create / add | createAlarmRule |
| 更新 | update / modify | updateAlarmRule |
| 删除 | delete / remove | deleteAlarmRule |
| 单条查询 | get / find | getAlarmRuleById |
| 列表查询 | list / query | listAlarmRules |
| 分页查询 | page | pageAlarmRules |
| 统计 | count | countAlarmRules |
| 校验 | validate | validateConfig |
| 处理 | process / handle | processAlarmEvent |

### 3.2 Manager层方法命名

| 操作类型 | 命名前缀 | 示例 |
|----------|----------|------|
| 保存 | save | saveAlarmRule |
| 查询 | get / find | getAlarmRuleById |
| 校验 | validate / check | validateConfig |
| 处理 | process | processData |
| 构建 | build | buildAlarmEvent |
| 转换 | convert | convertToEntity |

### 3.3 Mapper方法命名

| 操作类型 | 命名前缀 | 示例 |
|----------|----------|------|
| 插入 | insert | insertAlarmRule |
| 更新 | update | updateAlarmRule |
| 删除 | delete | deleteAlarmRule |
| 单条查询 | select | selectAlarmRuleById |
| 列表查询 | select | selectAlarmRuleList |
| 统计 | select | selectAlarmRuleCount |

---

## 4. 变量命名规范

### 4.1 基本规则

- 使用驼峰命名法
- 变量名要有意义，禁止无意义缩写
- 布尔类型以is/has/can开头

### 4.2 示例

```java
// 正确示例
private String alarmRuleName;
private boolean isActive;
private boolean hasPermission;
private int retryCount;

// 错误示例
private String arn;          // 缩写不明确
private String name1;        // 数字后缀无意义
private boolean active;      // 布尔变量缺少is前缀
```

---

## 5. 常量命名规范

### 5.1 命名规则

- 全大写字母
- 单词间用下划线分隔
- 放在常量类或枚举中

### 5.2 示例

```java
// 常量类
public class AlarmConstants {
    public static final int MAX_RETRY_COUNT = 3;
    public static final String DEFAULT_ALARM_LEVEL = "WARNING";
}

// 枚举
public enum AlarmLevel {
    NORMAL("normal", "正常"),
    WARNING("warning", "告警"),
    CRITICAL("critical", "紧急");
    
    private final String code;
    private final String desc;
}
```

---

## 6. 注释规范

### 6.1 类注释

```java
/**
 * 报警规则服务
 * <p>
 * 提供报警规则的增删改查功能
 * </p>
 *
 * @author 作者名
 * @since 1.0.0
 */
@Service
public class AlarmRuleServiceImpl implements AlarmRuleService {
}
```

### 6.2 方法注释

```java
/**
 * 创建报警规则
 *
 * @param request 创建请求参数
 * @return 规则ID
 * @throws BusinessException 当规则名称已存在时抛出
 */
public Long createAlarmRule(AlarmRuleCreateRequest request) {
}
```

### 6.3 字段注释

```java
/**
 * 报警规则名称
 */
private String ruleName;

/**
 * 报警级别：normal-正常, warning-告警, critical-紧急
 */
private String alarmLevel;
```
