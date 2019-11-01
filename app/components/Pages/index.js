import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'helpers/I18n'
import './index.scss'

class Pages extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: props.initail || [],
      currentPage: props.currentPage,
      totalSize: props.totalSize,
    }
  }

  reset = ({ list = [], totalSize = 0, currentPage = 1 }) => {
    this.setState({ list, totalSize, currentPage })
  }

  _append = (list, currentPage) => {
    this.setState({
      currentPage,
      list: [...this.state.list, ...list],
    })
  }

  render() {
    const { list, currentPage, totalSize } = this.state
    const {
      item, pageSize, handle,
    } = this.props
    const loadMore = currentPage * pageSize < totalSize
    return (
      <>
        {list.map(item)}
        <div
          className="CM-pages-more"
          onClick={() => loadMore ? handle(this._append, currentPage) : null}
        >
          {loadMore ? <I18n id="加载更多" /> : <I18n id="暂无" />}
        </div>
      </>
    )
  }
}

Pages.defaultProps = {
  initail: [],
  currentPage: 1,
  pageSize: 10,
}

Pages.propTypes = {
  item: PropTypes.func.isRequired,
  initail: PropTypes.array,
  handle: PropTypes.func,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalSize: PropTypes.number,
}

export default Pages
