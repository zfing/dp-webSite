import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  line-height: 24px;
  // word-break: break-all;
  word-wrap: break-word;

  img {
    max-width: 100%;
  }
`

function Content({ content }) {
  return (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}

Content.propTypes = {
  content: PropTypes.string,
}

export default Content
