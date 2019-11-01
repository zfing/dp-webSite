import React from 'react'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

function computed(columns) {
  return columns.reduce((total, dataItem) => {
    let width = get(dataItem, 'width')
    if (typeof width === 'string') {
      width = Number(width.replace(/px/g, ''))
    } else if (typeof width !== 'number') {
      width = 0
    }
    return total + width
  }, 0)
}

class Table extends React.PureComponent {
  render() {
    const {
      columns, dataSource, className, onRow,
    } = this.props
    const minWidth = `${computed(columns)}px`
    return (
      <div className={classnames({ 'pure-table': true }, className)}>
        <ol className="pure-table-hd" style={{ minWidth }}>
          {columns.map(({ title, width }, key) => (
            <li key={key} style={{ width }}>{title}</li>
          ))}
        </ol>
        {dataSource.map((record, key) => {
          const Child = (
            <ul key={key} className="pure-table-it" style={{ minWidth }}>
              {columns.map(({ render, width }, k) => (
                <li key={k} style={{ width }}>{render(record)}</li>
              ))}
            </ul>
          )
          return typeof onRow === 'function'
            ? onRow(Child, record)
            : Child
        })}
      </div>
    )
  }
}

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onRow: PropTypes.func,
}

export default Table
