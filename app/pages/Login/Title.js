import styled from 'styled-components'
import theme from 'utils/theme'

export default styled.div`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  text-align: center;
  padding: 10px 0 50px;
  font-size: 16px;
  color: rgba(0,28,75,0.50);

  span {
    cursor: pointer;
    margin: 0 10px;
    padding: 10px;
    border-bottom: 2px solid transparent;

    &.active {
      color: ${theme.blue};
      border-bottom: 2px solid ${theme.blue};
    }
  }
`
