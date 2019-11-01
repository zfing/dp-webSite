import color from 'color'
import styled from 'styled-components'
import globaltheme from 'utils/theme'

const theme = {
  primary: globaltheme.BTN,
  secondary: '#32DB64',
  danger: '#F53D3D',
  light: '#C2C3CA',
  dark: '#222222',
  get darkenPrimary() {
    return color(this.primary)
      .darken(0.2)
      .hex()
  },
  get darkenSecondary() {
    return color(this.secondary)
      .darken(0.2)
      .hex()
  },
  get darkenDanger() {
    return color(this.danger)
      .darken(0.2)
      .hex()
  },
  get darkenLight() {
    return color(this.light)
      .darken(0.2)
      .hex()
  },
  get darkenDark() {
    return color(this.dark)
      .lighten(1)
      .hex()
  },
  lightOutlineBd: '#d9d9d9',
  get darkenLightOutlineBd() {
    return color(this.lightOutlineBd)
      .darken(0.2)
      .hex()
  },
  lightOutlineTxt: '#9B9B9B',
  get darkenLightOutlineTxt() {
    return color(this.lightOutlineTxt)
      .darken(0.2)
      .hex()
  },
}

export default styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  position: relative;
  font-size: 16px;
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
  background-color: #fff;
  border-radius: 4px;

  &,
  &:active,
  &:focus {
    outline: 0;
  }

  /*size*/
  &.large {
    height: 60px;
    font-size: 18px;
  }

  &.small {
    height: 32px;
    font-size: 12px;
  }

  &.block {
    display: block;
    width: 100%;
    padding: 0;
  }

  &.round {
    border-radius: 1000px;
  }

  &.full {
    display: block;
    width: 100%;
    border-radius: 0;
    padding: 0;
  }

  /*background color*/
  &.primary {
    background-color: ${theme.primary};
    color: #fff;
  }
  &.primary:active {
    background-color: ${theme.darkenPrimary};
  }
  &.secondary {
    background-color: ${theme.secondary};
    color: #fff;
  }
  &.secondary:active {
    background-color: ${theme.darkenSecondary};
  }
  &.danger {
    background-color: ${theme.danger};
    color: #fff;
  }
  &.danger:active {
    background-color: ${theme.darkenDanger};
  }
  &.light {
    background-color: ${theme.light};
    color: #fff;
  }
  &.light:active {
    background-color: ${theme.darkenLight};
  }
  &.dark {
    background-color: ${theme.dark};
    color: #fff;
  }
  &.dark:active {
    background-color: ${theme.darkenDark};
  }

  /* type: outline, clear */
  &.outline,
  &.clear {
    background-color: transparent;
  }

  /*border*/
  /*border color*/
  &.bd-primary {
    border-color: ${theme.primary};
  }
  &.bd-primary:active {
    border-color: ${theme.darkenPrimary};
  }
  &.bd-secondary {
    border-color: ${theme.secondary};
  }
  &.bd-secondary:active {
    border-color: ${theme.darkenSecondary};
  }
  &.bd-danger {
    border-color: ${theme.danger};
  }
  &.bd-danger:active {
    border-color: ${theme.darkenDanger};
  }
  &.bd-light {
    border-color: ${theme.lightOutlineBd};
  }
  &.bd-light:active {
    border-color: ${theme.darkenLightOutlineBd};
  }
  &.bd-dark {
    border-color: ${theme.dark};
  }
  &.bd-dark:active {
    border-color: ${theme.darkenDark};
  }

  /*text*/
  /*text color*/
  &.txt-primary {
    color: ${theme.primary};
  }
  &.txt-primary:active {
    color: ${theme.darkenPrimary};
  }
  &.txt-secondary {
    color: ${theme.secondary};
  }
  &.txt-secondary:active {
    color: ${theme.darkenSecondary};
  }
  &.txt-danger {
    color: ${theme.danger};
  }
  &.txt-danger:active {
    color: ${theme.darkenDanger};
  }
  &.txt-light {
    color: ${theme.lightOutlineTxt};
  }
  &.txt-light:active {
    color: ${theme.darkenLightOutlineTxt};
  }
  &.txt-dark {
    color: ${theme.dark};
  }
  &.txt-dark:active {
    color: ${theme.darkenDark};
  }

  /*disabled*/
  &.disabled {
    cursor: not-allowed;
    background-color: #ccc;
    color: #fff;
    &.outline,
    &.clear {
      background-color: transparent;
      color: #ccc;
    }
    &.outline {
      border-color: #ccc;
    }
  }

  &.disabled:active {
    background-color: #ccc;
    &.outline:active,
    &.clear:active {
      background-color: transparent;
      color: #ccc;
    }
    &.outline:active {
      border-color: #ccc;
    }
  }
`
