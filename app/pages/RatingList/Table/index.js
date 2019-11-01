import React from 'react'
import PropTypes from 'prop-types'
import Table from 'pureui/Table'
import styled from 'styled-components'
import IconImage from 'components/IconImage'
import Link from 'components/Link'
import I18n, { Trans } from 'helpers/I18n'
import moment from 'moment'
import Router from 'helpers/router'
import {
  LevelTexts, getAvgStep,
} from 'components/Article/helpers'
import { toFixedScore } from 'utils/dict'
import { InvestItem, RiskItem } from 'pages/Home/Items'
import Toggle from '../Toggle'
import './index.scss'

const Icon = styled(IconImage)`
  height: 24px;
  width: 24px;
  margin-right: 14px;
`

class RatingTable extends React.PureComponent {
  state = {
    sortColumn: '',
    sortType: '',
  };

  onRowClick = (record) => {
    Router.push(`/rating/report/${record.id}`)
  };

  onRow = (child, record) => (
    <Link href={`/rating/report/${record.id}`} key={record.id}>
      <a title={record.projectName}>{child}</a>
    </Link>
  )

  /**
   * 处理过滤选中的状态
   */
  toggleProps = (sortColumn) => {
    const state = this.state
    const inActive = sortColumn === state.sortColumn
    return {
      inActive,
      isDown: inActive && state.sortType === '1',
      isUp: inActive && state.sortType === '0',
      handle: (status) => {
        this.setState({ sortColumn, sortType: status }, () => {
          this.props.query({
            sortColumn: this.state.sortColumn,
            sortType: this.state.sortType,
          })
        })
      },
    }
  };

  render() {
    const {
      list, loadMore, pageInfo, inLoading,
    } = this.props
    const inLoadMore = pageInfo.totalSize > list.length

    const columns = [
      {
        title: <I18n zh="项目" en="Project" />,
        width: '220px',
        render: record => (
          <div className="icon-wrapper">
            <Icon src={record.logoUrl} alt={record.projectSymbol} />
            <h4>
              <I18n
                en={record.projectNameEn}
                zh={record.projectName || record.projectNameEn}
              />
            </h4>
            <span>{record.projectSymbol}</span>
          </div>
        ),
      },
      {
        title: (
          <Toggle {...this.toggleProps('2')}>
            <I18n id="资质" />
          </Toggle>
        ),
        width: '65px',
        render: record => <InvestItem isTxt score={record.investScore} />,
      },
      {
        title: (
          <Toggle {...this.toggleProps('1')}>
            <I18n id="风险" />
          </Toggle>
        ),
        width: '75px',
        render: record => <RiskItem isTxt score={record.riskScore} />,
      },
      {
        title: <I18n id="行情分析" />,
        width: '80px',
        render: record => Number.isNaN(Number(record.analysisAvg)) ? '-' : Trans(LevelTexts[getAvgStep(record.analysisAvg)]),
      },
      {
        title: <I18n id="综合点评" />,
        width: '75px',
        render: record => toFixedScore(record.pointAverage),
      },
      {
        title: <I18n id="阅读量" />,
        width: '65px',
        render: record => record.pv,
      },
      {
        title: (
          <Toggle
            {...this.toggleProps('4')}
            style={{ justifyContent: 'flex-end' }}
          >
            <I18n id="评级时间" />
          </Toggle>
        ),
        width: '110px',
        render: record => (
          <div className="text-right">
            <I18n
              value={record.ratingTime}
              format={(value, local) => (
                value
                  ? moment(value).format(
                    local === 'zh' ? 'YYYY年MM月DD日' : 'DD MMM YYYY',
                  )
                  : ''
              )}
            />
          </div>
        ),
      },
    ]

    return (
      <>
        <Table
          className="PG-ratings"
          onRow={this.onRow}
          columns={columns}
          dataSource={list}
        />
        <div className="PG-ratings-more" onClick={inLoadMore ? loadMore : null}>
          {inLoading ? (
            'Loading...'
          ) : inLoadMore ? (
            <I18n id="查看更多" />
          ) : (
            <I18n id="暂无" />
          )}
        </div>
      </>
    )
  }
}

RatingTable.defaultProps = {
  list: [],
  query: () => {},
  loadMore: () => {},
  pageInfo: {},
  inLoading: false,
}

RatingTable.propTypes = {
  list: PropTypes.array,
  query: PropTypes.func,
  loadMore: PropTypes.func,
  pageInfo: PropTypes.object,
  inLoading: PropTypes.bool,
}

export default RatingTable
