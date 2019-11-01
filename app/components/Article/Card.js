import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import A from 'components/A'
import TextHide from 'components/TextHide'
import { media } from 'utils/theme'
import I18n from 'helpers/I18n'
import StatusItem from './StatusItem'

const Wrapper = styled.div`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
  justify-content: space-between;

  ${media('flex-direction: column;', '<sm')}
`

const Main = styled.div`
  height: 114px;
  flex: 1;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media('padding-right: 0;', '<sm')}
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
const TopText = styled.span`
  padding: 2px 4px;
  font-size: 12px;
  color: white;
  border-radius: 2px;
  background-color: #64A1FC;
  font-family: PingFangSC-Semibold;
  margin-right: 8px;
`

const Title = styled.h3`
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #353535;
  max-width: calc(100% - 100px);
`

const PithIcon = styled.span`
  padding: 2px 4px;
  text-align: center;
  font-size: 12px;
  color: white;
  border-radius: 2px;
  background-color: #FC6464;
  font-family: PingFangSC-Semibold;
  margin-right: 8px;
`

const Content = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #323232;
`

const Bar = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #B0BACA;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NameBox = styled.div`
  display: flex;
  align-items: center;

  span {
    ${media('display: none;', '<sm:-300')}
  }
`
const IconBox = styled.div`
  display: flex;
  align-items: center;

  .iconfont {
    margin-right: 5px;
    font-size: 14px;
    color: #D7DBE3;
  }
`

const Cover = styled.div`
  position: relative;
  width: 168px;
  height: 114px;
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center center;
  ${props => props.bgUrl && `background-image: url(${props.bgUrl});`}

  ${media(`
    order: -1;
    width: 100%;
    height: 120px;
    margin-bottom: 10px;
  `, '<sm')}
`

const Item = styled(StatusItem)`
  position: absolute;
  right: 13px;
  top: 13px;
`

const RightTop = styled.span`
  position: absolute;
  right: 13px;
  top: 13px;
  padding: 2px 10px;
  background: #d45454;
  color: #fff;
  border-radius: 1000px;
  font-size: 12px;
`

function Card({ info: _, ...props }) {
  const isAnos = Number(_.sourceType) === 7
  return (
    <Link href={`/article/${_.id}`} passHref>
      <A target="_blank" style={{ display: 'block' }}>
        <Wrapper {...props}>
          <Main>
            <TitleWrapper>
              {Number(_.topFlag) === 1 ? <TopText><I18n id="置顶" /></TopText> : null}
              {Number(_.valuableFlag === 1) ? <PithIcon><I18n id="精" /></PithIcon> : null}
              <TextHide width="calc(100% - 80px)" line={1} height={18}>
                <Title>{_.title}</Title>
              </TextHide>
            </TitleWrapper>
            <TextHide line={2} height={42}>
              <Content>
                {`${_.subContent}...`}
              </Content>
            </TextHide>
            <Bar>
              <NameBox>
                <Avatar size={24} src={_.logoUrl} style={{ marginRight: '8px' }} />
                <span>{`${_.userName} | ${moment(_.gmtCreate).format('YYYY-MM-DD HH:mm')}`}</span>
              </NameBox>

              <IconBox>
                <div style={{ marginRight: '25px' }}>
                  <i className="iconfont icon-dianzanx" />
                  <span>{_.likeNum}</span>
                </div>
                <div style={{ marginRight: '25px' }}>
                  <i className="iconfont icon-chakanx" />
                  <span>{_.viewNum}</span>
                </div>
                <div>
                  <i className="iconfont icon-dianpingx" />
                  <span>{_.commentNum}</span>
                </div>
              </IconBox>
            </Bar>
          </Main>
          {isAnos ? (
            <RightTop>爆料</RightTop>
          ) : _.headImg ? (
            <Cover bgUrl={_.headImg}>
              <Item isFill point={_.point} />
            </Cover>
          ) : <Item isFill point={_.point} />
          }
        </Wrapper>
      </A>
    </Link>
  )
}

Card.defaultProps = {
  info: {},
}

Card.propTypes = {
  info: PropTypes.object,
}

export default Card
