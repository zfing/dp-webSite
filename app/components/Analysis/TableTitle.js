import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
  padding: 10px 0;
  line-height: 30px;
  list-style: none;
  background: #fff;
  margin: 0;
  box-shadow: none;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid #f1f1f1;
  >li{
  display: inline-block;
  margin-right: 30px;
  }
`
function TableTitle() {
  return (
    <Ul>
      <li>简介</li>
      <li>团队</li>
      <li>顾问</li>
      <li>投资者</li>
      <li>白皮书</li>
    </Ul>
  )
}
export default TableTitle
