import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import Button from 'components/Button'
import A from 'components/A'
import Link from 'components/Link'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import I18n from 'helpers/I18n'
import { makeSelectMenuSelected, makeSelectProjectList } from './selectors'
import Actions from './redux'

const textColor = '#dae9f1'
const offsetLeft = '32px'

const Wrapper = styled.div`
  background: ${theme.default};
  box-shadow: 2px 0 16px 0 ${textColor};

  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: rgba(218, 233, 241, 0.55);
  letter-spacing: 0.08px;
  min-width: 280px;
  // min-height: 100%;
  height: 100%;
  overflow: scroll;
  padding-top: 26px;
`

const TitleWrapper = styled.div`
  padding: 0 ${offsetLeft};
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: ${textColor};
  letter-spacing: 0.1px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UL = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 12px;

  li {
    list-style: none;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    padding-left: ${offsetLeft};
    &:hover,
    &.active {
      background: ${theme.blue};
      color: ${textColor};
    }
  }
`

const StickyBtn = styled.div`
  padding-left: 32px;
  position: sticky;
  margin-top: 100%;
  bottom: 32px;
  top: 32px;
`

class LeftMenu extends React.PureComponent {
  onChange = (value) => {
    if (value !== this.props.selected) {
      this.props.change(value)
    }
  };

  render() {
    const { children, projectList, selected } = this.props
    const menus = Array(...projectList).map(_ => ({
      name: _.projectNameEn,
      value: _.id,
    }))
    return (
      <Wrapper>
        <TitleWrapper>
          <I18n id="项目" />
          {children}
        </TitleWrapper>
        <UL>
          {menus.map((item, k) => (
            <li
              onClick={() => this.onChange(item.value)}
              key={k}
              className={item.value === selected ? 'active' : ''}
            >
              {item.name}
            </li>
          ))}
        </UL>
        <StickyBtn>
          <Link href="/writer/project?type=1" passHref>
            <A target="_blank">
              <Button style={{ width: '166px' }} round>
                <I18n id="新建项目" />
              </Button>
            </A>
          </Link>
        </StickyBtn>
      </Wrapper>
    )
  }
}

LeftMenu.propTypes = {
  selected: PropTypes.bool,
  change: PropTypes.func,
  children: PropTypes.node,
  projectList: PropTypes.any,
}

const mapStateToProps = createStructuredSelector({
  selected: makeSelectMenuSelected(),
  projectList: makeSelectProjectList(),
})

const mapDispatchToProps = dispatch => ({
  change: selected => dispatch(Actions.changeMenuSelected(selected)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftMenu)
