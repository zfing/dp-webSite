import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import I18n from 'helpers/I18n'
import api from 'utils/api'
import request from 'helpers/request'
import Card from './Card'
import Loading from './Loading'

const Wrapper = styled.div`
  padding: 0 30px;
  background: white;
`

const Footer = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #C2C8CF;
  text-align: center;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

class CardList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.setState({ data: nextProps.data })
    }
  }

  refresh = () => {
    this._fetch()
  }

  loadMore = () => {
    const { currentPage } = this.state.data
    if (!this._isLoadAll()) {
      this._fetch({ currentPage: currentPage + 1 }, true)
    }
  }

  _isLoadAll = () => {
    const { list = [], totalSize = 0 } = this.state.data
    return list.length >= totalSize
  }

  _fetch = (payload = {}, assign = false) => {
    this.setState({ loading: true })

    // 请求文章新列表
    request(api.getArticleListV2, {
      ...this.props.params,
      ...payload,
    })
      .then(res => res.toPage())
      .then((data) => {
        if (assign) {
          data.list = [...this.state.data.list, ...data.list]
        }
        this.setState({ data })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { page, footer, render } = this.props
    const { data, loading } = this.state
    const { list = [] } = data
    return (
      <Wrapper>
        {list.map(item => render ? render(item) : <Card key={item.id} info={item} />)}
        {page && !list.length ? <Footer><I18n id="暂无" /></Footer> : null }
        {list.length && footer ? <Footer>{footer}</Footer> : null}
        {(page && !this._isLoadAll()) ? (
          <Footer onClick={this.loadMore}>
            <I18n id="加载更多" />
            {loading && <Loading inline />}
          </Footer>
        ) : null}
      </Wrapper>
    )
  }
}

CardList.defaultProps = {
  params: {},
  data: {
    list: [],
    totalSize: 0,
    pageSize: 10,
    currentPage: 1,
  },
  page: false, // 是否开启分页
  footer: null,
}

CardList.propTypes = {
  params: PropTypes.object,
  data: PropTypes.shape({
    list: PropTypes.array,
    totalSize: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
  }),
  page: PropTypes.bool,
  footer: PropTypes.node,
  render: PropTypes.func,
}

export default CardList
