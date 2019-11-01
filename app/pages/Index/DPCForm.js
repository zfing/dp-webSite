import React from 'react'
import styled from 'styled-components'
import theme from 'utils/theme'
import Grid from '@material-ui/core/Grid'
import I18n from 'helpers/I18n'

const Thead = styled.thead`
  background: ${theme.default};
  font-size: 14px;
  color: white;
  border-collapse: separate;

  th {
    font-weight: inherit;
    height: 48px;
    text-align: left;
    padding-left: 15px;
  }
`

const Tbody = styled.tbody`
  tr {
    &:nth-child(2n) {
      background: #f5f9fa;
    }

    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0, 28, 75, 0.6);
    letter-spacing: 0.05px;

    td {
      padding: 15px;

      &:first-child {
        font-weight: bold;
        color: ${theme.indexTxt};
      }

      .item {
        span:first-child {
          font-weight: bold;
          color: ${theme.indexTxt};
        }

        span:last-child {
          float: right;
        }
      }
    }
  }
`

const GridItemProps = {
  item: true,
  lg: 4,
  md: 6,
  sm: 6,
  xs: 12,
}

function DPCForm() {
  const list1 = [
    { name: 'BTC', value: '37.65%' },
    { name: 'BCH', value: '3.00%' },
    { name: 'LTC', value: '1.00%' },
    { name: 'XMR', value: '0.58%' },
    { name: 'DASH', value: '0.46%' },
  ]

  const list2 = [
    { name: 'ETH', value: '14.99%' },
    { name: 'EOS', value: '3.36%' },
    { name: 'ADA', value: '1.34%' },
    { name: 'NEO', value: '0.70%' },
    { name: 'QTUM', value: '0.23%' },
  ]

  const list3 = [
    { name: 'XRP', value: '15.02%' },
    { name: 'XLM', value: '3.61%' },
    { name: 'BNB', value: '0.88%' },
    { name: 'OMG', value: '0.32%' },
    { name: 'BTS', value: '0.18%' },
  ]

  const list4 = [
    { name: 'MIOTA', value: '2.78%' },
    { name: 'XEM', value: '1.98%' },
    { name: 'VET', value: '1.07%' },
    { name: 'ONT', value: '0.71%' },
    { name: 'ICX', value: '0.50%' },
  ]

  const list5 = [
    { name: 'ZRX', value: '1.26%' },
    { name: 'LSK', value: '1.05%' },
    { name: 'SC', value: '0.75%' },
    { name: 'GNT', value: '0.52%' },
    { name: 'STRAT', value: '0.47%' },
  ]

  const list6 = [
    { name: 'TRX', value: '3.75%' },
    { name: 'BAT', value: '0.72%' },
    { name: 'STEEM', value: '0.53%' },
    { name: 'SNT', value: '0.32%' },
    { name: 'MITH', value: '0.27%' },
  ]

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderColor: ' #DFDFDF',
      }}
    >
      <Thead>
        <tr>
          <th>
            <I18n id="分类" />
          </th>
          <th>
            <I18n id="权重" />
          </th>
          <th>
            <I18n id="成分和权重" />
          </th>
        </tr>
      </Thead>
      <Tbody>
        <tr>
          <td>
            <I18n id="纯货币" />
          </td>
          <td>42.69%</td>
          <td>
            <Grid container spacing={8}>
              {list1.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
        <tr>
          <td>
            <I18n id="底层链" />
          </td>
          <td>20.62%</td>
          <td>
            <Grid container spacing={8}>
              {list2.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
        <tr>
          <td>
            <I18n id="交易类" />
          </td>
          <td>20.01%</td>
          <td>
            <Grid container spacing={8}>
              {list3.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
        <tr>
          <td>
            <I18n id="资产上链" />
          </td>
          <td>7.04%</td>
          <td>
            <Grid container spacing={8}>
              {list4.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
        <tr>
          <td>
            <I18n id="解决方案" />
          </td>
          <td>4.06%</td>
          <td>
            <Grid container spacing={8}>
              {list5.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
        <tr>
          <td>
            <I18n id="其它" />
          </td>
          <td>5.58%</td>
          <td>
            <Grid container spacing={8}>
              {list6.map((item, key) => (
                <Grid className="item" {...GridItemProps} key={key}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </Grid>
              ))}
            </Grid>
          </td>
        </tr>
      </Tbody>
    </table>
  )
}

export default DPCForm
