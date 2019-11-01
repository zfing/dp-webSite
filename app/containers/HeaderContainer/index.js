import React from 'react'
import styled from 'styled-components'
import Router from 'helpers/router'
import PropTypes from 'prop-types'
import A from 'components/A'
import Link from 'components/Link'
import Button from 'components/Button'
import AnimateToogle from 'components/AnimateToogle'
import HoverToogle from 'components/HoverToogle'
import theme, { media } from 'utils/theme'
import I18n, { Trans } from 'helpers/I18n'
import { addEvent, getScrollTop } from 'helpers/dom'
import SvgIcon from '@material-ui/core/SvgIcon'
import Drawer from '@material-ui/core/Drawer'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import GlobalSearch from 'components/GlobalSearch'
import Avatar from 'components/Avatar'
import Modal from 'components/Modal'
import Icon from 'components/Icon'
import throttle from 'lodash/throttle'
import LanguageToggle, { ZH, EN, KO } from './LanguageToggle'
import {
  makeSelectCurrentUser,
  makeSelectInLogin,
} from '../App/selectors'
import Actions from '../App/redux'
import ApplyActions from '../Apply/redux'
import Logo from './Logo'
import Menus from './Menus'
import './index.scss'

const Nav = styled.nav`
  ${media('display: none !important', '<md')}
`

const MenuItem = styled.div`
  color: ${theme.HDTxt};
  ${media('display: none', '>md')}
`

class Header extends React.PureComponent {
  isInScroll = false;

  isInScrollComputed = 10;

  state = {
    visible: false,
    inScroll: false,
  };

  toggleDrawer = (open) => {
    this.setState({ visible: open })
  };

  jump = (path) => {
    this.toggleDrawer(false)
    Router.push(path)
  };

  logoutWithHiddenDrawer = () => {
    this.toggleDrawer(false)
    this.props.logout()
  };

  componentDidMount() {
    addEvent(window, 'scroll', throttle(() => {
      const scrollTop = getScrollTop()
      if (scrollTop > this.isInScrollComputed && !this.isInScroll) {
        this.isInScroll = true
        this.setState({ inScroll: true })
      } else if (scrollTop <= 0) {
        this.isInScroll = false
        this.setState({ inScroll: false })
      }
    }, 100))
  }

  onPost = (close) => {
    if (close) {
      this.toggleDrawer(false)
    }
    this.refs.modal.open()
  }

  render() {
    const {
      inLogin,
      currentUser,
      showApply,
      locale,
    } = this.props
    const { visible, inScroll } = this.state
    const CurrentLangItem = locale === 'en'
      ? <EN /> : (
        locale === 'ko' ? <KO /> : <ZH />
      )
    const CurrentLangText = locale === 'en'
      ? 'English' : (
        locale === 'ko' ? '한국어' : '简体中文'
      )
    return (
      <header className={inScroll ? 'shrink' : ''}>
        <div className="section">
          <Logo className="menu" />
          <Nav className="large">
            <HoverToogle
              toggle={(
                <>
                  <Link href="/analysis/list/all">
                    <a target="_blank" className="toggle-item" title={Trans({ id: '行情分析' })}>
                      <I18n id="行情分析" />
                    </a>
                  </Link>
                  <Link href="/broke">
                    <a target="_blank" className="toggle-item" title={Trans({ id: '爆料' })}>
                      <I18n id="爆料" />
                    </a>
                  </Link>
                  <Link href="/vote">
                    <a target="_blank" className="toggle-item" title={Trans({ id: '投票评级' })}>
                      <I18n id="投票评级" />
                    </a>
                  </Link>
                  <Link href="/candy">
                    <a target="_blank" className="toggle-item" title={Trans({ id: '糖果' })}>
                      <I18n id="糖果" />
                    </a>
                  </Link>
                </>
              )}
            >
              <div className="menu">
                <img alt="community" className="menu-icon" src="/static/img/icon_forum.svg" />
                <I18n zh="社区" en="Community" ko="커뮤니티" />
              </div>
            </HoverToogle>
            <HoverToogle
              toggle={(
                <>
                  <Link href="/dp-index">
                    <a target="_blank" className="toggle-item" title={Trans({ id: 'DPC指数 & BVIX' })}>
                      <I18n id="DPC指数 & BVIX" />
                    </a>
                  </Link>
                  <Link href="/position">
                    <a target="_blank" className="toggle-item" title={Trans({ id: '未平仓量 & 融资数据' })}>
                      <I18n id="未平仓量 & 融资数据" />
                    </a>
                  </Link>
                  <Link href="/btc-cycle">
                    <a target="_blank" className="toggle-item" title={Trans({ id: 'BTC周期' })}>
                      <I18n id="BTC周期" />
                    </a>
                  </Link>
                </>
              )}
            >
              <div className="menu">
                <img alt="tools" className="menu-icon" src="/static/img/icon_index.svg" />
                <I18n id="指数 & 工具" />
              </div>
            </HoverToogle>
            <div className="menu"><GlobalSearch /></div>
            <div className="menu" onClick={showApply}>
              <img alt="rating" className="menu-icon" src="/static/img/icon_apply.svg" />
              <I18n id="申请评级" />
            </div>
            <HoverToogle
              toggle={(
                <>
                  <div onClick={this.onPost} className="toggle-item">
                    <I18n id="发表行情分析" />
                  </div>
                  <Link href="/broke?opened=opened">
                    <a target="_blank" className="toggle-item">
                      <I18n id="匿名发表爆料" />
                    </a>
                  </Link>
                </>
              )}
            >
              <div className="menu">
                <img alt="publish" className="menu-icon" src="/static/img/icon_write.svg" />
                <I18n id="发布" />
              </div>
            </HoverToogle>

            {inLogin ? (
              <HoverToogle
                direction="right"
                toggle={(
                  <div>
                    {(currentUser.role === 3) && [
                      <Link key="rating" href="/writer/rating">
                        <a target="_blank" className="toggle-item">
                          <I18n id="评级报告" />
                        </a>
                      </Link>,
                      <Link key="project" href="/writer/project">
                        <a target="_blank" className="toggle-item">
                          <I18n id="项目管理" />
                        </a>
                      </Link>,
                    ]}
                    <Link href="/user/info">
                      <a className="toggle-item"><I18n id="个人中心" /></a>
                    </Link>
                    <div className="toggle-item" onClick={() => this.props.logout()}>
                      <I18n id="退出" />
                    </div>
                  </div>
                )}
              >
                <div className="menu">
                  <Avatar size={24} src={currentUser.avatar} />
                </div>
              </HoverToogle>
            ) : (
              <div className="menu">
                <Link href="/login" passHref><a><I18n id="登录" /></a></Link>
                {' / '}
                <Link href="/register" passHref><a><I18n id="注册" /></a></Link>
              </div>
            )}

            <HoverToogle
              direction="right"
              toggle={(
                <LanguageToggle />
              )}
            >
              <span className="menu">
                {CurrentLangItem}
              </span>
            </HoverToogle>
          </Nav>
          <MenuItem onClick={() => this.toggleDrawer(true)}>
            <SvgIcon>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </SvgIcon>
          </MenuItem>
          <Drawer
            anchor="left"
            open={visible}
            onClose={() => this.toggleDrawer(false)}
          >
            <nav className="mobile">
              {inLogin ? (
                <AnimateToogle
                  arrow
                  content={<div className="menu"><Avatar size={24} src={currentUser.avatar} /></div>}
                >
                  <div>
                    {(currentUser.role === 3) && [
                      <Link key="rating" href="/writer/rating" passHref>
                        <A target="_blank">
                          <span className="menu">
                            <I18n id="评级报告" />
                          </span>
                        </A>
                      </Link>,
                      <Link href="/writer/project" key="project" passHref>
                        <A target="_blank">
                          <span className="menu">
                            <I18n id="项目管理" />
                          </span>
                        </A>
                      </Link>,
                    ]}
                    <span className="menu" onClick={() => this.jump('/user/info')}>
                      <I18n id="个人中心" />
                    </span>
                  </div>
                </AnimateToogle>
              ) : (
                <span className="menu">
                  <span onClick={() => this.jump('/login')}><I18n id="登录" /></span>
                  {' / '}
                  <span onClick={() => this.jump('/register')}><I18n id="注册" /></span>
                </span>
              )}
              <div
                style={{ width: '100%', borderBottom: `1px solid ${theme.blue}` }}
              />
              <AnimateToogle
                arrow
                content={<div className="menu"><I18n zh="社区" en="Community" ko="커뮤니티" /></div>}
              >
                <span onClick={() => this.jump('/analysis/list/all')} className="menu">
                  <I18n id="行情分析" />
                </span>
                <span onClick={() => this.jump('/broke')} className="menu">
                  <I18n id="爆料" />
                </span>
                <span onClick={() => this.jump('/vote')} className="menu">
                  <I18n id="投票评级" />
                </span>
                <span onClick={() => this.jump('/candy')} className="menu">
                  <I18n id="糖果" />
                </span>
              </AnimateToogle>
              <AnimateToogle
                arrow
                content={<div className="menu"><I18n id="指数 & 工具" /></div>}
              >
                <span onClick={() => this.jump('/dp-index')} className="menu">
                  <I18n id="DPC指数 & BVIX" />
                </span>
                <span onClick={() => this.jump('/position')} className="menu">
                  <I18n id="未平仓量 & 融资数据" />
                </span>
                <span onClick={() => this.jump('/btc-cycle')} className="menu">
                  <I18n id="BTC周期" />
                </span>
              </AnimateToogle>
              <AnimateToogle
                arrow
                content={<div className="menu"><I18n id="发布" /></div>}
              >
                <span onClick={() => this.onPost('close')} className="menu">
                  <I18n id="发表行情分析" />
                </span>
                <span onClick={() => this.jump('/broke?opened=opened')} className="menu">
                  <I18n id="匿名发表爆料" />
                </span>
              </AnimateToogle>
              <div className="menu" onClick={() => { this.toggleDrawer(false); showApply() }}>
                <Icon style={{ marginRight: '5px' }} className="icon-locationicon" />
                <I18n id="申请评级" />
              </div>
              <div className="menu" onClick={() => this.jump('/search')}>
                <i className="icon iconfont icon-search" style={{ marginRight: 10 }} />
                <I18n zh="搜索" en="Search" ko="검색" />
              </div>
              <AnimateToogle
                arrow
                content={(
                  <div className="menu">
                    {CurrentLangItem}
                    {CurrentLangText}
                  </div>
                )}
              >
                <LanguageToggle className="m-lang-toggle" />
              </AnimateToogle>
              <div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                }}
              >
                {inLogin && (
                  <Button
                    onClick={this.logoutWithHiddenDrawer}
                    full
                    style={{ backgroundColor: 'rgba(0,141,191,0.2)' }}
                  >
                    <I18n id="退出" />
                  </Button>
                )}
              </div>
            </nav>
          </Drawer>

          <Modal ref="modal" width={800} maskClosable>
            <Menus />
          </Modal>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  locale: PropTypes.string,
  inLogin: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  showApply: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  inLogin: makeSelectInLogin(),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Actions.logoutRequest()),
  showApply: () => dispatch(ApplyActions.applyToggle(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
