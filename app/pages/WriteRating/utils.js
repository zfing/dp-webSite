export const investScoreMap = [
  { name: 'Aaa', value: 9 },
  { name: 'Aa', value: 8 },
  { name: 'A', value: 7 },
  { name: 'Bbb', value: 6 },
  { name: 'Bb', value: 5 },
  { name: 'B', value: 4 },
  { name: 'Ccc', value: 3 },
  { name: 'Cc', value: 2 },
  { name: 'C', value: 1 },
  { name: 'D', value: 0 },
]

export const riskScoreMap = [
  { name: '极低', value: 'A' },
  { name: '低', value: 'B' },
  { name: '中', value: 'C' },
  { name: '高', value: 'D' },
  { name: '极高', value: 'E' },
]

/**
 * 提取表格字段内的所有表格，只取名称
 */
export const getNamesInTables = (input) => {
  try {
    input = JSON.parse(input)
    return input.map(_ => _.name)
  } catch (e) {
    return []
  }
}
