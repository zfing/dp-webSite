import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ListTop = styled.div`
  border-bottom: 1px solid #f6f6f6;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  font-family: PingFangSC-Regular;
`
const TitleSpan = styled.span`
  font-size: 16px;
  color: #242B38;
`
const RightStyle = styled.span`
  color: #7a8aa2;
  font-size: 14px; 
`
class Title extends React.PureComponent {
  render() {
    const title = this.props.title || {
      TitleText: '最新分析',
    }
    const RightSpan = this.props.text || {
      TitleText: '所有',
    }
    return (
      <ListTop>
        <TitleSpan>{title.TitleText}</TitleSpan>
        <RightStyle>{RightSpan.TitleText}</RightStyle>
      </ListTop>
    )
  }
}
Title.propTypes = {
  title: PropTypes.object,
  text: PropTypes.object,
}
export default Title
