import React from 'react'
import styled from 'styled-components'
import request from 'helpers/request'
import I18n from 'helpers/I18n'
import api from 'utils/api'
import Link from 'components/Link'
import IconImage from 'components/IconImage'
import './index.scss'

const Icon = styled(IconImage)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`

class Menu extends React.PureComponent {
  state = {
    coinList: [],
  }

  async componentDidMount() {
    const coinList = await request(api.getCoinListV2).then(res => res.toArray())
    this.setState({ coinList })
  }

  render() {
    const { coinList } = this.state
    return (
      <div className="CN-header-menus">
        <h3><I18n id="请选择币种" /></h3>
        <ul>
          {coinList.map((i, k) => (
            <Link
              key={k}
              href={`/analysis/list/${i.id}?opened=opened`}
              passHref
            >
              <li>
                <Icon src={i.logoUrl} />
                {i.projectSymbol}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default Menu
