import React from 'react'
import styled from 'styled-components'
import request from 'helpers/request'
import I18n from 'helpers/I18n'
import api from 'utils/api'
import Link from 'components/Link'
import CardListTitle from './CardListTitle'

const Content = styled.div`
  padding: 20px 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
`

const Tag = styled.span`
  height: 28px;
  line-height: 28px;
  display: inline-block;
  font-size: 14px;
  color: #b1b1b1;
  border-radius: 14px;
  border: 1px solid #e0e0e0;
  padding: 0 15px;
  margin-right: 15px;
  margin-bottom:20px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

class HotTagList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    request(api.getHottestListV2)
      .then(res => res.toArray())
      .then((list) => {
        this.setState({ list })
      })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <CardListTitle><h3><I18n id="热门币种分析" /></h3></CardListTitle>
        <Content>
          {list.map((item, key) => (
            <Link href={`/analysis/list/${item.id}`} passHref key={key}>
              <Tag><I18n zh={item.projectName} en={item.projectNameEn} ko={item.projectNameEn} /></Tag>
            </Link>
          ))}
        </Content>
      </div>
    )
  }
}

export default HotTagList
