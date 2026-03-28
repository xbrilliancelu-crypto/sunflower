# 参数校验规范

## 1. 校验框架

### 1.1 使用 Jakarta Validation + Hibernate Validator

```xml
<!-- pom.xml -->
<dependency>
    <groupId>jakarta.validation</groupId>
    <artifactId>jakarta.validation-api</artifactId>
</dependency>
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
</dependency>
```

### 1.2 常用注解

| 注解 | 说明 | 适用类型 |
|------|------|----------|
| @NotNull | 不能为null | 所有类型 |
| @NotBlank | 不能为空字符串 | String |
| @NotEmpty | 不能为空集合/字符串 | Collection/String |
| @Size | 长度范围 | String/Collection |
| @Length | 字符串长度范围 | String |
| @Min | 最小值 | Number |
| @Max | 最大值 | Number |
| @Positive | 正数 | Number |
| @Pattern | 正则匹配 | String |
| @Email | 邮箱格式 | String |

---

## 2. 基础校验

### 2.1 请求参数校验

```java
/**
 * 创建采集器请求
 */
@Data
public class CollectorCreateRequest {
    
    /**
     * 采集器名称
     */
    @NotBlank(message = "采集器名称不能为空")
    @Length(min = 1, max = 50, message = "名称长度必须在1-50个字符之间")
    private String name;
    
    /**
     * 采集类型
     */
    @NotBlank(message = "采集类型不能为空")
    @Pattern(regexp = "^(HTTP|MQTT|FILE)$", message = "采集类型必须是HTTP、MQTT或FILE")
    private String type;
    
    /**
     * 采集间隔（秒）
     */
    @NotNull(message = "采集间隔不能为空")
    @Min(value = 10, message = "采集间隔不能小于10秒")
    @Max(value = 3600, message = "采集间隔不能大于3600秒")
    private Integer interval;
    
    /**
     * 状态
     */
    @Min(value = 0, message = "状态值无效")
    @Max(value = 1, message = "状态值无效")
    private Integer status;
}
```

### 2.2 Controller 校验触发

```java
@RestController
@RequestMapping("/api/collector")
@RequiredArgsConstructor
public class CollectorController {
    
    /**
     * 创建采集器
     */
    @PostMapping("/create")
    public CommonResponse<Void> create(
            @Valid @RequestBody CollectorCreateRequest request) {
        collectorService.createCollector(request);
        return CommonResponse.success();
    }
    
    /**
     * 更新采集器
     */
    @PutMapping("/update")
    public CommonResponse<Void> update(
            @Valid @RequestBody CollectorUpdateRequest request) {
        collectorService.updateCollector(request);
        return CommonResponse.success();
    }
}
```

---

## 3. 嵌套校验

### 3.1 对象嵌套校验

```java
@Data
public class CollectorCreateRequest {
    
    @NotBlank(message = "采集器名称不能为空")
    private String name;
    
    /**
     * 采集配置 - 需要添加@Valid触发嵌套校验
     */
    @NotNull(message = "采集配置不能为空")
    @Valid
    private CollectorConfig config;
}

@Data
public class CollectorConfig {
    
    @NotBlank(message = "采集URL不能为空")
    @Pattern(regexp = "^https?://.*", message = "URL格式不正确")
    private String url;
    
    @Min(value = 1000, message = "超时时间不能小于1000毫秒")
    @Max(value = 30000, message = "超时时间不能大于30000毫秒")
    private Integer timeout;
}
```

### 3.2 集合校验

```java
@Data
public class BatchCreateRequest {
    
    /**
     * 批量创建的数据列表
     */
    @NotEmpty(message = "创建列表不能为空")
    @Size(max = 100, message = "单次最多创建100条")
    @Valid
    private List<CollectorCreateRequest> items;
}
```

---

## 4. 分组校验

### 4.1 定义校验分组

```java
/**
 * 创建时校验
 */
public interface Create {}

/**
 * 更新时校验
 */
public interface Update {}

/**
 * 校验分组示例
 */
@Data
public class CollectorRequest {
    
    /**
     * ID - 更新时必填
     */
    @NotNull(groups = Update.class, message = "ID不能为空")
    private Long id;
    
    /**
     * 名称 - 创建和更新时都需要校验
     */
    @NotBlank(groups = {Create.class, Update.class}, message = "名称不能为空")
    @Length(min = 1, max = 50, groups = {Create.class, Update.class}, 
            message = "名称长度必须在1-50个字符之间")
    private String name;
}
```

### 4.2 使用分组校验

```java
@RestController
public class CollectorController {
    
    /**
     * 创建 - 使用Create分组
     */
    @PostMapping("/create")
    public CommonResponse<Void> create(
            @Validated(Create.class) @RequestBody CollectorRequest request) {
        // ...
    }
    
    /**
     * 更新 - 使用Update分组
     */
    @PutMapping("/update")
    public CommonResponse<Void> update(
            @Validated(Update.class) @RequestBody CollectorRequest request) {
        // ...
    }
}
```

---

## 5. 自定义校验

### 5.1 自定义校验注解

```java
/**
 * 手机号校验注解
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneValidator.class)
public @interface Phone {
    
    String message() default "手机号格式不正确";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}

/**
 * 手机号校验器
 */
public class PhoneValidator implements ConstraintValidator<Phone, String> {
    
    private static final Pattern PHONE_PATTERN = 
        Pattern.compile("^1[3-9]\\d{9}$");
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;  // null值由@NotBlank等处理
        }
        return PHONE_PATTERN.matcher(value).matches();
    }
}
```

### 5.2 使用自定义校验

```java
@Data
public class UserRequest {
    
    @Phone(message = "手机号格式不正确")
    private String phone;
}
```

---

## 6. 校验异常处理

### 6.1 全局异常处理器

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * 处理参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public CommonResponse<Void> handleValidationException(
            MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining("; "));
        return CommonResponse.error(400, message);
    }
    
    /**
     * 处理绑定异常
     */
    @ExceptionHandler(BindException.class)
    public CommonResponse<Void> handleBindException(BindException e) {
        String message = e.getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining("; "));
        return CommonResponse.error(400, message);
    }
}
```

### 6.2 异常响应示例

```json
{
  "code": 400,
  "message": "name: 名称不能为空; interval: 采集间隔不能小于10秒",
  "data": null
}
```

---

## 7. 校验最佳实践

### 7.1 应该校验的内容

- [ ] 所有必填参数
- [ ] 参数长度/范围
- [ ] 参数格式（邮箱、手机号等）
- [ ] 枚举值范围
- [ ] 关联ID有效性

### 7.2 校验位置

| 位置 | 校验内容 |
|------|----------|
| Controller | 参数格式、必填性 |
| Service | 业务规则校验 |
| Manager | 数据有效性校验 |

### 7.3 校验示例清单

```java
// 空值校验
@NotBlank(message = "名称不能为空")
private String name;

// 长度校验
@Length(min = 6, max = 20, message = "密码长度必须在6-20位之间")
private String password;

// 范围校验
@Min(value = 1, message = "年龄不能小于1岁")
@Max(value = 150, message = "年龄不能大于150岁")
private Integer age;

// 格式校验
@Email(message = "邮箱格式不正确")
private String email;

// 正则校验
@Pattern(regexp = "^[A-Za-z0-9]+$", message = "只能包含字母和数字")
private String code;

// 枚举校验
@Pattern(regexp = "^(ACTIVE|INACTIVE)$", message = "状态值无效")
private String status;
```
