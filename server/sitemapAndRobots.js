const sm = require('sitemap')
const lodash = require('lodash')
const fetch = require('isomorphic-unfetch')

const XMLUrlExtends = []
let HTMLRenders = []
let Ratings = []
let Projects = []
let Brokes = []
let Analysis = []

const API_URL = 'https://api.dapaopingji.com/api'
const API_URL2 = 'https://api.account.dapaopingji.com/api'

const getRatings = () => new Promise((resolve) => {
  fetch(`${API_URL}/rating/getMoreRatingList?pageSize=1000&currentPage=1`)
    .then(res => res.json())
    .then(json => resolve(lodash.get(json, 'data.list') || []))
    .catch(() => resolve([]))
})

// const getProjects = () => new Promise((resolve) => {
//   fetch(`${API_URL}/projectDetail/getHeadProjectList?pageSize=1000&currentPage=1`)
//     .then(res => res.json())
//     .then(json => resolve(lodash.get(json, 'data.list') || []))
//     .catch(() => resolve([]))
// })

const getProjects = () => new Promise((resolve) => {
  fetch(`${API_URL2}/article/coinlist`)
    .then(res => res.json())
    .then(json => resolve(lodash.get(json, 'data') || []))
    .catch(() => resolve([]))
})

const getBrokes = () => new Promise((resolve) => {
  fetch(`${API_URL2}/article/list?pageSize=1000&currentPage=1&type=1&sourceType=7`)
    .then(res => res.json())
    .then(json => resolve(lodash.get(json, 'data.list') || []))
    .catch(() => resolve([]))
})

const getAnalysis = () => new Promise((resolve) => {
  fetch(`${API_URL2}/article/list?pageSize=1000&currentPage=1&type=1&sourceType=1`)
    .then(res => res.json())
    .then(json => resolve(lodash.get(json, 'data.list') || []))
    .catch(() => resolve([]))
})

// 每隔1小时更新一次
let lastTime
const requestData = async () => {
  const nowTime = Date.now()

  if (!lastTime || ((nowTime - lastTime) > 1000 * 60 * 60 * 1)) {
    lastTime = nowTime
    Ratings = await getRatings()
    Projects = await getProjects()
    Brokes = await getBrokes()
    Analysis = await getAnalysis()
  }

  return {
    Ratings, Projects, Brokes, Analysis,
  }
}

const sitemap = sm.createSitemap({
  hostname: 'https://dprating.com',
  cacheTime: 3 * 1000,
})

const handle = async () => {
  const data = await requestData()

  lodash.concat(
    ['/', '/dp-index', '/methodology'],
    data.Ratings.map(_ => `/rating/report/${_.id}`),
    data.Projects.map(_ => `/project/${_.id}`),
    data.Brokes.map(_ => `/article/${_.id}`),
    data.Analysis.map(_ => `/article/${_.id}`),
  ).forEach((url) => {
    if (XMLUrlExtends.indexOf(url) === -1) {
      XMLUrlExtends.push(url)
      sitemap.add({
        url,
        changefreq: 'daily',
        priority: 1,
      })
    }
  })

  const htmls = lodash.concat(
    [
      '<li><a href="/">首页</a></li>',
      '<li><a href="/dp-index">指数</a></li>',
      '<li><a href="/methodology">模型</a></li>',
    ],
    Ratings.map(_ => `<li><a href="/rating/report/${_.id}" title="${_.projectName}/${_.projectNameEn}(${_.projectSymbol}) - 评级">${_.projectName}/${_.projectNameEn}(${_.projectSymbol}) - 评级</a></li>`),
    Projects.map(_ => `<li><a href="/project/${_.id}" title="${_.projectName}/${_.projectNameEn}(${_.projectSymbol}) - 项目">${_.projectName}/${_.projectNameEn}(${_.projectSymbol}) - 项目</a></li>`),
    Brokes.map(_ => `<li><a href="/article/${_.id}" title="${_.title} - 爆料">${_.title} - 爆料</a></li>`),
    Analysis.map(_ => `<li><a href="/article/${_.id}" title="${_.title} - 分析">${_.title} - 分析</a></li>`),
  )
  HTMLRenders = lodash.union(HTMLRenders, htmls)
}


const setup = (server) => {
  handle()

  server.get('/sitemap.xml', (req, res) => {
    handle()
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end()
        return
      }

      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  server.get('/sitemap.html', (req, res) => {
    handle()

    const html = `
<html lang="en">
  <head>
    <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon" />
    <title>大炮评级（DPRating） - 全球领先的专业、第三方区块链评级机构</title>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <meta name="keywords" content="大炮评级,DPRating,ICO,ICORating,Rating,ICO评级,区块链评级,STO评级,数字货币价格预测" />
    <meta name="description" content="大炮评级（DPRating）提供专业、客观的第三方区块链、ICO、STO评级，并提供基于评级的价格预测、走势分析、买入卖出建议，还提供数字货币综合指数、行业研究报告等" />
    <style>
      body {
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    ${HTMLRenders.join('')}
  </body>
</html>
    `
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
}

module.exports = setup
