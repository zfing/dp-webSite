import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Head from 'helpers/Head'
import styled from 'styled-components'
import Section from 'components/Section'

import { createStructuredSelector } from 'reselect'
import defaultPage from 'hocs/defaultPage'
import dynamic from 'next/dynamic'
import { makeSelectDpc, makeSelectBvix } from './selectors'
import Actions from './redux'

const DPC = dynamic({
  loader: () => import('./DPC'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const BVIX = dynamic({
  loader: () => import('./BVIX'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Wrapper = styled(Section)`
  margin-top: 35px;
  margin-bottom: 35px;
`

class Index extends React.PureComponent {
  static getInitialProps({ query: { type } }) {
    return { match: type }
  }

  render() {
    const {
      dpc, getDPC, bvix, getBVIX, updateDPC, updateBVIX,
    } = this.props
    return (
      <>
        <Head name="index" />
        <Wrapper>
          <DPC data={dpc} query={getDPC} update={updateDPC} />
          <BVIX data={bvix} query={getBVIX} update={updateBVIX} />
        </Wrapper>
      </>
    )
  }
}

Index.propTypes = {
  dpc: PropTypes.object.isRequired,
  getDPC: PropTypes.func.isRequired,
  bvix: PropTypes.object.isRequired,
  getBVIX: PropTypes.func.isRequired,
  updateDPC: PropTypes.func.isRequired,
  updateBVIX: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  dpc: makeSelectDpc(),
  bvix: makeSelectBvix(),
})

const mapDispatchToProps = dispatch => ({
  getDPC: payload => dispatch(Actions.getDpcRequest(payload)),
  getBVIX: payload => dispatch(Actions.getBvixRequest(payload)),
  updateDPC: (payload, callback) => dispatch(Actions.updateDpc(payload, callback)),
  updateBVIX: (payload, callback) => dispatch(Actions.updateBvix(payload, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(defaultPage(Index))
