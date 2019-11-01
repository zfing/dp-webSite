import React from 'react'
import ReactHighstock, { rangeSelector } from 'components/ReactHighstock'
import SlideUp from 'components/SlideUp'
import theme from 'utils/theme'
import config from 'utils/config'
import isEmpty from 'lodash/isEmpty'
import Grid from '@material-ui/core/Grid'
import I18n from 'helpers/I18n'
import {
  pointsFormat, addPoints, getLastTime,
} from './utils'
import Wrapper from './Wrapper'
import Topi from './Topi'
import Desc from './Desc'
import DescTitle from './DescTitle'
import A from './A'

const { SOURCE_URL } = config

const GridItemProps = {
  item: true,
  md: 6,
  sm: 12,
}

class BVIX extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      period: 0,
    }
    this.timer = null
    this.duration = 1000 * 60 * 15
    this.lastTime = null
  }

  componentDidMount() {
    this.query()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  query = () => {
    try {
      this.props.query({
        indexType: 1,
        period: this.state.period,
      })

      if (this.state.period === 0 || this.state.period === 1) {
        this.update()
      } else {
        clearTimeout(this.timer)
      }
      this.refs.chart.getChart().showLoading('Loading...')
    } catch (e) {
      // Toast.error(e.message)
    }
  };

  update = () => {
    try {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        const chart = this.refs.chart.getChart()
        this.props.update(
          {
            indexType: 1,
            startTime: this.lastTime / 1000,
          },
          (data) => {
            if (isEmpty(data)) return
            this.refs.topi._update(data)
            this.lastTime = getLastTime(data.indexValue)
            // chart.series[0].setData(data.indexValue, true)
            addPoints(data.indexValue, chart.series[0])
            chart.redraw()
          },
        )
        this.update()
      }, this.duration)
    } catch (e) {
      // Toast.error(e.message)
    }
  };

  handleChange = (selected) => {
    this.setState({ selected, period: selected }, () => {
      this.query()
    })
  };

  render() {
    const { data } = this.props
    const { selected } = this.state
    const options = {
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
        showLastLabel: true,
        tickPixelInterval: 75,
        labels: {
          step: 1,
        },
      },
      yAxis: [
        {
          type: 'linear',
          opposite: false,
          allowDecimals: false, // 是否在坐标轴标签中显示小数
          tickPixelInterval: 50,
          labels: {
            enabled: true,
          },
        },
      ],
      series: [
        {
          name: 'BVIX',
          data: pointsFormat(data.indexValue),
          threshold: null,
          yAxis: 0,
          lineColor: theme.indexTheme,
          color: theme.indexTheme,
          type: 'area',
        },
      ],
      rangeSelector: {
        selected,
        ...rangeSelector({
          handle: this.handleChange,
        }),
      },
    }

    this.lastTime = getLastTime(data.indexValue)

    return (
      <Wrapper style={{ marginTop: '20px' }}>
        <Topi
          ref="topi"
          data={data}
          title={(
            <I18n
              en="Bitcoin Volatility Index (BVIX)"
              zh="比特币波动率指数（BVIX)"
              ko="비트코인 변동성지수 (BVIX)"
            />
          )}
        />
        <div style={{ height: '500px' }}>
          <ReactHighstock ref="chart" config={options} />
        </div>
        <SlideUp title={<I18n id="指数介绍" />}>
          <DescTitle>
            <I18n id="关于BVIX" />
          </DescTitle>
          <Grid container spacing={24}>
            <Grid {...GridItemProps}>
              <Desc>
                <I18n
                  en={(
                    <span>


                      The world’s first forward-looking Bitcoin Volatility Index
                      (BVIX) developed by DPRating. BVIX measures the 30-day
                      expected implied volatilities derived from Bitcoin
                      options. BVIX is implemented in the same way
                      {' '}
                      <A
                        target="_blank"
                        href="https://en.wikipedia.org/wiki/VIX"
                      >


                        CBOE Volatility Index (VIX)
                      </A>
                      {' is calculated."'}
                      {' Options data is from Deribit.com'}
                    </span>
                  )}
                  zh="本网页显示的是由DPRating团队开发的全球首个前瞻性的比特币波动率指数BVIX。BVIX衡量的是比特币未来30天的预期波动率，指数越高说明投资者认为未来币价波动越大。目前网上可以找到的比特币波动率均取自历史价格，而BVIX是从期权交易价格中提取出来的，由于期权在未来到期，因此与其他波动率相比，BVIX可以更好的估计未来，并且还具有可以实时更新的优势。期权数据来自Deribit。"
                  ko="본 페이지는 DPRating 팀에서 개발한 세계 최초의 예측성 비트코인 변동성지수 BVIX입니다. BVIX는 비트코인의 향후 30 일간의 예상 변동성을 측정하며 지수가 높을수록 투자자들이 미래의 통화가격의 변동이 더욱 클 것이라고 판단하고 있다는 것을 의미합니다. 현재 온라인에서 검색 가능한 비트코인 변동성은 모두 역사가격을 취한 것이며 BVIX는 옵션 거래 가격에서 추출되었습니다. 옵션은 미래에 만료되기에 다른 변동성과 비교하였을 때 BVIX는 미래를 더 잘 예측할 수 있으며 또한 실시간으로 업데이트할 수 있는 우세를 갖고 있습니다. 옵션 데이터는 Deribit에서 제공됩니다."
                />
              </Desc>
            </Grid>
            <Grid {...GridItemProps}>
              <Desc>
                <I18n
                  en={(
                    <span>


                      Mathematical adjustments were applied to reflect the
                      unique features of Bitcoin. BVIX reflects investors’
                      general sentiment and uncertainties on future price
                      volatility. Hence, it is also referred as the Bitcoin fear
                      index. BVIX introduction document is available
                      {' '}
                      <A target="_blank" href={SOURCE_URL.BVIXEn}>


                        here
                      </A>


                      .
                    </span>
                  )}
                  zh={(
                    <span>


                      该指数参考了
                      <A
                        target="_blank"
                        href="https://wiki.mbalib.com/wiki/%E6%B3%A2%E5%8A%A8%E7%8E%87%E6%8C%87%E6%95%B0"
                      >


                        芝加哥期权交易所VIX指数
                      </A>


                      的编制方法，并根据比特币市场的特点做了针对性调整。由于BVIX反映了投资者对未来比特币价格波动幅度的预估，因此也可以称为比特币恐慌指数。BVIX的介绍文章可以在
                      <A target="_blank" href={SOURCE_URL.BVIX}>


                        这里
                      </A>


                      下载。
                    </span>
                  )}
                  ko={(
                    <span>
해당 지수는
                      <A
                        target="_blank"
                        href="https://wiki.mbalib.com/wiki/%E6%B3%A2%E5%8A%A8%E7%8E%87%E6%8C%87%E6%95%B0"
                      >

                          시카고 옵션 거래소의 Vixen
                      </A>

                      작성방법을 참조하였으며 비트코인 시장의 특성에 초점을 맞추어 조정하였습니다. BVIX는 미래의 비트코인 가격 변동 폭에 대한 투자자의 추정치를 반영하기 때문에 비트코인공황지수라 부를 수도 있습니다. BVIX에 대한 소개는
                      <A target="_blank" href={SOURCE_URL.BVIX}>

                      여기에
                      </A>

                      서 다운로드할 수 있습니다.
                    </span>
                  )}
                />
              </Desc>
            </Grid>
          </Grid>
        </SlideUp>
      </Wrapper>
    )
  }
}

export default BVIX
