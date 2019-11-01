import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactHighstock from 'components/ReactHighstock'
import SimpleCheckbox from 'components/SimpleCheckbox'
import SlideUp from 'components/SlideUp'
import I18n, { Trans } from 'helpers/I18n'
import theme from 'utils/theme'
import Wrapper from './Wrapper'
import Topi from './Topi'
import DescTitle from './DescTitle'
import Desc from './Desc'

const ToolWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

const Checkbox = styled(SimpleCheckbox)`
  display: inline-block;
  margin-left: 20px;
`

class Bitfinex extends React.PureComponent {
  state = {
    btcShow: true,
    ethShow: true,
  }

  componentDidMount() {
    this.props.query()
  }

  render() {
    const { data } = this.props
    const { btcShow, ethShow } = this.state

    const btcList = data.map(_ => [_.timeStamp, _.btcValue])
    const ethList = data.map(_ => [_.timeStamp, _.ethValue])
    const usdList = data.map(_ => [_.timeStamp, _.usdtValue])

    const config = {
      chart: {
        type: 'line',
        height: '450px',
      },
      legend: {
        // 图例
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false,
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
      plotOptions: {
        series: {
          showInLegend: true,
          events: {
            legendItemClick() {
              return false
            },
          },
        },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [[0, theme.indexTrans[0]], [1, theme.indexTrans[1]]],
          },
          marker: {
            radius: 2,
          },
          threshold: null,
        },
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%y-%m-%d',
          week: '%y-%m-%d',
          month: '%Y-%m',
          year: '%Y',
        },
        showLastLabel: true,
        tickPixelInterval: 75,
        labels: {
          step: 1,
        },
      },
      yAxis: [
        {
          type: 'linear',
          tickAmount: 8, // Y轴刻度线数
          opposite: false,
          labels: {
            enabled: true,
          },
        },
        {
          type: 'linear',
          tickAmount: 8, // Y轴刻度线数
          opposite: false,
          labels: {
            enabled: false,
          },
        },
        {
          type: 'linear',
          tickAmount: 8, // Y轴刻度线数
          opposite: true,
          labels: {
            enabled: true,
          },
        },
      ],
      series: [
        {
          name: Trans({ id: '美元融资' }),
          data: usdList,
          threshold: null,
          yAxis: 0,
          lineColor: theme.indexTheme,
          color: theme.indexTheme,
          tooltip: {
            valuePrefix: '$',
          },
          type: 'area',
        },
        {
          name: Trans({ id: '比特币融资(BTC)' }),
          data: btcShow ? btcList : [],
          threshold: null,
          yAxis: 1,
          lineColor: '#F0B75A',
          color: '#F0B75A',
          fillColor: 'transparent',
          tooltip: {
            valueSuffix: ' BTC',
          },
        },
        {
          name: Trans({ id: '以太坊融资(ETH)' }),
          data: ethShow ? ethList : [],
          threshold: null,
          yAxis: 2,
          lineColor: '#9CA3C0',
          color: '#9CA3C0',
          fillColor: 'transparent',
          tooltip: {
            valueSuffix: ' ETH',
          },
        },
      ],
      rangeSelector: {
        enabled: false,
      },
    }

    return (
      <Wrapper>
        <Topi
          data={data}
          title={
            <I18n en="Bitfinex Funding Data" zh="Bitfinex融资数据" ko="Bitfinex 파이낸싱 데이터" />
          }
        />
        <ToolWrapper>
          <Checkbox
            checked={btcShow}
            onChange={checked => this.setState({ btcShow: checked })}
          >
            <I18n
              en="Bitcoin Funding (BTC)"
              zh="比特币融资(BTC)"
              ko="비트코인 파이낸싱 (BTC)"
            />
          </Checkbox>
          <Checkbox
            checked={ethShow}
            onChange={checked => this.setState({ ethShow: checked })}
          >
            <I18n
              en="Ethereum Funding (ETH)"
              zh="以太坊融资(ETH)"
              ko="이더리움 파이낸싱 (ETH)"
            />
          </Checkbox>
        </ToolWrapper>
        <div style={{ height: '500px' }}>
          <ReactHighstock ref="chart" config={config} />
        </div>
        <SlideUp title={<I18n id="介绍" />}>
          <DescTitle>
            <I18n en="Bitfinex Funding Data" zh="Bitfinex融资数据" ko="Bitfinex 파이낸싱 데이터" />
          </DescTitle>
          <Desc>
            <I18n
              en="Bitfinex is a full-featured spot trading platform for major digital assets & cryptocurrencies. Bitfinex offers leveraged margin trading through a peer-to-peer funding market, allowing users to securely trade with up to 3.3x leverage. We also boast a suite of order types to help traders take advantage of every situation. This chart counts the total amount of major currency funding data in the Bitfinex market. The greater the total amount of funding, the greater the amount of Marginal buying (or shorting) in this currency. By observing the changes in the data, you can observe the trend of leveraged funds on the Bitfinex trading platform."
              zh="Bitfinex融资数据
Bitfinex 是主要数字资产和加密货币的现货交易平台。Bitfinex 通过点对点融资市场提供杠杆化保证金交易，让用户最高可以使用 3.3 倍的杠杆安全地交易。本图表统计了Bitfinex融资市场上主要币种融资并交易的总量。融资总量越大代币市场融资买入（或做空）的量越大，通过观察数据的变化，可以观察到Bitfinex交易平台上杠杆资金的动向"
              ko="Bitfinex 파이낸싱 데이터 Bitfinex는 주요 디지털자산 및 암호화 화폐의 현물 거래 플랫폼입니다. Bitfinex는 P2P 융자시장을 통해 레버리지 보증금 거래를 제공해서 사용자가 최대 3.3배의 레버리지 사용으로 안전하게 거래할 수 있게 합니다. 이 차트는 Bitfinex융자시장의 주요 통화 파이낸싱 및 총 거래량에 대한 집계입니다. 총 융자량이 클수록 토큰시장에서 융자매입 (또는 공매도) 규모가 크며, 데이터의 변화에 대한 관찰을 통해 Bitfinex거래플랫폼의 레버리지 자금 방향을 관찰할 수 있습니다. "
            />
          </Desc>
        </SlideUp>
      </Wrapper>
    )
  }
}

Bitfinex.propTypes = {
  query: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
}

export default Bitfinex
