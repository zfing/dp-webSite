import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import Head from 'helpers/Head'
import brokeRoute from 'utils/brokeRoute'
import Pages from 'components/Pages'
import Avatar from 'components/Avatar'
import ListItem from 'pages/Broke/ListItem'
import request from 'helpers/request'
import { getLeaksImg, getLeaksName } from 'utils/dict'
import api from 'utils/api'
import I18n from 'helpers/I18n'
import '../index.scss'

const fetch = payload => request(api.getArticleListByUserIdV2, {
  sourceType: 7,
  pageSize: 15,
  currentPage: 1,
  type: 2,
  ...payload,
}).then(res => res.toPage())

class Member extends React.PureComponent {
  static async getInitialProps({ query: { id } }) {
    const UserId = brokeRoute.decode(id)
    const pages = await fetch({ UserId })
    const { user } = await request(api.getUserInfoV2, { UserId }).then(res => res.toJson())

    return {
      pages,
      UserId,
      leaksPoints: user ? Number(user.leaksPoints) : 0,
    }
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1, UserId: this.props.UserId })
      .then(pages => append(pages.list, pages.currentPage))
  }

  render() {
    const { pages, leaksPoints } = this.props
    return (
      <>
        <Head name="broke" />
        <div className="PG-member-hd">
          <div className="main">
            <Avatar size={78} src={getLeaksImg(leaksPoints)} />
            <h4>{getLeaksName(leaksPoints)}</h4>
            <div className="follows">
              <div className="item">
                <span>{pages.totalSize}</span>
                <span><I18n id="爆料" /></span>
              </div>
            </div>
          </div>
        </div>
        <ol className="PG-member-bd container">
          <Pages
            initail={pages.list}
            currentPage={pages.currentPage}
            totalSize={pages.totalSize}
            pageSize={pages.pageSize}
            item={data => <ListItem data={data} key={data.id} hideUserLink />}
            handle={this.handle}
          />
        </ol>
      </>
    )
  }
}

Member.propTypes = {
  UserId: PropTypes.number,
  pages: PropTypes.object,
  leaksPoints: PropTypes.number,
}

export default defaultPage(Member)
