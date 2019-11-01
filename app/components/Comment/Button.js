import styled from 'styled-components'

export default styled.button`
  height: 32px;
  line-height: 32px;
  background-color: #008DC2;
  color: white;

  position: relative;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 4px;

  &,
  &:active,
  &:focus {
    outline: 0;
  }

  &:active {
    background: #0b7298;
  }
`
