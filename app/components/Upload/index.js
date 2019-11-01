import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import zipfile from 'utils/zipfile'
import Toast from 'components/Toast'
import uploadFn from 'utils/upload'
import { Trans } from 'helpers/I18n'
import Mask from './Mask'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.input = {}
  }

  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input)
    this.input.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (file) {
        if (this.props.zip) {
          this.fileEvent(file)
        } else {
          this.upload(file)
        }
      }
    })
  }

  componentWillUnmount() {
    this.input.removeEventListener('change', null)
  }

  fileEvent = async (e) => {
    const file = await zipfile(e.target.files[0])
    this.upload(file)
  };

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
      uploadFn(file, {
        prefixDir: props.prefix,
        success: (data) => {
          props.onProgress({ type: 'end' })
          props.onOk(data.url)
        },
        error: () => {
          props.onProgress({ type: 'end' })
        },
      })
    } catch (e) {
      Toast.error(Trans({
        zh: '上传失败',
        en: 'Failed to upload',
        ko: '업로드 실패',
      }))
    } finally {
      // props.onProgress({ type: 'end' });
    }
  };

  render() {
    const { accept, onRef } = this.props

    if (typeof onRef === 'function') onRef(this)

    return (
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        ref="input"
      />
    )
  }
}

Upload.defaultProps = {
  onOk: () => {},
  onRef: () => {},
  onProgress: () => {},
  accept: 'image/png,image/jpeg',
  prefix: 'avatar',
  zip: false,
}

Upload.propTypes = {
  onOk: PropTypes.func,
  onRef: PropTypes.func,
  onProgress: PropTypes.func,
  accept: PropTypes.string,
  prefix: PropTypes.string,
  zip: PropTypes.bool,
}

export { Mask }
export default Upload
