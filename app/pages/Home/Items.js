import React from 'react'
import styled from 'styled-components'
import I18n from 'helpers/I18n'
import {
  getInvestScore, getRiskScore, getInvestScoreColor, getRiskScoreColor,
} from 'utils/dict'
import theme from 'utils/theme'

const Wrapper = styled.div`
  display: inline-block;
  width: 38px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 4px;
  background: ${props => props.bgColor};
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #FFFFFF;
`

const Span = styled.span`
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: ${theme.blue};
`

export function InvestItem({ score, isTxt, ...props }) {
  return isTxt ? (
    <Span>{getInvestScore(score)}</Span>
  ) : (
    <Wrapper bgColor={getInvestScoreColor(score)} {...props}>
      {getInvestScore(score)}
    </Wrapper>
  )
}

export function RiskItem({ score, isTxt, ...props }) {
  return isTxt ? (
    <Span>
      <I18n value={score} format={getRiskScore} />
    </Span>
  ) : (
    <Wrapper bgColor={getRiskScoreColor(score)} {...props}>
      <I18n value={score} format={getRiskScore} />
    </Wrapper>
  )
}
