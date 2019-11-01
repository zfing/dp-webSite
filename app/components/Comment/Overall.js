import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import I18n, { Trans } from 'helpers/I18n'
import Button from './Button'
import Star from './Star'
import Progress from './Progress'

const Wrapper = styled.div`
  display: flex;
`

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Score = styled.div`
  font-family: PingFangSC-Semibold;
  font-size: 44px;
  line-height: 44px;
  color: #FFA200;
  letter-spacing: 0;

  span {
    font-size: 16px;
  }
`

const Total = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #A6ACB5;
  letter-spacing: 0.05px;
  margin-bottom: 10px;
`

const StarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
`

const StarCell = styled.div`
  display: flex;
  align-items: center;
  .progress {
    width: 115px;
    margin-left: 10px;
  }
  @media (max-width: 420px) {
    flex-direction: column;
  }
`

function fixed(num) {
  return parseFloat(Number(num).toFixed(1), 10)
}

function Overall({
  average,
  comment,
  percents = [],
  onComment,
}) {
  return (
    <Wrapper>
      <ScoreWrapper>
        <Score>
          {fixed(average)}
          <span>分</span>
        </Score>
        <Total>
          {`${comment} ${Trans({ zh: '个评论', en: 'comments', ko: '건 리뷰' })}`}
        </Total>
        <Button onClick={onComment}><I18n id="我要点评" /></Button>
      </ScoreWrapper>
      <StarWrapper>
        {percents.map((percent, key) => (
          <StarCell key={key}>
            <Star score={5 - key} reverse />
            <Progress className="progress" percent={percent} />
          </StarCell>
        ))}
      </StarWrapper>
    </Wrapper>
  )
}

Overall.defaultProps = {
  average: 0,
  comment: 0,
  percents: [0, 0, 0, 0, 0],
  onComment: () => {},
}

Overall.propTypes = {
  average: PropTypes.number,
  comment: PropTypes.number,
  percents: PropTypes.array,
  onComment: PropTypes.func,
}

export default Overall
