import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StarItem = styled.i`
  font-size: 14px;
  color: ${props => props.light ? '#FFA200' : '#E3E4E7'};
  margin-right: 5px;
  position: relative;

  ${props => props.isEnd && 'margin-right: 0;'}
`

const Item = ({ light, ...props }) => (
  <StarItem light={light} className="iconfont icon-xingx" {...props} />
)

Item.propTypes = {
  light: PropTypes.bool,
}

const Wrapper = styled.div`
  overflow: hidden;
  display: inline-block;
`


/**
 * 默认灰色在后
 * @param  {Number} options.score   得分
 * @param  {Boolean} options.reverse 是否灰色在前
 */
function Star({ score, reverse, renderItemProps }) {
  const stars = reverse ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5]
  return (
    <Wrapper>
      {stars.map((i, key) => <Item key={i} light={score - i >= 0} isEnd={key === 4} {...renderItemProps(key)} />)}
    </Wrapper>
  )
}

Star.propTypes = {
  score: PropTypes.number,
  reverse: PropTypes.bool,
  renderItemProps: PropTypes.func,
}

Star.defaultProps = {
  renderItemProps: () => {},
}

export default Star
