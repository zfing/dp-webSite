import React from 'react'
import Section from 'components/Section'
import HrMenu from 'components/HrMenu'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: inset 0 -1px 0 0 #EDEEF2;
  position: sticky;
  top: 46px;
  z-index: 11;
`

function HorMenu(props) {
  return (
    <Wrapper>
      <Section>
        <HrMenu
          {...props}
        />
      </Section>
    </Wrapper>
  )
}

export default HorMenu
