import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import toArray from 'lodash/toArray'
import moment from 'moment'

const isArray = input => Object.prototype.toString.call(input).toLowerCase() === '[object array]'
const isJson = input => Object.prototype.toString.call(input).toLowerCase() === '[object object]'

// 分解teamlist
export function teamDecoupling(list) {
  const teamList = []


  const advisorList = []

  if (isArray(list)) {
    list.forEach(
      _ => (String(_.type) === '1' ? teamList.push(_) : advisorList.push(_)),
    )
  }

  return {
    teamList,
    advisorList,
  }
}

// 合并teamlist
export function tramCoupling(team, advisors) {
  let teamList = []


  let advisorList = []
  if (isArray(team)) {
    teamList = team.filter(_ => !isEmpty(_)).map(_ => ({ ..._, type: '1' }))
  }

  if (isArray(advisors)) {
    advisorList = advisors
      .filter(_ => !isEmpty(_))
      .map(_ => ({ ..._, type: '2' }))
  }

  return teamList.concat(advisorList)
}

// 处理删除项
export function handleDeleted(oriList, list) {
  oriList = isArray(oriList) ? oriList : []
  list = isArray(list) ? list : []

  if (oriList.length) {
    const oriListById = keyBy(
      oriList.map(_ => ({
        ..._,
        isDeleted: 1,
      })),
      'id',
    )
    for (let i = 0; i < list.length; i++) {
      const inOriId = list[i].id // 是否在原数据内
      if (list[i] && oriListById[inOriId]) {
        delete oriListById[inOriId]
      }
    }
    return list.concat(toArray(oriListById))
  }
  return list
}

/**
 * 处理项目参数
 */
export function handlePayload(values, prevValues) {
  values = isJson(values) ? values : {}
  prevValues = isJson(prevValues) ? prevValues : {}

  // 浅拷贝
  const payload = JSON.parse(JSON.stringify(values))

  // 处理 projectTeamList2
  // type 1: 成员，2：项目顾问
  payload.projectTeamList = tramCoupling(
    payload.projectTeamList,
    payload.projectTeamList2,
  )
  delete payload.projectTeamList2

  // 处理 projectFundList
  if (Array.isArray(payload.projectFundList)) {
    payload.projectFundList = payload.projectFundList.filter(_ => !isEmpty(_))
  }

  // 处理类别
  if (Array.isArray(payload.categoryIdList)) {
    payload.categoryIdList = payload.categoryIdList.join(',')
  }

  // 处理投资机构列表
  if (Array.isArray(payload.fundList)) {
    payload.fundList = payload.fundList.join(',')
  }

  // 处理是否上线交易所
  if (Array.isArray(payload.exchangeList) && payload.exchangeList.length > 0) {
    payload.hasReleased = 1
  } else {
    payload.hasReleased = 0
  }

  // 处理交易所列表
  if (Array.isArray(payload.exchangeList)) {
    payload.exchangeList = payload.exchangeList.join(',')
  }

  // 处理列表内的删除项
  payload.projectTeamList = handleDeleted(
    prevValues.projectTeamList,
    payload.projectTeamList,
  )
  payload.projectFundList = handleDeleted(
    prevValues.projectFundList,
    payload.projectFundList,
  )

  /**
   * 处理 extendInfo
   */
  delete payload.extendInfo

  // 处理推荐上交易所
  if (Array.isArray(payload.recommendType)) {
    payload.recommendType = payload.recommendType.join(',')
  }

  // 处理融资轮次删除项
  payload.projectFinancing = handleDeleted(
    prevValues.projectFinancing,
    payload.projectFinancing,
  )

  return payload
}

export function parseDatePipe(values, key) {
  if (values[key]) {
    values[key] = moment(values[key]).format('YYYY-MM-DD')
  }
  return values
}
