import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import Container from 'components/Container'
import Section from 'components/Section'
import Link from 'components/Link'
import A from 'components/A'
import IconImage from 'components/IconImage'
import SlideUp from 'components/Toggle/SlideUp'
import find from 'lodash/find'
import I18n, { Trans } from 'helpers/I18n'

const Wrapper = styled(Container)`
  position: sticky;
  top: 46px;
  z-index: 1;
`

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`

const UL = styled.ul`
  position: relative;
  flex: 1;
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: nowrap;
  overflow-x: scroll;
`

const LI = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  position: relative;

  a,.item {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #BEBEBE;
    letter-spacing: 0.07px;
    padding: 0 28px;
    cursor: pointer;

    &.active {
      font-family: PingFangSC-Medium;
      color: ${theme.blue};
    }

    span {
      display: block;
      height: 48px;
    }

    .iconfont {
      font-size: 12px;
      margin-left: 4px;
    }
  }
`

const ToggleMenu = styled.div`
  position: relative;

  .toggle-menu-box {
    box-shadow: 0 2px 16px 0 #C5C5C5;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
`

const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const IconItem = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #242B38;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const Icon = styled(IconImage)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

class Menu extends React.PureComponent {
  state = {
    visibile: false,
  }

  onToggle = () => {
    this.refs.sliderup.toggle((visibile) => {
      this.setState({ visibile })
    })
  }

  render() {
    const { hotList, allList, id } = this.props
    const { visibile } = this.state

    const menuExtends = []
    if (!Number.isNaN(id) && !find(hotList, { id })) {
      const itemInAll = find(allList, { id })
      if (itemInAll) {
        menuExtends.push(itemInAll)
      }
    }

    return (
      <Wrapper>
        <Section>
          <Main>
            <UL>
              <LI>
                <Link href="/analysis/list/all" activeClassName="active" passHref>
                  <A title={Trans({ id: '所有' })}><span><I18n id="所有" /></span></A>
                </Link>
              </LI>
              {[...menuExtends, ...hotList].map((i, k) => (
                <LI key={k}>
                  <Link href={`/analysis/list/${i.id}`} activeClassName="active" passHref>
                    <A title={i.projectSymbol}><span>{i.projectSymbol}</span></A>
                  </Link>
                </LI>
              ))}
              <LI>
                <div className={`item ${visibile ? 'active' : ''}`} onClick={this.onToggle}>
                  <I18n id="其他币种" />
                  <i className="iconfont icon-Trianglex" />
                </div>
              </LI>
            </UL>
          </Main>
          <ToggleMenu>
            <div className="toggle-menu-box">
              <SlideUp ref="sliderup">
                <Container>
                  <Section>
                    <IconWrapper>
                      {allList.map((i, k) => (
                        <Link
                          key={k}
                          href={`/analysis/list/${i.id}`}
                          activeClassName="active"
                          passHref
                        >
                          <IconItem>
                            <Icon src={i.logoUrl} />
                            {i.projectSymbol}
                          </IconItem>
                        </Link>
                      ))}
                    </IconWrapper>
                  </Section>
                </Container>
              </SlideUp>
            </div>
          </ToggleMenu>
        </Section>
      </Wrapper>
    )
  }
}

Menu.defaultProps = {
  hotList: [],
  allList: [],
}

Menu.propTypes = {
  hotList: PropTypes.array,
  allList: PropTypes.array,
  id: PropTypes.number,
}

export default Menu
