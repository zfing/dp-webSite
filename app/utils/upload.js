import { getOssSign, setOssSign } from 'helpers/auth'
import request from 'helpers/request'
import api from 'utils/api'

/**
 * 随机数
 */
const Random = () => `${Date.now()}${parseInt(Math.random() * 10000, 10)}`

/**
 * 文件上传
 * @param  {file data} file              文件流
 * @param  {Object} options
 */
export default async (file, options = {}) => {
  const { progress, success, error } = options

  const prefixDir = options.prefixDir || 'dir'

  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  // 保存的文件名
  const filename = `${Random()}.${file.type.substr(
    file.type.lastIndexOf('/') + 1
  )}`

  // 签名
  let sign = getOssSign()
  if (!sign) {
    const data = await request(api.getSignature)
    if (data.resultCode !== '0') throw new Error(data.msg)
    sign = JSON.parse(data.data)
    setOssSign(sign) // 存储
  }

  // 上传的相对路径
  const key = `${sign.dir}/${prefixDir}/${filename}`

  // 上传的最终路径
  const fileUrl = `${sign.host}/${key}`

  // 上传进度
  const progressFn = (event) => {
    if (typeof progress === 'function') {
      progress((event.loaded / event.total) * 100)
    }
  }

  // success
  const successFn = () => {
    if (xhr.status === 200 && typeof success === 'function') {
      success({ url: fileUrl })
    }
  }

  // error
  const errorFn = () => {
    if (typeof error === 'function') {
      error({ msg: 'unable to upload.' })
    }
  }

  // bind event
  xhr.upload.addEventListener('progress', progressFn, false)
  xhr.addEventListener('load', successFn, false)
  xhr.addEventListener('error', errorFn, false)
  xhr.addEventListener('abort', errorFn, false)

  // set value
  formData.append('name', filename)
  formData.append('key', key)
  formData.append('policy', sign.policy)
  formData.append('OSSAccessKeyId', sign.accessid)
  formData.append('success_action_status', 200)
  formData.append('signature', sign.signature)
  formData.append('file', file)

  // start upload
  xhr.open('POST', sign.host, true)
  xhr.send(formData)
}
