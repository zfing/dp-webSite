import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import api from 'utils/api'
import qs from 'qs'
import classnames from 'classnames'
import Link from 'components/Link'
import Router from 'helpers/router'
import I18n, { Trans } from 'helpers/I18n'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import ListItem1 from 'pages/Analysis/ListItem'
import ListItem2 from 'pages/Broke/ListItem'
import Pages from 'components/Pages'
import './index.scss'

const fetch = payload => request(api.searchArticleV2, {
  pageSize: 10,
  currentPage: 1,
  type: 1,
  ...payload,
}).then(res => res.toPage())

class Search extends React.PureComponent {
  static async getInitialProps({ search }) {
    const sourceType = Number(search.sourceType) || 7
    let input = search.input || ''
    let pages = {}
    let projects = []

    if (input.length >= 2) {
      if (sourceType === 9) {
        projects = await request(api.search, { input }).then(res => res.toArray())
      } else {
        pages = await fetch({ sourceType, input })
      }
    } else {
      input = ''
    }

    const reports = projects.filter(_ => !Number.isNaN(Number(_.ratingReportId)))

    return {
      pages,
      sourceType,
      input,
      projects,
      reports,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      input: props.input || '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { input } = this.state
    const { sourceType } = this.props
    if (input && input.length >= 2) {
      Router.replace(`/search?input=${input}&sourceType=${sourceType}`)
    }
  }

  onChange = (e) => {
    this.setState({ input: e.target.value })
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1 })
      .then(pages => append(pages.list, pages.currentPage))
  }

  renderItem = (item = {}) => {
    if (item.sourceType === 7) {
      return <ListItem2 data={item} key={item.id} />
    }
    return <ListItem1 data={item} key={item.id} />
  }

  render() {
    const {
      sourceType, input, pages, projects, reports,
    } = this.props
    const searchStr = qs.stringify({ input })
    return (
      <AutoLeftStaticRight
        certain={320}
        spacing={20}
        className="section m-t-20 PG-search"
      >
        <div className="search-main container m-b-20">
          <form onSubmit={this.onSubmit}>
            <input
              placeholder={Trans({
                zh: '输入关键词，2个字符以上',
                en: 'Enter keywords, 2 characters or more',
                ko: '키워드, 2 자 이상 입력',
              })}
              onChange={this.onChange}
              value={this.state.input}
            />
            <button type="submit"><i className="iconfont icon-search" /></button>
          </form>
          <div className="search-type">
            <Link href={`/search?${searchStr}&sourceType=9`}>
              <a className={classnames({ active: sourceType === 9 })}>
                <I18n id="评级报告" />
                {' & '}
                <I18n id="项目" />
              </a>
            </Link>
            <Link href={`/search?${searchStr}&sourceType=7`}>
              <a className={classnames({ active: sourceType === 7 })}><I18n id="爆料" /></a>
            </Link>
            <Link href={`/search?${searchStr}&sourceType=1`}>
              <a className={classnames({ active: sourceType === 1 })}><I18n id="行情分析" /></a>
            </Link>
          </div>

          <div className="search-detail">
            {sourceType === 9 ? (
              <div className="search-project">
                <div className="search-title"><I18n id="报告" /></div>
                {reports.map((i, k) => (
                  <div className="search-item" key={k} onClick={() => Router.push(`/rating/report/${i.ratingReportId}`)}>
                    <I18n zh={i.projectName} en={i.projectNameEn} />
                    {`(${i.projectSymbol})`}
                  </div>
                ))}
                {reports.length === 0 ? <div className="search-item no-more"><I18n id="暂无" /></div> : null}
                <div className="search-title"><I18n id="项目" /></div>
                {projects.map((i, k) => (
                  <div className="search-item" key={k} onClick={() => Router.push(`/project/${i.projectId}`)}>
                    <I18n zh={i.projectName} en={i.projectNameEn} />
                    {`(${i.projectSymbol})`}
                  </div>
                ))}
                {projects.length === 0 ? <div className="search-item search-no-more"><I18n id="暂无" /></div> : null}
              </div>
            ) : (
              <Pages
                initail={pages.list}
                currentPage={pages.currentPage}
                totalSize={pages.totalSize}
                pageSize={pages.pageSize}
                item={this.renderItem}
                handle={this.handle}
              />
            )}
          </div>
        </div>
        <div />
      </AutoLeftStaticRight>
    )
  }
}

Search.propTypes = {
  sourceType: PropTypes.number,
  input: PropTypes.string,
  pages: PropTypes.object,
  projects: PropTypes.array,
  reports: PropTypes.array,
}

export default defaultPage(Search)
