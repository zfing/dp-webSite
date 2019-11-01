import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Item from './Item'
import Loading from './Loading'
import More from './More'
import { unique } from './helpers'

class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageSize: 10,
      totalSize: 0,
      currentPage: 0,
      loading: false,
      init: false,
    }
  }

  init = (payload = {}) => {
    if (!this.state.init) {
      this.query({
        currentPage: 1,
        ...payload,
      }, { init: true })
    }
  }

  query = (payload = {}, status = {}) => {
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
        ...status,
      })
    })
  }

  reply = (data) => {
    this.setState({
      list: [data, ...this.state.list],
    })
    this.props.reply(this.props.params)
  }

  render() {
    const {
      list, totalSize, currentPage, loading,
    } = this.state
    const isShowMore = totalSize > list.length
    const {
      onReply, onLike, authorId, isBroke, rootParams, ...props
    } = this.props
    return (
      <div>
        {list.map(item => (
          <div key={item.id}>
            <Item
              isBroke={isBroke}
              authorId={authorId}
              userId={item.userId}
              user={item.userName}
              liked={item.likeNum}
              replyed={item.replyNum}
              time={moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}
              star={item.point}
              content={item.content}
              toUser={item.toUserName}
              toUserId={item.toUserId}
              onReply={itemProps => onReply(itemProps, item, this.reply)}
              onLike={(cb, editInfo) => onLike({ ...item, ...editInfo }, cb)}
              isLike={!!item.status}
              avatar={item.avatarUrl}
              {...props}
            />
          </div>
        ))}
        <div style={{ marginLeft: '62px' }}>
          {loading && !isShowMore && <Loading />}
          {isShowMore && (
            <More onClick={() => this.query({ currentPage: currentPage + 1 })}>


              More
              {loading && <Loading inline />}
            </More>
          )}
        </div>
      </div>
    )
  }
}

List.defaultProps = {
  params: {},
  request: () => {},
  onReply: () => {},
  reply: () => {},
  onLike: () => {},
  authorId: 0,
  isBroke: false,
  rootParams: {},
}

List.propTypes = {
  params: PropTypes.object,
  request: PropTypes.func,
  onReply: PropTypes.func,
  reply: PropTypes.func,
  onLike: PropTypes.func,
  authorId: PropTypes.number,
  isBroke: PropTypes.bool,
  rootParams: PropTypes.object,
}

export default List
