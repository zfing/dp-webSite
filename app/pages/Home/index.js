/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react'
import PropTypes from 'prop-types'
import I18n, { Trans } from 'helpers/I18n'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import dynamic from 'next/dynamic'
import api from 'utils/api'
import Head, { SEO_DATA } from 'helpers/Head'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import Tab from 'pureui/Tab'
import RatingListActions from '../RatingList/redux'
import Banner from './Banner'
import RatingList from '../RatingList'
import Slick from './Slick'
import Block from './Block'
import ListItem from './ListItem'
import More from './More'

const WXshare = dynamic({
  loader: () => import('components/WXshare'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

export class Home extends React.PureComponent {
  static async getInitialProps({ store }) {
    const freshRatings = await request(api.getFreshRatings, {
      currentPage: 1,
      pageSize: 16,
    }).then(res => res.toArray('list'))

    const pendingRatings = await request(api.getHeadProjectList, {
      currentPage: 1,
      pageSize: 10,
    }).then(res => res.toArray('list'))

    const allList = await request(api.getArticleListV2, {
      type: 1, // 按最新
      currentPage: 1,
      pageSize: 10,
    }).then(res => res.toArray('list'))

    const analysisList = await request(api.getArticleListV2, {
      sourceType: 1,
      currentPage: 1,
      pageSize: 10,
    }).then(res => res.toArray('list'))

    const brokeList = await request(api.getArticleListV2, {
      sourceType: 7,
      currentPage: 1,
      pageSize: 10,
    }).then(res => res.toArray('list'))

    store.dispatch(RatingListActions.getRatingListRequest({
      pageSize: 25,
      currentPage: 1,
    }))

    return {
      freshRatings,
      pendingRatings,
      analysisList,
      brokeList,
      allList,
    }
  }

  render() {
    const {
      freshRatings,
      pendingRatings,
      analysisList,
      brokeList,
      allList,
    } = this.props

    return (
      <>
        <Head name="home" />
        <section className="section"><Banner /></section>
        <section className="section container m-t-20">
          <Slick
            title={<I18n id="最新评级" />}
            list={freshRatings}
            renderItem={(data, key) => <Block key={key} detail={data} />}
          />
        </section>
        <AutoLeftStaticRight certain={480} spacing={20} className="section m-t-20">
          <div className="container">
            <Tab
              isAsync
              dataSource={[{
                title: Trans({ id: '全部评级' }),
                render: () => <RatingList />,
              }, {
                title: Trans({ id: '已上线' }),
                render: () => <RatingList params={{ listStatus: 1 }} />,
              }, {
                title: Trans({ id: '未上线' }),
                render: () => <RatingList params={{ listStatus: 0 }} />,
              }]}
            />
          </div>
          <div className="container">
            <Tab
              dataSource={[{
                title: Trans({ id: '综合' }),
                render: () => <>{allList.map(_ => <ListItem data={_} key={_.id} showTypes />)}</>,
              }, {
                title: Trans({ id: '行情分析' }),
                render: () => <>
                  {analysisList.map(_ => <ListItem data={_} key={_.id} />)}
                  <More href="/analysis/list/all" />
                  </>,
              }, {
                title: Trans({ id: '爆料' }),
                render: () => <>
                  {brokeList.map(_ => <ListItem data={_} key={_.id} />)}
                  <More href="/broke" />
                  </>,
              }]}
            />
          </div>
        </AutoLeftStaticRight>
        <section className="section container m-t-20 m-b-20">
          <Slick
            title={<I18n id="等待评级中" />}
            list={pendingRatings}
            renderItem={(data, key) => (
              <Block isWait key={key} detail={data} />
            )}
          />
        </section>
        <WXshare
          title={Trans({
            zh: SEO_DATA.home.zh.title,
            en: SEO_DATA.home.en.title,
          })}
          description={Trans({
            zh: SEO_DATA.home.zh.description,
            en: SEO_DATA.home.en.description,
          })}
        />
      </>
    )
  }
}

Home.propTypes = {
  freshRatings: PropTypes.array,
  pendingRatings: PropTypes.array,
  analysisList: PropTypes.array,
  brokeList: PropTypes.array,
  allList: PropTypes.array,
}

export default defaultPage(Home)
