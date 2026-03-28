# AI协作规则路由枢纽

> 本文档作为**静态索引层**，负责意图识别和 Skill 路由。
> 详细执行逻辑由各 Skill 工作区渐进式加载。

---

## 1. 工作区结构概览

```mermaid
graph TB
    subgraph ops_center["ops_center/"]
        backend["backend/"]:::backend
        mobile["mobile/"]:::mobile
        web["web/"]:::web
    end
    
    subgraph ai_collab["ai_collaboration/"]
        subgraph docs["docs/"]
            detail_solutions["detail_solutions/"]:::docs
            api_docs["api_docs/"]:::docs
            sprints["sprints/"]:::docs
            reports["reports/"]:::docs
        end
        
        subgraph rules["rules/"]
            base_rules["base_rules.md"]:::entry
            workflow["workflow.md"]:::workflow
            
            subgraph common["common/"]
                arch["arch_solutions.md"]:::common
                tech_backend["tech_structure_backend.md"]:::common
                tech_web["tech_structure_web.md"]:::common
                tech_mobile["tech_structure_mobile.md"]:::common
                product["product.md"]:::common
                
                subgraph templates["templates/"]
                    detail_template["detail_solution_template.md"]:::template
                end
            end
            
            subgraph skills["skills/"]
                skill_understand["skill_sprint_understand/"]:::skill
                skill_design["skill_tech_solution_design/"]:::skill
                skill_code["skill_code/"]:::skill
                skill_test["skill_self_test/"]:::skill
                skill_review["skill_review/"]:::skill
                skill_commit["skill_commit/"]:::skill
                skill_docs["skill_docs/"]:::skill
            end
        end
        
        tasks["tasks/"]:::task
        scripts["scripts/"]:::script
    end
    
    classDef backend fill:#e1f5fe,stroke:#01579b
    classDef mobile fill:#fff3e0,stroke:#e65100
    classDef web fill:#e8f5e9,stroke:#1b5e20
    classDef docs fill:#f3e5f5,stroke:#4a148c
    classDef entry fill:#ffeb3b,stroke:#f57f17,stroke-width:3px
    classDef workflow fill:#ff9800,stroke:#e65100
    classDef common fill:#e0e0e0,stroke:#424242
    classDef template fill:#bdbdbd,stroke:#212121
    classDef skill fill:#bbdefb,stroke:#1565c0
    classDef task fill:#c8e6c9,stroke:#2e7d32
    classDef script fill:#d7ccc8,stroke:#5d4037
```

---

## 2. 意图路由表

当识别到用户意图时，按以下规则调度对应 Skill：

| 意图关键词 | 调度 Skill | 说明 |
|-----------|-----------|------|
| 需求分析、理解需求、分析一下、看下需求 | `skill_sprint_understand` | 冲刺需求理解与澄清 |
| 设计方案、技术设计、架构设计、详细设计、重构设计 | `skill_tech_solution_design` | 技术方案设计（含历史代码改动评估） |
| 编码、实现、开发、写代码 | `skill_code` | 编码实现 |
| 自测、单元测试、测试用例、测试 | `skill_self_test` | 开发自测 |
| 审查、Code Review、检查代码 | `skill_review` | 代码审查 |
| 提交、commit、分支、PR | `skill_commit` | 版本管理 |
| 文档、README、接口文档 | `skill_docs` | 文档编写 |

---

## 3. Skill 索引

```mermaid
graph LR
    subgraph Skills["Skill 工作区"]
        S1["skill_sprint_understand<br/>需求理解与分析"]
        S2["skill_tech_solution_design<br/>技术方案设计"]
        S3["skill_code<br/>编码实现"]
        S4["skill_self_test<br/>开发自测"]
        S5["skill_review<br/>代码审查"]
        S6["skill_commit<br/>版本管理"]
        S7["skill_docs<br/>文档编写"]
    end
    
    S1 -->|"需求分析文档"| S2
    S2 -->|"设计方案"| S3
    S3 -->|"代码实现"| S4
    S4 -->|"测试通过"| S5
    S5 -->|"审查通过"| S6
    S6 -->|"提交记录"| S7
```

| Skill | 入口路径 | 核心职责 | 输出工件 |
|-------|----------|----------|----------|
| `skill_sprint_understand` | `./rules/skills/skill_sprint_understand/SKILL.md` | 冲刺需求理解与分析 | 需求分析文档 |
| `skill_tech_solution_design` | `./rules/skills/skill_tech_solution_design/SKILL.md` | 技术方案设计 | `../docs/detail_solutions/*.md` |
| `skill_code` | `./rules/skills/skill_code/SKILL.md` | 编码实现 | 代码 + 任务列表 |
| `skill_self_test` | `./rules/skills/skill_self_test/SKILL.md` | 开发自测 | 测试代码 |
| `skill_review` | `./rules/skills/skill_review/SKILL.md` | 代码审查 | 审查报告 |
| `skill_commit` | `./rules/skills/skill_commit/SKILL.md` | 版本管理 | 提交记录 |
| `skill_docs` | `./rules/skills/skill_docs/SKILL.md` | 文档编写 | 文档文件 |

---

## 4. 公共规范索引

执行各 Skill 时，按需加载以下公共规范：

| 规范类型 | 路径 | 适用场景 |
|----------|------|----------|
| 架构设计规范 | `./rules/common/arch_solutions.md` | 所有 Skill |
| 后端技术规范 | `./rules/common/tech_structure_backend.md` | 涉及后端时 |
| Web端技术规范 | `./rules/common/tech_structure_web.md` | 涉及Web时 |
| 移动端技术规范 | `./rules/common/tech_structure_mobile.md` | 涉及移动端时 |
| 产品定义 | `./rules/common/product.md` | 需求理解时 |
| 设计方案模板 | `./rules/common/templates/detail_solution_template.md` | 方案设计时 |

---

## 5. 快速决策树

```mermaid
flowchart TD
    Start[用户输入] --> Q1{明确要做什么?}
    
    Q1 -->|否| U1[skill_sprint_understand<br/>先理解需求]
    U1 --> Q1
    
    Q1 -->|是| Q2{需要设计方案?}
    
    Q2 -->|是| D1[skill_tech_solution_design]
    D1 --> Q3
    
    Q2 -->|否| Q3{需要写代码?}
    
    Q3 -->|是| C1[skill_code]
    C1 --> Q4
    
    Q3 -->|否| Q4{需要自测?}
    
    Q4 -->|是| T1[skill_self_test]
    T1 --> Q5
    
    Q4 -->|否| Q5{需要审查代码?}
    
    Q5 -->|是| R1[skill_review]
    R1 --> Q6
    
    Q5 -->|否| Q6{需要提交代码?}
    
    Q6 -->|是| CM1[skill_commit]
    CM1 --> Q7
    
    Q6 -->|否| Q7{需要写文档?}
    
    Q7 -->|是| DOC1[skill_docs]
    Q7 -->|否| End[结束]
    DOC1 --> End
```

---

## 6. 渐进式加载原则

```mermaid
flowchart LR
    subgraph L1["第一层：始终加载"]
        A[base_rules.md]
    end
    
    subgraph L2["第二层：意图识别后"]
        B[Skill 的 SKILL.md]
    end
    
    subgraph L3["第三层：执行过程中"]
        C[Skill 内的 references/]
    end
    
    subgraph L4["第四层：涉及端侧时"]
        D[tech_structure_*.md]
    end
    
    A --> B --> C --> D
```

1. **始终加载**：本文件（base_rules.md）
2. **意图识别后**：加载对应 Skill 的 SKILL.md
3. **执行过程中**：按需加载 Skill 内的 references/
4. **涉及端侧时**：加载对应的 tech_structure_*.md

---

## 7. 统一规则

### 7.1 Mermaid 图例语法规范

**强制要求**：整个工程中，所有文档如果涉及流程图/设计图/架构图等，统一使用 **Mermaid 语法** 作为统一图例语法。

**适用范围**：
- 工作区结构概览
- 架构设计图
- 流程图
- 时序图
- 类图
- 状态图
- 甘特图

**示例**：
```mermaid
graph LR
    A[开始] --> B{判断}
    B -->|是| C[执行]
    B -->|否| D[结束]
    C --> D
```

### 7.2 文档路径引用规范

所有文档中的路径引用必须使用**最新路径**：

| 原路径 | 新路径 |
|--------|--------|
| `./rules/arch_solutions.md` | `./rules/common/arch_solutions.md` |
| `./rules/tech_structure_backend.md` | `./rules/common/tech_structure_backend.md` |
| `./rules/tech_structure_web.md` | `./rules/common/tech_structure_web.md` |
| `./rules/tech_structure_mobile.md` | `./rules/common/tech_structure_mobile.md` |
| `./rules/product.md` | `./rules/common/product.md` |
| `./rules/detail_solution_template.md` | `./rules/common/templates/detail_solution_template.md` |
