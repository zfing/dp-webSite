import React from 'react'
import I18n, { I18nProvider as Provider } from 'components/I18n'
import { t } from 'components/I18n/helpers'

// const locales = require('../../locales')

const defaultTranslations = {}

// 引入语言包
require.context('../../locales/', true, /\.json$/).keys().forEach((r) => {
  const parts = r.replace(/\//g, '').split('.')
  const language = parts[parts.length - 2]
  const trans = require(`../../locales/${language}.json`)
  defaultTranslations[language] = trans
})

export { defaultTranslations }

// 所支持的语言
export const languages = Object.keys(defaultTranslations)

export const defaultLocale = {
  locale: '',
  get value() {
    return this.locale
  },
  set value(value) {
    this.locale = value
  },
}

export function I18nProvider({ children, ...props }) {
  defaultLocale.value = props.locale
  return (
    <Provider translations={defaultTranslations} {...props}>
      {children}
    </Provider>
  )
}

/**
 * trans the variable message
 * @param {Object} params       {zh:'',en:'',...} or {id:''}
 * @param {String} locale       'zh'
 * @param {Object} translations can be null
 */
export function Trans(params, locale, translations) {
  return t(
    params,
    locale || defaultLocale.value,
    translations || defaultTranslations
  )
}

export default I18n
