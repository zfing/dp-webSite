import React, { Children } from 'react'
import isObject from 'lodash/isObject'
import styled from 'styled-components'
import { media } from 'utils/theme'

const Wrapper = styled.div`
  position: relative;

  &:after {
    display: block;
    height: 0;
    clear: both;
    content: '';
    visibility: hidden;
  }

  .Layout-0, .Layout-1 {
    position: relative;
    float: left;
    ${media('float: unset;', '<md')}
  }

  .Layout-0 {
    width: 100%;
    ${({ spacing }) => `padding-right: ${spacing}px;`}
    ${media('padding-right: 0;', '<md')}
  }

  ${({ width, spacing }) => `
    padding-right: ${width}px;
    ${media('padding-right: 0;', '<md')}

    .Layout-1 {
      width: ${width}px;
      right: ${-width}px;
      margin-left: ${-width}px;

      ${media(`
        width: 100%;
        right: auto;
        margin-left: auto;
        margin-top: ${spacing}px;
      `, '<md')}
    }
  `}
`

function AutoLeftStaticRight({
  children, certain, spacing, ...props
}) {
  return (
    <Wrapper width={certain} spacing={spacing} {...props}>
      {Children.map(children, (child, key) => {
        if (!isObject(child)) {
          return null // 过滤非节点
        }
        return (
          <div key={key} className={`Layout-${key}`}>
            {React.cloneElement(child)}
          </div>
        )
      })}
    </Wrapper>
  )
}

export default AutoLeftStaticRight
