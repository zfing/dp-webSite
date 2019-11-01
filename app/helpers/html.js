
/**
 * 清楚标签
 * @param  {String} html 带标签内容
 * @return {String}
 */
export function clear(html = '') {
  let text = html.replace(/<\/?.+?\/?>/g, '')
  text = text.replace(/<\/?.+?\/?>/g, '')
  return text
}
