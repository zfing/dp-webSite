import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import I18n from 'helpers/I18n'
import { addEvent, getScrollTop, getClientHeight } from 'helpers/dom'
import throttle from 'lodash/throttle'
import Item from './Item'
import SubList from './SubList'
import Loading from './Loading'
import { unique } from './helpers'

const More = styled.div`
  padding: 15px 0;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #C2C8CF;
  letter-spacing: 0.14px;
  text-align: center;

  ${props => props.onClick && `
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  `}
`

const Wrapper = styled.div`
  background: white;
`

class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageSize: 10,
      totalSize: 0,
      currentPage: 0,
      loading: false,
    }
    this.subs = {}
  }

  init = (payload = {}) => {
    this.query({
      currentPage: 1,
      ...payload,
    })
  }

  append = (data) => {
    this.setState({ list: [data, ...this.state.list] })
  }

  query = (payload = {}) => {
    const { params } = this.props

    this.setState({ loading: true })

    this.props.request({
      ...params,
      ...payload,
      pageSize: this.state.pageSize,
    }, (data) => {
      const { list, totalSize, currentPage } = data
      this.setState({
        list: unique(this.state.list, list),
        totalSize,
        currentPage,
        loading: false,
      })
    })
  }

  reply = ({ commentId }) => {
    const list = this.state.list.map(_ => _.id === commentId ? {
      ..._,
      replyNum: (Number(_.replyNum) || 0) + 1,
    } : _)

    this.setState({ list })
  }

  componentDidMount() {
    addEvent(window, 'scroll', throttle(() => {
      const moreEle = ReactDOM.findDOMNode(this.refs.more)
      if (moreEle) {
        const offsetTop = moreEle.offsetTop
        const scrollTop = getScrollTop()
        const clientHeight = getClientHeight()
        if (offsetTop >= scrollTop && offsetTop < (scrollTop + clientHeight)) {
          this.query({ currentPage: this.state.currentPage + 1 })
        }
      }
    }, 300))
  }

  render() {
    const {
      list, totalSize, currentPage, loading,
    } = this.state

    const isShowMore = totalSize > list.length
    const {
      subProps, onReply, onLike, pure, authorId, isBroke, params, ...props
    } = this.props

    return (
      <Wrapper>
        {list.map(item => (
          <div key={item.id}>
            <Item
              params={params}
              isBroke={isBroke}
              authorId={authorId}
              userId={item.userId}
              pure={pure}
              user={item.userName}
              liked={item.likeNum}
              replyed={item.replyNum}
              time={moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}
              star={item.point}
              content={item.content}
              onShowSub={() => this.subs[item.id].init()}
              onReply={itemProps => onReply(itemProps, item, this.subs[item.id].reply)}
              onLike={(cb, editInfo) => onLike({ ...item, ...editInfo }, cb)}
              isLike={!!item.status}
              avatar={item.avatarUrl}
              {...props}
            />
            <SubList
              reply={this.reply}
              ref={(ref) => { this.subs[item.id] = ref }}
              {...subProps(item)}
            />
          </div>
        ))}
        {list.length ? null : <More><I18n id="暂无" /></More>}
        {(loading && !isShowMore) ? <Loading /> : null}
        {isShowMore ? (
          <More ref="more" onClick={() => this.query({ currentPage: currentPage + 1 })}>
            <I18n id="查看更多" />
            {loading && <Loading inline />}
          </More>
        ) : null}
      </Wrapper>
    )
  }
}

List.defaultProps = {
  params: {},
  request: () => {},
  subProps: () => {},
  onReply: () => {},
  onLike: () => {},
  pure: false,
  authorId: 0,
  isBroke: false,
}

List.propTypes = {
  params: PropTypes.object,
  request: PropTypes.func,
  subProps: PropTypes.func,
  onReply: PropTypes.func,
  onLike: PropTypes.func,
  pure: PropTypes.bool,
  authorId: PropTypes.number,
  isBroke: PropTypes.bool,
}

export default List
