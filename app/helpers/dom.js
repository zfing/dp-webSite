export function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj.attachEvent(`on${type}`, () => {
      fn.call(obj)
    })
  } else {
    obj.addEventListener(type, fn, false)
  }
}

export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

export function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight
}
