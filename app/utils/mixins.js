import theme from './theme'

export function priceFormat(input) {
  let value = Number(input) || 0
  if (value >= 10000) {
    value = parseInt(value, 10)
  } else if (value >= 1000) {
    value = value.toFixed(1)
  } else if (value >= 100) {
    value = value.toFixed(2)
  } else if (value >= 10) {
    value = value.toFixed(3)
  } else if (value >= 1) {
    value = value.toFixed(4)
  } else if (value >= 0.1) {
    value = value.toFixed(5)
  } else if (value >= 0.01) {
    value = value.toFixed(6)
  } else if (value >= 0.001) {
    value = value.toFixed(7)
  } else {
    value = value.toFixed(8)
  }
  return Number(value)
}

export function getColor(input) {
  const value = Number(input) || 0
  if (value === 0) {
    return theme.normalColor
  }
  if (value > 0) {
    return theme.upColor
  }
  return theme.downColor
}

export function getColorFromText(input) {
  const st = String(input)
  if (st.indexOf('慢') === 0) {
    return theme.downColor
  }
  if (st.indexOf('快') === 0) {
    return theme.upColor
  }
  return theme.normalColor
}

export function getColorFromSign(input) {
  const st = String(input)
  if (st.indexOf('↓') === 0) {
    return theme.downColor
  }
  if (st.indexOf('↑') === 0) {
    return theme.upColor
  }
  return theme.normalColor
}

export function amountFixed(input) {
  const output = {
    value: Number(input) || 0,
    unitEN: '',
    unitZH: '',
  }
  const { value } = output
  if (value > 1000000000) {
    const n = value / 100000000
    let fixed = 5 - String(parseInt(n, 10)).length
    if (fixed <= 0) fixed = 0
    output.value = Number(n.toFixed(fixed))
    output.unitEN = ''
    output.unitZH = '亿'
  } else if (value > 100000) {
    const n = value / 10000
    let fixed = 5 - String(parseInt(n, 10)).length
    if (fixed <= 0) fixed = 0
    output.value = Number(n.toFixed(fixed))
    output.unitEN = ''
    output.unitZH = '万'
  } else {
    let fixed = 5 - String(parseInt(value, 10)).length
    if (fixed <= 0) fixed = 0
    output.value = Number(value.toFixed(fixed))
  }
  return output
}

export function computedAmountFormRate(nowPrice, rate) {
  try {
    return Number((nowPrice - nowPrice / (rate / 100 + 1)).toFixed(2))
  } catch (e) {
    return '-'
  }
}

/**
 * 1000,000
 */
export function formatMoney(money) {
  money = String(Number(money))
  try {
    return money.replace(/^(-?)(\d+)((\.\d+)?)$/, (s, s1, s2, s3) => {
      if (money.indexOf('.') !== -1) {
        return s1 + s2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + s3
      }
      return s1 + s2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + s3
    })
  } catch (e) {
    return money
  }
}
