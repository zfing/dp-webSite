import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Avatar from 'components/Avatar'
import AnoLogo from 'components/AnoLogo'
import SlideUp from 'components/Toggle/SlideUp'
import theme, { media } from 'utils/theme'
import I18n, { Trans } from 'helpers/I18n'
import throttle from 'lodash/throttle'
import Edit from './Edit'
import Star from './Star'
import { decodeEmojis } from './helpers'

const Wrapper = styled.div`
  padding: 22px 0;
  background: white;
  font-size: 14px;
  padding-right: 62px;
  border-top: 1px solid #F2F2F2;

  &.offset {
    padding-left: 62px;
  }

  ${media(`
    padding-right: 0;
    &.offset {
      padding-left: 22px;
    }
  `, '<sm')}

  .pd-r {
    padding-right: 20px;
  }

  .author-tag {
    display: inline-block;
    transform: scale(0.9);
    margin-left: 5px;
    font-size: 12px;
    line-height: 14px;
    padding: 2px 4px;
    border-radius: 2px;
    color: #fff;
    background: ${theme.blue};
  }
`

const Body = styled.div`
  display: flex;
`

const Main = styled.div`
  margin-left: 20px;
`

const Bar = styled.div`
  display: flex;
  align-items: center;

  ${media(`
    flex-direction: column;
    align-items: start;
  `, '<sm:-100')}
`

const GrayItem = styled.span`
  color: #A3A3A3;
`

const Content = styled.p`
  word-break: break-word;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #6A6E73;
  letter-spacing: 0.07px;
  line-height: 22px;
  margin: 0;
`

const OperaBar = styled.div`
  display: flex;
  align-items: center;
`

const OperaItem = styled.span`
  margin-right: 35px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #B0BACA;
  letter-spacing: 0.05px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  span {
    margin-left: 8px;
  }

  .iconfont {
    font-size: 14px;
  }

  ${props => props.active ? 'color: #FFA200;' : `
    .iconfont {
      color: #D7DBE3;
    }
  `}
`

class Item extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      liked: props.liked,
      isLike: props.isLike,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.liked !== this.props.liked) {
      this.setState({ liked: nextProps.liked })
    }
    if (nextProps.isLike !== this.props.isLike) {
      this.setState({ isLike: nextProps.isLike })
    }
  }

  editRef = null

  onShowReply = () => {
    this.props.onShowReply(() => {
      this.refs.edit.toggle()
    })
  }

  onLikeEnd = () => {
    const { isLike, liked } = this.state
    this.setState({
      isLike: !isLike,
      liked: isLike ? liked - 1 : liked + 1,
    })
  }

  render() {
    const {
      user, authorId, userId, isBroke, toUser, toUserId, time, star, replyed, content, onReply, onLike, onShowSub, pure, avatar,
    } = this.props
    const isAuthor = authorId === userId
    const isToAuthor = authorId === toUserId
    const { liked, isLike } = this.state

    return (
      <Wrapper className={toUser ? 'offset' : ''}>
        <Body>
          {(isAuthor && isBroke)
            ? <AnoLogo size={40} id={userId} />
            : <Avatar size={40} src={avatar} />
          }
          <Main>
            <Bar>
              <span className="pd-r">
                {(isAuthor && isBroke) ? Trans({ id: '匿名' }) : user}
                {isAuthor && <span className="author-tag"><I18n id="作者" /></span>}
              </span>
              {toUser && (
                <span className="pd-r">
                  <GrayItem className="pd-r"><I18n id="回复" /></GrayItem>
                  {(isToAuthor && isBroke) ? Trans({ id: '匿名' }) : toUser}
                  {isToAuthor && <span className="author-tag"><I18n id="作者" /></span>}
                </span>
              )}
              <GrayItem className="pd-r">{time}</GrayItem>
              {!pure && !toUser && <Star score={star} />}
            </Bar>
            <Content
              dangerouslySetInnerHTML={{
                // __html: decodeURI(content),
                __html: decodeEmojis(content),
              }}
            />
            <OperaBar>
              <OperaItem
                onClick={throttle(() => onLike(this.onLikeEnd, { isLike }), 1000)}
                active={isLike}
              >
                <i className="iconfont icon-dianzanx" />
                <span>{liked}</span>
              </OperaItem>
              {!toUser && (
                <OperaItem onClick={(!toUser && replyed) ? onShowSub : null}>
                  <i className="iconfont icon-dianpingx" />
                  <span>{replyed}</span>
                </OperaItem>
              )}
              <OperaItem onClick={this.onShowReply}><I18n id="回复" /></OperaItem>
            </OperaBar>
          </Main>
        </Body>
        <SlideUp ref="edit">
          <div style={{ paddingTop: '10px' }}>
            <Edit
              onClose={() => this.refs.edit.hide()}
              onOk={itemProps => onReply({
                ...itemProps,
                hide: () => this.refs.edit.hide(),
              })}
            />
          </div>
        </SlideUp>
      </Wrapper>
    )
  }
}

Item.defaultProps = {
  star: 0,
  liked: 0,
  isLike: false,
  replyed: 0,
  content: '',
  onReply: () => {},
  onLike: () => {},
  onShowSub: () => {},
  onShowReply: () => {},
  pure: false,
  avatar: '',
  authorId: 0,
  userId: 0,
  isBroke: false,
  toUserId: 0,
}

Item.propTypes = {
  user: PropTypes.string,
  toUser: PropTypes.string,
  time: PropTypes.string,
  star: PropTypes.number,
  liked: PropTypes.number,
  isLike: PropTypes.bool,
  replyed: PropTypes.number,
  content: PropTypes.string,
  onReply: PropTypes.func,
  onLike: PropTypes.func,
  onShowSub: PropTypes.func,
  onShowReply: PropTypes.func,
  pure: PropTypes.bool,
  avatar: PropTypes.string,
  authorId: PropTypes.number,
  userId: PropTypes.number,
  isBroke: PropTypes.bool,
  toUserId: PropTypes.number,
}

export default Item
