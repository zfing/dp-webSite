import color from 'color'
import get from 'lodash/get'
import { createMuiTheme } from '@material-ui/core/styles'

/**
 * 主题配置
 */
export default {
  default: '#004785', // 主题色
  blue: '#008dc2', // 按钮主色调
  gray: 'rgba(0,28,75,0.50)', // 字体灰色调
  grayL: 'rgba(0,28,75,0.30)', // 输入框灰色字体
  red: '#D53D3E', // 红色

  rootBg: '#F3F4F6', // 根背景

  HDTxt: '#DAE9F1', // header text color
  HDTxtHover: '#008dc2', // header text hover color
  HDHeight: 80, // header height
  HDHeightSmall: 56, // samll header height

  indexTxt: '#001C4B', // 指数默认字体颜色
  get indexTheme() {
    return this.blue
  },
  get indexTrans() {
    const rgb = color(this.blue).rgb()
    return [rgb.fade(0.9).string(), rgb.fade(1).string()]
  },

  upColor: '#01C289', // 上涨绿色
  downColor: '#FF675D', // 下跌红色

  get BTN() {
    return this.blue // button default bg color
  },

  FTHeight: 190,
}

export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#004785',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontFamily: 'PingFangSC-Thin',
        fontSize: '16px',
        color: '#004785',
        letterSpacing: '0.18px',
      },
    },

    MuiInputLabel: {
      // formControl: {
      //   zIndex: 1,
      // }
    },

    MuiInput: {
      input: {
        padding: '6px 5px 7px',
      },
      underline: {
        '&:before': {
          borderBottomColor: '#008DC2',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottomColor: '#004785',
        },
      },
    },

    MuiButton: {
      root: {
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'none',
        },
      },
    },

    MuiFormHelperText: {
      root: {
        fontSize: '12px',
      },
    },

    MuiInputBase: {
      inputType: {
        height: 'auto',
      },
    },
  },
})

/**
 * 获取节点的classname
 * @param  {Any} node            节点
 * @param  {String} appendClassName 要添加的classname
 * @return {String}                 最终样式
 */
export function getPropsClassName(node, appendClassName = '') {
  const className = get(node, 'props.className') || ''
  return `${className} ${appendClassName}`.trim()
}

function convert2size(type) {
  // 判断是大于还是小于媒体
  const isLarge = typeof type === 'string' && type[0] === '>'

  // 偏移量
  const offset = Number(type.split(':')[1]) || 0

  // remove < / >
  type = type.split(':')[0].replace(/[^\w]/g, '')

  let size = 1200

  if (type === 'lg') {
    // 最大宽度
    size = 1200 + offset
  } else if (type === 'md') {
    // < 1080 当做 大pad
    size = 1079 + offset
  } else if (type === 'sm') {
    // 移动小设备
    size = 779 + offset
  }

  return { isLarge, size }
}

/**
 * computed media
 */
export function media(css, type = '') {
  const { size, isLarge } = convert2size(type)
  return `
    @media (${isLarge ? 'min' : 'max'}-width: ${size}px) {
      ${css}
    }
  `
}
