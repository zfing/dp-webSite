import regx from './regx'

const getNameInMap = (map, value, key = 'name') => {
  try {
    for (let i = 0; i < map.length; i++) {
      if (String(map[i].value) === String(value)) {
        return map[i][key]
      }
    }
    return ''
  } catch (e) {
    return ''
  }
}

/**
 * 价格类型
 */
export const PRICE_TYPE = [
  { name: 'USD', value: 1 },
  { name: 'ETH', value: 2 },
  { name: 'BTC', value: 3 },
  { name: 'RMB', value: 4 },
]

export function getPriceType(value) {
  return getNameInMap(PRICE_TYPE, value)
}

/**
 * 投资等级
 */
export const INVEST_SCORE = [
  { name: 'Aaa', value: 9, color: '#00BA76' },
  { name: 'Aa', value: 8, color: '#00BA76' },
  { name: 'A', value: 7, color: '#00BA76' },
  { name: 'Bbb', value: 6, color: '#5EC100' },
  { name: 'Bb', value: 5, color: '#5EC100' },
  { name: 'B', value: 4, color: '#5EC100' },
  { name: 'Ccc', value: 3, color: '#FFA100' },
  { name: 'Cc', value: 2, color: '#FFA100' },
  { name: 'C', value: 1, color: '#FFA100' },
  { name: 'D', value: 0, color: '#FD0029' },
]

export const INVEST_SCORE_DESC = {
  Aaa: {
    zh: '综合得分极高，资质优异，不确定性因素影响极小，具备长期投资价值。',
    en:
      'Overall rating is very high. Qualification Rating is very high. Uncertainty surrounding the project has little impact on its investment value. The project has long-term investment value.',
    ko: '종합점수가 극히 높고 자질이 우수하며 불확실성 요소 영향이 매우 작고 장기적인 투자가치가 있음',
  },
  Aa: {
    zh: '综合得分高，资质优，受不确定性因素影响相对小，具备长期投资价值。',
    en:
      'Overall rating is high. Qualification Rating is considerably high. Uncertainty surrounding the project has little impact on its investment value. The project has long-term investment value.',
    ko: '종합점수가 높고 자질이 훌륭하며 불확실성 요소 영향이 상대적으로 작고 장기적인 투자가치가 있음',
  },
  A: {
    zh: '综合得分较高，资质较优，存在不确定因素，具备中长期价值。',
    en:
      'Overall rating is relatively high. Qualification Rating is high. Uncertainty surrounding the project is affecting its investment value, The project has mid or long-term investment value.',
    ko: '종합점수가 비교적 높고 자질이 비교적 훌륭하며 불확실성 요소가 존재하고 중장기적인 투자가치가 있음',
  },
  Bbb: {
    zh: '综合得分较高，资质较优，存在不确定因素，具备中期价值。',
    en:
      'Overall rating is relatively high. Qualification Rating is high. Uncertainty surrounding the project is affecting its investment value, The project has mid-term investment value.',
    ko: '종합점수가 비교적 높고 자질이 비교적 훌륭하며 불확실성 요소가 존재하고 중기적인 투자가치가 있음',
  },
  Bb: {
    zh:
      '综合得分较高，资质良好，不确定因素对项目有一定的影响，需及时关注项目进展及整体行情，适当调整仓位。',
    en:
      'Overall rating is relatively high. Qualification Rating is relatively high. Uncertainty surrounding the project is affecting the investment value, Investors need to closely follow the progress and the overall market and adjust positions accordingly.',
    ko: '종합점수가 비교적 높고 자질이 양호하며 불확실한 요소가 프로젝트에 일정한 영향이 있으며 적시적으로 프로젝트 진척과 전체 시세에 관심을 기울여야 하고 포지션을 적절하게 조정해야 함.',
  },
  B: {
    zh:
      '综合得分较高，资质良好，不确定性因素对项目有较大的影响，需及时关注项目进展、整体行情及竞品动向，合理调整仓位。',
    en:
      'Overall rating is relatively high. Qualification Rating is relatively high. Uncertainty surrounding the project is affecting the investment value, Investors need to closely follow the develop progress, the overall market and its rivals to adjust positions accordingly.',
    ko: '종합점수가 비교적 높고 자질이 양호하며 불확실한 요소가 프로젝트에 비교적 큰 영향이 있으며 적시적으로 프로젝트 진척과 전체 시세 및 경쟁제품의 동향에 관심을 기울여야 하고 포지션을 합리하게 조정해야 함',
  },
  Ccc: {
    zh:
      '综合得分中，资质一般，比较依赖整体行情和有利因素，不确定因素对项目有明显的影响，参与需谨慎。',
    en:
      'Overall rating is medium. Qualification Rating is medium. The token price is dependent on the market condition and positive news. Uncertainty surrounding the project is severely affecting its investment value Invest cautiously.',
    ko: '종합점수가 중이고 자질이 일반적이며 전체 시세와 호의적 요소에 의존하고 불확실한 요소가 프로젝트에 뚜렷한 영향이 있으며 신중하게 참여해야 함',
  },
  Cc: {
    zh: '综合得分中，资质差，不建议参与。',
    en:
      'Overall rating is medium. Qualification Rating is low. It has little investment value.',
    ko: '종합점수가 중이며 자질이 좋지 않고 참여를 권장하지 않음',
  },
  C: {
    zh: '综合得分差，有投机属性，建议不参与。',
    en: 'Overall rating is relatively Speculative. It has no investment value.',
    ko: '종합점수가 낮고 투기적 속성이 있으며 참여하지 않을 것을 권장함',
  },
  D: {
    zh: '综合得分差，投机属性强，各方面不确定因素过多，建议不参与。',
    en: 'Overall rating is low.Highly speculative. It has no investment value.',
    ko: '종합점수가 낮고 투기적 속성이 강하며 각 방면의 불확실한 요소가 지나치게 많고 참여하지 않을 것을 권장함.',
  },
}

export function getInvestScore(value) {
  return getNameInMap(INVEST_SCORE, value)
}

export function getInvestScoreDesc(item, lang) {
  return INVEST_SCORE_DESC[item] ? INVEST_SCORE_DESC[item][lang] : ''
}

export function getInvestScoreColor(value) {
  return getNameInMap(INVEST_SCORE, value, 'color')
}

/**
 * 风险等级
 */
export const RISK_SCORE = [
  { name: '极低', value: 'A', color: '#00BA76' },
  { name: '低', value: 'B', color: '#00BA76' },
  { name: '中', value: 'C', color: '#FFA100' },
  { name: '高', value: 'D', color: '#FD0029' },
  { name: '极高', value: 'E', color: '#FD0029' },
]

export const RISK_SCORE_LANG = {
  A: {
    en: 'Very Low',
    zh: '极低',
    ko: '매우 낮음',
  },
  B: {
    en: 'Low',
    zh: '低',
    ko: '낮음',
  },
  C: {
    en: 'Medium',
    zh: '中',
    ko: '중',
  },
  D: {
    en: 'High',
    zh: '高',
    ko: '높음',
  },
  E: {
    en: 'Very High',
    zh: '极高',
    ko: '극히 높음',
  },
}

export function getRiskScore(item, lang) {
  return RISK_SCORE_LANG[item] ? RISK_SCORE_LANG[item][lang] : ''
}

export function getRiskScoreColor(value) {
  return getNameInMap(RISK_SCORE, value, 'color')
}

// 代币种类
export const CONTRACT_TYPE = [
  { name: 'ERC-20', value: 1 },
  { name: 'NEP-5', value: 2 },
  { name: 'QRC-20', value: 3 },
  { name: 'Other', value: 4 },
]

export function getContractType(value) {
  return getNameInMap(CONTRACT_TYPE, value)
}

/**
 * 融资价格类型
 */
export const FINACASH_TYPE = [
  { name: 'USD', value: 1 },
  { name: 'ETH', value: 2 },
  { name: 'CNY', value: 3 },
]

export function getFinacashType(value) {
  return getNameInMap(FINACASH_TYPE, value)
}

/**
 * 项目状态
 */

export const projectStatus = {
  0: {
    zh: '项目信息待完善',
    en: 'Project information is not completed',
  },
  1: {
    zh: '项目详细信息终审中',
    en: 'Project details in the final review',
  },
  2: {
    zh: '评级中',
    en: 'Rating',
  },
  3: {
    zh: '已评级',
    en: 'Rated',
  },
  4: {
    zh: '尽调中',
    en: 'Due diligent investigation ongoing',
  },
  // 5: {
  //   zh: 'Txhash待提交',
  //   en: 'Txhash to be submitted',
  // },
  6: {
    zh: '审核未通过',
    en: 'Application denied',
  },
  7: {
    zh: '尽调未通过',
    en: 'Due diligence investigation failed',
  },
  // 8: {
  //   zh: 'Txhash审核未通过',
  //   en: 'Txhash is not authentic',
  // },
  // 9: {
  //   zh: 'Txhash审核中',
  //   en: 'Verifying Txhash',
  // },
  9: {
    zh: '审核中',
    en: 'Under review',
  },
  10: {
    zh: '尽调协议待提交',
    en: 'Due diligence application form to be submitted',
  },
  11: {
    zh: '尽调协议审核中',
    en: 'Due diligence application form submitted',
  },
  12: {
    zh: '尽调协议审核不通过',
    en: 'Due diligence application form denied',
  },
}

export function getProjectStatus(input = 0) {
  return projectStatus[String(input)] || {}
}

export function getUserName(info, encode) {
  return encode
    ? info.nickName
        || regx.formatEmail(info.email)
        || regx.formatPhone(info.phone)
    : info.nickName || info.email || info.phone
}


export function toFixedScore(input) {
  const num = Number(input)
  return Number.isNaN(num) ? '-' : Number(num.toFixed(1))
}

export function getLeaksImg(points = 0) {
  points = Number(points)
  if (points >= 200000) {
    return '/static/img/broke_v4.svg'
  } if (points >= 30000) {
    return '/static/img/broke_v3.svg'
  } if (points >= 5000) {
    return '/static/img/broke_v2.svg'
  }
  return '/static/img/broke_v1.svg'
}

export function getLeaksName(points = 0) {
  points = Number(points)
  if (points >= 200000) {
    return '币圈阿桑奇'
  } if (points >= 30000) {
    return '爆料领袖'
  } if (points >= 5000) {
    return '内幕达人'
  }
  return '爆料新兵'
}
