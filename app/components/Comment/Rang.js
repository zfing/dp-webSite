import React from 'react'
import styled from 'styled-components'
import Star from './Star'

const Wrapper = styled.div`
  text-align: center;
`

const Desc = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #AFB4BC;
  letter-spacing: 0.05px;
  margin-top: 24px;
`

class Rang extends React.PureComponent {
  state = {
    score: 0,
  }

  handle = (key) => {
    const score = key + 1
    if (score !== this.state.score) {
      this.setState({ score })
    }
  }

  render() {
    return (
      <Wrapper {...this.props}>
        <Star
          score={this.state.score}
          renderItemProps={key => ({
            onClick: () => this.handle(key),
            // onMouseEnter: () => this.onMouse(key, 'enter'),
            // onMouseLeave: () => this.onMouse(key, 'leave'),
            style: { fontSize: '33px', marginRight: '10px', cursor: 'pointer' },
          })}
        />
        <Desc>您的评分</Desc>
      </Wrapper>
    )
  }
}

export default Rang
