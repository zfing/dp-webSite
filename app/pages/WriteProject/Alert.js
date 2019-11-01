import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'

const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  visibility: hidden;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  ${props => props.visible
    && `
    background: rgba(0,0,0,0.1);
    z-index: 99;
    visibility: visible;
  `} display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 378px;
  min-height: 204px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 #dae9f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Message = styled.div`
  font-family: PingFangSC-Light;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.7);
  letter-spacing: 0.07px;
  text-align: center;
  width: 282px;
`

const Btn = styled(Button)`
  width: 136px;
  min-height: 36px;
  margin-top: 37px;
`

let handle = () => {}

class Alert extends React.PureComponent {
  state = {
    visible: false,
  };

  open = (callback) => {
    handle = callback
    this.setState({ visible: true })
  };

  hide = () => {
    this.setState({ visible: false })
  };

  handleClick = () => {
    this.setState({ visible: false }, () => handle())
  };

  render() {
    return (
      <Wrapper visible={this.state.visible} onClick={this.hide}>
        <Container>
          <Message>{this.props.message}</Message>
          <Btn round outline onClick={this.handleClick}>
            {this.props.btnTxt}
          </Btn>
        </Container>
      </Wrapper>
    )
  }
}

Alert.propTypes = {
  message: '',
  btnTxt: '',
}

Alert.propTypes = {
  message: PropTypes.node.isRequired,
  btnTxt: PropTypes.node.isRequired,
}

export default Alert
