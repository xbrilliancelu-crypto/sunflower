# 后端技术栈及工程规范

> 本文档隶属于**公共规范层**，负责约束后端的统一技术选型，及后端基础实现规范。
> 各skill所需的明细规范，需参考 `skills/skill_code/references/backend/` 中的相关详细规范文档；

---

## 1. 概述

本文档定义后端技术栈、版本、项目结构、命名规范和架构模式，为协作框架提供统一的技术规范依据。

## 2. 后端工程结构

### 2.1 核心技术栈版本

| 组件 | 版本 | 说明 |
|------|------|------|
| Java | 21 | 使用Java 21长期支持版本 |
| Spring Boot | 3.4.0+ | 支持虚拟线程等新特性 |
| MyBatis-Plus | 3.5.5+ | 数据访问层框架 |
| Maven | 3.8+ | 构建工具 |
| MySQL | 8.x+ | 主数据库 |
| Redis | 7.x+ | 缓存和队列 |
| Quartz | 2.3.2+ | 定时任务调度框架 |
| Hutool | 5.8.38 | 通用工具包 |
| Lombok | 1.18.36 | 实体方法收敛工具 |

### 2.2 工程模块拆分

```
project-root/                         # 工程根目录
├── pom.xml                           # 父POM（包管理）
├── module-common/                    # 通用设施-通用模块
├── module-infrastructure/            # 基础设施层-基础设施模块
├── module-business-core/             # 业务逻辑层-核心业务模块
├── module-business-auxiliary-*/      # 业务逻辑层-辅助业务模块（可多个）
├── module-application-*/             # 应用层-应用服务模块（可多个）
├── module-admin/                     # 通用业务组件模块
└── module-web/                       # Web应用启动入口模块
```

> **模块命名规范**：详见 `common/arch_solutions.md` 中的模块划分方法

### 2.3 模块内部结构规范

各模块遵循如下分层结构规范：

```
模块名/
├── src/main/java/com/example/project/模块目录/
│   ├── api/                        # API层
│   │   ├── controller/             # 控制器（前端所调用的接口控制器 - 主要用于应用层模块）
│   │   │   ├── XXXController.java  # 控制器类
│   │   │   ├── request/            # 请求对象
│   │   │   └── vo/                 # 视图对象
│   │   ├── scheduler/              # 调度器（定时任务入口）
│   │   │   └── XXXScheduler.java   # 调度器入口类
│   │   ├── listener/               # 事件监听器（事件消费逻辑入口）
│   │   │   └── XXXListener.java    # 监听器入口类
│   │   │   └── event/              # 事件对象定义
│   ├── service/                    # 服务层（复杂业务逻辑调度整合）
│   │   ├── XXXService.java         # 服务接口
│   │   ├── impl/                   # 服务实现包
│   │   │   └── XXXServiceImpl.java # 服务实现
│   │   └── dto/                    # 数据传输对象包
│   │   │   └── XXXDTO.java         # 数据传输对象
│   ├── manager/                    # 管理器层（各个单元的业务能力组件）
│   │   └── XXXXManager.java        # 管理器逻辑组件类
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

**各层调用规则**：

```
api (模块调用入口)
    ├── service（需复杂整合的逻辑或需对其模块暴露的能力入口）
    │   ├── 其他模块service层（高内聚低耦合规范）
    │   ├── 本模块内service
    │   ├── 本模块内manager
    │   ├── 本模块内dao（dao层只引用下层资源文件，推荐所有sql通过xml定义）
    │   └── common
    ├── manager （简单业务下api层可直接调用manager）
    │   ├── 本模块内dao（dao层只引用下层资源文件，推荐所有sql通过xml定义）
    └── └── common

    【高内聚低耦合规范】
    跨模块调用必需放在service层，且只能调用其他模块的service层；
```

> **详细规范**：具体的分层架构实现、调用规则、代码示例等，请参考 `skills/skill_code/references/backend/layer_architecture.md`

### 2.4 命名规范

| 元素类型 | 命名规则 | 示例 |
|---------|---------|------|
| 模块名 | module-功能名 | module-business-core |
| 包名 | com.example.project.模块名.层级 | com.example.project.business.core |
| dao.entity包下数据库映射对象 | XXXEntity | UserEntity |
| service层数据传输对象 | XXXDTO | EventDTO |
| service层业务服务类 | XXXService / XXXServiceImpl | UserService |
| manager层组件业务管理器 | XXXManager | EntityManager |
| manager层业务对象 | XXXBO | UserModifyBO |
| api层控制器 | XXXController | UserController |
| api层客户端视图对象 | XXXVO | UserVO |
| api层客户端请求对象 | XXXRequest | UserModifyRequest |
| api层事件监听器 | XXXListener | EventListener |
| api层事件传递对象 | XXXEvent | ExecutionEvent |

> **详细规范**：具体的命名规则、最佳实践等，请参考 `skills/skill_code/references/backend/naming_convention.md`

### 2.5 架构模式

- **分层架构**：API层→Service层→Manager层→DAO层，绝不允许在API层中直接调用DAO层；
- **模块化设计**：单体应用多模块，支持渐进式演进
- **事件驱动**：业务逻辑模块间采用事件通知模型解耦
- **插件化扩展**：规则引擎支持插件化扩展

### 2.6 DAO层规范

**核心原则**：
- 优先使用MyBatis-Plus提供的BaseMapper方法
- 复杂查询使用XML定义SQL
- 避免使用动态SQL，保持SQL可读性
- 删除操作必需使用逻辑删除

**BaseMapper可用方法**：
- `insert`: 插入记录
- `updateById`: 根据ID更新
- `selectById`: 根据ID查询
- `selectBatchIds`: 根据ID列表批量查询

> **详细规范**：具体的MyBatis使用规范、SQL编写规范、最佳实践等，请参考 `skills/skill_code/references/backend/mybatis_guide.md`

**数据模型设计**：
每张表必需包含的标准字段：
```
id BIGINT AUTO_INCREMENT PRIMARY KEY,
create_time timestamp(3) default CURRENT_TIMESTAMP(3) not null comment '创建时间',
modify_time timestamp(3) default CURRENT_TIMESTAMP(3) not null on update CURRENT_TIMESTAMP(3) comment '修改时间',
del_flag tinyint default 0 null comment '删除标识 (0:正常, 1:删除)'
```

### 2.7 前后端接口对接数据结构规范

#### 2.7.1 统一响应数据结构

**响应结构默认使用 `com.example.project.common.core.web.CommonResponse` 进行封装**

**翻页列表类接口响应结构**：
（data属性类默认继承 `com.example.project.common.core.web.PageVO`）

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "item-001",
        "name": "示例项目",
        "status": "active"
      }
    ],
    "total": 4,
    "current": 1,
    "pageSize": 10
  }
}
```

**非翻页列表类接口响应结构**：
（动作型接口只需成功与否时data可为空，code为200即为成功）

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "value1": 4,
    "value2": "示例值",
    "resultJSON": {
      "key1": "value1",
      "key2": "value2"
    }
  }
}
```

#### 2.7.2 统一错误码规范

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

#### 2.7.3 HTTP接口地址命名规范

接口地址应以 `/api` 作为统一上下文，使用小写字母，模块间用斜杠分隔，方法名应动词开头。

**示例**：
```
/api/module-business-core/item/restart
/api/module-application-permission/user/list
/api/module-admin/organization/create
```

#### 2.7.4 请求参数规范

**身份识别token串**：统一放在requestHeader中的 `Authorization` 参数下

**业务请求参数**：统一放在requestBody中，以json格式传递

**公共请求参数**：统一使用 `com.example.project.common.core.web.CommonRequestData` 进行封装

### 2.8 编码规范

#### 2.8.1 Lombok使用规范

推荐优先使用Lombok注解，简化实体类的get/set写法。

**常用注解**：
- `@Data`: 自动生成getter/setter/toString/equals/hashCode
- `@Getter` / `@Setter`: 单独生成getter或setter
- `@NoArgsConstructor` / `@AllArgsConstructor`: 生成无参/全参构造器
- `@Builder`: 构建器模式

#### 2.8.2 接口参数校验规范

所有API接口必须使用 `jakarta.validation` 和 `hibernate-validator` 进行参数校验。

**常用校验注解**：
- `@NotBlank`: 字符串字段非空
- `@NotNull`: 字段非空（对象类型）
- `@NotEmpty`: 集合/数组/Map非空
- `@Size(min=x, max=y)`: 字符串或集合长度范围
- `@Min(value)` / `@Max(value)`: 数值范围
- `@Email`: 邮箱格式校验
- `@Pattern(regexp)`: 正则表达式校验
- `@Length(min=x, max=y)`: 字符串长度范围
- `@Positive` / `@Negative`: 正数/负数校验

**Controller层必须使用 `@Valid` 或 `@Validated` 注解触发校验**

> **详细规范**：具体的校验注解使用、自定义校验、最佳实践等，请参考 `skills/skill_code/references/backend/validation_guide.md`

#### 2.8.3 异常处理规范

- 使用全局异常处理器统一处理异常
- 业务异常分类处理
- 校验失败自动抛出 `MethodArgumentNotValidException`

> **详细规范**：具体的异常处理规范、自定义异常、最佳实践等，请参考 `skills/skill_code/references/backend/exception_handling.md`

#### 2.8.4 日志规范

- 统一日志格式
- 关键操作记录审计日志
- 日志级别规范使用

> **详细规范**：具体的日志使用规范、日志级别定义、最佳实践等，请参考 `skills/skill_code/references/backend/logging_standard.md`

### 2.9 其他规范

**分层调用规范**：
- 绝不允许在API层中直接调用DAO层
- 必需严格遵守分层调用规则

---

## 3. 开发环境配置

### 3.1 IDE配置

- 安装Lombok插件
- 配置代码格式化规则

### 3.2 Maven配置

```xml
<!-- 父POM示例 -->
<properties>
    <java.version>21</java.version>
    <spring-boot.version>3.4.0</spring-boot.version>
    <mybatis-plus.version>3.5.5</mybatis-plus.version>
</properties>
```

### 3.3 环境变量规范

| 环境 | 配置文件 | 用途 |
|------|----------|------|
| 开发 | application-dev.yml | 本地开发环境 |
| 测试 | application-test.yml | 测试环境 |
| 生产 | application-prod.yml | 生产环境 |

---

## 4. 明细规范索引

本文档定义后端技术选型和框架级规范，具体的实现细节和最佳实践请参考以下明细规范：

| 规范名称 | 路径 | 说明 |
|---------|------|------|
| 分层架构实现规范 | `skills/skill_code/references/backend/layer_architecture.md` | 详细的分层实现、调用规则、代码示例 |
| 命名规范 | `skills/skill_code/references/backend/naming_convention.md` | 详细的命名规则、最佳实践 |
| MyBatis使用规范 | `skills/skill_code/references/backend/mybatis_guide.md` | 详细的MyBatis使用、SQL编写规范 |
| 参数校验规范 | `skills/skill_code/references/backend/validation_guide.md` | 详细的校验注解使用、自定义校验 |
| 异常处理规范 | `skills/skill_code/references/backend/exception_handling.md` | 详细的异常处理、自定义异常 |
| 日志规范 | `skills/skill_code/references/backend/logging_standard.md` | 详细的日志使用、日志级别定义 |

---

**版本记录**
- v1.0：后端技术栈及工程规范初始版本
- 创建日期：2026年1月29日
- 适用范围：所有后端开发工作
