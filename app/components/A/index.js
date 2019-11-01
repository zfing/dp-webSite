/**
 * A link to a certain page, an anchor tag
 */
import styled from 'styled-components'

export default styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    opacity: 0.5;
  }
`
