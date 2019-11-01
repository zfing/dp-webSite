import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UIUpload from 'components/Upload'
import theme from 'utils/theme'
import AddBtn from './AddBtn'

const Wrapper = styled.div`
  position: relative;
`

const Item = styled.div`
  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.16px;
`

// multiple
class Upload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      inLoading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleUpload = () => {
    this.refs.upload.start()
  };

  onProgress = (result) => {
    this.setState({ inLoading: result.type === 'loading' })
  };

  onOk = (url) => {
    this.setState({ value: url }, () => {
      this.props.handle(url)
      this.props.onChange(url)
    })
  };

  onRemove = () => {
    this.onOk('')
  };

  render() {
    const {
      name, error, accept, ...props
    } = this.props
    const { value, inLoading } = this.state
    return (
      <Wrapper {...props}>
        <Item>
          {value
            && typeof value === 'string'
            && value.substr(value.lastIndexOf('/') + 1)}
        </Item>
        {value ? (
          <AddBtn
            style={{ marginTop: '26px' }}
            name="Remove"
            icon="icon-remove"
            onClick={this.onRemove}
          />
        ) : (
          <AddBtn
            style={{ marginTop: '26px', borderColor: error && '#f44336' }}
            name="Upload"
            icon="icon-upload"
            loading={inLoading}
            onClick={this.handleUpload}
          />
        )}
        <UIUpload
          prefix="project"
          ref="upload"
          onProgress={this.onProgress}
          onOk={this.onOk}
          accept={accept}
        />
      </Wrapper>
    )
  }
}

Upload.defaultProps = {
  handle: () => {},
  name: 'image',
  value: '',
}

Upload.propTypes = {
  handle: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  accept: PropTypes.string,
}

export default Upload
