import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'components/Modal'
import Toast from 'components/Toast'
import SelectTags from 'components/Comment/SelectTags'
import Editor from 'components/Editor'
import Upload, { Mask } from 'components/Upload'
import I18n, { Trans } from 'helpers/I18n'
import request from 'helpers/request'
import { clear } from 'helpers/html'
import api from 'utils/api'
import theme, { media } from 'utils/theme'
import debounce from 'utils/debounce'
import { LevelTexts, getLevelValueFromText } from './helpers'
import { encodeEmojis } from '../Comment/helpers'

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

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 30px;
`

const Title = styled.div`
  margin-right: 10px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #000000;
  padding: 0 30px;
`

const TitleText = styled.span`
  font-size: 12px;
  color: #9E9E9E;
  font-family: PingFangSC-Regular;
  margin-left: 5px;
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
  background: ${props => props.gray ? '#D6D9DE' : theme.blue};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
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

const CoverSelect = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 30px;
  flex-wrap: wrap;
`

const Cover = styled.div`
  position: relative;
  cursor: pointer;
  margin: 10px;
  width: 148px;
  height: 80px;
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${props => props.bgUrl});
  border: 1px solid ${props => props.active ? theme.blue : '#f2f2f2'};
  ${props => props.active && 'box-shadow: 0 0 6px 2px rgba(0, 141, 194, 0.5);'}
  ${media(`
    order: -1;
    width: 100%;
    height: 120px;
    margin-bottom: 10px;
  `, '<sm')}
`

const AddCover = styled(Cover)`
  background-image: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #858e92;
`

const TagStyle = {
  minWidth: 'auto',
  lineHeight: 'initial',
  height: 'auto',
  padding: '2px 10px',
  marginRight: '10px',
  marginTop: 0,
}

class Edit extends React.PureComponent {
  state = {
    title: localStorage.CACHE_POST_T,
    contentId: 0,
    coverUrls: [],
    coverUrl: '',
    inLoading: false,
  }

  uploadRef = {}

  instance = {}

  onChange = (e) => {
    this.setState({ title: e.target.value }, () => {
      localStorage.CACHE_POST_T = this.state.title
    })
  }

  open = () => {
    this.setState({ contentId: Date.now() }, this.refs.modal.open)
  }

  close = () => {
    this.refs.modal.close()
  }

  onOk = () => {
    const { title, coverUrl } = this.state

    if (!title) {
      Toast.error(Trans({ id: '请输入标题' }))
      return
    }

    const selectedTags = this.refs.tags.state.selected
    if (!selectedTags.length) {
      Toast.error(Trans({ id: '请选择标签' }))
      return
    }

    const content = encodeEmojis(this.instance.getContent('html'))

    const contentText = clear(content)

    if (contentText.length < 300) {
      Toast.error(Trans({ id: '字数太少' }))
      return
    }

    // 取第一张图片
    // let coverUrl
    // const { items } = this.instance.getMediaLibraryInstance()
    // if (items.length && items[0].url) {
    //   coverUrl = items[0].url
    // }

    this.save({
      title,
      content,
      subContent: contentText.substr(0, 95),
      point: getLevelValueFromText(selectedTags[0]),
      headImg: coverUrl,
      sourceType: 1,
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
        delete localStorage.CACHE_POST_T
        delete localStorage.CACHE_POST_C
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  componentDidMount() {
    this.setState({ title: localStorage.CACHE_POST_T })
    this.props.onInstance(this)
    this.props.opened && this.open()

    this.getImages()
  }

  onHTMLChange = (e) => {
    if (this.refs.modal.state.visible) {
      localStorage.CACHE_POST_C = e
      this.getImages()
    }
  }

  pickImgSrc = (html = '') => {
    if (typeof html === 'string' && html) {
      const imgReg = /<img.*?(?:>|\/>)/gi
      const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      const imgEles = html.match(imgReg)
      if (Array.isArray(imgEles) && imgEles.length) {
        return imgEles.map(_ => _.match(srcReg)[1])
      }
      return []
    }
    return []
  }

  getImages = (html = '') => {
    html = html || localStorage.CACHE_POST_C || ''
    const coverUrls = this.pickImgSrc(html)
    this.setState({ coverUrls })
  }

  onProgress = (result) => {
    this.setState({ inLoading: result.type === 'loading' })
  }

  onUploadOk = (url) => {
    const { coverUrls } = this.state
    this.setState({ coverUrls: [...coverUrls, url] })
  }

  onSelected = (url) => {
    if (this.state.coverUrl !== url) {
      this.setState({ coverUrl: url })
    } else {
      this.setState({ coverUrl: '' })
    }
  }

  render() {
    const {
      coverUrl, coverUrls, contentId, title, inLoading,
    } = this.state
    return (
      <Modal
        ref="modal"
        width={800}
      >
        <Wrapper>
          <Close onClick={() => this.refs.modal.close()} className="iconfont icon-close" />
          <div style={{ padding: '25px 30px 0' }}>
            <Input type="text" value={title} onChange={this.onChange} placeholder={Trans({ id: '请输入标题' })} maxLength={50} />
          </div>
          <div style={{ padding: '15px' }}>
            <Editor
              contentId={contentId}
              contentFormat="html"
              initialContent={localStorage.CACHE_POST_C}
              controls={[
                'undo', 'redo', 'bold', 'italic', 'underline', 'text-color', 'text-align', 'link',
                'media', 'hr', 'list_ul', 'list_ol', 'remove-styles',
              ]}
              height={380}
              setInstance={(ref) => { this.instance = ref }}
              pasteMode="text"
              onHTMLChange={this.onHTMLChange}
              placeholder={Trans({ zh: '最少300个字', en: 'At least 300 words', ko: '300 단어 이상' })}
            />
          </div>
          <Title><I18n id="您的观点" /></Title>
          <SelectBox>
            <SelectTags ref="tags" tags={LevelTexts.map(i => Trans(i))} maxSelected={1} tagProps={{ style: TagStyle }} />
          </SelectBox>
          <Title>
            <I18n id="设置封面" />
            <TitleText>
              <I18n
                zh="(默认不选中，如需设置封面，请手动点击勾选)"
                en="(The default is not selected, if you need to set the cover, please click the check box manually.)"
                ko="(기본설정은 선택하지 않은 것이며 표지 설정이 필요한 경우 확인란을 클릭해서 선택하십시오.)"
              />
            </TitleText>
          </Title>
          <CoverSelect>
            {coverUrls.map((i, k) => <Cover key={k} bgUrl={i} active={i === coverUrl} onClick={() => this.onSelected(i)} />)}
            <AddCover onClick={() => this.uploadRef.start()}>+</AddCover>
          </CoverSelect>
          <BottomBar>
            <Button gray onClick={this.close}><I18n id="取消" /></Button>
            <Button style={{ marginLeft: '12px' }} onClick={() => action(this.onOk)}><I18n id="发布" /></Button>
          </BottomBar>
        </Wrapper>
        <Upload
          prefix="avatar"
          onRef={(e) => { this.uploadRef = e }}
          onProgress={this.onProgress}
          onOk={this.onUploadOk}
          accept="image/png,image/jpeg"
        />
        <Mask inLoading={inLoading} />
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
