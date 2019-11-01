import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import Link from '../Link'
import A from '../A'

const Wrapper = styled.div`
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

  a {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0.07px;
    padding: 0 28px;
    cursor: pointer;

    &.active {
      font-family: PingFangSC-Medium;
      span {
        border-bottom: 2px solid ${theme.blue};
      }
    }

    span {
      display: block;
      height: 48px;
    }
  }

  #changyan_parti_unit, #changyan_count_unit, .cy_cmt_count {
    display: inline-block;
    padding: 0 8px;
    background: #ef3737;
    color: white;
    border-radius: 1000px;
    height: 14px;
    line-height: 14px;
    text-decoration: none;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-top: -7px;
    margin-left: -28px;
    left: 110%;
    font-size: 12px;
  }
`

const Right = styled.div`
  display: inline-block;
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
`

function HrMenu({ children, right }) {
  return (
    <Wrapper>
      <UL>
        {React.Children.map(children, (child, key) => child ? (
          <LI key={key}>
            <Link href={child.props.href} activeClassName="active" passHref>
              <A><span>{child.props.name}</span></A>
            </Link>
            {child.props.prefix ? child.props.prefix : null}
          </LI>
        ) : null)}
      </UL>

      {right && <Right>{right}</Right>}
    </Wrapper>
  )
}

HrMenu.propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.node,
}

export default HrMenu
