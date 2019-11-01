import styled from 'styled-components'

export default styled.div`
  width: 100%;
  height: 53px;
  padding: 0 20px;
  border-bottom: 1px solid #F6F6F6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    color: #242B38;
  }

  a {
    font-size: 14px;
    color: #888888;
    &:hover {
      opacity: 0.8;
    }
  }
`
