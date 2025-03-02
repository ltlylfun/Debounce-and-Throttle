/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {number} interval 间隔时间，单位毫秒
 * @returns {Function} 节流后的函数
 */
function throttle(fn, interval) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 立即执行版本的防抖函数
function debounceImmediate(fn, delay) {
  let timer = null;

  return function (...args) {
    const callNow = !timer;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
    }, delay);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

// 带有取消功能的防抖函数
function debounceWithCancel(fn, delay) {
  let timer = null;

  function debounced(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }

  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    debounce,
    throttle,
    debounceImmediate,
    debounceWithCancel,
  };
}
