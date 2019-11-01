import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import request from 'helpers/request'
import Overall from 'components/Comment/Overall'
import Tags from 'components/Comment/Tags'
import Toast from 'components/Toast'
import api from 'utils/api'
import { media } from 'utils/theme'
import CommentList from 'components/Comment/List'
import CommentBox from 'components/Comment/Comment'
import I18n from 'helpers/I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectCurrentUser,
  makeSelectInLogin,
} from 'containers/App/selectors'

const OverallWrapper = styled.div`
  display: flex;
  background: white;
  padding-bottom: 41px;

  ${media(`
    flex-direction: column;
  `, '<sm')}

  .full {
    display: flex;
    flex-direction: column;
  }
`

const OverallTitle = styled.div`
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.06px;

  margin: 41px 0 16px;
`

class Comment extends React.PureComponent {
  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      score: {},
      tags: [],
    }
  }

  componentDidMount() {
    this.getComment()
    this.refs.comment.init()
  }

  getCommentList = async (payload, cb) => {
    try {
      const data = await request(api.getCommentListV2, payload)
      if (data.resultCode === '0') {
        cb(data.data)
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  getReplyList = async (payload, cb) => {
    try {
      const data = await request(api.getReplyListV2, payload)
      if (data.resultCode === '0') {
        cb(data.data)
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  getComment = async () => {
    try {
      const data = await request(api.getCommentV2, this.props.params)

      if (data.resultCode === '0') {
        let { sourceScore, sourceTagList } = data.data

        sourceScore = sourceScore || 0
        sourceTagList = sourceTagList || []

        this.setState({
          score: sourceScore,
          tags: sourceTagList.map(i => `${i.tagName}(${i.useNum})`),
        })
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  onReply = async (props, item, cb) => {
    try {
      // 二级回复 commentId 处理
      const isReply = !Number.isNaN(Number(item.commentId))
      const commentId = isReply ? item.commentId : item.id

      const payload = {
        commentId,
        content: props.context,
        toUserId: item.userId,
      }
      const {
        userId, nickName, phone, email, avatar,
      } = this.props.currentUser

      const data = await request(api.replyV2, payload)

      if (data.resultCode === '0') {
        if (typeof cb === 'function') {
          cb({
            ...data.data,
            ...payload,
            toUserName: item.userName,
            userId,
            userName: nickName || phone || email,
            avatarUrl: avatar,
          })
        }
        props.clear()
        props.hide()
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  onShowReply = (cb) => {
    this.context.verifyLogin(cb)
  }

  onShowComment = () => {
    this.context.verifyLogin(this.refs.commentbox.open)
  }

  // 保存点评后，提供回复对象的数据
  onCommentOk = (comment) => {
    this.getComment()
    const {
      userId, nickName, phone, email, avatar,
    } = this.props.currentUser
    this.refs.comment.append({
      ...comment,
      userId,
      userName: nickName || phone || email,
      avatarUrl: avatar,
    })
  }

  onLike = (item, cb) => {
    this.context.verifyLogin(() => this.fetchLike(item, cb))
  }

  fetchLike = async (item, cb) => {
    // 二级回复 sourceId 处理
    const isReply = !Number.isNaN(Number(item.commentId))

    const payload = {
      sourceId: item.id,
      sourceType: isReply ? 6 : 2, // 项目2,回复6
      status: item.isLike ? 0 : 1, // 1点赞,0取消
    }

    try {
      const data = await request(api.like, payload)

      if (data.resultCode === '0') {
        if (typeof cb === 'function') {
          cb()
        }
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  render() {
    const {
      score, tags,
    } = this.state

    const { params } = this.props

    const { pointAverage, pointNum } = score

    const percents = [score.fiveNum, score.fourNum, score.threeNum, score.twoNum, score.oneNum].map(i => i / pointNum)

    return (
      <div>
        <OverallWrapper>
          <div>
            <OverallTitle><I18n id="综合评分" /></OverallTitle>
            <Overall
              average={pointAverage}
              comment={pointNum}
              percents={percents}
              onComment={this.onShowComment}
            />
          </div>
          <div className="full">
            <OverallTitle><I18n id="用户热门印象" /></OverallTitle>
            <Tags tags={tags} />
          </div>
        </OverallWrapper>

        <CommentList
          ref="comment"
          request={this.getCommentList}
          params={{
            ...params,
            sortType: 1,
          }}
          onShowReply={this.onShowReply}
          onReply={this.onReply}
          onLike={this.onLike}
          subProps={fat => ({
            request: this.getReplyList,
            params: {
              commentId: fat.id,
              sortType: 2,
            },
            onReply: this.onReply,
            onShowReply: this.onShowReply,
            onLike: this.onLike,
          })}
        />

        <CommentBox
          ref="commentbox"
          onOk={this.onCommentOk}
          params={params}
        />
      </div>
    )
  }
}

Comment.propTypes = {
  inLogin: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  inLogin: makeSelectInLogin(),
})

export default connect(
  mapStateToProps,
)(Comment)
