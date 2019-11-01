import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import theme from 'utils/theme'

ReactHighstock.Highcharts.setOptions({
  global: {
    timezoneOffset: -8 * 60, // Highchart 时区偏移问题解决。
  },
  lang: {
    // shortMonths: [
    //   '一月',
    //   '二月',
    //   '三月',
    //   '四月',
    //   '五月',
    //   '六月',
    //   '七月',
    //   '八月',
    //   '九月',
    //   '十月',
    //   '十一月',
    //   '十二月',
    // ],
    rangeSelectorFrom: 'From',
    rangeSelectorTo: 'To',
    rangeSelectorZoom: '',
  },
})

export const rangeSelector = (options = {}) => {
  const { handle } = options
  return {
    allButtonsEnabled: true,
    buttonTheme: {
      // styles for the buttons
      fill: 'none',
      stroke: 'none',
      'stroke-width': 0,
      r: 8,
      style: {
        color: theme.indexTxt,
      },
      states: {
        hover: {},
        select: {
          fill: 'none',
          style: {
            color: theme.indexTheme,
          },
        },
      },
    },
    inputDateFormat: '%Y-%m-%d',
    inputEnabled: true,
    inputStyle: {
      background: 'white',
    },
    inputBoxBorderColor: 'none',
    buttons: [
      {
        type: 'all',
        text: '12H',
        events: {
          click: () => {
            setTimeout(() => handle(0), 0)
            return false
          },
        },
      },
      {
        type: 'all',
        text: '1D',
        events: {
          click: () => {
            setTimeout(() => handle(1), 0)
            return false
          },
        },
      },
      {
        type: 'all',
        text: '1W',
        events: {
          click: () => {
            setTimeout(() => handle(2), 0)
            return false
          },
        },
      },
      {
        type: 'all',
        text: '1M',
        events: {
          click: () => {
            setTimeout(() => handle(3), 0)
            return false
          },
        },
      },
      {
        type: 'all',
        text: 'ALL',
        events: {
          click: () => {
            setTimeout(() => handle(4), 0)
            return false
          },
        },
      },
    ],
  }
}

export default ReactHighstock
