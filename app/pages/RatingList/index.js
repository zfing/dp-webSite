import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Table from './Table'
import {
  makeSelectRatingList,
  makeSelectPageInfo,
  makeSelectInLoading,
} from './selectors'
import Actions from './redux'

class RatingList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: props.params || {}, // 用于条件查询
    }
  }

  componentDidMount() {
    this.query(this.state.payload)
  }

  loadMore = () => {
    this.props.query({
      ...this.state.payload,
      currentPage: this.props.pageInfo.currentPage + 1,
    })
  };

  query = (payload) => {
    this.setState({ payload }, () => {
      this.props.query({
        ...payload,
        currentPage: 1,
      })
    })
  };

  render() {
    const {
      ratingList, pageInfo, inLoading,
    } = this.props

    return (
      <Table
        list={Array(...ratingList).map(_ => typeof _.toJS === 'function' ? _.toJS() : _)}
        loadMore={this.loadMore}
        pageInfo={pageInfo}
        inLoading={inLoading}
        query={this.query}
      />
    )
  }
}

RatingList.propTypes = {
  ratingList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  query: PropTypes.func.isRequired,
  inLoading: PropTypes.bool,
  pageInfo: PropTypes.object,
  params: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  ratingList: makeSelectRatingList(),
  pageInfo: makeSelectPageInfo(),
  inLoading: makeSelectInLoading(),
})

const mapDispatchToProps = dispatch => ({
  query: payload => dispatch(Actions.getRatingListRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingList)
