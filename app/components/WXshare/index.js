import React from 'react'
import request from 'helpers/request'
import api from 'utils/api'

class WXShare extends React.Component {
  componentDidMount() {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') !== -1) {
      this.init()
    }
  }

  init = async () => {
    const { title, image, description } = this.props
    try {
      const info = await request(api.wxShare, {
        url: window.location.href,
      })

      window.wx.config({
        debug: false,
        appId: 'wx796759a93612216b',
        timestamp: info.timestamp,
        nonceStr: info.nonceStr,
        signature: info.signature,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
        ],
      })

      window.wx.ready(() => {
        window.wx.updateAppMessageShareData({
          title, // 分享标题
          desc: description, // 分享描述
          link: window.location.href,
          imgUrl: image,
          success() {},
        })

        window.wx.updateTimelineShareData({
          title, // 分享标题
          link: window.location.href,
          imgUrl: image,
          success() {},
        })

        if (typeof window.wx.onMenuShareTimeline === 'function') {
          window.wx.onMenuShareTimeline({
            title,
            link: window.location.href,
            imgUrl: image,
            success() {},
          })
        }

        if (typeof window.wx.onMenuShareAppMessage === 'function') {
          window.wx.onMenuShareAppMessage({
            title,
            desc: description,
            link: window.location.href,
            imgUrl: image,
            success() {},
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return null
  }
}

WXShare.defaultProps = {
  image: 'https://www.dprating.com/static/img/share-logo.png',
}

export default WXShare
