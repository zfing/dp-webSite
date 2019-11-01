import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import I18n, { Trans } from 'helpers/I18n'
import ProgressBar from '../ProgressBar'
import StatusBar from '../StatusBar'
import {
  LevelColors, LevelTexts, selectedTimes, getAvgStep, getAvgOffset, getPercentInArr,
} from '../helpers'
import './index.scss'

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
    <div className="CM-article-chart">
      <div className="block">
        <h4><I18n id="分析师观点" /></h4>
        <ProgressWrapper>
          <ColumnWrapper>
            {LevelTexts.map((i, k) => <Text key={k}>{Trans(i)}</Text>)}
          </ColumnWrapper>
          <ColumnWrapper style={{ flex: 1, marginLeft: '10px', marginRight: '14%' }}>
            {percents.map((i, k) => <ProgressBar key={k} percent={i} bgColor={LevelColors[k]}>{`${nums[k]} ${Trans({ zh: '人', en: '' })}`}</ProgressBar>)}
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
      </div>
      <div className="block">
        <h4>
          <I18n id="综合观点" />
          {': '}
          <I18n {...LevelTexts[step]} />
        </h4>
        <div style={{ paddingTop: '28px' }}>
          <StatusBar step={step} offset={getAvgOffset(score)} />
        </div>
      </div>
    </div>
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
