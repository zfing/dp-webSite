import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Toast from 'components/Toast'
import TitleBar from 'components/TitleBar'
import request from 'helpers/request'
import I18n, { Trans } from 'helpers/I18n'
import api from 'utils/api'
import keyBy from 'lodash/keyBy'
import Rang from './Rang'
import SelectTags from './SelectTags'
import Edit from './Edit'
import AddInput from './AddInput'

const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  visibility: hidden;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  ${props => props.visible
    && `
    background: rgba(0,0,0,0.1);
    z-index: 99;
    visibility: visible;
  `} display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  max-width: 860px;
  width: 100%;
  margin: 0 10px;
  min-height: 204px;
  max-height: 100%;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 #dae9f1;
`

const Body = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 94px;
`

const SubTitle = styled.div`
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.05px;
  padding: 36px 0 12px;

  span {
    content: '*';
    color: #E12B41;
  }
`

const DesTitle = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #B0B4BB;
  margin-top: 16px;
`

class Comment extends React.PureComponent {
  state = {
    visible: false,
    tags: [],
    sysTagsMap: {},
  };

  componentDidMount() {
    this.getTags()
  }

  getTags = async () => {
    const list = await request(api.getTagList, { pageSize: 100, currentPage: 1 })
      .then(res => res.toArray('list'))
    this.setState({ sysTagsMap: keyBy(list, 'name'), tags: list.map(_ => _.name) })
  }

  open = () => {
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  onAdd = (tag) => {
    const { tags } = this.state
    if (tags.indexOf(tag) === -1) {
      this.setState({ tags: [...tags, tag] })
    }
  }

  onOk = (itemProps) => {
    const point = this.refs.rang.state.score
    if (!point) {
      Toast.error(Trans({ id: '请选择得分' }))
      return
    }

    const selectedTags = this.refs.tags.state.selected
    if (!selectedTags.length) {
      Toast.error(Trans({ id: '请选择标签' }))
      return
    }

    const content = itemProps.context
    if (decodeURI(content).length < 12) { // <p></p> + 5
      Toast.error(Trans({ id: '字数太少' }))
      return
    }

    const { sysTagsMap } = this.state

    const tagIdList = []
    const tagList = []

    selectedTags.forEach((tag) => {
      const inSysTag = sysTagsMap[tag]
      if (inSysTag) {
        tagIdList.push(inSysTag.id)
      } else {
        tagList.push(tag)
      }
    })

    this.saveComment({
      ...this.props.params,
      tagIdList: tagIdList.join(','),
      tagList: tagList.join(','),
      point,
      content,
    })
  }

  saveComment = async (payload) => {
    try {
      const data = await request(api.saveComment, payload)
      if (data.resultCode === '0') {
        this.hide()
        this.props.onOk(data.data)
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  render() {
    const {
      visible, tags,
    } = this.state
    return (
      <Wrapper visible={visible}>
        {visible && (
          <Container>
            <TitleBar
              title={Trans({ id: '我要点评' })}
              suffix={Trans({ id: '返回' })}
              onSuffix={this.hide}
            />
            <Body>
              <Rang ref="rang" style={{ padding: '61px 0 22px' }} />
              <SubTitle>
                <I18n id="项目印象" />
                <span>*</span>
              </SubTitle>
              <AddInput onAdd={this.onAdd} />
              <DesTitle><I18n id="热门" /></DesTitle>
              <SelectTags ref="tags" tags={tags} />
              <SubTitle>
                <I18n id="我的评论" />
                <span>*</span>
              </SubTitle>
              <Edit pure onOk={this.onOk} />
            </Body>
          </Container>
        )}
      </Wrapper>
    )
  }
}

Comment.defaultProps = {
  onOk: () => {},
  params: {},
}

Comment.propTypes = {
  onOk: PropTypes.func,
  params: PropTypes.object,
}

export default Comment
