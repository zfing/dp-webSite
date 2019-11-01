import React from 'react'
import styled from 'styled-components'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'
import { handleNA } from './utils'

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
`

const colors = ['#11A59D', '#008799', '#B44A0A', '#F5A623', '#00C484', '#77787C']
const randomColors = () => colors.sort(() => 0.5 - Math.random())

export default function ({ data: dataSource, outData, ...props }) {
  return (
    <Wrapper>
      <ReactEchartsCore
        style={{ height: '200px' }}
        option={{
          tooltip: {
            trigger: 'item',
            formatter: ({ data }) => data ? `${data.title} ${handleNA(data.score).name} / ${data.totalScore}` : '-',
          },
          color: randomColors(),
          calculable: true,
          series: [{
            name: '得分',
            type: 'pie',
            radius: ['30%', '80%'],
            roseType: 'area',
            label: {
              normal: {
                position: 'inner',
                formatter: ({ data }) => data ? handleNA(data.score).name : '-',
              },
            },
            lableLine: {
              normal: {
                show: false,
              },
              emphasis: {
                show: true,
              },
              formatter: ({ data }) => data ? handleNA(data.score).name : '-',
            },
            data: dataSource,
          }, {
            stillShowZeroSum: true,
            hoverAnimation: false,
            name: '',
            type: 'pie',
            radius: ['90%', '100'],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: outData,
            tooltip: {
              formatter: ({ data }) => data ? `${data.totalScore}/${data.total}(${data.value}%)` : '-',
            },
          }],
        }}
        echarts={echarts}
        {...props}
      />
    </Wrapper>
  )
}
