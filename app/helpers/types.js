
export function getType(input) {
  return Object.prototype.toString.call(input).toLowerCase().split(' ')[1].replace(/\]/g, '')
}

export function isJson(input) {
  return getType(input) === 'object'
}

export function toJson(input) {
  return isJson(input) ? input : {}
}
