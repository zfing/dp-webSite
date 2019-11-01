export default (js, cb, atts = []) => {
  const head = document.getElementsByTagName('head')[0]
    || document.head
    || document.documentElement

  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('charset', 'UTF-8')
  script.setAttribute('src', js)

  for (let i = 0; i < atts.length; i++) {
    const att = atts[i]
    Object.keys(att).forEach((key) => {
      script.setAttribute(key, att[key])
    })
  }

  if (typeof cb === 'function') {
    if (window.attachEvent) {
      script.onreadystatechange = () => {
        if (script.readyStat === 'loaded' || script.readyStat === 'complete') {
          script.onreadystatechange = null
          cb()
        }
      }
    } else {
      script.onload = cb
    }
  }
  head.appendChild(script)
}
