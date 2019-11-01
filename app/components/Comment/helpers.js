import uniqBy from 'lodash/uniqBy'
import concat from 'lodash/concat'

export function unique(...args) {
  const arr = concat(...args)
  return uniqBy(arr, 'id')
}

export const emojisMap = {
  '🤣': '[emo-00]',
  '🙌': '[emo-01]',
  '👏': '[emo-02]',
  '😉': '[emo-03]',
  '💯': '[emo-04]',
  '❤️': '[emo-05]',
  '😍': '[emo-06]',
  '😋': '[emo-07]',
  '😇': '[emo-08]',
  '😂': '[emo-09]',
  '😘': '[emo-10]',
  '😁': '[emo-11]',
  '😀': '[emo-12]',
  '🤞': '[emo-13]',
  '😲': '[emo-14]',
  '😄': '[emo-15]',
  '😊': '[emo-16]',
  '👍': '[emo-17]',
  '😃': '[emo-18]',
  '😅': '[emo-19]',
  '✌️': '[emo-20]',
  '🤗': '[emo-21]',
  '😚': '[emo-22]',
  '👄': '[emo-23]',
  '😏': '[emo-24]',
  '👌': '[emo-25]',
  '😎': '[emo-26]',
  '😆': '[emo-27]',
  '😛': '[emo-28]',
  '🙏': '[emo-29]',
  '🤝': '[emo-30]',
  '🙂': '[emo-31]',
  '🤑': '[emo-32]',
  '😝': '[emo-33]',
  '😐': '[emo-34]',
  '😤': '[emo-35]',
  '🙃': '[emo-36]',
  '😪': '[emo-37]',
  '😵': '[emo-38]',
  '😓': '[emo-39]',
  '👊': '[emo-40]',
  '😦': '[emo-41]',
  '😷': '[emo-42]',
  '😜': '[emo-43]',
  '🤓': '[emo-44]',
  '😥': '[emo-45]',
  '🙄': '[emo-46]',
  '🤔': '[emo-47]',
  '🤒': '[emo-48]',
  '🙁': '[emo-49]',
  '😔': '[emo-50]',
  '😯': '[emo-51]',
  '☹️': '[emo-52]',
  '😰': '[emo-53]',
  '😖': '[emo-54]',
  '😕': '[emo-55]',
  '😒': '[emo-56]',
  '😣': '[emo-57]',
  '😢': '[emo-58]',
  '🤧': '[emo-59]',
  '😫': '[emo-60]',
  '🤥': '[emo-61]',
  '😞': '[emo-62]',
  '😬': '[emo-63]',
  '👎': '[emo-64]',
  '😳': '[emo-65]',
  '😨': '[emo-66]',
  '🤢': '[emo-67]',
  '😱': '[emo-68]',
  '😭': '[emo-69]',
  '😠': '[emo-70]',
  '😈': '[emo-71]',
  '😧': '[emo-72]',
  '💔': '[emo-73]',
  '😟': '[emo-74]',
  '💩': '[emo-75]',
  '👿': '[emo-76]',
  '😡': '[emo-77]',
}

export const emojis = Object.keys(emojisMap)

const emojisMapReverse = {}

emojis.forEach((emoj) => {
  emojisMapReverse[emojisMap[emoj]] = emoj
})

export { emojisMapReverse }

/**
 * 删除表情
 * @param  {String} str input
 * @return {String}
 */
export function rmEmojis(str) {
  str = typeof str === 'string' ? str : ''
  return str.replace(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g, '')
}

export function decodeEmojis(str) {
  str = typeof str === 'string' ? str : ''
  let matched = str.match(/\[emo-\d{2}\]/g)
  matched = Array.isArray(matched) ? matched : []

  matched.forEach((m) => {
    const reg = new RegExp(m.replace(/\[/, '\\[').replace(/\]/, '\\]'), 'g')
    str = str.replace(reg, emojisMapReverse[m])
  })

  return str
}

export function encodeEmojis(str) {
  str = typeof str === 'string' ? str : ''

  emojis.forEach((emoj) => {
    const reg = new RegExp(emoj, 'g')
    str = str.replace(reg, emojisMap[emoj])
  })

  return rmEmojis(str)
}
