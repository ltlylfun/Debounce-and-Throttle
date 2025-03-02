# 防抖与节流函数实现 | Debounce and Throttle Implementation

[中文](#中文文档) | [English](#english-documentation)

<a id="中文文档"></a>

## 中文文档

### 功能介绍

1. **防抖(Debounce)**: 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
2. **节流(Throttle)**: 规定一个时间间隔，在这个时间间隔内，只能触发一次事件的回调函数。

### 可视化演示

可以通过 `index.html` 文件查看可视化演示效果，展示了防抖和节流在实际应用中的表现差异。

### 运行测试

```bash
node test.js
```

或者通过 npm 运行测试（如果已配置 package.json）:

```bash
npm test
```

### 在项目中使用

```javascript
const { debounce, throttle } = require("./utils");

// 防抖使用示例
function handleInput() {
  console.log("处理输入");
}
const debouncedHandleInput = debounce(handleInput, 300);
// 用户输入时调用
debouncedHandleInput();

// 节流使用示例
function handleScroll() {
  console.log("处理滚动");
}
const throttledHandleScroll = throttle(handleScroll, 200);
// 滚动时调用
throttledHandleScroll();
```

<a id="english-documentation"></a>

## English Documentation

### Features

1. **Debounce**: Execute a callback n seconds after the event is triggered. If the event is triggered again within these n seconds, restart the timer.
2. **Throttle**: Set a time interval, within which the callback function can only be triggered once.

### Visual Demo

You can view the visual demonstration through the `index.html` file, which shows the differences between debounce and throttle in practical applications.

### Running Tests

```bash
node test.js
```

Or run tests using npm (if package.json is configured):

```bash
npm test
```
