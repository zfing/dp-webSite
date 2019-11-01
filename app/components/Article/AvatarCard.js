import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Avatar from 'components/Avatar'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`

const Main = styled.div`
  margin-left: 10px;
  div:first-child {
    font-family: PingFangSC-Medium;
    font-size: 15px;
  }
  div:last-child {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #7A8AA2;
  }
`

function AvatarCard({
  avatar, title, subTitle, v = 0, ...props
}) {
  return (
    <Wrapper {...props}>
      <Avatar size={50} src={avatar} v={v} />
      <Main>
        <div>{title}</div>
        <div>{subTitle}</div>
      </Main>
    </Wrapper>
  )
}

AvatarCard.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.node,
  subTitle: PropTypes.string,
  v: PropTypes.number,
}

export default AvatarCard
