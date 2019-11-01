import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Trans } from 'helpers/I18n'
import { getLevelTextFromValue, getLevelColorFromValue } from './helpers'

const Wrapper = styled.span`
  border-radius: 1000px;
  padding: 0 16px;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.isFill ? 'white' : props.color};
  background-color: ${props => props.isFill ? props.color : 'white'};
  border: 1px solid ${props => props.color};
`

function StatusItem({ point, isFill, ...props }) {
  const color = getLevelColorFromValue(point)
  return (
    <Wrapper {...props} color={color} isFill={isFill}>
      {Trans(getLevelTextFromValue(point))}
    </Wrapper>
  )
}

StatusItem.defaultProps = {
  point: 0,
  isFill: false,
}

StatusItem.propTypes = {
  isFill: PropTypes.bool,
  point: PropTypes.number,
}

export default StatusItem
