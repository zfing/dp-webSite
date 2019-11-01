import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import TextField from 'components/TextField'
import UIA from 'components/A'
import I18n from 'helpers/I18n'
import theme from 'utils/theme'
import config from 'utils/config'
import { createStructuredSelector } from 'reselect'
import { formatMoney } from 'utils/mixins'
import {
  makeSelectInTxLoading,
  makeSelectTxhashVisible,
  makeSelectRatingPrice,
  makeSelectConfig,
  makeSelectProjectSelected,
} from 'containers/App/selectors'
import Actions from 'containers/App/redux'

const { SOURCE_URL } = config

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
`

const A = styled(UIA)`
  color: ${theme.blue};
  text-decoration: underline;
`

const Container = styled.div`
  width: 640px;
  @media (max-width: 640px) {
    width: 100%;
  }
  padding: 54px 53px 46px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(0, 71, 133, 0.5);
  border-radius: 4px;
  position: relative;
`

const Title = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: ${theme.indexTxt};
  letter-spacing: 0.18px;
  text-align: center;
`

const Desc = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: ${theme.indexTxt};
  letter-spacing: 0.18px;

  margin-top: 41px;
  margin-bottom: 69px;
`

const Label = styled.span`
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: ${theme.blue};
  letter-spacing: 0.16px;
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

const Note = styled.div`
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: ${theme.indexTxt};
  letter-spacing: 0.15px;
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

const UICopy = styled.span`
  text-decoration: underline;
  cursor: copy;
  &:hover {
    background: #f2f2f2;
  }
`

const CopyInput = styled.input`
  position: absolute;
  z-index: -99;
  opacity: 0;
  height: 0;
  widht: 0;
`

function handleCopy(input) {
  const InputElement = document.getElementById('copyInput')
  InputElement.value = input
  InputElement.select()
  const successful = document.execCommand('copy')
  if (successful) {
    alert('copy successful!')
  }
}

const Copy = ({ txtHash }) => (
  <UICopy onClick={() => handleCopy(txtHash)}>{txtHash}</UICopy>
)

Copy.propTypes = {
  txtHash: PropTypes.string,
}

class TxhashConfirm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
    }
  }

  componentDidMount() {
    this.props.query()
    this.props.getConfig({ key: 'BurningTokens' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  render() {
    const { visible } = this.state
    const {
      onHide, handleSubmit, onOk, price, burning, selected,
    } = this.props
    const ratingNum = formatMoney(burning.confValue)

    function onSubmit({ txHash }) {
      onOk({
        txHash,
        id: selected,
        status: 9,
      })
    }

    return (
      <Wrapper visible={visible}>
        {visible ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <Icon onClick={onHide}>
                <i className="iconfont icon-close" />
              </Icon>
              <Title>
                <I18n
                  en="Submit information of the burned RATING"
                  zh="提交RATING燃烧信息"
                  ko="RATING 버닝정보 제출"
                />
              </Title>
              <Desc>
                <I18n
                  en={(
                    <div>
                      <div>
                        {`Your application have been accepted, please transfer ${ratingNum} RATING (Current price is $${price.USD}) to the token burn address as follow:`}
                      </div>
                      <div>
                        <Copy txtHash="0x000000000000000000000000000000000001dead" />


                        , Please also submit the TxHash of the transaction.
                      </div>
                    </div>
                  )}
                  zh={(
                    <div>
                      <div>
                        {`您的项目评级申请已终审通过，请将${ratingNum}枚RATING(当前价格为￥${price.CNY})转入燃烧地址：`}
                      </div>
                      <div>
                        <Copy txtHash="0x000000000000000000000000000000000001dead" />


                        ，并在下方填写该笔转币的TxHash
                      </div>
                    </div>
                  )}
                  ko={(
                    <div>
                      <div>
                        {`귀하의 프로젝트 등급평가 신청서가 이미 심사에 통과되었습니다，${ratingNum}매 RATING (현재 가격은 ￥${price.CNY})이며)버닝 주소에 이전됩니다:`}
                      </div>
                      <div>
                        <Copy txtHash="0x000000000000000000000000000000000001dead" />


                        ，하단에 해당 코인의 TxHash를 기입하십시오
                      </div>
                    </div>
                  )}
                />
              </Desc>
              <Field
                name="txHash"
                label={<Label>Txhash：</Label>}
                component={TextField}
              />
              <Note>
                <I18n
                  zh={(
                    <div>


                      温馨提示：RATING为大炮评级基于ETH
                      ERC20协议所发行的生态通证，其合约地址为”0xe8663a64a96169ff4d95b4299e7ae9a76b905b31”（请注意核对），当前已上线交易所有
                      <A target="_blank" href={SOURCE_URL.gate}>Gate.io</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.bcex}>BCEX.top</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.uex}>UEX.com</A>


                      等。
                    </div>
                  )}
                  en={(
                    <div>


                      Kind Reminder: RATING is an ERC20 Token (issued by DPRating) that supports and
                      circulates in the DPRating ecosystem, it's
                      contract address is
                      0xe8663a64a96169ff4d95b4299e7ae9a76b905b31 (please verify
                      carefully), currently listed on
                      {' '}
                      <A target="_blank" href={SOURCE_URL.gate}>Gate.io</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.bcex}>BCEX.top</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.uex}>UEX.com</A>
                      {' '}


                      etc.
                    </div>
                  )}
                  ko={(
                    <div>

                      도움말: RATING은 DPRating에서 ETH ERC20 프로토콜을 기반으로 발행하는 생태 토큰이며 컨트랙트 주소는 0xe8663a64a96169ff4d95b4299e7ae9a76b905b31입니다 (신중히 확인하십시오). 현재 거래소의 모든
                      <A target="_blank" href={SOURCE_URL.gate}>Gate.io</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.bcex}>BCEX.top</A>
                      {'、'}
                      <A target="_blank" href={SOURCE_URL.uex}>UEX.com</A>

                      등에 출시되었습니다.
                    </div>
                  )}
                />
              </Note>
              <div style={{ textAlign: 'center', marginTop: '73px' }}>
                <Btn round outline type="submit">
                  <I18n id="提交" />
                </Btn>
              </div>
            </Container>
          </form>
        ) : null}
        <CopyInput id="copyInput" />
      </Wrapper>
    )
  }
}

function validate(input) {
  const errors = {}

  if (!input.txHash) {
    errors.txHash = 'can`t be empty'
  }

  return errors
}

TxhashConfirm.propTypes = {
  inLoading: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  query: PropTypes.func.isRequired,
  getConfig: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  price: PropTypes.object.isRequired,
  burning: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const mapStateToProps = createStructuredSelector({
  inLoading: makeSelectInTxLoading(),
  visible: makeSelectTxhashVisible(),
  price: makeSelectRatingPrice(),
  burning: makeSelectConfig(),
  selected: makeSelectProjectSelected(),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.doTxhashRequest(payload)),
  onHide: () => dispatch(Actions.onTxhashConfirm(false)),
  query: () => dispatch(Actions.queryRatingPriceRequest()),
  getConfig: payload => dispatch(Actions.queryConfigRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'Txhash', validate })(TxhashConfirm))
