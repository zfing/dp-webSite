import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import request from 'helpers/request'
import Toast from 'components/Toast'
import Modal from 'components/Modal'
import Edit from 'components/Comment/Edit'
import api from 'utils/api'
import CommentList from 'components/Comment/List'
import I18n, { Trans } from 'helpers/I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectCurrentUser,
  makeSelectInLogin,
} from 'containers/App/selectors'
import theme from 'utils/theme'

const CommentTitle = styled.div`
  padding: 40px 0 12px 0;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
  }

  span:last-child {
    font-size: 12px;
    color: white;
    cursor: pointer;
    background: ${theme.blue};
    padding: 6px 10px;
    border-radius: 4px;
    &:hover {
      opacity: 0.5;
    }
  }
`

class Comment extends React.PureComponent {
  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
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

  // 保存点评后，提供回复对象的数据
  onCommentOk = (comment) => {
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

  onEdit = () => {
    this.context.verifyLogin(this.refs.modal.open)
  }

  onEditOk = (itemProps) => {
    const content = itemProps.context || ''

    if (content.length < 12) {
      Toast.error(Trans({ id: '字数太少' }))
      return
    }

    this.saveComment({
      ...this.props.params,
      content,
    })
  }

  saveComment = async (payload) => {
    try {
      const data = await request(api.saveComment, payload)
      if (data.resultCode === '0') {
        this.refs.modal.close()
        this.onCommentOk(data.data)
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  render() {
    const { params, authorId, isBroke } = this.props

    return (
      <div>
        <CommentTitle>
          <span><I18n id="全部评论" /></span>
          <span onClick={this.onEdit}><I18n id="发表评论" /></span>
        </CommentTitle>
        <CommentList
          pure
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
            authorId,
            isBroke,
            rootParams: params,
          })}
          authorId={authorId}
          isBroke={isBroke}
        />
        <Modal ref="modal" width={800}>
          <Edit onOk={this.onEditOk} onClose={() => this.refs.modal.close()} />
        </Modal>
      </div>
    )
  }
}

Comment.propTypes = {
  inLogin: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  authorId: PropTypes.number,
  isBroke: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  inLogin: makeSelectInLogin(),
})

export default connect(
  mapStateToProps,
)(Comment)
