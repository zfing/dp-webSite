import get from 'lodash/get'
import jsCookie from 'js-cookie'
import { parse as cookieParse } from 'cookie'

// 存储 key 值
export const STORAGE_USER = 'STORAGE_USER'
export const STORAGE_TOKEN = 'STORAGE_TOKEN'
export const STORAGE_AUTHED = 'STORAGE_AUTHED'
export const LOCALE_LOGOUT = 'LOCALE_LOGOUT'
export const LOCALE_LANGUAGE = 'LOCALE_LANGUAGE'
export const LOCALE_UUID = 'LOCALE_UUID'

/**
 * try convert to JSON
 * @param  {Any} input input
 * @return {Object}       {}
 */
const toObject = (input) => {
  try {
    return JSON.parse(input)
  } catch (e) {
    return {}
  }
}

/**
 * 解析 cookie
 * @param  {Object} ctx
 * @return {Object}     返回对象
 */
export function nextCookie(ctx) {
  const cookie = process.browser
    ? document.cookie
    : get(ctx, 'req.headers.cookie')
  return typeof cookie === 'string' ? cookieParse(cookie) : {}
}

/**
 * set token
 * @param {String} token token str
 */
export function setToken(token) {
  jsCookie.set(STORAGE_TOKEN, token, { expires: 1 })
}

/**
 * get token
 * @param  {Object} ctx
 * @return {String}     token
 */
export function getToken(ctx) {
  const cookie = nextCookie(ctx)
  return cookie[STORAGE_TOKEN] || ''
}

/**
 * login actions
 * @param  {Token} token token str
 */
export function login(token) {
  jsCookie.set(STORAGE_AUTHED, 'YES', { expires: 1 })

  token && setToken(token)
}

/**
 * 判断是否登陆
 * @param  {Object} ctx
 * @return {Boolean}     in login ?
 */
export function loggedIn(ctx) {
  const cookie = nextCookie(ctx)
  return !!cookie[STORAGE_AUTHED]
}

/**
 * logout actions
 * @param  {String} token token data
 */
export function logout(token) {
  jsCookie.remove(STORAGE_AUTHED)
  jsCookie.remove(STORAGE_USER)

  token && setToken(token)

  // to support logging out from all windows
  // window.localStorage.setItem(LOCALE_LOGOUT, Date.now())
  window.dispatchEvent(new Event(LOCALE_LOGOUT))
}

/**
 * 获取用户存储的数据
 * @param  {Object} ctx
 * @return {Object}     data
 */
export function getUserData(ctx) {
  const cookie = nextCookie(ctx)
  return toObject(cookie[STORAGE_USER])
}

/**
 * 存储用户相关的数据
 * @param {String} key
 * @param {Any} data
 * @param {Object} ctx
 */
export function setUserData(key, data, ctx) {
  const storageUser = getUserData(ctx)
  storageUser[key] = data

  jsCookie.set(STORAGE_USER, JSON.stringify(storageUser), { expires: 1 })
}

/**
 * 获取oss sign
 * @param  {Objecy} ctx
 * @return {String}     sign
 */
export function getOssSign(ctx) {
  const storageUser = getUserData(ctx)
  const { sign, expires } = storageUser.oss || {}
  return new Date().getTime() < expires ? sign : ''
}

/**
 * 存储 oss sign
 * @param {String} sign
 * @param {Object} ctx
 */
export function setOssSign(sign, ctx) {
  const storageUser = getUserData(ctx)
  storageUser.oss = {
    sign,
    expires: new Date().getTime() + 1000 * 60 * 20, // 缓存时间避免时区问题, 服务器为 30 分钟
  }

  jsCookie.set(STORAGE_USER, JSON.stringify(storageUser), { expires: 1 })
}

/**
 * 存储本地语言
 * @param {String} language
 */
export function setLanguage(language = 'zh') {
  jsCookie.set(LOCALE_LANGUAGE, language, { expires: 1 })
}

/**
 * 获取本地语言
 */
export function getLanguage(ctx) {
  const cookie = nextCookie(ctx)
  return cookie[LOCALE_LANGUAGE] || 'zh'
}

/**
 * 存储本地浏览器唯一ID
 * @param {String} uuid
 */
export function setUUID(uuid = 'uuid') {
  jsCookie.set(LOCALE_UUID, uuid, { expires: 1 })
}

/**
 * 获取UUID
 */
export function getUUID(ctx) {
  const cookie = nextCookie(ctx)
  return cookie[LOCALE_UUID]
}
