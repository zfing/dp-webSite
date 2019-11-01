import React from 'react'
import styled from 'styled-components'
import request from 'helpers/request'
import api from 'utils/api'
import A from 'components/A'
import Link from 'components/Link'

const Wrapper = styled.div`
  padding: 20px 20px 0;
  width: 320px;
  box-shadow: none;
  @media (max-width: 1200px) {
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
`
const SignSpan = styled.span`
    height: 28px;
    line-height: 26px;
    display: inline-block;
    font-size: 14px;
    color: #b1b1b1;
    border-radius: 15px;
    text-align: center;
    border: 1px solid #e0e0e0;
    padding: 0 15px;
    margin-right: 15px;
    margin-bottom:20px;
`
class Sign extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataList: null,
    }
  }

  async componentDidMount() {
    let hottestList
    const hottestData = await request(api.getHottestListV2)
    if (hottestData.resultCode === '0') {
      hottestList = hottestData.data
    }
    this.setState({
      dataList: hottestList,
    })
  }

  render() {
    const dataList = this.state.dataList
    return (
      <Link href="#" passHref>
        <A target="_blank">
          <Wrapper>
            { dataList && dataList.map((item, key) => <SignSpan key={key} title={item}>{item}</SignSpan>) }
          </Wrapper>
        </A>
      </Link>
    )
  }
}
export default Sign
