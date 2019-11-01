import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  visibility: hidden;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.visible
    && `
    background: rgba(0,0,0,0.1);
    z-index: 99;
    visibility: visible;
  `}
`

const Content = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  margin: 0 10px;
`

class Modal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  open = () => {
    if (!this.state.visible) {
      this.setState({ visible: true }, this.props.onOpen)
    }
  }

  close = () => {
    if (this.state.visible) {
      this.setState({ visible: false }, this.props.onClose)
    }
  }

  _onMaskClick = () => {
    if (this.props.maskClosable) {
      this.state.visible && this.close()
    } else {
      this.props.onMaskClick()
    }
  }

  _stopPropagation = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
  }

  render() {
    const { children, width, ...props } = this.props
    const { visible } = this.state
    return (
      <Wrapper visible={visible} onClick={this._onMaskClick}>
        {visible ? (
          <Content onClick={this._stopPropagation} style={{ maxWidth: width }} {...props}>
            {children}
          </Content>
        ) : null}
      </Wrapper>
    )
  }
}

Modal.defaultProps = {
  visible: false,
  maskClosable: false,
  width: 300,
  onMaskClick: () => {},
  onOpen: () => {},
  onClose: () => {},
}

Modal.propTypes = {
  visible: PropTypes.bool,
  maskClosable: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.number,
  onMaskClick: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}

export default Modal
