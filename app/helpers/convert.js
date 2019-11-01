import isImmutable from './isImmutable'

function toArray(input) {
  return isImmutable(input) ? input.toJS() : Array.isArray(input) ? input : []
}

export default {
  toArray,
}
