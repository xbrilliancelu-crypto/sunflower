# 统一运维平台 - Java后端技术栈及工程规范（仅范例 需具体适配修改）

## 1. 概述

本文档定义统一运维平台后端技术栈、版本、项目结构、命名规范和架构模式，为协作框架提供统一的技术规范依据。

## 2. 后端工程 (Ops-Center)

### 2.1 核心技术栈版本

### 2.2 工程模块拆分

```
ops-center/                         # 工程根目录
├── pom.xml                         # 父POM（包管理）
├── ops-center-common/              # 通用设施-通用模块
├── ops-center-infrastructure/      # 基础设施层-基础设施模块
├── ops-center-collector/           # 业务逻辑层-数据采集模块
```

### 2.3 模块内部结构规范

各模块遵循如下分层结构规范：
（1）其中api层各顶层子包（例如controller / scheduler / listener等）并非每个模块都必需，各模块根据自身业务属性按需取用；
（2）其他层中的各个顶层子包（service / manager / dao / config）均为必需结构规范，顶层子包下已明确列出的子包也为必需结构规范。其余内部新增子包划分，则根据各模块自身业务需要按需添加；

```
模块名/
├── src/main/java/com/zjnut/ops/模块目录/
│   ├── api/                        # API层
│   │   ├── controller/             # 控制器（前端所调用的接口控制器 - 主要用于应用层模块）
│   │   │   ├── XXXController.java  # 控制器类
│   │   │   ├── request/            # 请求对象
│   │   │   └── vo/                 # 视图对象
│   ├── service/                    # 服务层（复杂业务逻辑调度整合 可支持抽象/接口构建设计模式）
│   │   ├── XXXService.java         # 服务接口（service/下业务器类也可以根据场景分子包）
│   │   ├── impl/                   # 服务实现包
│   │   │   └── XXXServiceImpl.java # 服务实现
│   │   └── dto/                    # 数据传输对象包
│   │   │   └── XXXDTO.java         # 数据传输对象
│   ├── manager/                    # 管理器层（各个单元的业务能力组件）
│   │   └── XXXXManager.java        # 管理器逻辑组件类（manager/下管理器类也可以根据场景分子包）
│   │   └── bo/                     # 业务对象包
│   │   │   └── XXXBO.java          # 业务对象
│   ├── dao/                        # 数据访问层
│   │   ├── mapper/                 # MyBatis映射器
│   │   └── entity/                 # 实体对象
│   ├── common/                     # 模块内公共业务逻辑包
│   │   ├── config/                 # 配置类
│   │   └── enums/                  # 模块内公共枚举类
├── src/main/resources/
│   ├── mapper/                     # XML映射文件
│   └── application-模块名.yml      # 模块配置
└── pom.xml
```

各分层之间具有明确的调用顺序规范，生成代码时必需遵守如下：

```
api (模块调用入口)
    ├── service（需复杂整合的逻辑或需对其模块暴露的能力入口 则使用service接口作为逻辑封装层）
    │   ├── 其他模块api层接口（详细要求参照下面备注中【高内聚低耦合】规范）
    │   ├── 本模块内service（service层可以调用同级的其他service）
    │   ├── 本模块内manager（service层一般情况下主要调用manager）
    │   ├── 本模块内dao（service层中必要简化时也可直接调用dao）
    │   └── common（servicer层复杂逻辑中 需要时可直接使用common类）
    ├── manager （简单业务下 api层可直接调用manager）
    │   ├── 本模块内manager（manager层 可以调用同级的其他manager）
    │   ├── 本模块内dao（manager层 可调用下层的dao 不能向上反相调用service）
    │   └── common（manager层 需要时可直接使用common类）
    └── dao （dao层 只能引用下层的资源文件 并推荐所有sql都通过xml文件定义 不使用公共函数式api实现sql调用）

    【高内聚低耦合规范】
    每个模块，如果有需要调用其他模块的场景，则该调用触发必需放在service层，不能放到下层包中；
    且该场景下，也只能调用其他模块的service服务层中的入口，不可直接调用其他模块的service以下的内容（也不要直接使用api层的接口），保证对应模块高内聚低耦合；
```

### 2.4 命名规范

| 元素类型                | 命名规则                         | 示例                         |
|---------------------|------------------------------|----------------------------|
| 模块名                 | ops-center-功能名               | ops-center-collector       |
| 包名                  | com.zjnut.ops.模块名.层级         | com.zjnut.ops.alarm.engine |
| dao.entity包下数据库映射对象 | XXXEntity                    | AlarmRuleEntity            |
| service层数据传输对象      | XXXDTO                       | AlarmEventDTO              |
| service层业务服务类       | XXXService / XXXXServiceImpl | AlarmRuleService           |
| manager层组件业务管理器     | XXXManager                   | AlarmEventManager          |
| manager层业务对象        | XXXBO                        | AlarmRuleModifyBO          |
| api层控制器             | XXXController                | AlarmRuleController        |
| api层客户端视图对象         | XXXVO                        | AlarmRuleVO                |
| api层客户端请求对象         | XXXRequest                   | AlarmRuleModifyRequest     |
| api层事件监听器           | XXXListener                  | AlarmRuleJudgeListener     |
| api层事件传递对象          | XXXEvent                     | AlarmExecutionEvent        |

【备注】
（1）service下服务类也可以根据场景分子包（例如adapter包/processor包等，包内含对应XXXAdapter类实现））
（2）manager下管理器类也可以根据场景分子包（例如detector包/processor包等，包内含对应XXXDetector类实现）

### 2.5 架构模式

- **分层架构**：API层→service层→manager层→DAO层，绝不允许在API层中直接调用DAO层；
- **模块化设计**：单体应用多模块，支持渐进式演进
- **事件驱动**：业务逻辑模块间采用事件通知模型解耦
- **插件化扩展**：规则引擎支持插件化扩展

### 2.6 关于dao层写法规范

- **优先使用mybatis.basemapper中的简单sql方法**：对于简单且只有明确id作为参数的sql查询变更之类，例如基于主键变更updateById等，可直接使用basemapper中的样板sql方法；并且限定BaseMapper中的方法可使用的就如下几个：
  - insert
  - updateById
  - selectById
  - selectBatchIds
  除此之外的BaseMapper方法均不可使用；
- **其次使用xml直观呈现业务sql**：对于不能直接使用的basemapper中样板sql方法的场景，需进行自定义sql查询，对应sql写法一定要采用xml定义的方式，不可使用函数式sql拼装写法；
- **不可使用函数式sql拼装写法**：在调用mybatis查询db时，不要用mybatis-plus的Java的函数式编程形式的写法来实现sql查询，而应该使用xml文件形式，将需要执行的sql显式呈现；
- **不要使用动态SQL**：尽量避免在sql中使用if、choose等动态条件，这些逻辑应在service或manager层处理；
- **SQL语句规范**：SQL语句应简洁清晰，避免过长的SQL语句，使用表别名提高可读性，确保SQL语句的可维护性。连表查询，所涉及表最多不能超过3个；需要超过3个的场景，需要想办法拆成多个查询，并应在service或manager层做整合处理；
- **不要使用pgsql中不兼容的高级用法**：应尽量避免使用pgsql不兼容的函数和字段类型的使用，所有表结构定义和sql都尽量避免；
- **删除操作必需使用逻辑删除**：删除sql，必需通过update del_flag字段为1来实现逻辑删除，不可使用物理删除；并且也不推荐使用BaseMapper中的delete相关方法（例如deleteXXX等）；

### 2.7 前后端接口对接数据结构规范

**2.7.1 统一响应数据结构（响应结构默认使用com.zjnut.ops.common.core.web.CommonResponse进行封装）**:

翻页列表类接口的响应数据结构示例如下（此场景下，需要对CommonResponse中的data属性的类默认继承com.zjnut.ops.common.core.web.PageVO类即可得到此类data返回结构）

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

**2.7.2 code统一错误码规范**:

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 代理不存在 |
| 500 | 服务器内部错误 |

**2.7.3 http接口（controller）地址命名规范**: 
接口地址应以 `/api` 作为统一上下文，使用小写字母，模块间用斜杠分隔，方法名应动词开头，如 `/api/collector/agent/restart`

**2.7.4 请求参数规范**: 

### 2.8 推荐重要写法规范

**2.8.1 优先使用lombok**:
- 推荐优先使用lombok注解，例如@Data @Getter @Setter等，简化实体类的get/set写法；
- 推荐使用lombok注解起到简化代码写法作用；

**2.8.2 接口参数校验规范**:
- 所有API接口必须使用`jakarta.validation`和`hibernate-validator`进行参数校验；
- Request DTO类中的字段根据业务场景添加合适的校验注解，常用的注解包括：
  - `@NotBlank`: 字符串字段非空（用于String类型）
  - `@NotNull`: 字段非空（用于对象类型）
  - `@NotEmpty`: 集合/数组/Map非空
  - `@Size(min=x, max=y)`: 字符串或集合长度范围
  - `@Min(value)` / `@Max(value)`: 数值范围
  - `@Email`: 邮箱格式校验
  - `@Pattern(regexp)`: 正则表达式校验
  - `@Length(min=x, max=y)`: 字符串长度范围
  - `@Positive` / `@Negative`: 正数/负数校验
- Controller层方法参数必须使用`@Valid`或`@Validated`注解触发校验；
- 校验失败时自动抛出`MethodArgumentNotValidException`，通过全局异常处理器统一处理；
- 示例：
  ```java
  // Request DTO
  @Data
  public class LoginRequest implements Serializable {
      @NotBlank(message = "登录账号不能为空")
      private String username;

      @NotBlank(message = "密码不能为空")
      @Size(min = 6, max = 20, message = "密码长度必须在6-20位之间")
      private String password;
  }

  // Controller方法
  @PostMapping("/login")
  public Result<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
      // 业务逻辑
  }
  ```

**2.8.3 接口参数校验规范**:
绝不允许在API层中直接调用DAO层

### 2.9 关于ddl表结构设计规范
- 每张新建的数据库表，都需要包含如下几个标准字段，对应的字段名和类型限制如下：
```
id BIGINT AUTO_INCREMENT PRIMARY KEY,
create_time          timestamp(3) default CURRENT_TIMESTAMP(3) not null comment '创建时间',
modify_time          timestamp(3) default CURRENT_TIMESTAMP(3) not null on update CURRENT_TIMESTAMP(3) comment '修改时间',
del_flag             tinyint      default 0                    null comment '删除标识 (0:正常, 1:删除)'
```
