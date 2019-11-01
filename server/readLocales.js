const fs = require('fs')
const path = require('path')

/**
 * 读取语言包
 * @param  {Function} ) Promise
 * @return {Promise}     support languages
 */
module.exports = () => new Promise((resolve, reject) => {
  let languages
  // read locales
  fs.readdir(path.resolve(__dirname, '../locales'), (err, files) => {
    if (err) {
      reject(err)
    } else {
      languages = files
        .filter(filename => /^\w+.json$/.test(filename))
        .map(filename => filename.replace(/.json$/g, ''))
      resolve(languages)
    }
  })
})
