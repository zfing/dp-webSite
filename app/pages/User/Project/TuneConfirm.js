import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import LoadingIndicator from 'components/LoadingIndicator'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import I18n from 'helpers/I18n'
import theme from 'utils/theme'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectTuneVisible,
  makeSelectUserProject,
  makeSelectInTuneLoading,
} from 'containers/App/selectors'
import Actions from 'containers/App/redux'
import debounce from 'utils/debounce'
import UploadBtnField from 'pages/WriteProject/Fields/UploadBtnField'
import ProjectPdfModel from './ProjectPdfModel'

const action = debounce(
  (callback) => {
    callback()
  },
  2000,
  true,
)

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
    z-index: 2;
    visibility: visible;
  `} display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

const Container = styled.div`
  width: 450px;
  @media (max-width: 450px) {
    width: 100%;
  }
  padding: 54px 53px 46px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(0, 71, 133, 0.5);
  border-radius: 4px;
  position: relative;
`

const Icon = styled.div`
  color: rgba(0, 28, 75, 0.3);
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  &:hover {
    opacity: 0.5;
  }
  .iconfont {
    font-size: 25px;
  }
`

const Title = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: ${theme.indexTxt};
  letter-spacing: 0.18px;
  text-align: center;
`

const Desc = styled.div`
  font-family: PingFangSC-Regular;
  color: ${theme.indexTxt};
  letter-spacing: 0.18px;

  margin-top: 31px;
`

const Download = styled.div`
  font-family: PingFangSC-Regular;
  color: ${theme.blue};
  letter-spacing: 0.18px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  margin-bottom: 20px;
`

const Btn = styled(Button)`
  min-width: 136px;
  min-height: 36px;
  display: inline-block;

  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #008dc2;
  letter-spacing: 0.14px;
  text-align: center;
`

const Hide = styled.div`
  height: 0;
  overflow: hidden;
`

class TuneConfirm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
      downloadLoading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  download = () => {
    action(() => {
      this.setState({ downloadLoading: true }, () => {
        this.refs.pdf.download(this.props.userProject.id, () => {
          this.setState({ downloadLoading: false })
        })
      })
    })
  }

  render() {
    const { visible, downloadLoading } = this.state
    const {
      inLoading, onHide, handleSubmit, onOk, userProject,
    } = this.props

    function onSubmit({ investigationUrl }) {
      onOk({
        investigationUrl,
        id: userProject.id,
        status: 11,
      })
    }

    return (
      <div>
        <Hide><ProjectPdfModel ref="pdf" /></Hide>
        <Wrapper visible={visible}>
          {visible ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Container>
                <Icon onClick={onHide}>
                  <i className="iconfont icon-close" />
                </Icon>
                <Title>
                  <I18n
                    zh="提交尽调协议"
                    en="Submit due diligence application form"
                    ko="실사계약 제출"
                  />
                </Title>
                <Desc>
                  <I18n
                    zh="下载，签字后扫描保存为pdf上传至此处，签署尽调协议将视为您对信息的真实性负责"
                    en="Download, sign and save the document in PDF then upload here, the signature represents that the signer is fully responsible for the authenticity of the filled information"
                    ko="다운로드 및 서명 후 PDF로 스캔 저장하고 여기에 업로드합니다. 실사계약의 체결은 귀하가 정보의 진실성에 대해 책임지는 것으로 간주됩니다"
                  />
                </Desc>

                <Download
                  style={{ color: theme.blue }}
                  onClick={this.download}
                >
                  <i style={{ marginRight: '5px' }} className="iconfont icon-pdf" />
                  <I18n zh="下载尽调协议" en="Download due diligence application form" ko="실사계약서 다운로" />
                  {downloadLoading ? <LoadingIndicator style={{ display: 'inline-block' }} size={10} /> : ''}
                </Download>

                <Field
                  name="investigationUrl"
                  component={UploadBtnField}
                  accept="application/pdf"
                />

                <div style={{ textAlign: 'center', marginTop: '43px' }}>
                  <Btn round outline type="submit" loading={inLoading}>
                    <I18n en="Confirm" zh="确认提交" ko="제출 확인" />
                  </Btn>
                </div>
              </Container>
            </form>
          ) : null}
        </Wrapper>
      </div>
    )
  }
}

function validate(input) {
  const errors = {}

  if (!input.investigationUrl) {
    errors.investigationUrl = 'can`t be empty'
  }

  return errors
}

TuneConfirm.propTypes = {
  inLoading: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  userProject: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  visible: makeSelectTuneVisible(),
  userProject: makeSelectUserProject(),
  inLoading: makeSelectInTuneLoading(),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.doTuneRequest(payload)),
  onHide: () => dispatch(Actions.onTuneConfirm(false)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'Tune', validate })(TuneConfirm))
