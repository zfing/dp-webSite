import React from 'react'
import styled from 'styled-components'
import I18n from 'helpers/I18n'
// import RosePie from './RosePie';
// import DimensionBar from './DimensionBar';
import dynamic from 'next/dynamic'
import { handleNA } from './utils'

const RosePie = dynamic({
  loader: () => import('./RosePie'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Wrapper = styled.div`
  display: flex;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`

const RosePieWrapper = styled.div`
  margin-left: 40px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const CircleSize = 48

const TotalScore = styled.div`
  height: ${CircleSize}px;
  width: ${CircleSize}px;
  border-radius: 50%;
  color: #35B5CD;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: ${-CircleSize / 2}px;
  margin-top: ${-CircleSize / 2}px;
  text-align: center;
  line-height: ${CircleSize}px;
  font-size: ${CircleSize / 2}px;
  font-family: PingFangSC-Medium;
`

// const BarWrapper = styled.div`
//   margin-left: 40px;
//   min-width: 200px;
// `;

const UITable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  line-height: 20px;
  color: #333333;
  letter-spacing: 0.06px;
  
  th, td {
    padding: 14px 10px;
  }

  thead {
    tr {
      word-break: keep-all;
      text-align: left;
      font-family: PingFangSC-Medium;
      color: #DAE9F1;
      letter-spacing: 0.06px;

      th {
        background: #004785;
        max-height: 48px;
      }
    }
  }

  tbody {
    tr {
      &:nth-child(2n) {
        background: #F5F9FA;
      }
    }
  }
`

const getTotalAnScore = (data) => {
  let total = 0


  let score = 0
  for (let i = 0; i < data.length; i++) {
    total += data[i].totalScore
    score += handleNA(data[i].score).value
  }
  return {
    total,
    score,
  }
}

const convrt2pie = (data, total) => {
  const output = {
    data: [],
    outData: [], // 外圈
  }
  for (let i = 0; i < data.length; i++) {
    // 各子维度的总分占比
    const percent = data[i].totalScore / total * 100
    // 子维度得分
    const value = data[i].score > 0 ? data[i].score : 0
    // 得分占子维度的占比
    const inPercent = value / data[i].totalScore * 100

    output.data.push({
      ...data[i],
      value: Number(inPercent.toFixed(2)),
    })
    output.outData.push({
      ...data[i],
      total,
      value: Number(percent.toFixed(2)),
    })
  }
  return output
}

// const convrt2bar = (data) => {
//   let output = {
//     data: [],
//     dataShadow: [],
//     dataTitle: [],
//   };

//   for (let i = 0; i < data.length; i++) {
//     output.data.push({
//       ...data[i],
//       value: data[i].score,
//     })
//     output.dataShadow.push({
//       ...data[i],
//       value: data[i].totalScore,
//     })
//     output.dataTitle.push(data[i].title)
//   }

//   return output;
// }

const kofix = (input = '') => {
  const langs = {
    定位: '포지션',
    竞品对比: '경쟁제품 포지션',
    项目必要性分析: '프로젝트 필요성 분석',
    执行团队: '집행팀',
    投资人及顾问: '투자자 및 컨설턴트',
    投资机构: '투자기관',
    社交媒体及指数搜索: '소셜 미디어 및 검색지수',
    社群: '커뮤니티',
    PR活动: 'PR 활동',
    履约: '약속 이행',
    代码审计: '코드감사',
    进度: '진척',
  }

  return langs[input] || input
}

export default function SummaryTable({ data = [] }) {
  const { total, score } = getTotalAnScore(data)
  const pieProps = convrt2pie(data, total)
  // const barProps = convrt2bar(data);
  return (
    <Wrapper>
      <div style={{ flex: 1 }}>
        <UITable>
          <thead>
            <tr>
              <th><I18n en="Dimension" zh="维度" ko="차원" /></th>
              <th><I18n en="Details" zh="判定" ko="판정" /></th>
              <th><I18n en="Total Points" zh="总分" ko="총점" /></th>
              <th><I18n en="Points" zh="实得" ko="득점" /></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => (
              <tr key={key}>
                <td><I18n en={item.name} zh={item.title} ko={kofix(item.title)} /></td>
                <td>{item.judgement}</td>
                <td>{item.totalScore}</td>
                <td>{handleNA(item.score).name}</td>
              </tr>
            ))}
          </tbody>
        </UITable>
      </div>
      <RosePieWrapper>
        <RosePie {...pieProps} />
        <TotalScore>{score}</TotalScore>
      </RosePieWrapper>
      {/* <BarWrapper><DimensionBar {...barProps}/></BarWrapper> */}
    </Wrapper>
  )
}
