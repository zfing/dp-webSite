import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import H1 from 'components/H1'

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 42px;
`

const Title = styled(H1)`
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: rgba(0, 28, 75, 0.7);
  letter-spacing: 0.07px;
  padding-top: 5px;
  font-weight: 500;
`

function Topi({ title }) {
  return (
    <Top>
      <Title>{title}</Title>
    </Top>
  )
}

Topi.propTypes = {
  title: PropTypes.node,
}

export default Topi
