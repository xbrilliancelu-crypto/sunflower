## 1. 工作区整体说明

本工程采用 AI 协作框架进行日常迭代开发，支持后端、Web 端、移动端等多端协作。工作区中的各个顶层根目录的职责说明如下：

### 1.1 业务代码区

业务代码区包含项目各端的具体业务实现代码：

| 目录 | 说明 |
|-----|------|
| `backend/` | 后端服务代码，包含 API 接口、业务逻辑、数据持久化等 |
| `web/` | Web 端代码，包含管理后台等前端实现 |
| `mobile/` | 移动端代码，支持 H5/小程序/App 多端应用 |

> 注：具体项目可根据实际需要调整业务代码区的目录结构，上述为推荐的标准结构。

### 1.2 AI协作框架区（ai_collaboration/）

- **ai_collaboration/docs**：存放项目需求及方案设计等文档资料
    - **docs/detail_solutions**：存放详细技术方案文档
    - **docs/api_docs**：存放接口定义文档
    - **docs/sprints**：存放冲刺需求说明文档
    - **docs/reports**：存放各类分析报告（如依赖分析、风险评估等）
- **ai_collaboration/rules**：存放项目技术栈工程规范和顶层架构设计说明等高级规范
- **ai_collaboration/tasks**：存放执行具体的技术方案分析和需求开发任务时，先行规划的具体任务列表和对应的目标/要求等信息
- **ai_collaboration/scripts**：存档数据库变更脚本等工具

## 2. AI编码协作范式

每次落地具体的需求编码前，最好都需要先对本次需求实现，进行详细设计梳理和任务拆分规划，如果有需要定义api接口的也需梳理接口定义，生成并记录相关的文档，供给开发人员确认后，才能继续执行后续的动作（任务列表拆解或正式编码）。
当某个任务落地完成后，才对该任务列表项进行勾选操作；完成一个勾选一个，直到本次需求任务都完成。

### 2.1 历史代码修改注意事项

对于有一定历史积累的项目，在进行代码修改时需特别注意：

1. **变更前评估**：参考 `./ai_collaboration/rules/templates/dependency_analysis.md` 进行风险评估
2. **核心模块谨慎修改**：涉及核心业务模块时，需进行架构评审
3. **循环依赖处理**：发现循环依赖时，参考 `./ai_collaboration/rules/templates/legacy_refactor_strategy.md` 进行处理
4. **最小侵入原则**：优先新增代码，避免修改历史代码；新增方法而非修改方法签名

## 3. 版本管理

### 3.1 版本号规范

- **主版本号**：重大架构变更，不向下兼容
- **次版本号**：功能新增，向下兼容
- **修订号**：Bug修复，向下兼容

示例：`v1.2.3` 表示主版本1，次版本2，修订号3

### 3.2 代码提交管理流程

1. **本地开发分支**：feature/功能名
2. **开发环境分支**：dev（开发环境集成）
3. **测试环境分支**：test（测试环境集成）
4. **生产分支**：master（稳定版本）

## 4. 质量保障

### 4.1 测试策略

生成完对应代码逻辑后，另起一次会话再对单元测试进行生成。

| 测试类型 | 工具 | 覆盖率要求 |
|---------|------|------------|
| 后端单元测试 | JUnit 5 | >80% |
| 前端单元测试 | Jest | >70% |

### 4.2 代码审查

涉及核心业务模块的修改，必须经过代码审查后方可合并。

---

## 5. 背景规范查找路由

> **说明**：本节内容可能根据具体工程情况或路由场景的丰富而变更，置于文档末尾以减少变更对原有逻辑的影响。

case1，ask模式下，或者非ask模式的操作，但意图识别既非子模块级的详细技术方案设计，也非正式编码两种场景时（例如只是针对性地小范围改动）；此类情况下，不自行查找其他默认上下文，只需遵照提示词中的指示，读取指定的背景文档，执行指定的操作；
而除了上述情况外的场景，就需路由到后面的case，具体执行哪种case，需自行判断；

case2，当需要进行某个需求或模块的详细设计方案分析时，需要先阅读顶层架构设计规范，严格遵循架构要求；然后参考详细设计方案模板，进行方案拆解和实现设计，生成对应详细设计方案文档（写入./ai_collaboration/docs/detail_solutions/目录下）；分析过程中需要遵循对应端的技术规范文档；各个参考文件路径如下，

1. 架构设计规范的查找路径：./ai_collaboration/rules/arch_solutions.md
2. 详细设计方案模板路径：./ai_collaboration/rules/templates/detail_solution_template.md
3. 后端技术规范路径：./ai_collaboration/rules/tech_structure_backend.md
4. Web端技术规范路径：./ai_collaboration/rules/tech_structure_web.md
5. 移动端技术规范路径：./ai_collaboration/rules/tech_structure_mobile.md
6. 变更风险评估规范路径：./ai_collaboration/rules/templates/dependency_analysis.md
7. 渐进式重构策略路径：./ai_collaboration/rules/templates/legacy_refactor_strategy.md

case3，当需要进行具体的需求编码落地时，需要提供相应的详细设计方案文档或明确的方案说明作为前提指导；并读取对应端的技术规范文档作为背景上下文；基于此生成对应的任务列表文档（任务列表项可勾选）和相关接口定义文档（如果有需要接口定义时），供给开发人员进行任务check和参照开发；

1. 详细设计方案的查找路径：./ai_collaboration/docs/detail_solutions/目录下
2. 任务列表文档的生成路径：./ai_collaboration/tasks/目录下
3. 后端技术规范路径：./ai_collaboration/rules/tech_structure_backend.md
4. Web端技术规范路径：./ai_collaboration/rules/tech_structure_web.md
5. 移动端技术规范路径：./ai_collaboration/rules/tech_structure_mobile.md
6. 接口定义文档写入路径：./ai_collaboration/docs/api_docs/目录下

每个接口定义格式参考如下，
```
接口名称

（1）接口地址: `POST /api/xxx/xxx`

（2）请求参数:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | ID标识 |
| config | object | 是 | 配置项 |

（3）响应数据:
{
    "code": 200,
    "message": "success",
    "data": null
}
```
接口文档命名规范：以模块名作为前缀，例如 `module_management.md`；

## 6. AI协作适用场景

> **说明**：本节内容可能根据具体工程情况而变更，置于文档末尾以减少变更对原有逻辑的影响。

参考 `./ai_collaboration/rules/ai_collaboration_boundary.md` 了解AI协作的适用边界和注意事项。
