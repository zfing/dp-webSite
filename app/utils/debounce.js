/*
 * func 要调用的函数
 * wait 防抖时间
 * immediate 布尔值,是否立即执行
 */
export default function debounce(func, wait, immediate) {
  // 定义一个判定时间
  let timeout
  return function fn(...args) {
    const context = this

    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)

      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
