import React from 'react'
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

  ${props => props.visible
    && `
    background: rgba(0,0,0,0.3);
    z-index: 99;
    visibility: visible;
  `} display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  overflow: scroll;
  height: 80%;
  width: 80%;

  @media (max-width: 1200px) {
    height: 100%;
    width: 98%;
  }
`

const Content = styled.div`
  min-width: 100%;
  min-height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 #dae9f1;
`

const Img = styled.img`
  width: 100%;
`

class ImgGallery extends React.PureComponent {
  state = {
    visible: false,
    src: '',
  };

  open = (src) => {
    this.setState({ visible: true, src })
  };

  hide = () => {
    this.setState({ visible: false })
  };

  render() {
    return (
      <Wrapper visible={this.state.visible} onClick={this.hide}>
        <Container>
          {this.state.visible && (
            <Content>
              <Img src={this.state.src} />
            </Content>
          )}
        </Container>
      </Wrapper>
    )
  }
}

export default ImgGallery
