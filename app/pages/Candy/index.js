import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import 'isomorphic-unfetch'
import './index.scss'

function origin(req) {
  return req
    ? `http://${req.headers.host}`
    : window.location.origin
}

class Candy extends React.PureComponent {
  static async getInitialProps({ query: { id }, ...ctx }) {
    const isListPage = !id
    let list = []
    let detail = ''

    if (isListPage) {
      const res = await fetch(`${origin(ctx.req)}/static/json/CandyList.json`)
      if (res.status === 200) {
        list = await res.json()
      }
    } else {
      const res = await fetch(`${origin(ctx.req)}/static/json/CandyDetail-${id}.txt`)
      if (res.status === 200) {
        detail = await res.text()
      }
    }

    return {
      isListPage,
      list,
      detail,
    }
  }

  render() {
    const { isListPage, list, detail } = this.props
    return isListPage ? (
      <div className="PG-candy-list">
        <div className="section">
          <ul>
            {list.map((_, key) => (
              <a
                key={key}
                href={_.outsite || `/candy/${_.id}`}
                className={_.expired ? 'expired' : ''}
              >
                <li className="container">
                  <img alt={_.title} src={_.img} />
                  <h2>{_.title}</h2>
                  <p>{_.desc}</p>
                </li>

                <img alt="expired" className="PG-candy-expired" src="/static/img/expired.svg" />
              </a>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="PG-candy">
        <div className="section">
          <div
            dangerouslySetInnerHTML={{
              __html: detail,
            }}
          />
        </div>
      </div>
    )
  }
}

Candy.propTypes = {
  isListPage: PropTypes.bool,
  list: PropTypes.array,
  detail: PropTypes.string,
}

export default defaultPage(Candy)
