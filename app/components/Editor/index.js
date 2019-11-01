import React from 'react'
import BraftEditor from 'braft-editor/braft-editor/dist/braft'
import 'braft-editor/braft-editor/dist/braft.css'
import upload from 'utils/upload'

// 示例，不允许选择大于10M的文件
const validateFn = file => file.size < 1024 * 1024 * 10

const uploadFn = (param) => {
  upload(param.file, {
    progress: param.progress,
    success: param.success,
    error: param.error,
    prefixDir: 'report',
  })
}

export default class Editor extends React.Component {
  render() {
    const { setInstance, ...props } = this.props
    return (
      <BraftEditor
        key="editor"
        fontSizes={[14, 16, 20, 24]}
        colors={[
          '#001C4B',
          '#004785',
          '#008DC2',
          '#88CDDE',
          '#DAE9F1',
          '#F5F9FA',
          '#001C4B',
          '#4C6081',
          '#FF0000',
          '#858585',
        ]}
        letterSpacings={[0, 0.06, 0.08, 2, 4, 6]}
        fontFamilies={[
          {
            name: 'Araial',
            family: 'Arial, Helvetica, sans-serif',
          },
          {
            name: 'OpenSans',
            family: 'Open Sans, Microsoft Yahei, Helvetica, Arial, sans-serif',
          },
          {
            name: 'Georgia',
            family: 'Georgia, serif',
          },
          {
            name: 'PingFang',
            family: 'PingFang SC',
          },
        ]}
        media={{
          allowPasteImage: true,
          image: true,
          video: false,
          audio: true,
          validateFn,
          uploadFn,
        }}
        ref={(instance) => { typeof setInstance === 'function' && setInstance(instance) }}
        {...props}
      />
    )
  }
}
