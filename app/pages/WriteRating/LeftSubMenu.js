import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'

const Wrapper = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  padding-top: 66px;
  min-width: 280px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 #dae9f1, inset -1px 0 0 0 rgba(218, 233, 241, 0.7);

  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.4);
  letter-spacing: 0.08px;

  li {
    list-style: none;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    padding-left: 32px;

    &:hover,
    &.active {
      background: rgba(218, 233, 241, 0.5);
      color: ${theme.blue};
    }
  }
`

const ToggleWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 32px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  span:nth-child(2) {
    margin: 10px 0;
  }

  span {
    cursor: pointer;
    &:hover,
    &.active {
      color: ${theme.blue};
    }
  }
`

class LeftSubMenu extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  onChange = (item) => {
    if (item.value !== this.state.value) {
      this.setState({ value: item.value }, () => {
        this.props.onChange(item)
      })
    }
  };

  render() {
    const { value } = this.state
    const { list, language, changeLanguage } = this.props

    const handleProps = inLang => ({
      className: language === inLang ? 'active' : '',
      onClick: () => language !== inLang && changeLanguage(inLang),
    })
    return (
      <Wrapper>
        {list.map((item, key) => (
          <li
            key={key}
            onClick={() => this.onChange(item)}
            className={value === item.value ? 'active' : ''}
          >
            {item.name}
          </li>
        ))}
        <ToggleWrapper>
          <span {...handleProps('zh')}>中文报告</span>
          {/* <span>|</span> */}
          <span {...handleProps('en')}>English Report</span>
          {/* <span>|</span> */}
          <span {...handleProps('ko')}>한국어 보고서</span>
        </ToggleWrapper>
      </Wrapper>
    )
  }
}

LeftSubMenu.defaultProps = {
  list: [],
  onChange: () => {},
}

LeftSubMenu.propTypes = {
  list: PropTypes.array,
  onChange: PropTypes.func,
  language: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
}

export default LeftSubMenu
