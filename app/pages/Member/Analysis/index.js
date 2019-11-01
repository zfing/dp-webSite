import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import Head from 'helpers/Head'
import Pages from 'components/Pages'
import Avatar from 'components/Avatar'
import TagName from 'components/Analysis/TagName'
import ListItem from 'pages/Analysis/ListItem'
import request from 'helpers/request'
import api from 'utils/api'
import I18n from 'helpers/I18n'
import '../index.scss'

const fetch = payload => request(api.getArticleListByUserIdV2, {
  sourceType: 1,
  pageSize: 15,
  currentPage: 1,
  type: 2,
  ...payload,
}).then(res => res.toPage())

class Member extends React.PureComponent {
  static async getInitialProps({ query: { id } }) {
    const UserId = Number(id)
    const pages = await fetch({ UserId })

    const { user } = await request(api.getUserInfoV2, { UserId }).then(res => res.toJson())
    return {
      pages,
      UserId,
      user: user || {},

      // nickname,
      // userEmail,
      // userPhone,
    }
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1, UserId: this.props.UserId })
      .then(pages => append(pages.list, pages.currentPage))
  }

  render() {
    const { pages, user } = this.props
    return (
      <>
        <Head name="analysis" />
        <div className="PG-member-hd">
          <div className="main">
            <Avatar size={78} src={user.img_url} />
            <h4>
              <TagName
                tagSize={16}
                name={user.nickname || user.userEmail || user.userPhone}
                points={user.marketsPoints}
              />
            </h4>
            <div className="follows">
              <div className="item">
                <span>{pages.totalSize}</span>
                <span><I18n id="行情分析" /></span>
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
  user: PropTypes.object,
}

export default defaultPage(Member)
