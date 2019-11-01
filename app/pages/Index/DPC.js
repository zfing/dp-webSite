import React from 'react'
import styled from 'styled-components'
import ReactHighstock, { rangeSelector } from 'components/ReactHighstock'
import SimpleCheckbox from 'components/SimpleCheckbox'
import SlideUp from 'components/SlideUp'
// import Toast from 'components/Toast'
import I18n from 'helpers/I18n'
import config from 'utils/config'
import isEmpty from 'lodash/isEmpty'
import theme from 'utils/theme'
import Grid from '@material-ui/core/Grid'
import DPCForm from './DPCForm'
import Wrapper from './Wrapper'
import Topi from './Topi'
import Desc from './Desc'
import DescTitle from './DescTitle'
import A from './A'
import {
  pointsFormat, addPoints, getLastTime,
} from './utils'

const { SOURCE_URL } = config

const ToolWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 12px;
  font-size: 12px;
  left: calc(150px + 20%);
`

const Checkbox = styled(SimpleCheckbox)`
  display: inline-block;
  margin-left: 20px;
`

const GridItemProps = {
  item: true,
  md: 6,
  sm: 12,
}

class DPC extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      period: 0,
      btcSelected: false,
      ethSelected: false,
    }
    this.timer = null
    this.duration = 1000 * 60 * 5
    this.lastTime = null
  }

  componentDidMount() {
    this.query()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value || '' })
    }
  }

  query = () => {
    try {
      this.props.query({
        indexType: 2,
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
            indexType: 2,
            startTime: this.lastTime / 1000,
          },
          (data) => {
            if (isEmpty(data)) return
            this.refs.topi._update(data)
            this.lastTime = getLastTime(data.indexValue)
            if (this.state.btcSelected) {
              // chart.series[1].setData(data.btcPrice, true)
              addPoints(data.btcPrice, chart.series[2])
            }
            if (this.state.ethSelected) {
              // chart.series[2].setData(data.ethPrice, true)
              addPoints(data.ethPrice, chart.series[3])
            }
            // chart.series[0].setData(data.indexValue, true)
            addPoints(data.indexValue, chart.series[0])
            addPoints(data.indexValue, chart.series[1])
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
    const { selected, btcSelected, ethSelected } = this.state
    const options = {
      chart: {
        type: 'line',
        height: '500px',
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
        showLastLabel: true,
        tickPixelInterval: 75,
        labels: {
          step: 1,
        },
      },
      yAxis: [
        // 为处理以第一个点为基准，且X轴坐标显示dpc数据，
        // 创建2个Y轴，第一个显示轴、隐藏线，处理X轴数据
        // 第二个Y轴隐藏、显示线，处理第一个点为基准
        //
        {
          type: 'linear',
          tickAmount: 6, // Y轴刻度线数
          opposite: false,
          allowDecimals: false, // 是否在坐标轴标签中显示小数
          tickPixelInterval: 50,
          labels: {
            enabled: false,
          },
        },
        {
          type: 'linear',
          tickAmount: 6, // Y轴刻度线数
          opposite: false,
          allowDecimals: false, // 是否在坐标轴标签中显示小数
          tickPixelInterval: 50,
          labels: {
            enabled: true,
          },
          gridLineColor: '#EFF1F4',
        },
        // {
        //   type: 'linear',
        //   tickAmount: 6,        // Y轴刻度线数
        //   tickPixelInterval: 50,
        //   labels: {
        //     enabled: false,
        //   },
        // },
        // {
        //   type: 'linear',
        //   tickAmount: 6,        // Y轴刻度线数
        //   tickPixelInterval: 50,
        //   labels: {
        //     enabled: false,
        //   },
        // },
      ],
      series: [
        {
          name: ' ',
          data: pointsFormat(data.indexValue),
          threshold: null,
          yAxis: 1,
          lineColor: theme.indexTheme,
          lineWidth: 0,
          color: theme.indexTheme,
          enableMouseTracking: false, // 不显示 tooltip
        },
        {
          name: 'DPC',
          data: pointsFormat(data.indexValue),
          threshold: null,
          yAxis: 0,
          lineColor: theme.indexTheme,
          color: theme.indexTheme,
          compare: 'percent',
          type: 'area',
        },
        {
          name: 'BTC',
          data: btcSelected ? pointsFormat(data.btcPrice) : [],
          tooltip: {
            valuePrefix: '$',
            valueSuffix: ' USD',
          },
          threshold: null,
          yAxis: 0,
          lineColor: '#F0B75A',
          color: '#F0B75A',
          fillColor: 'transparent',
          compare: 'percent',
        },
        {
          name: 'ETH',
          data: ethSelected ? pointsFormat(data.ethPrice) : [],
          tooltip: {
            valuePrefix: '$',
            valueSuffix: ' USD',
          },
          threshold: null,
          yAxis: 0,
          lineColor: '#9CA3C0',
          color: '#9CA3C0',
          fillColor: 'transparent',
          compare: 'percent',
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
      <Wrapper>
        <Topi
          ref="topi"
          data={data}
          title={
            <I18n id="DP综合市场指数（DPC)" />
          }
        />
        <div style={{ position: 'relative' }}>
          <ToolWrapper>
            <Checkbox
              checked={btcSelected}
              onChange={checked => this.setState({ btcSelected: checked })}
            >


              BTC
            </Checkbox>
            <Checkbox
              checked={ethSelected}
              onChange={checked => this.setState({ ethSelected: checked })}
            >


              ETH
            </Checkbox>
          </ToolWrapper>
          <div style={{ height: '500px' }}>
            <ReactHighstock ref="chart" config={options} />
          </div>
        </div>
        <SlideUp title={<I18n id="指数介绍" />}>
          <Grid container spacing={24}>
            <Grid {...GridItemProps}>
              <DescTitle>
                <I18n id="DP综合市场指数成分" />
              </DescTitle>
              <DPCForm />
            </Grid>
            <Grid {...GridItemProps}>
              <DescTitle>
                <I18n id="DP综合市场指数" />
              </DescTitle>
              <Desc>
                <I18n
                  en={(
                    <span>


                      DP Composite Index (DPC) is a comprehensive cryptocurrency
                      market index developed by DPRating.Index constituents are
                      divided into 6 categories: Currency and Payment, Operating
                      System, Trading and Transaction, Real World Gateway,
                      Technical Solution, Others. The top five tokens by market
                      cap within each category are selected as index
                      constituents. Tokens within each category are weighted by
                      market cap. The weighting between categories is determined
                      by the square root of the total market cap. The dual layer
                      weighting approach assures large cap constituents do not
                      skew the overall index value while preventing the
                      exclusion of small cap categories. This enables DPC index
                      to provide a wholistic representation of crypto asset
                      market. DPC white paper is available
                      {' '}
                      <A target="_blank" href={SOURCE_URL.DPCEn}>


                        here
                      </A>
                      {' '}


                      .
                    </span>
                  )}
                  zh={(
                    <span>


                      DP综合市场指数（DPC），简称DP综合指数，是由DPRating团队编制的综合反映区块链市场行情的指数。所有的币种首先被分为如下六大类：纯货币、底层链、交易类、资产上链、解决方案和其他应用。每个类别市值前五的币种被选为成分币。各类别内部的币按照市值加权，类别之间用总市值平方根作为权重。这种分层权重的编制方法确保了没有任何币种会因为权重过高致使指数失真，也没有任何类别会因市值过低而被指数忽略。这些设计使得DP综合指数能够为投资者全景展现区块链市场行情。DPC技术文档可以在
                      <A target="_blank" href={SOURCE_URL.DPC}>


                        这里
                      </A>


                      下载 。
                    </span>
                  )}
                  ko={(
                    <span>
DP종합시장지수(DPC)는 DP종합지수라 약칭하며 DPRating팀에서 작성해서 블록체인 시장의 시세를 통합적으로 반영하는 지수입니다. 모든 통화는 우선 순수 통화, 기본 체인, 거래 유형, 자산코체인, 솔루션 및 기타 애플리케이션 등 6가지 유형으로 분류됩니다. 각 유형에서 시가 상위 5위의 통화를 성분 통화로 선택합니다. 각 유형 내부의 통화는 시가에 따라 가중하며, 시가 총액의 제곱근을 유형 간의 가중치로 사용합니다. 이런 분층 가중치의 작성방법은 어떠한 통화도 지나치게 높은 가중치로 인해 지수가 왜곡되지 않으며 어떠한 유형도 시가가 너무 낮아 지수에서 무시되지 않도록 보장했습니다. 이런 설계를 통해 DP종합지수는 투자자들에게 블록체인 시장 시세를 파노라마로 선보일 수 있습니다. DPC 기술문서는
                      <A target="_blank" href={SOURCE_URL.DPC}>여기에서</A>

                       다운로드할 수 있습니다.
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

export default DPC
