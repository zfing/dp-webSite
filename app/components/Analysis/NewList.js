import React from 'react'
import styled from 'styled-components'
import request from 'helpers/request'
import { getLevelTextFromValue } from 'helpers/exc'
import I18n, { Trans } from 'helpers/I18n'
import api from 'utils/api'
import moment from 'moment'
import IconImage from 'components/IconImage'
import Link from 'components/Link'
import A from 'components/A'
import CardListTitle from './CardListTitle'

const TitleBox = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #242B38;
    margin-left: 10px;
  }
`

const Icon = styled(IconImage)`
  height: 24px;
  width: 24px;
`

const Table = styled.table`
  width: 100%; 
  padding: 12px 20px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: rgba(38,38,38,0.40);

  tr {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    td {
      padding: 8px 0;
    }
  }
`

class NewList extends React.PureComponent {
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
    request(api.getLatestAnalysisListV2)
      .then(res => res.toArray())
      .then((list) => {
        this.setState({ list })
      })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <CardListTitle>
          <h3><I18n id="最新分析" /></h3>
          <Link href="/analysis/list/all" passHref><A><I18n id="所有" /></A></Link>
        </CardListTitle>
        <Table>
          <tbody>
            {list.map((item, k) => (
              <Link key={k} href={`/article/${item.id}`}>
                <tr>
                  <td>
                    <TitleBox>
                      <Icon src={item.logoUrl} />
                      <span>{item.projectName}</span>
                    </TitleBox>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {moment(item.gmtCreate).format('YYYY-MM-DD')}
                  </td>
                  <td style={{ color: 'rgba(38,38,38,.4)', textAlign: 'right', fontSize: 13 }}>
                    {Trans(getLevelTextFromValue(item.point))}
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default NewList
