import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UIUpload, { Mask } from 'components/Upload'

const Wrapper = styled.div`
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.3);
  letter-spacing: 0.08px;
  text-align: center;

  background: #f5f9fa;
  border: 1px solid rgba(0, 28, 75, 0.1);

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 98px;
  width: 98px;
  overflow: hidden;

  cursor: pointer;

  img {
    width: 100%;
  }

  ${props => props.disabled
    && `
    cursor: not-allowed;
  `};
`

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  ${props => props.hasValue
    && `
    background: rgba(0,0,0,0.4);
    color: white;
    &:hover {
      background: rgba(0,0,0,0.6);
    }
  `};
`

// multiple
class Upload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      inLoading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleUpload = () => {
    if (!this.props.disabled) {
      this.refs.upload.start()
    }
  };

  onProgress = (result) => {
    this.setState({ inLoading: result.type === 'loading' })
  };

  onOk = (url) => {
    this.setState({ value: url }, () => {
      this.props.onChange(url)
    })
  };

  render() {
    const { name, style } = this.props
    const { value } = this.state
    return (
      <Wrapper style={style} onClick={this.handleUpload}>
        {value && <img alt="DPRating" src={value} />}
        <IconWrapper hasValue={!!value}>
          <i className="iconfont icon-add-bold" />
          {name}
        </IconWrapper>
        <Mask inLoading={this.state.inLoading} />
        <UIUpload
          prefix="project"
          ref="upload"
          onProgress={this.onProgress}
          onOk={this.onOk}
          accept="image/png,image/jpeg"
        />
      </Wrapper>
    )
  }
}

Upload.defaultProps = {
  name: 'image',
  value: '',
  disabled: false,
  style: {},
}

Upload.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
}

export default Upload
