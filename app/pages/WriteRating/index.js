import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Toast from 'components/Toast'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { INVEST_SCORE, RISK_SCORE } from 'utils/dict'
import { Jump } from 'components/Link'
import I18n from 'helpers/I18n'
import { makeSelectEditRatingDetail, makeSelectInLoading, makeSelectWriterLanguage } from './selectors'
import Actions from './redux'

import Wrapper from '../WriteProject/Wrapper'
import Content from '../WriteProject/Content'
import BottomBar from '../WriteProject/BottomBar'
import BottomBarBtn from '../WriteProject/BottomBarBtn'
import LeftMenu from './LeftMenu'
import LeftSubMenu from './LeftSubMenu'
import TypeSelect from './TypeSelect'
import SelectField from './SelectField'
import EditorField from './EditorField'
import UploadBtnField from './UploadBtnField'
import Alert from '../WriteProject/Alert'
import { getNamesInTables } from './utils'
import TextField, { TextInput } from './TextField'

const Container = styled.div`
  flex: 1;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 #dae9f1;
  position: relative;
  min-width: 883px;
  height: 100%;
  overflow: scroll;
`

const GradeWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #DAE9F1;
  padding: 25px 20px;
  justify-content: space-between;
  align-items: center;
`

const GradeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  height: 60px;
`

const GradeTitle = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: rgba(0, 28, 75, 0.5);
  letter-spacing: 0.19px;
  margin-right: 41px;
`

const subMenuListEn = [
  { name: 'Background', value: '0', bind: 'summaryEn' },
  { name: 'Future Outlook', value: '5', bind: 'outlookEn' },
  { name: 'Rating Overview', value: '6', bind: 'ratingSummaryEn' },
  { name: 'Project Fundement', value: '1', bind: 'projectFundamentalEn' },
  { name: 'Team', value: '2', bind: 'teamFundamentalEn' },
  { name: 'Community and Popularity', value: '3', bind: 'socialHotEn' },
  { name: 'Adjustab', value: '4', bind: 'adjustmentEn' },
  {
    name: 'Abstract(SEO)', value: '200', bind: 'abstractEn', onlyText: true,
  },
]

const subMenuList = [
  { name: '项目概览', value: '0', bind: 'summary' },
  { name: '前景展望', value: '5', bind: 'outlook' },
  { name: '评分总览', value: '6', bind: 'ratingSummary' },
  { name: '项目基本面', value: '1', bind: 'projectFundamental' },
  { name: '团队基本面', value: '2', bind: 'teamFundamental' },
  { name: '社区及热度', value: '3', bind: 'socialHot' },
  { name: '调节项', value: '4', bind: 'adjustment' },
  {
    name: '摘要(SEO)', value: '200', bind: 'abstractZh', onlyText: true,
  },
]

const subMenuListKo = [
  { name: '프로젝트 개요', value: '0', bind: 'summaryKo' },
  { name: '전경전망', value: '5', bind: 'outlookKo' },
  { name: '전반적인 평가', value: '6', bind: 'ratingSummaryKo' },
  { name: '프로젝트 펀더멘털', value: '1', bind: 'projectFundamentalKo' },
  { name: '팀 펀더멘털', value: '2', bind: 'teamFundamentalKo' },
  { name: '커뮤니티 및 인기', value: '3', bind: 'socialHotKo' },
  { name: '조절항목', value: '4', bind: 'adjustmentKo' },
  {
    name: '요약(SEO)', value: '200', bind: 'abstractKo', onlyText: true,
  },
]

class WriteRating extends React.PureComponent {
  state = {
    selected: '0',
  }

  componentDidMount() {
    this.props.getEditRatingList({}, true)
  }

  render() {
    const {
      save = () => {},
      handleSubmit,
      detail,
      inLoading,
      writerLanguage,
      changeWriterLanguage,
    } = this.props

    const isZh = writerLanguage === 'zh'
    const isEn = writerLanguage === 'en'
    const isKo = writerLanguage === 'ko'

    const { selected } = this.state

    function onSubmit(payload, options = {}) {
      const {
        ratingStatus, ratingTime, author, ...other
      } = payload
      const validateData = { ...other, ...options }

      let checkFn = validate
      if (isEn) {
        checkFn = validateEn
      } else if (isKo) {
        checkFn = validateKo
      }
      const { error, values } = checkFn(validateData)

      if (error) return Toast.error(error)

      if (options.preview) {
        Jump.init()
      }

      save({
        ...values,
        ratingStatus,
        ratingTime, // 取评级时间
        author,
        id: detail.id,
      }, {
        ...options,
        open: Jump.open,
      })
    }

    const confirm = (...args) => {
      this.refs.alert.open(() => {
        onSubmit(...args)
      })
    }

    // 菜单
    let subMenuListData = []
    if (isZh) {
      subMenuListData = [...subMenuList, {
        name: '当前币价', value: '7', bind: 'currentPriceZh', onlyText: true,
      }, {
        name: '上传pdf', value: '100',
      }, {
        name: '分析师信息', value: '300',
      }]
    } else if (isEn) {
      subMenuListData = [...subMenuListEn, {
        name: 'CurrentPrice', value: '7', bind: 'currentPriceEn', onlyText: true,
      }, {
        name: 'Report pdf', value: '100',
      }, {
        name: 'Analyst Information', value: '300',
      }]
    } else if (isKo) {
      subMenuListData = [...subMenuListKo, {
        name: '현재 통화 가격', value: '7', bind: 'currentPriceKo', onlyText: true,
      }, {
        name: 'PDF 업로드', value: '100',
      }, {
        name: '분석가 정보', value: '300',
      }]
    }

    // 存储普通表格
    const onSaveTables = (tables) => {
      const tablesString = JSON.stringify(tables)
      const payload = {
        ratingStatus: 0,
        id: detail.id,
      }
      if (isZh) {
        payload.basicTable = tablesString
      } else if (isEn) {
        payload.basicTableEn = tablesString
      } else if (isKo) {
        payload.basicTableKo = tablesString
      }
      save(payload, {})
    }

    let tablesList = []
    if (isZh) {
      tablesList = getNamesInTables(detail.basicTable)
    } else if (isEn) {
      tablesList = getNamesInTables(detail.basicTableEn)
    } else if (isKo) {
      tablesList = getNamesInTables(detail.basicTableKo)
    }

    // 处理编辑器bind id
    let contentId = detail.id
    if (isEn) {
      contentId = `10001${contentId}`
    } else if (isKo) {
      contentId = `20001${contentId}`
    }

    const editorTableProps = {
      ratingId: detail.id,
      onSaveTables,
      tables: tablesList,
      contentId,
      lang: writerLanguage,
    }

    return (
      <Wrapper>
        <style>
          {'#__next { height: 100%; }'}
        </style>
        <LeftMenu>
          <TypeSelect />
        </LeftMenu>
        <LeftSubMenu
          list={subMenuListData}
          value="0"
          onChange={({ value }) => this.setState({ selected: value })}
          language={writerLanguage}
          changeLanguage={changeWriterLanguage}
        />
        <Container>
          <GradeWrapper>
            <GradeBox>
              <GradeTitle>
                <I18n id="资质" />
              </GradeTitle>
              <Field
                name="investScore"
                placeholder="Choose invest"
                component={SelectField}
                list={INVEST_SCORE}
              />
            </GradeBox>
            <GradeBox>
              <GradeTitle><I18n id="风险" /></GradeTitle>
              <Field
                name="riskScore"
                placeholder="Choose risk"
                component={SelectField}
                list={RISK_SCORE}
              />
            </GradeBox>
            <GradeBox>
              <GradeTitle><I18n id="评级时间" /></GradeTitle>
              <Field
                type="date"
                name="ratingTime"
                placeholder="Select"
                component={TextField}
              />
            </GradeBox>
          </GradeWrapper>
          <Content>
            {isZh ? (
              <div>
                {subMenuList.map((item, key) => item.value === selected ? (
                  <Field
                    key={key}
                    name={item.bind}
                    placeholder={item.name}
                    component={EditorField}
                    onlyText={item.onlyText}
                    {...editorTableProps}
                  />
                ) : null)}
                {selected === '7' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="currencyPrice"
                      placeholder={isZh && '当前币价'}
                      component={TextInput}
                      style={{ paddingTop: '30px 0 20px' }}
                    />
                  </div>
                )}
                {selected === '100' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="reportUrl"
                      component={UploadBtnField}
                      accept="application/pdf"
                      style={{ paddingTop: '30px' }}
                    />
                  </div>
                )}
              </div>
            ) : null}
            {isEn ? (
              <div>
                {subMenuListEn.map((item, key) => item.value === selected ? (
                  <Field
                    key={key}
                    name={item.bind}
                    placeholder={item.name}
                    component={EditorField}
                    onlyText={item.onlyText}
                    {...editorTableProps}
                  />
                ) : null)}
                {selected === '7' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="currencyPriceEn"
                      placeholder={isEn && 'currentPrice'}
                      component={TextInput}
                      style={{ paddingTop: '30px 0 20px' }}
                    />
                  </div>
                )}
                {selected === '100' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="reportUrlEn"
                      component={UploadBtnField}
                      accept="application/pdf"
                      style={{ paddingTop: '30px' }}
                    />
                  </div>
                )}
              </div>
            ) : null}
            {isKo ? (
              <div>
                {subMenuListKo.map((item, key) => item.value === selected ? (
                  <Field
                    key={key}
                    name={item.bind}
                    placeholder={item.name}
                    component={EditorField}
                    onlyText={item.onlyText}
                    {...editorTableProps}
                  />
                ) : null)}
                {selected === '7' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="currencyPriceKo"
                      placeholder={isKo && '현재 통화 가격'}
                      component={TextInput}
                      style={{ paddingTop: '30px 0 20px' }}
                    />
                  </div>
                )}
                {selected === '100' && (
                  <div style={{ padding: '0 20px' }}>
                    <Field
                      name="reportUrlKo"
                      component={UploadBtnField}
                      accept="application/pdf"
                      style={{ paddingTop: '30px' }}
                    />
                  </div>
                )}
              </div>
            ) : null}

            {selected === '300' && (
              <Field
                contentId={detail.id}
                noExtendControls
                name="author"
                placeholder="填写作者"
                component={EditorField}
              />
            )}
          </Content>
          <BottomBar>
            <BottomBarBtn
              outline
              round
              loading={inLoading}
              onClick={handleSubmit(payload => onSubmit({
                ...payload,
                ratingStatus: 0, // 保存
              }, {
                cache: true,
                preview: true,
              }))}
            >
              <I18n id="预览" />
            </BottomBarBtn>
            <BottomBarBtn
              outline
              round
              onClick={handleSubmit(payload => onSubmit({
                ...payload,
                ratingStatus: 0, // 保存
              }))}
              loading={inLoading}
            >
              <I18n id="保存" />
            </BottomBarBtn>
            <BottomBarBtn
              outline
              round
              onClick={handleSubmit(payload => confirm({
                ...payload,
                ratingStatus: 1, // 提交
              }))}
              loading={inLoading}
            >
              <I18n id="提交" />
            </BottomBarBtn>
          </BottomBar>
        </Container>
        <Alert
          ref="alert"
          message={(
            <I18n
              en="After confirming the submission, the information will not be modified, confirm the submission?"
              zh="报告提交后请到管理后台审核，确认提交吗？"
              ko="보고서를 제출한 후, 관리 백그라운드에서 검토하십시오. 제출하시겠습니까?"
            />
          )}
          btnTxt={(
            <I18n id="确认" />
          )}
        />
      </Wrapper>
    )
  }
}

WriteRating.propTypes = {
  detail: PropTypes.object.isRequired,
  getEditRatingList: PropTypes.func.isRequired,
  getEditRatingDetail: PropTypes.func.isRequired,
  inLoading: PropTypes.bool,
  save: PropTypes.func.isRequired,
  writerLanguage: PropTypes.string.isRequired,
  changeWriterLanguage: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  detail: makeSelectEditRatingDetail(),
  inLoading: makeSelectInLoading(),
  writerLanguage: makeSelectWriterLanguage(),
})

const mapDispatchToProps = dispatch => ({
  getEditRatingList: (payload, reload) => dispatch(Actions.getEditRatingListRequest(payload, reload)),
  getEditRatingDetail: payload => dispatch(Actions.getEditRatingDetailRequest(payload)),
  save: (payload, options) => dispatch(Actions.saveRatingRequest(payload, options)),
  changeWriterLanguage: lang => dispatch(Actions.changeWriterLanguage(lang)),
})

function validateEn(input) {
  const payload = {}

  if (Number.isNaN(Number(input.investScore))) {
    return {
      error: 'Investability cant\`t be empty',
    }
  }
  payload.investScore = input.investScore


  if (!input.riskScore) {
    return {
      error: 'Risk cant\`t be empty',
    }
  }
  payload.riskScore = input.riskScore


  for (let i = 0; i < subMenuListEn.length; i++) {
    const { bind } = subMenuListEn[i]
    const value = input[bind]
    // 拦截掉 <p></p>
    if ((!value || value.length < 8) && (!input.cache)) {
      return {
        error: `${subMenuListEn[i].name} cant\`t be empty`,
      }
    }
    payload[bind] = value
  }

  if (!input.reportUrlEn && (!input.cache)) {
    return {
      error: 'report pdf cant\`t be empty',
    }
  }
  payload.reportUrlEn = input.reportUrlEn
  payload.currencyPriceEn = input.currencyPriceEn

  return { values: payload }
}

function validateKo(input) {
  const payload = {}

  if (Number.isNaN(Number(input.investScore))) {
    return {
      // error: '투자 등급은 비워 둘 수 없습니다',
      error: '投资等级不能为空',
    }
  }
  payload.investScore = input.investScore


  if (!input.riskScore) {
    return {
      // error: '위험 수준은 비워 둘 수 없습니다',
      error: '风险等级不能为空',
    }
  }
  payload.riskScore = input.riskScore


  for (let i = 0; i < subMenuListKo.length; i++) {
    const { bind } = subMenuListKo[i]
    const value = input[bind]
    // 拦截掉 <p></p>
    if ((!value || value.length < 8) && (!input.cache)) {
      return {
        // error: `${subMenuListKo[i].name} 비워 둘 수 없습니다`,
        error: `${subMenuList[i].name} 不能为空`,
      }
    }
    payload[bind] = value
  }

  if (!input.reportUrlKo && (!input.cache)) {
    return {
      // error: '평점 보고서 pdf는 비워 둘 수 없습니다.',
      error: '评级报告pdf不能为空',
    }
  }
  payload.reportUrlKo = input.reportUrlKo
  payload.currencyPriceKo = input.currencyPriceKo


  return { values: payload }
}

function validate(input) {
  const payload = {}

  if (Number.isNaN(Number(input.investScore))) {
    return {
      error: '投资等级不能为空',
    }
  }
  payload.investScore = input.investScore


  if (!input.riskScore) {
    return {
      error: '风险等级不能为空',
    }
  }
  payload.riskScore = input.riskScore


  for (let i = 0; i < subMenuList.length; i++) {
    const { bind } = subMenuList[i]
    const value = input[bind]
    // 拦截掉 <p></p>
    if ((!value || value.length < 8) && (!input.cache)) {
      return {
        error: `${subMenuList[i].name} 不能为空`,
      }
    }
    payload[bind] = value
  }

  if (!input.reportUrl && (!input.cache)) {
    return {
      error: '评级报告pdf不能为空',
    }
  }
  payload.reportUrl = input.reportUrl
  payload.currencyPrice = input.currencyPrice


  return { values: payload }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'writeRating' })(WriteRating))
