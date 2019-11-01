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

import { makeSelectMenuSelected, makeSelectEditRatingList } from './selectors'
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
    const { children, ratingList, selected } = this.props
    const menus = Array(...ratingList).map(_ => ({
      name: _.projectNameEn,
      value: _.id,
    }))
    return (
      <Wrapper>
        <TitleWrapper>


          Project
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
                <I18n en="New Project" zh="新建报告" ko="새 보고서" />
              </Button>
            </A>
          </Link>
        </StickyBtn>
      </Wrapper>
    )
  }
}

LeftMenu.propTypes = {
  children: PropTypes.node,
  ratingList: PropTypes.array,
  selected: PropTypes.string,
  change: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  selected: makeSelectMenuSelected(),
  ratingList: makeSelectEditRatingList(),
})

const mapDispatchToProps = dispatch => ({
  change: selected => dispatch(Actions.changeMenuSelected(selected)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftMenu)
