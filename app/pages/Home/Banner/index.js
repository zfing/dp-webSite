import React from 'react'
import ReactSlick from 'components/ReactSlick'
import request from 'helpers/request'
import { defaultLocale } from 'helpers/I18n'
import { completeUrl } from 'components/Link'
import api from 'utils/api'
import './index.scss'

class Banner extends React.Component {
  state = {
    list: [],
    isLarger: false,
  }

  componentDidMount() {
    if (document.body.offsetWidth >= 1080) {
      this.setState({ isLarger: true })
    }
    this.query()
  }

  query = async () => {
    const data = await request(api.getNotify, {
      type: defaultLocale.value === 'zh' ? 1 : 2,
    })
    if (data.resultCode === '0') {
      this.setState({ list: data.data })
    }
  };

  render() {
    const { list, isLarger } = this.state

    const settings = {
      infinite: list.length > 1,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      autoplay: list.length > 1,
      autoplaySpeed: 5000,
    }

    return list.length ? (
      <ReactSlick className="banner-slick m-t-20" {...settings}>
        {list.map((i, k) => (
          <a
            title={i.activityDesc}
            key={k}
            target="_blank"
            href={completeUrl(isLarger ? i.webJumpUrl : i.phoneJumpUrl)}
          >
            <img
              src={isLarger ? i.webImgUrl : i.phoneImgUrl}
              alt={i.activityDesc}
            />
          </a>
        ))}
      </ReactSlick>
    ) : null
  }
}

export default Banner
