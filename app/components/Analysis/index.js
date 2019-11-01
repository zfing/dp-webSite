import React from 'react'
import styled from 'styled-components'
import request from 'helpers/request'
import api from 'utils/api'
import Title from './Title'
import List from './List'

const ListWrapper = styled.div`
  //min-height: 200px;
`
const TableList = styled.table`
  font-size: 12px;
  width: 100%; 
  padding:10px 20px;
   tr>td{
   padding: 5px 0;
    &:nth-child(1){
    width: 40%;
    }
    &:nth-child(2){
    width: 40%;
    }
    &:nth-child(3){
    width: 20%;
    }  
  }
`
class AnalysisList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataList: null,
    }
  }

  async componentDidMount() {
    let analysisList
    const analysisData = await request(api.getLatestAnalysisListV2)
    if (analysisData.resultCode === '0') {
      analysisList = analysisData.data
    }
    this.setState({
      dataList: analysisList,
    })
  }

  render() {
    // 最新分析列表数据
    const data = this.state.dataList
    return (
      <ListWrapper>
        <Title />
        <TableList>
          <tbody>
            {data && data.map((item, key) => <List key={key} data={item} />)}
          </tbody>
        </TableList>
      </ListWrapper>
    )
  }
}
export default AnalysisList
