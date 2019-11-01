import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'components/Icon'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .iconfont {
    font-size: ${props => props.size}px;
    margin-right: 5px;
  }
`

const Item = styled.div`
  width: ${props => props.long ? 80 : 60}px;
  overflow: hidden;
`

function Icons({ data: _, size }) {
  return (
    <Wrapper size={size}>
      <Item>
        <Icon className="icon-dianzanx" />
        {_.likeNum || 0}
      </Item>
      <Item long>
        <Icon className="icon-chakanx" />
        {_.viewNum || 0}
      </Item>
      <Item>
        <Icon className="icon-dianpingx" />
        {_.commentNum || 0}
      </Item>
    </Wrapper>
  )
}

Icons.defaultProps = {
  data: {},
  size: 14,
}

Icons.propTypes = {
  data: PropTypes.object,
  size: PropTypes.number,
}

export default Icons
