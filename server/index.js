const next = require('next')
const express = require('express')
const compression = require('compression')

const port = parseInt(process.env.PORT, 10) || 9002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const match = require('./match')
const intercept = require('./intercept')
const rootStaticFiles = require('./rootStaticFiles')
const renderFromCache = require('./renderFromCache')
const readLocales = require('./readLocales')
const sitemapAndRobots = require('./sitemapAndRobots')

const start = async () => {
  try {
    const languages = await readLocales()

    app.prepare().then(() => {
      const server = express()

      if (!dev) {
        server.use(compression())
      }

      server.use(intercept)

      // static files
      rootStaticFiles(server)

      sitemapAndRobots(server)

      // language/cache/match routes
      match({
        app,
        server,
        languages,
        defaultLanguage: 'zh',
        routes: [
          { route: '/', useCache: true },
          { route: '/rating' },
          { route: '/rating/report/:id' },
          { route: '/user/info' },
          { route: '/user/project' },
          { route: '/user/article' },
          { route: '/user/password/reset' },
          { route: '/user/password/update' },
          { route: '/writer/project' },
          { route: '/writer/rating' },
          { route: '/api', useCache: true },
          { route: '/dp-index' },
          { route: '/login' },
          { route: '/methodology', useCache: true },
          { route: '/project/:id' },
          { route: '/analysis/project/:id' },
          { route: '/register' },
          { route: '/analysis/list/:id' },
          { route: '/article/:id' },
          { route: '/position' },
          { route: '/broke' },
          { route: '/btc-cycle' },
          { route: '/search' },
          { route: '/member/broke/:id' },
          { route: '/member/analysis/:id' },
          { route: '/vote' },
          { route: '/vote/:id' },
          { route: '/candy' },
          { route: '/candy/:id' },
        ],
        renderFromCache: renderFromCache(app),
      })

      server.get('*', (req, res) => handle(req, res))

      server.listen(port, (err) => {
        if (err) throw err
        console.log(` > Ready on http://localhost:${port}`)
      })
    })
  } catch (error) {
    throw error
  }
}

start()
