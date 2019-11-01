import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UIEditor from 'components/Editor'
import theme from 'utils/theme'
import UploadTable from './UploadTable'

const Wrapper = styled.div`
  .BraftEditor-controlBar .control-item.button {
    opacity: 0.8;
    font-family: PingFangSC-Thin;
    color: rgba(0, 28, 75, 0.7);
  }

  .Braft-dropdown .dropdown-handler > span {
    color: rgba(0, 28, 75, 0.7);
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }

  .BraftEditor-content {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 28, 75, 0.7);
    letter-spacing: 0.14px;
  }

  .Braft-dropdown .dropdown-content .dropdown-arrow {
    border-bottom-color: #3A8CBD;
  }

  .DraftEditor-editorContainer {
    h1,h2,h3,h4,h5,h6 {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      line-height: 16px;
      margin: 30px 0 15px;
      padding: 0;
      padding-left: 8px;
      color: ${theme.default};
      letter-spacing: 0.06px;
      border-left: 3px solid ${theme.default};
    }
  }
`

const Insert = styled.div`
  background-color: #3A8CBD;
  text-align: center;
  padding: 5px 0;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const Import = styled(Insert)`
  border-top: 1px solid #fff;
`

class Editor extends React.Component {
  editorInstance = null;

  insertTable = (table) => {
    this.editorInstance.insertHTML(`
      <p><span style="color:#ff0000;font-weight: bold;">《${table}.Table》</span></p>
    `)
  }

  importTable = () => {
    this.refs.upload.start()
  }

  render() {
    const {
      error, tables, ratingId, onSaveTables, lang, onlyText, noExtendControls, ...props
    } = this.props

    const extendProps = {
      extendControls: [
        {
          type: 'dropdown',
          width: 80,
          disabled: false,
          arrowActive: false,
          text: 'Insert Table',
          autoHide: true,
          ref: (instance) => { window.customDropDown = instance },
          component: <div>
            {tables.map((table, key) => (
              <Insert key={key} onClick={() => this.insertTable(table)}>{table}</Insert>
            ))}
            <Import onClick={this.importTable}>Import Table File</Import>
          </div>,
        },
      ],
      language: 'en',
    }

    if (onlyText) {
      delete extendProps.extendControls
      delete extendProps.media
      extendProps.controls = [
        'undo',
        'redo',
        'split',
        'remove-styles',
        'clear',
      ]
    } else if (noExtendControls) {
      delete extendProps.extendControls
    }

    return (
      <Wrapper error={error}>
        <UIEditor
          setInstance={(instance) => { this.editorInstance = instance }}
          height={500}
          {...extendProps}
          {...props}
        />
        <UploadTable
          ref="upload"
          id={ratingId}
          onOk={onSaveTables}
          lang={lang}
        />
      </Wrapper>
    )
  }
}

Editor.defaultProps = {
  tables: [],
  onlyText: false,
  noExtendControls: false,
}

Editor.propTypes = {
  tables: PropTypes.array,
  onlyText: PropTypes.bool,
  noExtendControls: PropTypes.bool,
}

export default Editor
