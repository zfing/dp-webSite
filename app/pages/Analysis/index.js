import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import Head from 'helpers/Head'
import api from 'utils/api'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import ChartWithEdit from 'components/Article/ChartWithEdit'
import Pages from 'components/Pages'
import Router from 'helpers/router'
import Menu from './Menu'
import ListItem from './ListItem'
import './index.scss'

const fetch = payload => request(api.getArticleListV2, {
  sourceType: 1,
  pageSize: 10,
  currentPage: 1,
  ...payload,
}).then(res => res.toPage())

class ProjectDetail extends React.PureComponent {
  static async getInitialProps({
    query: { id },
    search: { opened },
    inLogin,
  }) {
    const isAll = Number.isNaN(Number(id))

    const pages = await fetch({ sourceId: isAll ? undefined : id })

    const coinList = await request(api.getCoinListV2).then(res => res.toArray())

    const coinHotList = await request(api.getHottestListV2).then(res => res.toArray())

    return {
      id: Number(id),
      pages,
      isAll,
      coinList,
      coinHotList,
      opened: !!(inLogin && opened),
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1 })
      .then(pages => append(pages.list, pages.currentPage))
  }

  render() {
    const {
      pages, id, isAll, coinList, coinHotList, opened,
    } = this.props

    return (
      <>
        <Head name="analysis" />
        <Menu
          hotList={coinHotList}
          allList={coinList}
          id={id}
        />
        <AutoLeftStaticRight
          certain={320}
          spacing={20}
          className="section"
        >
          <div className="PG-analysis">
            {!isAll ? (
              <div className="container m-t-20">
                <ChartWithEdit
                  params={{ id }}
                  onOk={() => Router.replace(`/analysis/list/${id}`)}
                  opened={opened}
                />
              </div>
            ) : null}
            <ol className="container m-t-20">
              <Pages
                initail={pages.list}
                currentPage={pages.currentPage}
                totalSize={pages.totalSize}
                pageSize={pages.pageSize}
                item={data => <ListItem data={data} key={data.id} />}
                handle={this.handle}
              />
            </ol>
          </div>
          <div></div>
        </AutoLeftStaticRight>
      </>
    )
  }
}

ProjectDetail.propTypes = {
  id: PropTypes.number,
  locale: PropTypes.string.isRequired,
  isAll: PropTypes.bool,
  coinList: PropTypes.array.isRequired,
  coinHotList: PropTypes.array.isRequired,
  opened: PropTypes.bool,
  pages: PropTypes.object,
}

export default defaultPage(ProjectDetail)
