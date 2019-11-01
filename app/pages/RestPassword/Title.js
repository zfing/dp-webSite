import styled from 'styled-components'
import theme from 'utils/theme'

export default styled.div`
  color: ${theme.gray}
  font-family: PingFangSC-Medium;
  font-size: 16px;
  text-align: center;
  padding: 10px 0 50px;

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
