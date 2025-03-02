// 导入工具函数
const { debounce, throttle } = require("./utils");

// 简单测试用例框架
function runTest(testName, testFn) {
  console.log(`运行测试: ${testName}`);
  try {
    return testFn()
      .then(() => {
        console.log(`✓ 测试通过: ${testName}`);
        return true;
      })
      .catch((error) => {
        console.error(`✗ 测试失败: ${testName}`);
        console.error(error.message);
        return false;
      });
  } catch (error) {
    console.error(`✗ 测试失败: ${testName}`);
    console.error(error.message);
    return Promise.resolve(false);
  }
}

// 辅助函数：延迟一定时间
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 测试防抖函数
async function testDebounce() {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const debouncedIncrement = debounce(increment, 50);

  // 连续调用3次，最后一次应该在50ms后执行
  debouncedIncrement();
  debouncedIncrement();
  debouncedIncrement();

  // 验证立即没有执行
  if (counter !== 0) {
    throw new Error(`防抖函数立即执行了，counter = ${counter}，期望值为0`);
  }

  // 等待100ms，应该执行一次
  await delay(100);

  if (counter !== 1) {
    throw new Error(`防抖函数执行次数错误，counter = ${counter}，期望值为1`);
  }

  // 再次调用，然后等待不到延迟时间
  debouncedIncrement();
  await delay(20); // 小于设定的50ms

  if (counter !== 1) {
    throw new Error(`防抖函数提前执行了，counter = ${counter}，期望值为1`);
  }

  // 等待足够时间后应该再次执行
  await delay(50);

  if (counter !== 2) {
    throw new Error(`防抖函数未按时执行，counter = ${counter}，期望值为2`);
  }
}

// 测试节流函数
async function testThrottle() {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const throttledIncrement = throttle(increment, 100);

  // 第一次调用应该立即执行
  throttledIncrement();

  if (counter !== 1) {
    throw new Error(`节流函数首次未立即执行，counter = ${counter}，期望值为1`);
  }

  // 连续多次调用，应该被忽略
  throttledIncrement();
  throttledIncrement();
  throttledIncrement();

  if (counter !== 1) {
    throw new Error(`节流函数未正确限制频率，counter = ${counter}，期望值为1`);
  }

  // 等待足够的时间后，下一次调用应该执行
  await delay(110);
  throttledIncrement();

  if (counter !== 2) {
    throw new Error(`节流函数间隔后未执行，counter = ${counter}，期望值为2`);
  }

  // 测试连续快速调用的场景
  const start = Date.now();
  let executionTimes = [];

  const logTime = () => {
    executionTimes.push(Date.now() - start);
  };

  const throttledLogTime = throttle(logTime, 100);

  // 模拟200ms内的连续调用
  await delay(10);
  throttledLogTime(); // 应该执行
  await delay(30);
  throttledLogTime(); // 应该忽略
  await delay(50);
  throttledLogTime(); // 应该忽略
  await delay(30);
  throttledLogTime(); // 此时应大于100ms，应该执行
  await delay(120);
  throttledLogTime(); // 应该执行

  if (executionTimes.length !== 3) {
    throw new Error(
      `节流函数执行次数不对，执行了${executionTimes.length}次，期望值为3`
    );
  }

  // 验证执行间隔
  for (let i = 1; i < executionTimes.length; i++) {
    if (executionTimes[i] - executionTimes[i - 1] < 90) {
      // 允许有小误差
      throw new Error(`节流间隔时间不正确：${executionTimes}`);
    }
  }
}

// 运行所有测试并输出结果
async function runAllTests() {
  console.log("----- 开始测试防抖与节流函数 -----");

  const debounceResult = await runTest("防抖函数测试", testDebounce);
  const throttleResult = await runTest("节流函数测试", testThrottle);

  if (debounceResult && throttleResult) {
    console.log("----- 所有测试通过 -----");
    return 0; // 成功退出码
  } else {
    console.error("----- 存在测试失败 -----");
    return 1; // 失败退出码
  }
}

// 执行测试
runAllTests().then((exitCode) => {
  process.exitCode = exitCode;
});
