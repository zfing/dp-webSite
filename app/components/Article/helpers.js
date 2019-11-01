export const LevelColors = [
  '#EE5350',
  '#F79A97',
  '#F5A623',
  '#84C1F8',
  '#2096F3',
]

export const LevelTexts = [
  { zh: '卖出', en: 'Sell', ko: '판매하다' },
  { zh: '减持', en: 'Reduction', ko: '감소' },
  { zh: '观望', en: 'Wait', ko: '관망하다' },
  { zh: '增持', en: 'Increase', ko: '증진' },
  { zh: '买入', en: 'Buy', ko: '매입' },
]

export const LevelValues = [-2, -1, 0, 1, 2]

// 根据文字获取等级的分数
export function getLevelValueFromText(text) {
  let value = LevelValues[2]

  for (let i = 0; i < LevelTexts.length; i++) {
    const { zh, en } = LevelTexts[i]
    if ((text === zh) || (text === en)) {
      value = LevelValues[i]
      break
    }
  }

  return value
}

export function getLevelTextFromValue(value) {
  const text = LevelTexts[2]

  const inIndex = LevelValues.indexOf(value)

  return inIndex === -1 ? text : LevelTexts[inIndex]
}

export function getLevelColorFromValue(value) {
  const color = LevelColors[2]
  const inIndex = LevelValues.indexOf(value)
  return inIndex === -1 ? color : LevelColors[inIndex]
}

// 选择的时间范畴
export const selectedTimes = [1, 2, 3]

export function getAnalysisNums(info = {}) {
  return [
    info.sell || 0,
    info.dcre || 0,
    info.wait || 0,
    info.incre || 0,
    info.buy || 0,
  ]
}

// 计算占比
export function getPercentInArr(arr = []) {
  const max = Math.max(...arr)
  return arr.map(item => max ? (item / max) : 0)
}

/**
 * 获取分数所属范畴
 * 原始区间 [-2, -1.5, -0.5, 0.5, 1.5, 2]
 * 换算区间 [-2.5,-1.5,-0.5, 0.5, 1.5, 2.5]
 * @param  {Number} input
 * @return {Number}
 */
export function getAvgStep(input) {
  let step = 2
  if (input < -1.5) {
    step = 0
  } else if (input < -0.5) {
    step = 1
  } else if (input <= 0.5) {
    step = 2
  } else if (input <= 1.5) {
    step = 3
  } else if (input <= 2.5) {
    step = 4
  }
  return step
}

/**
 * 获取偏移量
 */
export function getAvgOffset(input = 0) {
  return (2.5 + input) / 5
}
