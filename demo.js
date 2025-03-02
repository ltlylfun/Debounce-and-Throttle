// 防抖输入框演示
(function setupDebounceInput() {
  const input = document.getElementById("debounce-input");
  const resultElem = document.getElementById("debounce-result");
  const rawCountElem = document.getElementById("raw-input-count");
  const debounceCountElem = document.getElementById("debounce-count");
  const logElem = document.getElementById("debounce-log");

  let rawCount = 0;
  let debounceCount = 0;

  // 模拟搜索请求
  function search(query) {
    debounceCount++;
    debounceCountElem.textContent = debounceCount;
    resultElem.textContent = query || "无";

    const timestamp =
      new Date().toLocaleTimeString("zh-CN", { hour12: false }) +
      "." +
      new Date().getMilliseconds();
    logElem.innerHTML =
      `<div>[${timestamp}] 执行搜索: "${query}"</div>` + logElem.innerHTML;
  }

  // 使用防抖函数
  const debouncedSearch = debounce(search, 300);

  input.addEventListener("input", function (e) {
    rawCount++;
    rawCountElem.textContent = rawCount;

    const timestamp =
      new Date().toLocaleTimeString("zh-CN", { hour12: false }) +
      "." +
      new Date().getMilliseconds();
    logElem.innerHTML =
      `<div>[${timestamp}] 输入: "${e.target.value}" (第${rawCount}次)</div>` +
      logElem.innerHTML;

    debouncedSearch(e.target.value);
  });
})();

// 节流按钮点击演示
(function setupThrottleButtons() {
  const normalBtn = document.getElementById("normal-btn");
  const throttleBtn = document.getElementById("throttle-btn");
  const normalCountElem = document.getElementById("normal-click-count");
  const throttleCountElem = document.getElementById("throttle-count");
  const logElem = document.getElementById("throttle-log");

  let normalCount = 0;
  let throttleCount = 0;

  function handleClick(isThrottled) {
    if (isThrottled) {
      throttleCount++;
      throttleCountElem.textContent = throttleCount;
    } else {
      normalCount++;
      normalCountElem.textContent = normalCount;
    }

    const timestamp =
      new Date().toLocaleTimeString("zh-CN", { hour12: false }) +
      "." +
      new Date().getMilliseconds();
    const buttonType = isThrottled ? "节流按钮" : "普通按钮";
    logElem.innerHTML =
      `<div>[${timestamp}] 点击: "${buttonType}"</div>` + logElem.innerHTML;
  }

  // 使用节流函数
  const throttledClick = throttle(() => handleClick(true), 1000);

  normalBtn.addEventListener("click", () => handleClick(false));
  throttleBtn.addEventListener("click", throttledClick);
})();

// 滚动事件节流演示
(function setupScrollThrottle() {
  const scrollArea = document.getElementById("scroll-area");
  const rawCountElem = document.getElementById("raw-scroll-count");
  const throttleCountElem = document.getElementById("throttle-scroll-count");
  const positionElem = document.getElementById("scroll-position");

  let rawCount = 0;
  let throttleCount = 0;

  function updatePosition() {
    throttleCount++;
    throttleCountElem.textContent = throttleCount;
    positionElem.textContent = scrollArea.scrollTop;
  }

  // 使用节流函数
  const throttledUpdatePosition = throttle(updatePosition, 100);

  scrollArea.addEventListener("scroll", function () {
    rawCount++;
    rawCountElem.textContent = rawCount;
    throttledUpdatePosition();
  });
})();
