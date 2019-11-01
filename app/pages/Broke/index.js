import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import Head from 'helpers/Head'
import api from 'utils/api'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import HotBrokeList from 'components/Analysis/HotBrokeList'
import dynamic from 'next/dynamic'
import Pages from 'components/Pages'
import Router from 'helpers/router'
import Menu from './Menu'
import ListItem from './ListItem'
import './index.scss'

const Edit = dynamic({
  loader: () => import('./Edit'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const fetch = payload => request(api.getArticleListV2, {
  sourceType: 7,
  pageSize: 10,
  currentPage: 1,
  type: 1,
  ...payload,
}).then(res => res.toPage())

class ProjectDetail extends React.PureComponent {
  static async getInitialProps({
    search: { opened, type },
    inLogin,
  }) {
    type = Number(type) || 1

    const pages = await fetch({ type })

    let brokeHotList = []
    brokeHotList = await request(api.getArticleListV2, {
      type: 3,
      sourceType: 7,
      pageSize: 15,
      currentPage: 1,
    })
      .then(res => res.toPage())
      .then(data => data.list)
    return {
      pages,
      type,
      brokeHotList,
      opened: !!(inLogin && opened),
    }
  }

  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1, type: this.props.type })
      .then(pages => append(pages.list, pages.currentPage))
  }

  render() {
    const {
      type,
      pages,
      opened,
      brokeHotList,
    } = this.props

    return (
      <>
        <Head name="broke" />
        <Menu
          selected={type}
          onEdit={() => this.context.verifyLogin(this.instance.open)}
        />
        <AutoLeftStaticRight
          certain={320}
          spacing={20}
          className="section m-t-20 PG-broke"
        >
          <ol className="container">
            <Pages
              initail={pages.list}
              currentPage={pages.currentPage}
              totalSize={pages.totalSize}
              pageSize={pages.pageSize}
              item={data => <ListItem data={data} key={data.id} />}
              handle={this.handle}
            />
          </ol>
          <div className="container m-b-20">
            <HotBrokeList list={brokeHotList} />
          </div>
        </AutoLeftStaticRight>
        <Edit
          onInstance={(ref) => { this.instance = ref }}
          onOk={() => Router.replace('/broke?type=1')}
          opened={opened}
        />
      </>
    )
  }
}

ProjectDetail.propTypes = {
  inLogin: PropTypes.bool,
  opened: PropTypes.bool,
  pages: PropTypes.object,
  type: PropTypes.number,
  brokeHotList: PropTypes.array,
}

export default defaultPage(ProjectDetail)
