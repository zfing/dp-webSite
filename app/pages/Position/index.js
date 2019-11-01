import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Head from 'helpers/Head'
import styled from 'styled-components'
import Section from 'components/Section'
import I18n from 'helpers/I18n'
import { createStructuredSelector } from 'reselect'
import defaultPage from 'hocs/defaultPage'
import dynamic from 'next/dynamic'
import { makeSelectBitmex, makeSelectBitfinex } from './selectors'
import Actions from './redux'
import Tab from './Tab'

const BitmexBtc = dynamic({
  loader: () => import('./BitmexBtc'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const BitmexEth = dynamic({
  loader: () => import('./BitmexEth'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})


const Bitfinex = dynamic({
  loader: () => import('./Bitfinex'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Wrapper = styled(Section)`
  margin-top: 35px;
  margin-bottom: 35px;
`

class Position extends React.PureComponent {
  render() {
    const {
      bitmex, getBitmex, bitfinex, getBitfinex,
    } = this.props
    return (
      <>
        <Head name="index" />
        <Wrapper>
          <Tab>
            <div name={<I18n en="Bitmex Open Interest(BTC)" zh="Bitmex未平仓量(BTC)" ko="Bitmex 미결제약정 (BTC)" />}>
              <BitmexBtc data={Array(...bitmex)} query={() => getBitmex({ category: 1 })} />
            </div>
            <div name={<I18n en="Bitmex Open Interest(ETH)" zh="Bitmex未平仓量(ETH)" ko="Bitmex 미결제약정 (ETH)" />}>
              <BitmexEth data={Array(...bitmex)} query={() => getBitmex({ category: 2 })} />
            </div>
            <div name={<I18n en="Bitfinex Funding Data" zh="Bitfinex融资数据" ko="Bitfinex 파이낸싱 데이터" />}>
              <Bitfinex data={Array(...bitfinex)} query={getBitfinex} />
            </div>
          </Tab>
        </Wrapper>
      </>
    )
  }
}

Position.propTypes = {
  bitmex: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bitfinex: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  getBitmex: PropTypes.func.isRequired,
  getBitfinex: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  bitmex: makeSelectBitmex(),
  bitfinex: makeSelectBitfinex(),
})

const mapDispatchToProps = dispatch => ({
  getBitmex: payload => dispatch(Actions.getBitmexRequest(payload)),
  getBitfinex: payload => dispatch(Actions.getBitfinexRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(defaultPage(Position))
