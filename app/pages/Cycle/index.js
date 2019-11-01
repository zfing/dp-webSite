import React from 'react'
import Head from 'helpers/Head'
import Section from 'components/Section'
import I18n from 'helpers/I18n'
import defaultPage from 'hocs/defaultPage'
import dynamic from 'next/dynamic'
import SlideUp from 'components/SlideUp'
import request from 'helpers/request'
import api from 'utils/api'
import * as helpers from './helpers'
import Selected from './Selected'
import Topi from './Topi'
import Wrapper from './Wrapper'
import DescTitle from './DescTitle'
import Desc from './Desc'

const ReactHighstock = dynamic({
  loader: () => import('components/ReactHighstock'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

class Index extends React.Component {
  state = {
    dataSource: [],
    selectedSource: [],
    selected: [],
  }

  componentDidMount() {
    this.query()
  }

  query = async () => {
    try {
      const data = await request(api.getBtcTrend).then(res => res.toArray())
      // const data = await helpers.request()
      const dataSource = helpers.dimen(data.map(_ => [_.timeStamp, _.btcPrice]), 'YYYY')
      const selectedSource = dataSource.map(item => ({
        name: item.name,
        value: item.name,
      }))
      const selected = selectedSource.map(_ => _.value)
      this.setState({ dataSource, selectedSource, selected })
    } catch (e) {
      this.setState({ dataSource: [], selectedSource: [], selected: [] })
    }
  }

  onChange = (selected) => {
    this.setState({ selected })
  }

  render() {
    const { selected, selectedSource, dataSource } = this.state
    const series = dataSource.map((item, i) => selected.indexOf(item.name) !== -1 ? {
      ...item,
      yAxis: i,
    } : [])
    const yAxis = dataSource.map(() => ({
      type: 'linear',
      tickAmount: 8, // Y轴刻度线数
      opposite: false,
      labels: {
        enabled: true,
      },
      visible: false,
    }))

    const config = {
      chart: {
        type: 'line',
        height: '450px',
      },
      credits: {
        enabled: false, // 禁用版权信息
      },
      scrollbar: {
        enabled: true, // 开启/关闭滚动条
        barBackgroundColor: '#A9B3C5',
        trackBackgroundColor: '#CCD2DB',
        trackBorderWidth: 0,
        barBorderWidth: 0,
      },
      navigator: {
        enabled: true, // 开启/关闭导航器
      },
      exporting: {
        enabled: false,
      },
      yAxis,
      tooltip: {
        pointFormat: '{point.y} USD',
      },
      series,
    }

    return (
      <Section>
        <Head name="index" />
        <Wrapper style={{ margin: '25px 0' }}>
          <Topi
            title={
              <I18n id="BTC周期" />
            }
          />
          <Selected selected={selected} data={selectedSource} onChange={this.onChange} />
          <ReactHighstock config={config} />
          <SlideUp title={<I18n id="BTC周期介绍" />} style={{ marginTop: '20px' }}>
            <DescTitle>
              <I18n id="关于BTC周期" />
            </DescTitle>
            <Desc>
              <I18n
                zh="从历史的走势来看，BTC价格具有4年周期性的特征。本页工具按照年份单位把BTC的价格走势进行了拆分，并放置同一时间维度坐标进行对比，这样有利于分析各个周期的规律性。"
                en="From the historical trend, the BTC price has a four-year periodicity. This page tool splits the price trend of BTC according to the year unit and compares the dimensional coordinates of the same time, which is beneficial to analyze the regularity of each cycle."
                ko="역사적인 추세로부터 볼 때 BTC 가격은 4년 사이클 특징이 있습니다. 본 페이지 도구는 연도단위로 BTC의 가격 추세를 분할하고 동일 시간대 차원 좌표에서 비교하였으며 이는 각 주기 규칙성의 분석에 유리합니다."
              />
            </Desc>
            <Desc style={{ paddingBottom: '20px' }}>
              <I18n
                zh="图表的纵坐标为BTC的美元价格，横坐标为去除年份的日期。另外，你可以勾选不同的年份进行交叉对比，以找寻规律或差异。"
                en="The ordinate of the chart is the dollar price of the BTC, and the abscissa is the date of the year. In addition, you can check different years for cross-correlation to find patterns or differences."
                ko="차트의 종좌표는 BTC의 달러 가격이고 횡좌표는 연도를 제거한 일자입니다. 또한 귀하는 다른 연도를 선택해서 교차대조함으로써 규칙이나 차이점을 찾을 수 있습니다."
              />
            </Desc>
          </SlideUp>
        </Wrapper>
      </Section>
    )
  }
}

export default defaultPage(Index)
