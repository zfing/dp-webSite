import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import { Input } from 'components/TextField'
import Avatar from 'components/Avatar'
import Mask from 'components/Upload/Mask'
import Toast from 'components/Toast'
import Modal from 'components/Modal'
import theme from 'utils/theme'
import { reduxForm } from 'redux-form/immutable'
import I18n, { Trans } from 'helpers/I18n'
import securePage from 'hocs/securePage'
import UserLayout from 'components/UserLayout'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectCurrentUser,
} from 'containers/App/selectors'
import { connect } from 'react-redux'
import request from 'helpers/request'
import api from 'utils/api'
import Actions from 'containers/App/redux'
import dynamic from 'next/dynamic'
import './index.scss'

const Upload = dynamic({
  loader: () => import('components/Upload'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Cell = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(218,233,241,0.50);

  div:first-child {
    display: flex;
    align-items: center;
  }

  h3 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #3B3B49;
  
    display: inline-block;
    width: 116px;
  }

  span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9B9B9B;
  }
`

const UploadBtn = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: ${theme.blue};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const UpBtn = styled(Button)`
  font-family: PingFangSC-Regular;
  font-size: 14px;
`

const Close = styled.i`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  color: #838686;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

function getRoleName(role) {
  role = Number(role)
  if (role === 1) {
    return Trans({ id: '个人' })
  } if (role === 2) {
    return Trans({ id: '项目方' })
  } if (role === 3) {
    return Trans({ id: '分析师' })
  }
}

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inLoading: false,
      nickName: props.currentUser.nickName,
    }
    this.uploadRef
  }

  upload = () => {
    this.uploadRef.start()
  }

  componentWillReceiveProps(nextProps) {
    const nextNickName = nextProps.currentUser.nickName
    if (nextNickName !== this.props.currentUser.nickName) {
      this.setState({ nickName: nextNickName })
    }
  }

  onProgress = (result) => {
    this.setState({ inLoading: result.type === 'loading' })
  };

  updateInfo = async (payload, cb) => {
    try {
      const data = await request(api.updateUserInfo, payload)
      if (data.resultCode === '0') {
        this.props.dispatch(Actions.queryUserRequest())
        Toast.success(Trans({
          zh: '修改成功',
          en: 'Successfully modified',
          ko: '수정되었습니다',
        }))
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

  onChange = (e) => {
    this.setState({ nickName: e.target.value })
  }

  open = () => {
    this.refs.modal.open()
  }

  close = () => {
    this.refs.modal.close()
  }

  onOk = () => {
    const nickName = this.state.nickName || ''
    if ((nickName.length <= 10) && (nickName.length >= 2)) {
      this.updateInfo({ nickName }, this.close)
    } else {
      Toast.error(Trans({
        zh: '昵称长度为 2 - 10',
        en: 'Nickname length is 2 - 10',
        ko: '닉네임 길이는 2 - 10입니다.',
      }))
    }
  }

  render() {
    const { currentUser } = this.props

    const { nickName } = this.state

    return (
      <UserLayout currentModel="info">
        <Cell>
          <div>
            <h3><I18n zh="头像" en="Profile photo" ko="아바타" /></h3>
            <Avatar size={48} src={currentUser.avatar} />
            <span style={{ marginLeft: '10px', fontSize: '12px' }}>
              <I18n zh="支持JPEG、GIF、PNG格式图片，大小不超过5M" en="GIF, PNG formats are supported, the file size should not exceed 5 mb" ko="JPEG, GIF, PNG 형식의 이미지를 지원하며 크기는 5M을 초과하지 않습니다" />
            </span>
          </div>
          <div>
            <UploadBtn onClick={this.upload}><I18n zh="上传头像" en="Upload Avatar" ko="아바타 업로드" /></UploadBtn>
          </div>
        </Cell>
        <Cell>
          <div>
            <h3><I18n id="昵称" /></h3>
            <span>{nickName}</span>
          </div>
          <div><UpBtn clear onClick={this.open}><I18n id="修改" /></UpBtn></div>
        </Cell>
        <Cell>
          <div>
            <h3><I18n id="账户" /></h3>
            <span>{currentUser.email || currentUser.phone}</span>
          </div>
          <div></div>
        </Cell>
        <Cell>
          <div>
            <h3><I18n id="账户类型" /></h3>
            <span>{getRoleName(currentUser.role)}</span>
          </div>
          <div></div>
        </Cell>
        <Mask inLoading={this.state.inLoading} />
        <Upload
          prefix="avatar"
          onRef={(e) => { this.uploadRef = e }}
          onProgress={this.onProgress}
          onOk={url => this.updateInfo({ avatarUrl: url })}
          accept="image/png,image/jpeg"
        />
        <Modal
          ref="modal"
          width={600}
        >
          <div className="PG-name-update container">
            <Close onClick={() => this.refs.modal.close()} className="iconfont icon-close" />
            <div className="bd">
              <Input onChange={this.onChange} value={nickName || ''} />
            </div>
            <div className="ft">
              <div onClick={this.close}><I18n id="取消" /></div>
              <div onClick={this.onOk}><I18n id="确定" /></div>
            </div>
          </div>
        </Modal>
      </UserLayout>
    )
  }
}

Account.propTypes = {
  currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
})

export default connect(
  mapStateToProps
)(reduxForm({ form: 'UserInfo' })(securePage(Account)))
