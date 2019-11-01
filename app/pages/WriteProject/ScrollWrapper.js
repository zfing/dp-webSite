import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'utils/debounce'

const action = debounce(callback => callback(), 300)

let ele = null

class ScrollWrapper extends React.PureComponent {
  componentDidMount() {
    ele = ReactDOM.findDOMNode(this.refs.root)
    this.onscroll()
  }

  // 开始监听
  onscroll = () => {
    ele.addEventListener('scroll', () => {
      action(() => {
        this.computed(ele.scrollTop, this.getLabel())
      })
    })
  };

  // 获取节点距离顶部
  getLabel = () => {
    const labelEles = document.getElementsByClassName('$$LABEL')
    const parts = []
    for (let i = 0; i < labelEles.length; i++) {
      const idName = labelEles[i].id
      if (idName) {
        const labelEle = document.getElementById(idName)
        parts.push({
          offsetTop: labelEle.offsetTop,
          id: idName,
        })
      }
    }
    return parts
  };

  // 设置菜单状态
  setStyle = (name) => {
    const rootEle = document.getElementById('ScrollMenu')
    const childNodes = rootEle.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      const itemEle = childNodes[i]
      if (itemEle.nodeName === 'A' && itemEle.name) {
        itemEle.name === name
          ? (itemEle.className = 'active')
          : (itemEle.className = '')
      }
    }
  };

  // 开始计算
  computed = (scrollTop, parts) => {
    for (let i = parts.length - 1; i >= 0; i--) {
      if (scrollTop >= parts[i].offsetTop) {
        return this.setStyle(parts[i].id)
      }
    }
  };

  componentWillUnmount() {
    ele && ele.removeEventListener('scroll', null)
  }

  render() {
    return <div {...this.props} ref="root" />
  }
}

export default ScrollWrapper
