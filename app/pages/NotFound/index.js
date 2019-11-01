import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class NotFound extends React.Component {
  static getInitialProps({ res, err }) {
    // eslint-disable-next-line
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <div className="nf">
        <h4>您访问的页面不见了</h4>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <h5><a href="/" title="DPRating">去首页</a></h5>
      </div>
    )
  }
}


NotFound.propTypes = {
  statusCode: PropTypes.any,
}

export default NotFound
