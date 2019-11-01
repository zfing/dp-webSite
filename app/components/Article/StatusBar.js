import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Trans } from 'helpers/I18n'
import { LevelColors, LevelTexts } from './helpers'

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  overflow: hidden;
  position: relative;
`

const Main = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

const Icon = styled.i`
  position: absolute;
  font-size: 16px;
  margin-left: -8px;
  left: 10%;
  top: 0;
  transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`

const Item = styled.div`
  display: inline-block;
  width: 20%;
  height: 8px;
`

const Text = styled.div`
  display: inline-block;
  width: 20%;
  text-align: center;
`

function ProgressBar({ step, offset, ...props }) {
  return (
    <Wrapper {...props}>
      <Icon style={{ color: LevelColors[step], left: `${(offset * 100)}%` }} className="iconfont icon-guandianx" />
      <Main>
        <div>{LevelColors.map((i, k) => <Item key={k} style={{ background: i }} />)}</div>
        <div>{LevelTexts.map((i, k) => <Text key={k}>{Trans(i)}</Text>)}</div>
      </Main>
    </Wrapper>
  )
}

ProgressBar.defaultProps = {
  step: 0,
  offset: 0,
}

ProgressBar.propTypes = {
  step: PropTypes.number,
  offset: PropTypes.number,
}

export default ProgressBar
