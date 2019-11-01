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

class Bitmex extends React.PureComponent {
  state = {
    btcShow: true,
    usdShow: true,
  }

  componentDidMount() {
    this.props.query()
  }

  render() {
    const { data } = this.props
    const { btcShow, usdShow } = this.state

    const btcList = data.map(_ => [_.timeStamp, _.openValue / (10 ** 8)]) // 未平仓 btc / 10^8
    const usdList = data.map(_ => [_.timeStamp, _.openInterest]) // usd 未平仓 0 - 10E
    const priceList = data.map(_ => [_.timeStamp, _.lastPrice]) // 价格 $ 0 - 2w

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
          name: Trans({ id: '比特币价格' }),
          data: priceList,
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
          name: Trans({ en: 'Open Value (BTC)', zh: '未平仓合约价值(BTC)', ko: '미결제약정가치 (BTC)' }),
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
          name: Trans({ en: 'Open Interest (USD)', zh: '未平仓合约数量(USD)', ko: '미결제약정 수 (USD)' }),
          data: usdShow ? usdList : [],
          threshold: null,
          yAxis: 2,
          lineColor: '#9CA3C0',
          color: '#9CA3C0',
          fillColor: 'transparent',
          tooltip: {
            valuePrefix: '$',
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
            <I18n en="Bitmex Bitcoin Perpetual Swap Contact Open Interest" zh="Bitmex比特币永续掉期合约未平仓量" ko="Bitmex 비트코인 영구스왑컨트랙트 미결제약정" />
          }
        />
        <ToolWrapper>
          <Checkbox
            checked={btcShow}
            onChange={checked => this.setState({ btcShow: checked })}
          >
            <I18n en="Open Value (BTC)" zh="未平仓合约价值(BTC)" ko="미결제약정가치 (BTC)" />
          </Checkbox>
          <Checkbox
            checked={usdShow}
            onChange={checked => this.setState({ usdShow: checked })}
          >
            <I18n en="Open Interest (USD)" zh="未平仓合约数量(USD)" ko="미결제약정 수 (USD)" />
          </Checkbox>
        </ToolWrapper>
        <div style={{ height: '500px' }}>
          <ReactHighstock ref="chart" config={config} />
        </div>
        <SlideUp title={<I18n id="介绍" />}>
          <DescTitle>
            <I18n
              en="Bitmex Bitcoin Perpetual Swap Contact Open Interest"
              zh="Bitmex比特币永续掉期合约未平仓量"
              ko="Bitmex 비트코인 영구스왑컨트랙트 미결제약정"
            />
          </DescTitle>
          <Desc>
            <I18n
              en="The BitMEX XBTUSD swap is the most liquid Bitcoin / USD trading product globally. XBTUSD trades 5x – 10x more volume than the underlying index constituents, GDAX and Bitstamp, combined. XBTUSD’s daily trading turnover routinely exceeds $1 billion, and approaches $2 billion. Open interest is the total number of open futures contracts that exist at a given time. When the open interest is at a high level, it means that a large amount of funds are betting on the price of the underlying property. The higher the amount of funds precipitated in futures contracts, the higher the motivation for the manipulation on spot prices, and the leverage effect of futures contracts may result in a big move in price."
              zh="BitMEX XBTUSD掉期合约是全球流动性最高的比特币/美元交易产品。 XBTUSD的交易量比相关成分指数，GDAX和Bitstamp的总交易量多5倍-10倍。 XBTUSD的每日交易量通常超过10亿美元，并接近20亿美元。未平仓量是指在特定时间存在的未平仓期货合约的总数。当未平仓量处于高位的时，意味着大量的资金在期货合约上进行价格博弈。期货合约沉淀资金量越高，主力操纵现货价格的动机越高，加上期货合约的杠杆效应，可能引发价格上的巨变。"
              ko="BitMEX XBTUSD 스왑컨트랙트는 세계에서 유동성이 가장 높은 비트코인 / 달러 거래 제품입니다. XBTUSD의 거래량비 관련 성분지수이며 GDAX 및 Bitstamp의 총 거래량보다 5배~10배 많습니다. XBTUSD의 일일 거래량은 일반적으로 10억 달러 이상으로 20억 달러에 가깝습니다. 미결제약정은 특정 시간대의 미결제 선물계약의 총 수입니다. 미결제가 높은 수준에 있을 때, 대규모의 자금이 선물계약에서 가격 줄다리기를 하고 있음을 의미합니다. 선물계약에 깔린 자금량이 많을수록 큰손이 현물가격을 조종하려는 동기가 높아지고 선물계약의 레버리지 효응까지 추가되어 가격의 큰 변동을 유발할 수 있습니다."
            />
          </Desc>
        </SlideUp>
      </Wrapper>
    )
  }
}

Bitmex.propTypes = {
  query: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
}

export default Bitmex
