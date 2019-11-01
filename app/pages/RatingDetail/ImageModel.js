import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import I18n, { Trans } from 'helpers/I18n'
import config from 'utils/config'
import theme from 'utils/theme'
import {
  getInvestScore,
  getRiskScore,
  getRiskScoreColor,
  getInvestScoreColor,
} from 'utils/dict'
import moment from 'moment'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'

import LogoZH from '../../../static/img/logo-zh.png'
import LogoEN from '../../../static/img/logo-en.png'
import ClockPNG from '../../../static/img/clock.png'

const { SOURCE_URL } = config

const Wrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: scroll;
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  background: rgba(0,0,0,0.5);
  overflow-x: scroll;
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${props => props.show ? '100%' : 0};
`

const Close = styled.i`
  position: absolute;
  right: -3rem;
  top: -10px;
  color: rgba(255,255,255,0.7);
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;

  &:hover {
    opacity: 0.5;
  }
`

const ImageBox = styled.div`
  position: relative;
  height: 80%;
  max-width: 340px;
`

const Image = styled.img`
  width: 100%;
`

const Msg = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
`

const Hide = styled.div`
  height: 0;
  overflow: hidden;
`

const Main = styled.div`
  background: white;
  width: 750px;
  margin: 20px auto;
`

const Head = styled.div`
  background: #3073D4;
  text-align: center;
  padding: 125px 0;
  
  img {
    height: 100px;
  }
`

const Title = styled.div`
  letter-spacing: 1px;
  color #353030;
  font-size: 34px;
  display: flex;
  align-items: center;

  img {
    width: 32px;
    margin-right: 15px;
  }
`

const Text = styled.div`
  text-align: justify;
  line-height: 45px;
  font-size: 30px;
  color: #222222;

  * {
    font-size: 30px !important;
  }
`

const Cell = styled.div`
  background: #EBF0F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-top: 20px;
  span {
    font-size: 24px;
  }
`

const Line = styled.div`
  border-bottom: 1px dashed #BFBFBF;
  display: flex;
  justify-content: flex-end;
  margin-top: 120px;

  span {
    display: inline-block;
    padding: 5px 8px;
    border-radius: 4px;
    background: ${theme.blue};
    color: white;
    font-size: 26px;
  }
`

const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  line-height: 30px;
  padding-top: 50px;
  letter-spacing: 1px;

  .iconfont {
    font-size: 26px;
    margin-right: 10px;
  }
`

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Code = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  overflow: hidden;
  canvas {
    width: 210px !important;
    height: 210px !important;
    position: absolute;
    top: -12px;
    right: -20px;
  }
`

class ImageModel extends React.PureComponent {
  state = {
    info: {},
    context: '',
    investScore: '',
    riskScore: '',
    show: false,
  }

  componentDidMount() {
    // this.show()
  }

  show = () => {
    const { info, outlook } = this.props
    const investScore = getInvestScore(info.investScore)
    const riskScore = getRiskScore(info.riskScore, Trans({ zh: 'zh', en: 'en' }))
    const prefixText = Trans({
      zh: `【摘要：${info.projectNameEn}获资质评级${investScore}、风险评级${riskScore}】`,
      en: `【Summary：${info.projectNameEn} get Qualification Rating ${investScore}、Risk Rating ${riskScore}】`,
    })

    // 插入
    // const findSuffix = outlook.indexOf('>'); // 找到 <... p> 标签位置
    // const context = outlook.substr(0, findSuffix + 1) + prefixText + outlook.substr(findSuffix + 1)

    const context = prefixText + outlook

    this.setState({
      info,
      context,
      investScore,
      riskScore,
      show: true,
    }, () => {
      this.makeCode()
      setTimeout(this.download, 500)
    })
  }

  hide = () => {
    this.setState({ show: false })
  }

  download = () => {
    const content = ReactDOM.findDOMNode(this.refs.content)
    const image = ReactDOM.findDOMNode(this.refs.image)
    html2canvas(content).then((canvas) => {
      image.src = canvas.toDataURL(1)
    })
  }

  makeCode = () => {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    QRCode.toCanvas(canvas, window.location.href, () => {})
  }

  stopPropagation = (e) => {
    e.stopPropagation()
  };

  render() {
    const {
      show, info, context, investScore, riskScore,
    } = this.state

    return (
      <div>
        <Wrapper show={show}>
          <ImageBox>
            <Close className="iconfont icon-close" onClick={this.hide} />
            <Image ref="image" />
            <Msg>
              <I18n
                zh="长按或复制分享图片"
                en="Scan the QR code to read more"
                ko="사진을 공유하려면 길게 누르거나 복사하십시오"
              />
            </Msg>
          </ImageBox>
        </Wrapper>
        <Hide>
          <Main ref="content">
            <Head>
              <I18n
                zh={<img alt="DPRating" src={LogoZH} />}
                en={<img alt="DPRating" src={LogoEN} />}
              />
            </Head>
            <div style={{ padding: '52px 62px' }}>
              <Title>
                <img alt="DPRating" src={ClockPNG} />
                <I18n
                  value={info.ratingTime}
                  format={(value, local) => (
                    value
                      ? moment(value).format(
                        local === 'zh' ? 'dddd  YYYY/MM/DD  h:mm' : 'ddd  YYYY/MM/DD  h:mm',
                      )
                      : ''
                  )}
                />
              </Title>

              <Text
                dangerouslySetInnerHTML={{
                  __html: context,
                }}
              />

              <Cell style={{ marginTop: '40px' }}>
                <Text>
                  <I18n id="资质" />
                </Text>
                <span style={{ color: getInvestScoreColor(info.investScore) }}>
                  {investScore}
                </span>
              </Cell>

              <Cell>
                <Text>
                  <I18n id="风险" />
                </Text>
                <span style={{ color: getRiskScoreColor(info.riskScore) }}>
                  {riskScore}
                </span>
              </Cell>

              <Line>
                <span>
                  <I18n
                    zh="扫描二维码，查看市值、价格走势预测"
                    en="Scan the QR code to learn more"
                    ko="시장 가격 및 가격 추이 예측은 QR 코드를 스캔하십시오"
                  />
                </span>
              </Line>

              <Contact>
                <IconBox>
                  <div>
                    <i className="iconfont icon-twitter" />
                    {SOURCE_URL.twitter}
                  </div>
                  <div>
                    <i className="iconfont icon-telegram" />
                    {SOURCE_URL.t}
                  </div>
                  <div>
                    <i className="iconfont icon-medium" />
                    {SOURCE_URL.medium}
                  </div>
                  <div>
                    <i className="iconfont icon-webx" />


                    https://www.dprating.com
                  </div>
                </IconBox>
                <Code><canvas ref="canvas" /></Code>
              </Contact>
            </div>
          </Main>
        </Hide>
      </div>
    )
  }
}

ImageModel.defaultPorps = {
  info: {},
  outlook: '',
}

ImageModel.propTypes = {
  info: PropTypes.object.isRequired,
  outlook: PropTypes.string,
}

export default ImageModel
