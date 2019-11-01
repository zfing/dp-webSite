import styled from 'styled-components'

export default styled.div`
  min-width: 810px;
  margin: 0 auto;
  position: relative;

  ${props => props.disabled
    && `
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      cursor: not-allowed;
    }
  `};
`
