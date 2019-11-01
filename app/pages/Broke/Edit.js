import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'components/Modal'
import Toast from 'components/Toast'
import Editor from 'components/Editor'
import I18n, { Trans } from 'helpers/I18n'
import request from 'helpers/request'
import { clear } from 'helpers/html'
import api from 'utils/api'
import { encodeEmojis } from 'components/Comment/helpers'
import SimpleCheckbox from 'components/SimpleCheckbox'
import theme from 'utils/theme'
import debounce from 'utils/debounce'

const action = debounce(
  (callback) => {
    callback()
  },
  1000,
  true,
)

const Wrapper = styled.div`
  margin: 0 10px;
  background: #FFFFFF;
  box-shadow: 0 2px 16px 0 #B0B4BB;
  position: relative;
`

const BottomBar = styled.div`
  border-top: 1px solid #F2F2F2;
  padding: 15px 30px;
  text-align: right;
`

const Button = styled.div`
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  padding: 8px 31px;
  border-radius: 2px;
  background: ${props => props.gray ? '#D6D9DE' : '#008DC2'};
  cursor: pointer;

  ${props => props.disabled ? 'opacity: 0.6;' : `
    &:hover {
      opacity: 0.5;
    }
  `}
`

const Input = styled.input`
  outline: none;
  height: 48px;
  line-height: 48px;
  width: 100%;
  padding: 0 6px;
  font-size: 38px;
  border: 0;
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

const Wranning = styled.div`
  margin: 10px;
  line-height: 1.8;
  color: rgba(38,38,38,0.40);
  font-size: 12px;
  border-top: 1px dashed #b9adad;
  font-family: PingFangSC-Regular;
  padding: 20px;
`

const Checkbox = styled(SimpleCheckbox)`
  float: right;
  color: ${theme.blue};
`

class Edit extends React.PureComponent {
  state = {
    title: localStorage.CACHE_BROKE_T,
    contentId: 0,
  }

  instance = {}

  onChange = (e) => {
    this.setState({ title: e.target.value }, () => {
      localStorage.CACHE_BROKE_T = this.state.title
    })
  }

  open = () => {
    this.setState({ contentId: Date.now() }, this.refs.modal.open)
  }

  close = () => {
    this.refs.modal.close()
  }

  onOk = () => {
    const { title } = this.state

    if (!title) {
      Toast.error(Trans({ id: '请输入标题' }))
      return
    }

    const content = encodeEmojis(this.instance.getContent('html'))

    const contentText = clear(content)

    if (contentText.length < 30) {
      Toast.error(Trans({ id: '字数太少' }))
      return
    }

    // 取第一张图片
    let coverUrl
    const { items } = this.instance.getMediaLibraryInstance()
    if (items.length && items[0].url) {
      coverUrl = items[0].url
    }

    this.save({
      title,
      content,
      subContent: contentText.substr(0, 30),
      headImg: coverUrl,
      sourceType: 7,
      ...this.props.params,
    })
  }

  save = async (payload) => {
    try {
      const data = await request(api.saveArticle, payload)
      if (data.resultCode === '0') {
        Toast.success(Trans({ id: '发表成功' }))
        this.close()
        this.props.onOk()
        this.setState({ title: '' })
        delete localStorage.CACHE_BROKE_T
        delete localStorage.CACHE_BROKE_C
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  componentDidMount() {
    this.setState({ title: localStorage.CACHE_BROKE_T })
    this.props.onInstance(this)
    this.props.opened && this.open()
  }

  onHTMLChange = (e) => {
    if (this.refs.modal.state.visible) {
      localStorage.CACHE_BROKE_C = e
    }
  }

  render() {
    const { title, contentId, checked } = this.state
    return (
      <Modal ref="modal" width={800}>
        <Wrapper>
          <Close onClick={() => this.refs.modal.close()} className="iconfont icon-close" />
          <div style={{ padding: '25px 30px 0' }}>
            <Input type="text" value={title} onChange={this.onChange} placeholder={Trans({ id: '请输入标题' })} maxLength={30} />
          </div>
          <div style={{ padding: '15px' }}>
            <Editor
              contentId={contentId}
              contentFormat="html"
              initialContent={localStorage.CACHE_BROKE_C}
              controls={[
                'undo', 'redo', 'bold', 'italic', 'underline', 'link',
                'media', 'hr', 'list_ul', 'list_ol', 'remove-styles',
              ]}
              height={380}
              setInstance={(ref) => { this.instance = ref }}
              pasteMode="text"
              onHTMLChange={this.onHTMLChange}
              placeholder={Trans({ id: '最少30个字' })}
            />
          </div>
          <Wranning>
            <div>
              <I18n id="温馨提示" />
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <I18n
                zh="爆料一旦发布，用户将无法进行修改，请谨慎操作。"
                en="Once the broke is released, the user will not be able to modify it. Please be cautious."
                ko="스포가 일단 공개되면 사용자가 수정할 수 없으므로 신중하게 작업하십시오."
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <I18n id="免责声明" />
            </div>
            <div>
              <I18n
                zh="社区成员自行对所发布内容负责，因发布内容引发的一切纠纷，由该内容发布者承担全部法律及连带责任。大炮评级不承担任何法律及连带责任。"
                en="The members of the community are responsible for the content they publish. All disputes arising from the publication of the content are subject to the full legal and joint responsibility of the content publisher. DPRating does not assume any legal and joint responsibility."
                ko="커뮤니티 회원은 자신이 게시한 컨텐츠에 대해 책임져야 하며, 컨텐츠 게시로 인해 발생하는 모든 분쟁은 컨텐츠 게시자가 모든 법적 및 연대책임을 지며 DPRating은 법적 및 연대책임을 지지 않습니다."
              />
            </div>
            <Checkbox
              checked={checked}
              onChange={status => this.setState({ checked: status })}
            >
              <I18n id="我同意" />
            </Checkbox>
          </Wranning>
          <BottomBar>
            <Button gray onClick={this.close}><I18n id="取消" /></Button>
            <Button
              style={{ marginLeft: '12px' }}
              onClick={() => checked ? action(this.onOk) : null}
              disabled={!checked}
            >
              <I18n id="发布" />
            </Button>
          </BottomBar>
        </Wrapper>
      </Modal>
    )
  }
}

Edit.defaultProps = {
  params: {},
  onOk: () => {},
  onInstance: () => {},
  opened: false,
}

Edit.propTypes = {
  params: PropTypes.object,
  onOk: PropTypes.func,
  onInstance: PropTypes.func,
  opened: PropTypes.bool,
}

export default Edit
