import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 9px;
  vertical-align: middle;
`
const ProjectName = styled.span`
  width: 65%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #242b38;
`
const TimeSpan = styled.span`
  color: #8a92a1;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 13px;
`
function List(data) {
  const item = data.data
  const advise = () => {
    switch (item.point) {
      case -2:
        return '卖出'
      case -1:
        return '减持'
      case 0:
        return '观望'
      case 1:
        return '增持'
      case 2:
        return '买入'
      default: return '暂无'
    }
  }
  return (
    <tr>
      <td>
        <Img src={item.logoUrl ? item.logoUrl : 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'} alt="logo" />
        <ProjectName title={item.projectName}>{item.projectName}</ProjectName>
      </td>
      <td style={{ textAlign: 'center' }}>
        <TimeSpan>{moment(item.gmtCreate).format('YYYY-MM-DD')}</TimeSpan>
      </td>
      <td style={{ color: 'rgba(38,38,38,.4)', textAlign: 'right', fontSize: 13 }}>
        <span>{advise()}</span>
      </td>
    </tr>
  )
}
export default List
