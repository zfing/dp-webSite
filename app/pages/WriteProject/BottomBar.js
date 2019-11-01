import React from 'react'
import styled from 'styled-components'
import Content from './Content'

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
  margin-top: 60px;
  background: #ffffff;
  box-shadow: inset 0 1px 0 0 rgba(218, 233, 241, 0.7);
`

const Box = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 76px;
  padding-right: 20px;
`

function BottomBar({ children, contentProps = {}, ...props }) {
  return (
    <Wrapper {...props}>
      <Box {...contentProps}>{children}</Box>
    </Wrapper>
  )
}

export default BottomBar
