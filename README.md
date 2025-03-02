# 防抖与节流函数实现 | Debounce and Throttle Implementation

[中文](#中文文档) | [English](#english-documentation)

<a id="中文文档"></a>

### 功能介绍

1. **防抖(Debounce)**: 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
2. **节流(Throttle)**: 规定一个时间间隔，在这个时间间隔内，只能触发一次事件的回调函数。

### 可视化演示

- **[在线演示](http://blog.ltlyl.fun/Debounce-and-Throttle/)**: 直接访问在线演示页面，体验防抖和节流效果
- **本地演示**: 通过 `index.html` 文件在本地查看可视化演示效果

在线演示页面展示了防抖和节流在实际应用中的表现差异，包括：

- 输入框防抖示例
- 按钮点击节流示例
- 滚动事件节流示例

### 运行测试

```bash
node test.js
```

```bash
npm test
```

<a id="english-documentation"></a>

### Features

1. **Debounce**: Execute a callback n seconds after the event is triggered. If the event is triggered again within these n seconds, restart the timer.
2. **Throttle**: Set a time interval, within which the callback function can only be triggered once.

### Visual Demo

- **[Live Demo](http://blog.ltlyl.fun/Debounce-and-Throttle/)**: Access the online demonstration page to experience debounce and throttle effects
- **Local Demo**: View the visual demonstration locally through the `index.html` file

The live demo shows the differences between debounce and throttle in practical applications, including:

- Input box debounce example
- Button click throttle example
- Scroll event throttle example

### Running Tests

```bash
node test.js
```

```bash
npm test
```
