import React from 'react'
import styled from 'styled-components'
import LoadingIndicator from 'components/LoadingIndicator'

const Wrapper = styled.div`
  background: #f5f9fa;
  border: 1px solid #dae9f1;

  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.3);
  letter-spacing: 0.08px;

  cursor: pointer;

  height: 44px;
  line-height: 44px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  .iconfont {
    font-size: 14px;
    margin-right: 4px;
  }

  &:hover {
    opacity: 0.8;
  }
`

function AddBtn({
  name, icon, loading, ...props
}) {
  return (
    <Wrapper {...props}>
      <span>
        {loading && <LoadingIndicator color="rgba(0,28,75,0.30)" size={20} />}
      </span>
      <i className={`iconfont ${icon || 'icon-add-bold'}`} />
      {` ${name}`}
    </Wrapper>
  )
}

export default AddBtn
