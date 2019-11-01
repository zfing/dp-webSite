import React from 'react'
import UserLayout from 'components/UserLayout'
import securePage from 'hocs/securePage'
import request from 'helpers/request'
import api from 'utils/api'
import Pages from 'components/Pages'
import ListItem1 from 'pages/Analysis/ListItem'
import ListItem2 from 'pages/Broke/ListItem'

const fetch = payload => request(api.getUserArticleListV2, {
  pageSize: 10,
  currentPage: 1,
  ...payload,
}).then(res => res.toPage())

class Article extends React.PureComponent {
  state = {
    pages: null,
  }

  componentDidMount() {
    this.fetch()
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1 })
      .then(pages => append(pages.list, pages.currentPage))
  }

  fetch = async () => {
    const pages = await fetch()
    this.setState({ pages })
  }

  renderItem = (item = {}) => {
    if (item.sourceType === 7) {
      return <ListItem2 data={item} key={item.id} />
    }
    return <ListItem1 data={item} key={item.id} />
  }

  render() {
    const { pages } = this.state
    return (
      <UserLayout currentModel="article">
        {pages && (
          <Pages
            initail={pages.list}
            currentPage={pages.currentPage}
            totalSize={pages.totalSize}
            pageSize={pages.pageSize}
            item={this.renderItem}
            handle={this.handle}
          />
        )}
      </UserLayout>
    )
  }
}

export default securePage(Article)
