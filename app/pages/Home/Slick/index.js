import React from 'react'
import PropTypes from 'prop-types'
import ReactSlick from 'components/ReactSlick'
import './index.scss'

/**
 * 处理必须5个
 */
function reduceList(list) {
  if (list.length < 5) {
    return reduceList(list.concat(list))
  }
  return list
}

class RatingSlick extends React.PureComponent {
  prev = () => {
    this.refs.slick.slickPrev()
  }

  next = () => {
    this.refs.slick.slickNext()
  }

  render() {
    const { title, list, renderItem } = this.props
    return (
      <>
        <div className="slick-hd">
          <h3>{title}</h3>
          <span>
            <i className="iconfont icon-return" onClick={this.prev} />
            <i className="iconfont icon-enter" onClick={this.next} />
          </span>
        </div>
        <div style={{ height: '160px', overflow: 'hidden', padding: '15px 0' }}>
          {list.length ? (
            <ReactSlick swipe={false} ref="slick" variableWidth arrows={false}>
              {reduceList(list).map((item, key) => renderItem(item, key))}
            </ReactSlick>
          ) : null}
        </div>
      </>
    )
  }
}

RatingSlick.propTypes = {
  title: PropTypes.node.isRequired,
  list: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
}

export default RatingSlick
