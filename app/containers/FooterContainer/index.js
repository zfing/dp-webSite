import React from 'react'
import PropTypes from 'prop-types'
import config from 'utils/config'
import Link from 'components/Link'
import { completeUrl } from 'components/Link/helpers'
import I18n from 'helpers/I18n'
import './index.scss'

const { SOURCE_URL, CONST_LINK } = config

class Footer extends React.PureComponent {
  render() {
    const { links = [] } = this.props

    return (
      <footer>
        <div className="hd">
          <div className="section">
            <div className="left">
              <Link href="/methodology">
                <a className="menu"><I18n id="模型" /></a>
              </Link>
              <a target="_blank" href={CONST_LINK.token}>Token</a>
              <I18n
                zh={(
                  <a target="_blank" href={SOURCE_URL.whitepaper}>白皮书</a>
                )}
                en={(
                  <a target="_blank" href={SOURCE_URL.whitepaperEn}>Whitepaper</a>
                )}
                ko={(
                  <a target="_blank" href={SOURCE_URL.whitepaperEn}>Whitepaper</a>
                )}
              />
              <Link href="/api"><a>API</a></Link>
              <a href="/sitemap.html"><I18n id="网站地图" /></a>
            </div>

            <div className="right">
              <a target="_blank" href={SOURCE_URL.t}>
                <i className="iconfont icon-telegram" />
              </a>
              <a className="wx-box" style={{ opacity: '1' }}>
                <i className="iconfont icon-weixin" />
                <img src={SOURCE_URL.WechatCommunity} alt="DPRating - wechat" />
              </a>
              <a target="_blank" href={SOURCE_URL.twitter}>
                <i className="iconfont icon-twitter" />
              </a>
              <a target="_blank" href={SOURCE_URL.weibo}>
                <i className="iconfont icon-weibo" />
              </a>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="links">
            <div>
              <I18n id="友情链接" />
              {':'}
            </div>
            {links.map((_, key) => (
              <div className="item" key={key}>
                <a href={completeUrl(_.website)} target="_blank">
                  <I18n zh={_.zhName} en={_.enName} ko={_.enName} />
                </a>
              </div>
            ))}
          </div>
          <div className="copy">
            {'Copyright DPRating © 2018 All Rights Reserved'}
            <span style={{ padding: '0 10px' }} />
            <a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备18042641号</a>
          </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  links: PropTypes.array,
}

export default Footer
