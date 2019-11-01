import React from 'react'
import { Line } from 'rc-progress'
import styled from 'styled-components'

const TitleWrapper = styled.div`
  position: relative;
  padding-bottom: 5px;
  font-size: 16px;
  color: #9f9fb0;
  span {
    position: absolute;
    right: 0;
    bottom: 5px;
    font-size: 26px;
    color: #3b3b49;
  }
`

function RateProgress({ title, percent, ...props }) {
  return (
    <div>
      <TitleWrapper>
        {title}
        <span>
          {percent}


%
        </span>
      </TitleWrapper>
      <Line
        trailWidth="3"
        strokeWidth="3"
        trailColor="#ECEEF8"
        percent={percent}
        {...props}
      />
    </div>
  )
}

export default RateProgress
