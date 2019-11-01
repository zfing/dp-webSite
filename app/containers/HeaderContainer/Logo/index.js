import React from 'react'
import Link from 'components/Link'
import I18n from 'helpers/I18n'
import config from 'utils/config'
import './index.scss'

const { SOURCE_URL } = config

export default function Logo() {
  return (
    <Link href="/" passHref>
      <a className="logo">
        <I18n
          zh={<img src={SOURCE_URL.logoZH} alt="大炮评级" />}
          en={<img src="/static/img/logo_en.svg" alt="DPRating" />}
          ko={<img src="/static/img/logo_en.svg" alt="DPRating" />}
        />
      </a>
    </Link>
  )
}
