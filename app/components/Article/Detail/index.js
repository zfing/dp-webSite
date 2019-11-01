import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import moment from 'moment'
import Button from 'components/Button'
import I18n, { Trans } from 'helpers/I18n'
import request from 'helpers/request'
import throttle from 'lodash/throttle'
import api from 'utils/api'
import theme, { media } from 'utils/theme'
import brokeRoute from 'utils/brokeRoute'
import Link from 'components/Link'
import TagName from 'components/Analysis/TagName'
import Router from 'helpers/router'
import { getLeaksImg, getLeaksName } from 'utils/dict'
import AvatarCard from '../AvatarCard'
import Content from '../Content'
import Subscript from '../Subscript'
import { getLevelTextFromValue, getLevelColorFromValue } from '../helpers'
import './index.scss'

const Bar = styled.div`
  position: relative;
  padding: 18px 0;
`

const LikeItem = styled.div`
  cursor: pointer;
  position: absolute;
  height: 33px;
  width: 64px;
  left: 50%;
  top: 50%;
  margin-top: -16.5px;
  margin-left: -32px;
  ${media(`
    left: auto;
    right: 0;
  `, '<sm')}

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  border: 1px solid #d6dae3;
  &:hover {
    opacity: 0.5;
  }
  ${props => props.active && `
    border-color: ${theme.blue};
  `}
`

const Icon = styled.span`
  font-size: 13px;
  color: #d6dae3;
  .iconfont {
    margin-right: 8px;
  }
  ${props => props.active && `
    color: ${theme.blue};
  `}
`

const Btn = styled(Button)`
  font-size: 12px;
  min-height: 32px;
  margin: 0 auto;
`

class Detail extends React.PureComponent {
  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      status: props.article.status,
      likeNum: props.article.likeNum,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article.status !== this.props.article.status) {
      this.setState({ status: nextProps.article.status })
    }
    if (nextProps.article.likeNum !== this.props.article.likeNum) {
      this.setState({ likeNum: nextProps.article.likeNum })
    }
  }

  onLike = () => {
    const { article } = this.props
    const { status, likeNum } = this.state

    const nextStatus = status ? 0 : 1 // 1点赞,0取消
    request(api.like, {
      sourceId: article.id,
      sourceType: this.props.article.sourceType,
      status: nextStatus,
    }).then((res) => {
      if (res.resultCode === '0') {
        this.setState({
          status: nextStatus,
          likeNum: nextStatus ? (likeNum + 1) : (likeNum - 1),
        })
      }
    })
  }

  toLogin = () => {
    Router.push('login', true)
  }

  render() {
    const { article, inLogin } = this.props
    const { status, likeNum } = this.state
    const isAnos = Number(article.sourceType) === 7
    return (
      <div className="CM-article-content">
        {!isAnos && (
          <Subscript color={getLevelColorFromValue(article.point)}>
            {Trans(getLevelTextFromValue(article.point))}
          </Subscript>
        )}
        <Link href={isAnos ? `/member/broke/${brokeRoute.encode(article.userId)}` : `/member/analysis/${article.userId}`}>
          <a>
            <AvatarCard
              v={isAnos ? 0 : Number(article.userQualification)}
              avatar={isAnos ? getLeaksImg(article.leaksPoints) : article.logoUrl}
              title={isAnos
                ? getLeaksName(article.leaksPoints)
                : (
                  <TagName
                    name={article.userName}
                    points={article.marketsPoints}
                    tagSize={16}
                  />
                )
              }
              subTitle={moment(article.gmtCreate).format('YYYY-MM-DD HH:mm')}
            />
          </a>
        </Link>
        <div className={classnames({ watermark: isAnos }, 'content')}>
          <h1 className="title">{article.title}</h1>

          {isAnos ? (
            <>
              <div className={classnames({ hide: !inLogin }, 'content-hide-box')}>
                <Content key="content" content={article.content} />
              </div>
              {
                inLogin ? (
                  <div className="cr">
                    <I18n
                      zh="大炮评级爆料著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。"
                      en="The copyright of posts in DPRating is owned by the author, and for any form of forwarding, Please contact the author for authorization and indicate the source."
                      ko="DPRating의 스포 저작권은 작성자에게 있으며 모든 형태의 전재는 작성자와 연락하여 동의를 얻어야 하며 반드시 출처를 밝혀야 합니다."
                    />
                  </div>
                ) : (
                  <div className="login-btn">
                    <i className="iconfont icon-arrow-down" />
                    <Btn onClick={this.toLogin}><I18n zh="免费注册，查看全文" en="Register for free, view full text" ko="무료 회원 등록, 전체 보기" /></Btn>
                  </div>
                )
              }
            </>
          ) : (
            <Content content={article.content} />
          )}
        </div>
        {isAnos && (
          <div className="affirm">
            <div>
              <I18n id="免责声明" />
            </div>
            <div>
              <I18n
                zh="1. 社区成员发表的任何内容仅代表其个人立场或观点，并不代表大炮评级的立场或观点;"
                en="1. Any content posted by members of the community represents only their personal position or opinion and does not represent DPRating's position or opinion"
                ko="커뮤니티 회원이 게시한 모든 컨텐츠는 개인의 입장이나 관점만을 대표하며 DPRating의 입장이나 관점을 대표하지 않습니다."
              />
            </div>
            <div>
              <I18n
                zh="2. 如发布内容存在严重不实或夸大而侵犯您的权益，请立即联系我们，我们将第一时间予以核实并做出处理。"
                en="2. If the content of the publication is seriously untrue or exaggerated and infringes on your rights, please contact us immediately, we will verify and deal with it as soon as possible."
                ko="게시된 컨텐츠가 심각하게 실제와 일치하지 않거나 과장되어 귀하의 권리를 침해하는 경우, 즉시 우리에게 연락해 주십시오. 우리는 제일 빠른 시간 내에 사실 확인을 하고 처리할 것입니다. "
              />
            </div>
          </div>
        )}
        <Bar>
          <Icon>
            <i className="iconfont icon-chakanx" />
            <span>{article.viewNum}</span>
          </Icon>
          <Icon style={{ marginLeft: '40px' }}>
            <i className="iconfont icon-dianpingx" />
            <span>{article.commentNum}</span>
          </Icon>
          <LikeItem onClick={throttle(() => this.context.verifyLogin(this.onLike), 1000)} active={status === 1}>
            <Icon active={status === 1}>
              <i className="iconfont icon-dianzanx" />
              <span>{likeNum}</span>
            </Icon>
          </LikeItem>
        </Bar>
      </div>
    )
  }
}

Detail.defaultProps = {
  article: {},
}

Detail.propTypes = {
  article: PropTypes.object,
  inLogin: PropTypes.bool,
}

export default Detail
