console.log = (function (logFunc, isLog = true, isLogStack = true) {
    return function () {
      if (!isLog) {
        return
      }
      try {
        let arr = []
        arr.push(...arguments)
        arr.forEach((item, index) => {
          if (Object.prototype.toString.call(item) === '[object Object]' ||
            Object.prototype.toString.call(item) === '[object Array]') {
            arr[index] = JSON.parse(JSON.stringify(item))
          }
        })
        logFunc.call(console, ...arr)
        isLogStack ? console.trace() : null  // 是否打印堆栈
      } catch (e) {
        console.log(`a log error: ${e}`)
      }
    }
  })(console.log)