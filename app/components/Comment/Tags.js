import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Tag = styled.span`
  border: 1px solid #D7DBE3;
  border-radius: 16px;
  min-width: 110px;
  height: 28px;
  line-height: 26px;
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #A6ACB5;
  letter-spacing: 0.07px;
  text-align: center;
  margin-right: 19px;
  margin-bottom: 10px;

  ${props => props.onClick && `
    cursor: pointer;
  `}

  ${props => props.active && `
    border: 1px solid #008ec7;
    color: #008ec7;
  `}
`

function Tags({ renderItemProps, tags = [] }) {
  return (
    <Wrapper>
      {tags.map((item, k) => <Tag key={k} {...renderItemProps(item)}>{item}</Tag>)}
    </Wrapper>
  )
}

Tags.defaultProps = {
  tags: [],
  renderItemProps: () => {},
}

Tags.propTypes = {
  tags: PropTypes.array,
  renderItemProps: PropTypes.func,
}

export default Tags
