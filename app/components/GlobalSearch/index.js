import React from 'react'
import PropTypes from 'prop-types'
import request from 'helpers/request'
import debounce from 'utils/debounce'
import I18n from 'helpers/I18n'
import Router from 'helpers/router'
import api from 'utils/api'
import LoadingIndicator from '../LoadingIndicator'
import Toast from '../Toast'
import Link from '../Link'
import './index.scss'

const action = debounce((value, callback) => {
  callback(value)
}, 800)

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      match: [],
      value: '',
      loading: false,
    }
  }

  onChange = (e) => {
    const { value } = e.target
    this.setState({ value })
    action(value, (v) => {
      if (v && v.length >= 2) {
        this.fetch(v)
      } else if (this.state.match.length !== 0) {
        this.setState({ match: [] })
      }
    })
  }

  fetch = async (input) => {
    try {
      this.setState({ loading: true })
      const data = await request(api.search, {
        input,
      })
      if (data.resultCode === '0') {
        this.setState({ match: data.data })
      }
    } catch (e) {
      Toast.error(e.message)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { match, value, loading } = this.state
    const reports = match.filter(_ => !Number.isNaN(Number(_.ratingReportId)))
    return (
      <div className="CM-search">
        <input
          ref="input"
          type="text"
          name="value"
          value={value}
          placeholder=""
          onChange={this.onChange}
          autoComplete="off"
        />
        <img alt="search" className="icon" src="/static/img/icon_search.svg" />
        {/* <i className="icon iconfont icon-search" /> */}
        <div className="main" style={{ display: value ? 'block' : 'none' }}>
          {value && (
            <div className="detail">
              {value.length < 2 ? (
                <div className="title">
                  <I18n
                    zh="请输入2个字符以上"
                    en="please input at least 2 characters"
                    ko="2개 이상의 문자부호를 입력하십시오"
                  />
                </div>
              ) : (loading ? <LoadingIndicator /> : (
                <>
                  <div className="title"><I18n id="报告" /></div>
                  {reports.map((i, k) => (
                    <div className="item" key={k} onClick={() => Router.push(`/rating/report/${i.ratingReportId}`)}>
                      <I18n zh={i.projectName} en={i.projectNameEn} ko={i.projectNameEn} />
                      {`(${i.projectSymbol})`}
                    </div>
                  ))}
                  <div className="title"><I18n id="项目" /></div>
                  {match.map((i, k) => (
                    <div className="item" key={k} onClick={() => Router.push(`/project/${i.projectId}`)}>
                      <I18n zh={i.projectName} en={i.projectNameEn} ko={i.projectNameEn} />
                      {`(${i.projectSymbol})`}
                    </div>
                  ))}
                  <div className="split" />
                  <Link href={`/search?sourceType=7&input=${value}`}>
                    <a className="other">
                      <I18n
                        zh="搜索"
                        en="Search for "
                        ko=""
                      />
                      <span>{value}</span>
                      <I18n
                        zh="相关爆料"
                        en=" related leaks"
                        ko=" 관련 폭발 정보"
                      />
                    </a>
                  </Link>
                  <Link href={`/search?sourceType=1&input=${value}`}>
                    <a className="other">
                      <I18n
                        zh="搜索"
                        en="Search for "
                        ko=""
                      />
                      <span>{value}</span>
                      <I18n
                        zh="相关分析"
                        en=" related analysis"
                        ko=" 관련 분석 검색"
                      />
                    </a>
                  </Link>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

GlobalSearch.propTypes = {
  children: PropTypes.node,
}

export default GlobalSearch
