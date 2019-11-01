import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import A from 'components/A'
import Link from 'components/Link'
import Avatar from 'components/Avatar'
import theme from 'utils/theme'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectCurrentUser,
} from 'containers/App/selectors'
import { connect } from 'react-redux'
import HorMenu from 'pages/RatingDetail/HorMenu'
import { Trans } from 'helpers/I18n'
import { getUserName } from 'utils/dict'

const LayoutBody = styled.div`
  padding: 20px 0;
  display: flex;
  min-height: 500px;

  @media (max-width: 1200px) {
    display: block;
  }
`

const LayoutLeft = styled.div`
  padding-top: 25px;
  min-width: 285px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(190,190,190,0.40);
  border-radius: 2px;
  text-align: center;
  @media (max-width: 1200px) {
    display: none;
  }
`

const LayoutTop = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: block;
  }
`

const Nickname = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3B3B49;
  padding: 17px 0 32px;
`

const MenuLink = styled(A)`
  font-family: PingFangSC-Regular;
  height: 52px;
  line-height: 52px;
  font-size: 14px;
  color: #3B3B49;
  display: block;

  &.active {
    font-family: PingFangSC-Medium;
    background: #F8F8F8;
    color: ${theme.blue};
    border-left: 3px solid ${theme.blue};
  }
`

const LayoutRight = styled.div`
  flex: 1;
  padding-left: 20px;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
`

const LayoutRightBody = styled.div`
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(190,190,190,0.40);
  border-radius: 2px;
  min-height: 100%;
`

const Wrapper = styled.div`
  min-height: 300px;
`

const Title = styled.div`
  font-family: PingFangSC-Medium;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #3B3B49;
  border-bottom: 1px solid rgba(218,233,241,0.50);
  padding: 0 24px;
`

const Main = styled.div`
  padding: 0 24px;
`

function UserLayout({ currentUser, children, currentModel }) {
  const isAnalyst = (currentUser.role) === 3

  const nameDict = {
    info: Trans({ zh: '个人信息', en: 'Personal Information', ko: '개인정보' }),
    project: Trans({ zh: '申请的评级', en: 'Applicant Rating', ko: '신청한 등급평가' }),
    fix: Trans({ zh: '修改密码', en: 'Change Password', ko: '비밀번호 수정' }),
    article: Trans({ id: '我的帖子' }),
  }

  return (
    <LayoutBody className="section">
      <LayoutTop>
        <HorMenu>
          {isAnalyst ? null : <div href="/user/project" name={nameDict.project} />}
          <div href="/user/article" name={nameDict.article} />
          <div href="/user/info" name={nameDict.info} />
          <div href="/user/password/update" name={nameDict.fix} />
        </HorMenu>
      </LayoutTop>
      <LayoutLeft>
        <Avatar size={68} src={currentUser.avatar} />
        <Nickname>{getUserName(currentUser)}</Nickname>
        {!isAnalyst && (
          <Link activeClassName="active" href="/user/project" passHref>
            <MenuLink>{nameDict.project}</MenuLink>
          </Link>
        )}
        <Link activeClassName="active" href="/user/article" passHref>
          <MenuLink>{nameDict.article}</MenuLink>
        </Link>
        <Link activeClassName="active" href="/user/info" passHref>
          <MenuLink>{nameDict.info}</MenuLink>
        </Link>
        <Link activeClassName="active" href="/user/password/update" passHref>
          <MenuLink>{nameDict.fix}</MenuLink>
        </Link>
      </LayoutLeft>
      <LayoutRight>
        <LayoutRightBody>
          <Wrapper>
            <Title>{nameDict[currentModel]}</Title>
            <Main>{children}</Main>
          </Wrapper>
        </LayoutRightBody>
      </LayoutRight>
    </LayoutBody>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
})

UserLayout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  children: PropTypes.node,
  currentModel: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
)(UserLayout)
