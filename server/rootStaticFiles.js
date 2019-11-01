const fs = require('fs')
const express = require('express')
const join = require('path').join

/**
 * render all the file which in the /static/server
 * @param  {Object} server server ctx
 * @return {Any}        bind static server
 */
module.exports = (server) => {
  const dir = join(__dirname, '../static/server/')
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const stat = fs.statSync(join(dir, file))
    if (stat.isFile()) {
      server.use(`/${file}`, express.static(dir + file))
    }
  })
}
