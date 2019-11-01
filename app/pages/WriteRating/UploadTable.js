import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Toast from 'components/Toast'
import request from 'helpers/request'
import api from 'utils/api'
import XLSX from 'xlsx'

class UploadTable extends React.Component {
  constructor(props) {
    super(props)
    this.input = {}
  }

  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input)
    this.input.addEventListener('change', (e) => {
      const file = e.target.files[0]
      this.upload(file)
    })
  }

  componentWillUnmount() {
    this.input.removeEventListener('change', null)
  }

  start = async () => {
    try {
      this.input.click()
    } catch (e) {
      Toast.error(e.message)
    }
  };

  upload = async (file) => {
    const props = this.props
    try {
      props.onProgress({ type: 'loading' })

      let isEn = 0
      if (props.lang === 'en') {
        isEn = 1
      } else if (props.lang === 'ko') {
        isEn = 2
      }

      const data = await request(api.uploadRating, {
        id: props.id,
        file,
        isEn,
      })

      if (data.resultCode === '0') {
        this.convert2HTML(file)
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    } finally {
      this.input.value = ''
      props.onProgress({ type: 'end' })
    }
  };

  convert2HTML = (file) => {
    let workbook = {}
    // 解析后的对象

    let tables = [] // 存储获取到的数据

    const fileReader = new FileReader()

    fileReader.onload = (ev) => {
      try {
        workbook = XLSX.read(ev.target.result, {
          type: 'binary',
        }) // 以二进制流方式读取得到整份excel表格对象

        // 遍历每张表读取
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 表格的表格范围，可用于判断表头是否数量是否正确，过滤空表格
            const sheetItem = workbook.Sheets[sheet]
            if (sheetItem['!ref']) {
              // 解析表格成 HTML
              let decodeHtml = XLSX.utils.sheet_to_html(workbook.Sheets[sheet])

              // 精简html,去掉 id="xx-xx" t="x"
              decodeHtml = decodeHtml.replace(/(\s\w+)="(\w|\w+-?\w+)"/g, '')

              // 取出 table
              // const decodeTableHtml = decodeHtml.match(/<table>.+<\/table>/g)[0]
              const prevIndex = decodeHtml.indexOf('<table>')
              const nextIndex = decodeHtml.indexOf('<\/table>')
              const decodeTableHtml = decodeHtml.substr(prevIndex, nextIndex - prevIndex + 8) // 截取<table>

              // 合并表格
              tables = tables.concat({
                name: sheet,
                html: decodeTableHtml,
              })
            }
          }
        }

        this.saveTableHtml(tables)
      } catch (e) {
        Toast.error(e.message)
      }
    }

    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file)
  }

  saveTableHtml = (tables) => {
    this.props.onOk(tables)
  }

  render() {
    return (
      <div>
        <input
          style={{ display: 'none' }}
          type="file"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ref="input"
        />
      </div>
    )
  }
}

UploadTable.defaultProps = {
  onOk: () => {},
  onProgress: () => {},
}

UploadTable.propTypes = {
  onOk: PropTypes.func,
  onProgress: PropTypes.func,
}

export default UploadTable
