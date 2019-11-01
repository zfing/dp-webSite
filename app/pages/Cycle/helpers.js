import 'isomorphic-unfetch'
import moment from 'moment'

export const API_URL = 'https://api.schail.com/v1/source/coinmarket/trendline'

export function request(options = {}) {
  return new Promise((resolve) => {
    const coin = options.coin || 'bitcoin'
    const startTime = options.startTime || 1356969600000
    const endTime = options.endTime || Date.now()
    const url = `${API_URL}?coin=${coin}&startTime=${startTime}&endTime=${endTime}`
    fetch(url)
      .then(res => res.json())
      .then(json => resolve(json.data.price_usd))
      .catch(() => resolve([]))
  })
}

export function dimen(data = [], format = 'YYYY') {
  const output = []
  let lastTime = 0

  data.forEach((item) => {
    const time = moment(item[0]).format(format)

    const x = moment(item[0]).year(moment(data[0][0]).format(format))

    const nextItem = [Number(x.format('x')), item[1]]

    if (time !== lastTime) {
      output.push({
        name: time,
        data: [nextItem],
      })
      lastTime = time
    } else {
      output[output.length - 1].data.push(nextItem)
    }
  })

  return output
}
