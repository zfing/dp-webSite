import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const Left = styled.div`
  position: relative;
  width: 120px;
  text-align: right;
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  color: #8e8e8e;
  padding-right: 20px;
`

const Center = styled.div`
  position: relative;
  display: inline-block;
  min-width: 60%;
  width: calc(100% - 120px);
`

const Right = styled.div`
  position: relative;
  display: inline-block;
`

function FormItem({
  text,
  center,
  after,
  height,
  leftWidth,
  rightWidth,
  children,
  ...props
}) {
  return (
    <Wrapper {...props}>
      <Left>{text}</Left>
      <Center>{children}</Center>
      {after && <Right>{after}</Right>}
    </Wrapper>
  )
}

FormItem.defaultProps = {
  height: 40,
  leftWidth: 120,
  rightWidth: 200,
}

FormItem.propTypes = {
  text: PropTypes.node,
  after: PropTypes.node,
  height: PropTypes.number,
  leftWidth: PropTypes.number,
  rightWidth: PropTypes.number,
}

export default FormItem
