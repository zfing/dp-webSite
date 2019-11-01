import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import Container from 'components/Container'
import AnalysisNewList from 'components/Analysis/NewList'
import HotBrokeList from 'components/Analysis/HotBrokeList'
import HotTagList from 'components/Analysis/HotTagList'
import Detail from 'components/Article/Detail'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import ArticleComment from 'components/Comment/ArticleComment'
import request from 'helpers/request'
import api from 'utils/api'
import Head from 'helpers/Head'
import I18n, { Trans } from 'helpers/I18n'
import dynamic from 'next/dynamic'
import FloatMenu from 'components/FloatMenu'
import Router from 'helpers/router'
import redirect from 'helpers/redirect'
import { setUUID, getUUID } from 'helpers/auth'
import isEmpty from 'lodash/isEmpty'
import Bread from 'components/Bread'
import get from 'lodash/get'
import md5 from 'blueimp-md5'
import './index.scss'

function getClientIP(req) {
  try {
    return req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress
  } catch (e) {
    return ''
  }
}

function generateUUID(req) {
  try {
    const headers = get(req, 'headers') || {}
    const a = headers['accept-encoding'] || ''
    const b = headers['cache-control'] || ''
    const c = headers['upgrade-insecure-requests'] || ''
    const d = headers['user-agent'] || ''
    const e = headers.accept || ''
    const f = headers['accept-encoding'] || ''
    const g = headers['accept-language'] || ''
    const uuid = md5(`${a}${b}${c}${d}${e}${f}${g}`)
    return `${uuid}${getClientIP(req)}`
  } catch (e) {
    return getClientIP(req)
  }
}

const WXshare = dynamic({
  loader: () => import('components/WXshare'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

class Article extends React.PureComponent {
  static async getInitialProps({
    query: { id }, token, ...ctx
  }) {
    const uuid = getUUID(ctx) || generateUUID(ctx.req)
    const article = await request(api.getArticleDetailV2, {
      id,
      ip: uuid,
    }, {
      headers: {
        userToken: token,
      },
    })
      .then(res => res.toJson())

    if (isEmpty(article)) return redirect('/404', ctx)

    const isAnos = Number(article.sourceType) === 7

    let brokeHotList = []
    if (isAnos) {
      brokeHotList = await request(api.getArticleListV2, {
        type: 3,
        sourceType: 7,
        pageSize: 15,
        currentPage: 1,
      })
        .then(res => res.toPage())
        .then(data => data.list)
    }

    const projectDetail = await request(api.getProjectByIdV2, { id: article.sourceId }).then(res => res.toJson())

    return {
      uuid,
      isAnos,
      article,
      id: Number(id),
      projectDetail,
      brokeHotList,
    }
  }

  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setUUID(this.props.uuid)
  }

  getText = (input) => {
    input = input || ''
    return input.replace(/<\/?.+?\/?>/g, '')
  }

  posted = (isAnos) => {
    const { article } = this.props
    this.context.verifyLogin(() => {
      Router.push(isAnos ? '/broke?opened=opened' : `/analysis/list/${article.sourceId}?opened=opened`)
    })
  }

  render() {
    const {
      article, id, inLogin, projectDetail, isAnos, brokeHotList,
    } = this.props
    return <>
      <Head name="articleDetail" values={{ xxx1: article.title }} />
      <Bread
        className="section m-t-20"
        menus={[{
          title: Trans({ id: '首页' }),
          href: '/',
        }, {
          title: isAnos
            ? Trans({ id: '爆料' })
            : `${projectDetail.projectSymbol} ${Trans({ id: '行情分析' })}`,
          href: isAnos
            ? '/broke'
            : `/analysis/project/${article.sourceId}`,
        }, {
          title: Trans({ id: '详情' }),
        }]}
      />
      <AutoLeftStaticRight
        className="section m-t-20"
        certain={320}
        spacing={20}
      >
        <div className="container m-b-20">
          <Detail article={article} inLogin={inLogin} />
          <div style={{ padding: '0 30px' }}>
            <ArticleComment
              params={{ sourceType: 1, sourceId: id }}
              authorId={article.userId}
              isBroke={isAnos}
            />
          </div>
        </div>
        <div className="m-b-20">
          {isAnos ? <HotBrokeList list={brokeHotList} /> : (
            <>
              <Container style={{ marginBottom: '20px' }}>
                <AnalysisNewList />
              </Container>
              <Container style={{ marginBottom: '20px' }}>
                <HotTagList />
              </Container>
            </>
          )}
        </div>
      </AutoLeftStaticRight>

      <WXshare
        title={`【${isAnos ? '爆料' : '行情分析'}】${article.title} | 大炮评级（DPRating）`}
        description={this.getText(article.content).substr(0, 30)}
        image={isAnos ? 'https://www.dprating.com/static/img/ano3.png' : null}
      />
      <FloatMenu
        render={Item => (
          [
            <Item key="item-1" active onClick={() => this.posted(isAnos)}>
              <i className="iconfont icon-write" />
              <div><I18n id="发表" /></div>
            </Item>,
          ]
        )}
      />
    </>
  }
}
Article.propTypes = {
  article: PropTypes.object.isRequired,
  id: PropTypes.number,
  inLogin: PropTypes.bool,
  isAnos: PropTypes.bool,
  projectDetail: PropTypes.object,
  brokeHotList: PropTypes.array,
  uuid: PropTypes.string.isRequired,
}
export default defaultPage(Article)
