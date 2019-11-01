/**
 * 服务器环境
 * @type {Object}
 */
const API_ENV = {
  isProd: process.env.API_ENV === 'production',
  isDev: process.env.API_ENV === 'development',
  isTest: process.env.API_ENV === 'test',
}

/**
 * 请求 api 路径
 * @type {String}
 */
let API_URL = 'http://47.94.240.141:8080/api'
let API_URL2 = 'http://uat.api.dapaopingji.com:6060/api'

if (API_ENV.isProd) {
  API_URL = 'https://api.dapaopingji.com/api'
  API_URL2 = 'https://api.account.dapaopingji.com/api'
} else if (API_ENV.isTest) {
  API_URL = 'https://uat.api.dapaopingji.com/api'
  API_URL2 = 'http://uat.api.dapaopingji.com:6060/api'
}

/**
 * 跳转路径
 * @type {Object}
 */
let CONST_LINK = {
  home: 'http://47.94.240.141',
  rating: 'http://47.94.240.141/download.html',
  about: 'http://47.94.240.141/aboutUs.html',
  api: 'http://47.94.240.141/api.html',
  token: 'http://54.183.42.139:3000',
}

if (API_ENV.isProd) {
  CONST_LINK = {
    home: 'http://index.dprating.com/',
    rating: 'http://index.dprating.com/download.html',
    about: 'http://index.dprating.com/aboutUs.html',
    api: 'http://index.dprating.com/api.html',
    token: 'http://token.dprating.com',
  }
} else if (API_ENV.isTest) {
  CONST_LINK = {
    home: 'http://test.index.dprating.com',
    rating: 'http://test.index.dprating.com/download.html',
    about: 'http://test.index.dprating.com/aboutUs.html',
    api: 'http://test.index.dprating.com/api.html',
    token: 'http://token.dprating.com',
  }
}

const ALIOSS_V2 = 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website-v2'

const SOURCE_URL = {
  t: 'https://t.me/DPRating',
  twitter: 'https://twitter.com/dprating',
  medium: 'https://medium.com/@dprating',
  weibo: 'https://weibo.com/darpalrating',
  email: 'service@dprating.com',

  gate: 'https://gate.io',
  uex: 'https://uex.com/index.html',
  bcex: 'https://www.bcex.top',
  etherscan: 'https://etherscan.io/tx',

  logoEN: `${ALIOSS_V2}/logo-en.svg`,
  logoZH: `${ALIOSS_V2}/logo-zh.svg`,
  logoENPNG: `${ALIOSS_V2}/logo-en.png`,
  logoZHPNG: `${ALIOSS_V2}/logo-zh.png`,
  icon: `${ALIOSS_V2}/icon.svg`,
  iconSQ: `${ALIOSS_V2}/icon-sq.svg`,
  banner: `${ALIOSS_V2}/banner.png`,
  WeChat: `${ALIOSS_V2}/WeChat.jpg`,
  WeChatServer: `${ALIOSS_V2}/WeChatServer.jpg`,
  WechatCommunity: `${ALIOSS_V2}/WechatCommunity.jpeg`,

  ratingBg: `${ALIOSS_V2}/rating-bg-01.png`,

  DPC: `${ALIOSS_V2}/DPC_Methodology_cn.pdf`,
  BVIX: `${ALIOSS_V2}/BVIX_Intro_cn.pdf`,

  DPCEn: `${ALIOSS_V2}/DPC_Methodology_en.pdf`,
  BVIXEn: `${ALIOSS_V2}/BVIX_Intro_en.pdf`,

  whitepaper:
    'http://darpalrating-northeast-cdn.s3.amazonaws.com/token/Whitepaper-cn-0.7.pdf',

  whitepaperEn:
    'http://darpalrating-northeast-cdn.s3.amazonaws.com/token/Whitepaper-en-0.7.pdf',
}

export default {
  API_ENV,
  API_URL,
  API_URL2,
  getApiUrl(url) {
    return /[a-zA-z]+:\/\/[^/]*/.test(url)
      ? url
      : `${API_URL}///${url}`.replace(/\/{3,}/g, '/')
  },
  CONST_LINK,
  SOURCE_URL,
  openPages: ['/writer/rating', '/writer/project'],

  cyConf: {
    appid: 'cytV9egUa',
    conf: 'prod_cc2e99913f70bfe3ded9f06fac6ed8e0',
  },
}

/**
 * 默认语言环境
 */
export const defaultLanguage = 'zh'
