import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import I18n, { Trans } from 'helpers/I18n'
import { media } from 'utils/theme'
import ProgressBar from './ProgressBar'
import StatusBar from './StatusBar'
import {
  LevelColors, LevelTexts, selectedTimes, getAvgStep, getAvgOffset, getPercentInArr,
} from './helpers'

const Wrapper = styled.div`
  display: flex;
  padding: 23px 30px;

  .block {
    &:first-child {
      padding-right: 30px;
      border-right: 1px solid #F2F2F2;
    }
    &:last-child {
      padding-left: 30px;
    }
  }

  ${media(`
    flex-direction: column;
    .block:first-child {
      border-right: 0;
      padding-right: 0;
    }
    .block:last-child {
      border-top: 1px solid #F2F2F2;
      margin-top: 20px;
      padding-top: 20px;
      padding-left: 0;
    }
  `, '<sm')}
`

const Title = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #000000;
  margin-bottom: 10px;
`

const Block = styled.div`
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #7A8AA2;
`

const Text = styled.div`
  padding: 4px 0;
`

const ProgressWrapper = styled.div`
  display: flex;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const SelectedItem = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #B0BACA;
  padding: 3px 8px;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  ${props => props.active && `
    color: #fff;
    border: 0;
    background: #2096F3;
  `}
`

function Chart({
  selected, nums, score, onChange,
}) {
  const TransNode = [
    <I18n id="一周内" key="0" />,
    <I18n id="一月内" key="1" />,
    <I18n id="半年内" key="2" />,
  ]

  const step = getAvgStep(score)

  const percents = getPercentInArr(nums)

  return (
    <Wrapper>
      <Block className="block">
        <Title><I18n id="分析师观点" /></Title>
        <ProgressWrapper>
          <ColumnWrapper>
            {LevelTexts.map((i, k) => <Text key={k}>{Trans(i)}</Text>)}
          </ColumnWrapper>
          <ColumnWrapper style={{ flex: 1, marginLeft: '10px', marginRight: '14%' }}>
            {percents.map((i, k) => <ProgressBar key={k} percent={i} bgColor={LevelColors[k]}>{`${nums[k]} ${Trans({ zh: '人', en: '', ko: '' })}`}</ProgressBar>)}
          </ColumnWrapper>
          <ColumnWrapper>
            {selectedTimes.map((i, k) => (
              <SelectedItem
                key={k}
                active={selected === i}
                onClick={() => onChange(i)}
              >
                {TransNode[k]}
              </SelectedItem>
            ))}
          </ColumnWrapper>
        </ProgressWrapper>
      </Block>
      <Block className="block">
        <Title>
          <I18n id="综合观点" />
          {': '}
          <I18n {...LevelTexts[step]} />
        </Title>
        <div style={{ paddingTop: '28px' }}>
          <StatusBar step={step} offset={getAvgOffset(score)} />
        </div>
      </Block>
    </Wrapper>
  )
}

Chart.defaultProps = {
  selected: 1,
  onChange: () => {},
  nums: [0, 0, 0, 0, 0],
  score: 0,
}

Chart.propTypes = {
  selected: PropTypes.number,
  // selected: PropTypes.oneOf(['now', 'week', 'month']),
  onChange: PropTypes.func,
  nums: PropTypes.array,
  score: PropTypes.number,
}

export default Chart
