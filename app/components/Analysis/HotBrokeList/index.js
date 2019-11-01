import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'helpers/I18n'
import Link from 'components/Link'
import CardListTitle from '../CardListTitle'
import './index.scss'

function HotBrokeList({ list }) {
  return (
    <div className="CM-broke-hot-list container">
      <CardListTitle>
        <h3><I18n id="热点爆料" /></h3>
        {/* <Link href="/broke">
          <a><I18n id="所有" /></a>
        </Link> */}
      </CardListTitle>
      <ul>
        {list.map((item, k) => (
          <Link key={k} href={`/article/${item.id}`}>
            <a title={item.title} target="_blank">
              <li>{item.title}</li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  )
}

HotBrokeList.defaultProps = {
  list: [],
}

HotBrokeList.propTypes = {
  list: PropTypes.array,
}

export default HotBrokeList
