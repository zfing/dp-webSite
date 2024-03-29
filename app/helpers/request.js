import 'isomorphic-unfetch'
import qs from 'qs'
import {
  cloneDeep, isEmpty, defaultsDeep, toArray, toNumber, get, isObject,
} from 'lodash'
import pathToRegexp from 'path-to-regexp'
import config from 'utils/config'
import { getToken } from './auth'

const { getApiUrl } = config

/**
 * convert to object
 * @param  {Any} input
 * @return {Object}
 */
function toJson(input) {
  return isObject(input) ? input : {}
}

/**
 * 返回参数链方法
 * @param  {String} who 需要处理的对象
 * @return {Object}     proto object
 */
export function proto(who) {
  return {
    toArray(path) {
      return toArray(this._result(path))
    },

    toPage(path) {
      const data = this.toJson(path)
      return {
        list: toArray(data.list),
        totalSize: toNumber(data.totalSize),
        pageSize: toNumber(data.pageSize),
        currentPage: toNumber(data.currentPage),
      }
    },

    toJson(path) {
      return toJson(this._result(path))
    },

    _result(path) {
      let data = cloneDeep(this[who])
      if (path && typeof path === 'string') {
        data = get(data, path)
      }
      return data
    },
  }
}

/**
 * 处理返回
 * @param  {Object} body res.body
 * @param  {String} path 返回参数需要处理的对象
 * @return {Object}      包含链方法的结果
 */
export function response(body, path) {
  const result = {}

  Object.keys(body).forEach((key) => {
    result[key] = {
      writable: true,
      configurable: true,
      value: body[key],
    }
  })

  return Object.create(proto(path), result)
}

/**
 * request('user')
 *
 * request('user', {name: 'zhangsan'})
 *
 * request('post user', {name: 'zhangsan'})
 *
 * request('post user', {name: 'zhangsan'}, { headers: { token: 'xx' } })
 *
 * request('put user/:_id', {_id: '1234'})
 *
 * request('put user/:_id', {_id: '1234'}).then(res => res.toArray('list'))
 *
 */
async function request(params, data, options = {}) {
  if (typeof params !== 'string') {
    throw TypeError('Request params is error !')
  }

  let url
  let method = 'get'

  const paramsArray = params.split(' ')

  if (paramsArray.length === 2) {
    method = paramsArray[0].toLocaleLowerCase()
    url = getApiUrl(paramsArray[1])
  } else {
    url = getApiUrl(params)
  }

  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      [domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (err) {
    console.log(err.message)
  }

  const defaultOptions = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      userToken: getToken(),
    },
    mode: 'cors',
  }

  options = defaultsDeep(options, defaultOptions)

  if (['get', 'head'].indexOf(method) !== -1) {
    url = `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
    delete options.body
  } else if (method === 'form') {
    // set method
    options.method = 'POST'
    // del head
    delete options.headers['Content-Type']
    // set data
    const formData = new FormData()
    Object.keys(cloneData).forEach((key) => {
      formData.append(key, cloneData[key])
    })
    options.body = formData
  } else {
    options.body = JSON.stringify(cloneData)
  }

  const res = await fetch(url, options)

  if (res.status !== 200) {
    // throw Error('Network is error !')
    return response({
      msg: 'Network is error !',
    })
  }

  const json = await res.json()

  return response(json, 'data')
}

export default request
