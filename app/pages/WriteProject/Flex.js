import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: ${props => (props.between ? 'space-between' : 'initial')};
  ${props => ({ ...props })};
`
