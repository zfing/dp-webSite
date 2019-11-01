import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import I18n, { Trans } from 'helpers/I18n'
import Button from './Button'
import { emojis, encodeEmojis } from './helpers'

const Wrapper = styled.div`
  padding: 0 30px;
  background: #f7f7f7;
  font-size: 14px;

  .BraftEditor-content {
    background: white;
  }

  .BraftEditor-container .public-DraftEditorPlaceholder-root {
    font-size: 14px;
  }

  .dropdown-content {
    height: 200px;
  }

  .dropdown-content-inner {
    max-height: 110px !important;
  }

  .browser-chrome .BraftEditor-controlBar, .BraftEditor-controlBar {
    box-shadow: none;
  }

  ${props => props.pure && `
    padding: 0;
    background: #F9F9F9;
    border: 1px solid #E3E4E7;
    border-radius: 2px;
  `}
`

const Bar = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Close = styled(Button)`
  background-color: #D6D9DE;
  margin-right: 10px;
  &:active {
    background: #b6bac1;
  }
`

const Editor = dynamic({
  loader: () => import('../Editor'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

function Edit({
  onOk, onClose, pure, ...props
}) {
  let instance = {}

  function handleOk() {
    onOk({
      ...instance,
      context: encodeEmojis(instance.getContent('html')),
    })
  }

  return (
    <div>
      <Wrapper pure={pure} {...props}>
        <Editor
          emojis={emojis}
          controls={pure ? [] : ['emoji']}
          height={120}
          placeholder={Trans({ zh: '评论~', en: 'Comment~', ko: '댓글~' })}
          setInstance={(ref) => { instance = ref }}
          pasteMode="text"
        />
        {!pure && (
          <Bar>
            <Close onClick={onClose}>
              <I18n id="取消" />
            </Close>
            <Button onClick={handleOk}>
              <I18n id="确定" />
            </Button>
          </Bar>
        )}
      </Wrapper>
      {pure && (
        <Button onClick={handleOk} style={{ marginTop: '15px' }}>
          <I18n id="确认提交" />
        </Button>
      )}
    </div>
  )
}

Edit.defaultProps = {
  onOk: () => {},
  onClose: () => {},
  pure: false,
}

Edit.propTypes = {
  onOk: PropTypes.func,
  onClose: PropTypes.func,
  pure: PropTypes.bool,
}

export default Edit
