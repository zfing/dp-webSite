import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import ZHSVG from 'static/img/lang_cn.svg'
import ENSVG from 'static/img/lang_us.svg'
import KOSVG from 'static/img/lang_kr.svg'
import { setLanguage } from 'helpers/auth'
import './LanguageToggle.scss'

export function ZH() {
  return <img className="language-img" src={ZHSVG} alt="大炮评级" />
}

export function EN() {
  return <img className="language-img" src={ENSVG} alt="DPRating" />
}

export function KO() {
  return <img className="language-img" src={KOSVG} alt="DPRating" />
}

class Toggle extends React.PureComponent {
  static contextTypes = {
    locale: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
  }

  render() {
    const { locale } = this.context
    const { router, ...props } = this.props

    const regExp = new RegExp(`(^\/${locale}$|^\/${locale}\/)`, 'g')
    const pureHref = router.asPath.replace(regExp, '/')

    const langs = [{
      l: 'zh',
      t: '简体中文',
      s: '大炮评级',
      r: pureHref,
      i: <ZH />,
    }, {
      l: 'en',
      t: 'English',
      s: 'DPRating',
      r: `/en${pureHref}`,
      i: <EN />,
    }, {
      l: 'ko',
      t: '한국어',
      s: 'DPRating',
      r: `/ko${pureHref}`,
      i: <KO />,
    }]

    return (
      <div {...props}>
        {langs.map((item, key) => (
          <a
            key={key}
            className="toggle-item"
            onClick={() => setLanguage(item.l)}
            href={item.r}
            title={item.s}
          >
            {item.i}
            {item.t}
          </a>
        ))}
      </div>
    )
  }
}

Toggle.propTypes = {
  router: PropTypes.object.isRequired,
}

export default withRouter(Toggle)
