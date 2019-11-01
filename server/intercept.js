const parser = require('ua-parser-js')

/**
 *  拦截不能适配的浏览器
 */
module.exports = (req, res, next) => {
  let intercept = false

  const ua = parser(req.headers['user-agent']) || {}
  const browser = ua.browser || {}

  if (browser.name === 'Chrome') {
    intercept = browser.major < 29
  } else if (browser.name === 'Safari') {
    intercept = browser.major < 9
  } else if (browser.name === 'Firefox') {
    intercept = browser.major < 28
  } else if (browser.name === 'IE') {
    intercept = browser.major < 11
  }

  if (intercept) {
    res.send(
      '您的浏览器版本过低，请升级或更换浏览器后访问。 Please Update Your Browser .'
    )
  } else {
    next()
  }
}
