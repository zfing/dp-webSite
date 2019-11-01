import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import A from 'components/A'

const CardSpan = {
  background: '#fff',
  padding: '0 15px',
}
const iconStyle = {
  fontSize: '12px',
  marginRight: '2px',
}
const CardBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: #d6dae3;
  line-height: 25px;
  @media (max-width: 767px) {
    margin-top: 10px;
    display: inline-block;
  }
`
const SpanIcon = styled.span`
  margin-right: 25px;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`
const Wrapper = styled.span`
  padding:15px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  width:100%;
  @media (max-width: 767px) {
    display: inline-block;
    padding:10px 10px;
    > span {
      flex: none;
    }
  }
`
const SpanText = styled.div`
  flex: 4;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: calc(80% - 10px);
  @media (max-width: 767px){
    margin-right: 0;
    width: 100%;
    max-width:100%;
  }
`
const spanName = {
  margin: '0 5px 0 5px',
  paddingRight: '5px',
  borderRight: '1px solid #f1f1f1',
}

const SpanImg = styled.div`
  display: inline-block;
  position: relative;
  flex: 1;
  width: 168px;
  height: 114px;
  overflow: hidden;
  //background: url('http://wx3.sinaimg.cn/large/006nLajtly1fpi9ikmj1kj30dw0dwwfq.jpg') no-repeat center center;
  background-size: cover;  
  @media (max-width: 767px){
    width: 100%;
    height: 200px;
  }
`
const SpanBtn = styled.span`
  position: absolute;
  width: 70px;
  line-height: 35px;
  border-radius: 20px;
  right: 10px;
  top: 10px;
  text-align: center;
  background-color: #ee534f;
  color:#fff;
  font-size: 16px;
`
const Content = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #323232;
  line-height: 21px;
`
const Title = styled.div`
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #353535;
`
const NameBox = styled.div`
  display: flex;
  //justify-content: left;
  // flex: 2;
`
const IconBox = styled(NameBox)`
  justify-content: space-between;
  // flex: 1;
  text-align: right;
`
class ArticleCard extends React.PureComponent {
  render() {
    // 每条文章数据
    const { data, projectId } = this.props
    const advise = () => {
      switch (data.point) {
        case -2:
          return '卖出'
        case -1:
          return '减持'
        case 0:
          return '观望'
        case 1:
          return '增持'
        case 2:
          return '买入'
        default: return '暂无'
      }
    }
    const defaultImg = 'http://wx3.sinaimg.cn/large/006nLajtly1fpi9ikmj1kj30dw0dwwfq.jpg'
    return (
      <div style={CardSpan}>
        <Link href={`/article/${projectId}`} passHref>
          <A target="_blank">
            <Wrapper>
              <SpanImg style={{ background: `url(${data.headImg ? data.headImg : defaultImg}}) no-repeat center center` }} alt="默认图">
                <SpanBtn>{advise()}</SpanBtn>
              </SpanImg>
              <SpanText>
                <div>
                  <Title>{data.title}</Title>
                  <Content>{data.subContent}</Content>
                </div>
                <CardBtn>
                  <NameBox>
                    <img style={{ height: 25, borderRadius: '50%' }} src={data.logoUrl ? data.logoUrl : 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'} alt="作者头像" />
                    <span>
                      <span style={spanName}>{data.userName}</span>
                      <span>{moment(data.gmtCreate).format('YYYY-MM-DD HH:mm')}</span>
                    </span>
                  </NameBox>
                  <IconBox>
                    <SpanIcon>
                      <i className="iconfont icon-dianzanx" style={iconStyle}></i>
                      <span>{data.likeNum}</span>
                    </SpanIcon>
                    <SpanIcon>
                      <i className="iconfont icon-chakanx" style={iconStyle}></i>
                      <span>{data.viewNum}</span>
                    </SpanIcon>
                    <SpanIcon>
                      <i className="iconfont icon-dianpingx" style={iconStyle}></i>
                      <span>{data.commentNum}</span>
                    </SpanIcon>
                  </IconBox>
                </CardBtn>
              </SpanText>
            </Wrapper>
          </A>
        </Link>
      </div>
    )
  }
}
ArticleCard.propTypes = {
  data: PropTypes.object,
  projectId: PropTypes.string,
}
export default ArticleCard
