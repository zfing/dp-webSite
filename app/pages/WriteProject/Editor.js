import React from 'react'
import styled from 'styled-components'
import UIEditor from 'components/Editor'
import theme from 'utils/theme'

const Wrapper = styled.div`
  .BraftEditor-container {
    background: rgba(245, 249, 250, 0.2);
    border: 1px solid
      ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};
  }
  .BraftEditor-controlBar {
    background: #f5f9fa;
  }
  .BraftEditor-controlBar .control-item.button {
    opacity: 0.8;
    font-family: PingFangSC-Thin;
    color: rgba(0, 28, 75, 0.7);
  }
  .BraftEditor-content {
    color: ${theme.default};
    font-family: PingFangSC-Thin;
  }
`

function Editor({ error, ...props }) {
  return (
    <Wrapper error={error}>
      <UIEditor
        height={230}
        controls={[
          'undo',
          'redo',
          'split',
          'bold',
          'list_ul',
          'remove-styles',
          'split',
          'clear',
        ]}
        {...props}
        language="en"
      />
    </Wrapper>
  )
}

export default Editor
