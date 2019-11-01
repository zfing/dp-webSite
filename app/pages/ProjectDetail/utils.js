
/**
 * 处理特殊日期
 * <= 1999-12-31 国际时间
 */
export function handleNADate(input) {
  return input > 946569600000 ? input : 'N/A'
}

export function isDate(input) {
  return !Number.isNaN(Number(input))
}

/**
 * 处理特殊数量
 */
export function handleNANumber(input) {
  return input >= 0 ? input : 'N/A'
}

export function isLegalNumber(input) {
  return input >= 0
}
