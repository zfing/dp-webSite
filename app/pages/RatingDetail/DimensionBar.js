import React from 'react'
import styled from 'styled-components'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/bar'

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
`

export default function ({
  data, dataShadow, dataTitle, ...props
}) {
  return (
    <Wrapper>
      <ReactEchartsCore
        style={{ height: '200px' }}
        option={{
          xAxis: {
            type: 'category',
            data: dataTitle,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            z: 10,
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          dataZoom: [
            {
              type: 'inside',
            },
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: { color: 'rgba(0,0,0,0.05)' },
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false,
            },
            {
              type: 'bar',
              name: 'x',
              data,
              label: {
                normal: {
                  show: true,
                  rotate: 90,
                  fontSize: 12,
                  rich: {
                    name: {
                      textBorderColor: '#fff',
                    },
                  },
                  formatter: ({ data: dataItem }) => dataItem
                    ? `${dataItem.title}: ${dataItem.score}/${dataItem.totalScore}`
                    : '',
                },
              },
            },
          ],
        }}
        echarts={echarts}
        {...props}
      />
    </Wrapper>
  )
}
