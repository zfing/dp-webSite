import React from 'react'
import ReactDOM from 'react-dom'
import keyBy from 'lodash/keyBy'
import styled from 'styled-components'
import ScrollMenu from 'components/ScrollMenu'
import H2 from 'components/H2'
import A from 'components/A'
import FloatMenu from 'components/FloatMenu/dynamic'
import ProjectContainer from 'containers/ProjectContainer'
import theme from 'utils/theme'
import moment from 'moment'
import PropTypes from 'prop-types'
import config from 'utils/config'
import {
  getInvestScore, getRiskScore, getInvestScoreDesc, getRiskScoreColor, getInvestScoreColor,
} from 'utils/dict'
import I18n, { Trans } from 'helpers/I18n'
import ScrollAnim from 'rc-scroll-anim'
import Head from 'helpers/Head'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import defaultPage from 'hocs/defaultPage'
import dynamic from 'next/dynamic'
import request from 'helpers/request'
import api from 'utils/api'
import redirect from 'helpers/redirect'
import isEmpty from 'lodash/isEmpty'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import { RiskElement } from '../Methodology'
import ContactBlock from '../ProjectDetail/ContactBlock'
import DetailBlock from '../ProjectDetail/DetailBlock'
import Block, { Title as BlockTitle } from '../ProjectDetail/Block'
import SummaryTable from './SummaryTable'
import ImageModel from './ImageModel'
import './index.scss'

const Circle = dynamic({
  loader: () => import('./Progress/Circle'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Line = dynamic({
  loader: () => import('./Progress/Line'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const WXshare = dynamic({
  loader: () => import('components/WXshare'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const { SOURCE_URL } = config

const Element = ScrollAnim.Element

const EditorWrapper = styled.div`
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 14px !important;
  color: #000000;
  letter-spacing: 0.08px;
  line-height: 28px;
  overflow: hidden;

  img {
    max-width: 100%;
    cursor: pointer;
  }

  p {
    font-size: 14px !important;
    span {
      font-size: 14px !important;
    }
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: PingFangSC-Medium;
    font-size: 16px !important;
    line-height: 16px;
    margin: 30px 0 15px;
    padding: 0;
    padding-left: 8px;
    color: ${theme.default} !important;
    letter-spacing: 0.06px;
    border-left: 3px solid ${theme.default};

    * {
      font-size: 16px !important;
      color: ${theme.default} !important;
    }
  }
`

const DescBlock = styled(Block)`
  font-size: 14px;
  padding: 0;
`

const DescBlockTitle = styled(H2)`
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.07px;
  background: ${theme.blue};
  padding: 12px 20px;
`

const DescBlockMain = styled.div`
  padding: 0 20px 33px;
`

const DescBlockName = styled.div`
  margin-top: 20px;
  font-family: PingFangSC-Medium;
`

const DescBlockNote = styled.div`
  font-family: PingFangSC-Regular;
  margin-top: 4px;
  word-break: break-all;
`

const Question = styled.i`
  margin-left: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const menus = [
  {
    name: <I18n id="项目概要" />,
    bind: 'summary',
    label: '',
  },
  {
    name: <I18n id="前景展望" />,
    bind: 'prospect',
    label: '',
  },
  {
    name: <I18n id="评分总览" />,
    bind: 'overview',
    label: '',
  },
  {
    name: <I18n id="项目基本面" />,
    bind: 'fundamentals',
    label: '',
  },
  {
    name: <I18n id="团队基本面" />,
    bind: 'team',
    label: '',
  },
  {
    name: <I18n id="社区及热度" />,
    bind: 'community',
    label: '',
  },
  {
    name: <I18n id="调节项" />,
    bind: 'adjustment',
    label: '',
  },
]

// 《热度数据.Table》
// 解析 替换 成 html
function decodeEditorTable(input, tablesHtmlString) {
  try {
    const tables = JSON.parse(tablesHtmlString)

    if (tables instanceof Array) {
      for (let i = 0; i < tables.length; i++) {
        const regx = new RegExp(`《${tables[i].name}.Table》`, 'g')
        let prefixClass = 'normal-table'
        if (tables[i].name.indexOf('@00') !== -1) {
          prefixClass = 'no-header-table'
        } else if (tables[i].name.indexOf('@02') !== -1) {
          prefixClass = 'left-header-table'
        } else if (tables[i].name.indexOf('@03') !== -1) {
          prefixClass = 'vertical-phase-table'
        }

        input = input.replace(regx, `<div class="table-wrapper ${prefixClass}">${tables[i].html}</div>`)
      }
    }
    return input
  } catch (e) {
    return input
  }
}

/**
 * 解析风险表格
 */
function getRiskTable(tablesHtmlString) {
  let input
  try {
    const tables = JSON.parse(tablesHtmlString)

    if (tables instanceof Array) {
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].name === '风险模版V1.1'
          || tables[i].name === 'RiskReportV1.1'
          || tables[i].name === '벤처 모델 V1.1') {
          input = tables[i].html
          break
        }
      }
    }
  } catch (e) {
    input = ''
  }

  return `<div class="table-wrapper normal-table risk-table">${input}</div>`
}

/**
 * 解析资质表格
 */
function getInvestTable(tablesHtmlString) {
  let input
  try {
    const tables = JSON.parse(tablesHtmlString)

    if (tables instanceof Array) {
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].name === '可投资性模版V1.1'
          || tables[i].name === 'InvestmentReportV1.1'
          || tables[i].name === '투자성 모델 V1.1') {
          input = tables[i].html
          break
        }
      }
    }
  } catch (e) {
    input = ''
  }

  return `<div class="table-wrapper normal-table invest-table">${input}</div>`
}

const isJson = input => Object.prototype.toString.call(input).toLowerCase() === '[object object]'

/**
 * 解析模型数据
 */
function decodeScore(string) {
  if (typeof string === 'string') {
    const value = JSON.parse(string)
    return isJson(value) ? value : {}
  }
  return {}
}

/**
 * 按中文title取值
 */
function getDimension(data) {
  let output = {}
  if (Array.isArray(data) && data.length) {
    output = keyBy(data, 'title')
  }
  return output
}

/**
 * 解析第二维度数据
 */
function getDimension2Array(data) {
  if (isJson(data) && Array.isArray(data.secondFields)) {
    const values = data.secondFields
    values.forEach((item, key) => {
      if (isJson(item) && Array.isArray(item.thirdFields)) {
        values[key] = {
          ...item,
          judgement: getJudgement(item.thirdFields),
        }
      }
    })
    return values
  }
  return []
}

function getJudgement(array) {
  try {
    return array.filter(_ => _.judgement).map(_ => _.judgement).join(',')
  } catch (e) {
    return ''
  }
}

/**
 * 尝试计算比率
 */
function getPercent(input) {
  try {
    return input.score / input.totalScore * 100 || 0
  } catch (e) {
    return 0
  }
}

/**
 * 尝试获取得分 / 总分
 */
function getScore(input) {
  try {
    return `${input.score || 0} / ${input.totalScore || 0}`
  } catch (e) {
    return '0 / 0'
  }
}

/**
 * 保留2位小数
 */
function toFixed2(input) {
  if (!Number.isNaN(Number(input))) {
    return input.toFixed(2)
  }
  return 0
}

const styles = () => ({
  customWidth: {
    maxWidth: 500,
    fontSize: '14px',
    lineHeight: '18px',
  },
})

class RatingDetail extends React.PureComponent {
  static async getInitialProps({
    query: { id }, locale, search, ...ctx
  }) {
    const isPreview = search.type === 'preview'
    const isFromAdmin = search.from === 'admin'

    const apiUrl = isPreview ? api.getEditRating : api.getRating

    const options = {
      headers: {
        userToken: search.token,
      },
    }

    if (isFromAdmin) {
      options.headers.adminToken = search.token
      delete options.headers.userToken
    }

    const payload = {
      id,
      isEn: locale === 'en' ? 1 : (locale === 'zh' ? 0 : 2),
      // isEn: locale === 'en' ? 1 : 0,
    }
    const detail = await request(apiUrl, payload, options).then(res => res.toJson())

    if (isEmpty(detail)) return redirect('/404', ctx)

    return {
      id,
      detail,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.addEventListener()
  }

  componentWillUnmount() {
    const content = ReactDOM.findDOMNode(this.refs.content)
    content.removeEventListener('click', null)
  }

  addEventListener = () => {
    const content = ReactDOM.findDOMNode(this.refs.content)

    content.addEventListener('click', (e) => {
      const target = e.target || e.srcElement

      if (target.tagName === 'IMG') {
        window.open(target.src)
        // this.refs.gallery.open(target.src)
      }
    })
  };

  // 预览下获取值
  handleBindValue = (value, key) => {
    const { search, locale } = this.props
    const isPreview = search.type === 'preview'
    const envKey = locale === 'zh' ? key : (locale === 'en' ? `${key}En` : `${key}Ko`)
    return isPreview ? value[envKey] : value[key]
  };

  // 取出趋势展望
  // getOutlookText = (str) => {
  //   let output = {
  //     firstPStr: '',
  //     textStr: '',
  //   };

  //   if (typeof str !== 'string') return output;
  //   // 截取第一个 p 表情内容
  //   const prevIndex = str.indexOf('<p');
  //   const nextIndex = str.indexOf('<\/p>');
  //   output.firstPStr = str.substr(prevIndex, nextIndex - prevIndex + 4);

  //   // 大标题隔离,取出趋势展望所有内容
  //   let outlookBlockStr = str.substr(str.indexOf('<\/h') + 5);
  //   let lastHeadFind = outlookBlockStr.indexOf('<h');
  //   outlookBlockStr = lastHeadFind === -1 ? outlookBlockStr.substr(0) : outlookBlockStr.substr(0, lastHeadFind);

  //   // 去除标签
  //   output.textStr = outlookBlockStr.replace(/<\/?.+?\/?>/g, '');
  //   return output;
  // };

  getAbstractText = (str) => {
    if (typeof str !== 'string') return ''
    return str.replace(/<\/?.+?\/?>/g, '')
  }

  doShareImage = () => {
    this.refs.share.show()
  }

  render() {
    const {
      detail, classes, locale,
    } = this.props
    const investScore = getInvestScore(detail.investScore)
    const riskScore = getRiskScore(detail.riskScore, locale)

    // 资质对象
    const investScoreDetail = this.handleBindValue(detail, 'investScoreDetail')
    const InvestData = decodeScore(investScoreDetail)
    // 风险对象
    const riskScoreDetail = this.handleBindValue(detail, 'riskScoreDetail')
    const RiskData = decodeScore(riskScoreDetail)

    // 解析一级级维度数据
    const InvestDim1 = getDimension(InvestData.fields)
    const RiskDim1 = getDimension(RiskData.fields)

    const reportUrl = this.handleBindValue(detail, 'reportUrl')
    const summary = this.handleBindValue(detail, 'summary')
    const outlook = this.handleBindValue(detail, 'outlook')
    const ratingSummary = this.handleBindValue(detail, 'ratingSummary')
    const projectFundamental = this.handleBindValue(detail, 'projectFundamental')
    const teamFundamental = this.handleBindValue(detail, 'teamFundamental')
    const socialHot = this.handleBindValue(detail, 'socialHot')
    const adjustment = this.handleBindValue(detail, 'adjustment')
    const basicTable = this.handleBindValue(detail, 'basicTable')

    // const { firstPStr, textStr } = this.getOutlookText(outlook);

    const abstract = this.getAbstractText(locale === 'zh' ? detail.abstractZh : (locale === 'en' ? detail.abstractEn : detail.abstractKo))
    return (
      <>
        <Head
          name="ratingDetail"
          values={{
            xxx1: detail.projectName,
            xxx2: detail.projectNameEn,
            xxx3: detail.projectSymbol,
            outlook: abstract,
          }}
        />
        <ProjectContainer extendsInfo={detail} detail={detail} />
        <AutoLeftStaticRight
          className="section m-t-20"
          certain={320}
          spacing={20}
        >
          <div className="PG-project-content container m-b-20" ref="content">
            <ScrollMenu style={{ borderBottom: '1px solid #EDEEF2' }}>
              {menus.map((item, key) => <div key={key} name={item.name} to={item.bind} />)}
            </ScrollMenu>
            {summary && (
              <Element id="summary" className="part">
                <h4 className="tit">
                  <I18n zh="项目概况" en="Project Overview" ko="프로젝트 개요" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(summary, basicTable),
                  }}
                />
              </Element>
            )}

            {outlook && (
              <Element id="prospect" className="part">
                <h4 className="tit m-t-45">
                  <I18n id="前景展望" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(outlook, basicTable),
                  }}
                />
              </Element>
            )}

            {ratingSummary && (
              <Element id="overview" className="part">
                <h4 className="tit">
                  <I18n id="评分总览" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(ratingSummary, basicTable),
                  }}
                />
              </Element>
            )}

            {projectFundamental && (
              <Element id="fundamentals" className="part">
                <h4 className="tit m-t-60">
                  <I18n zh="一、项目基本面" en="A. Project Fundamental" ko="A. 프로젝트 펀더멘털" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(projectFundamental, basicTable),
                  }}
                />
                <SummaryTable data={getDimension2Array(InvestDim1['项目基本面'])} />
              </Element>
            )}

            {teamFundamental && (
              <Element id="team" className="part">
                <h4 className="tit m-t-60">
                  <I18n zh="二、团队基本面" en="B. Team" ko="B. 팀 펀더멘털" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(teamFundamental, basicTable),
                  }}
                />
                <SummaryTable data={getDimension2Array(InvestDim1['团队基本面'])} />
              </Element>
            )}
            {socialHot && (
              <Element id="community" className="part">
                <h4 className="tit m-t-60">
                  <I18n zh="三、社区媒体热度" en="C. Community and Popularity" ko="C. 커뮤니티 및 인기" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(socialHot, basicTable),
                  }}
                />
                <SummaryTable data={getDimension2Array(InvestDim1['社区及热度'])} />
              </Element>
            )}

            {adjustment && (
              <Element id="adjustment" className="part">
                <h4 className="tit m-t-60">
                  <I18n zh="四、调节项" en="D. Adjustables" ko="D. 조절항목" />
                </h4>
                <EditorWrapper
                  dangerouslySetInnerHTML={{
                    __html: decodeEditorTable(adjustment, basicTable),
                  }}
                />
                <SummaryTable data={getDimension2Array(InvestDim1['调节项'])} />
              </Element>
            )}

            <div className="part">
              <h4 className="tit noline m-t-60">
                <I18n zh="资质量化得分" en="Rating Metrics" ko="자질 정량화 평가" />
              </h4>
              <EditorWrapper
                dangerouslySetInnerHTML={{
                  __html: getInvestTable(basicTable),
                }}
              />
            </div>

            <div className="part">
              <h4 className="tit noline m-t-60">
                <I18n zh="风险量化得分" en="Risk Metrics" ko="리스크 정량화 평가" />
              </h4>
              <EditorWrapper
                dangerouslySetInnerHTML={{
                  __html: getRiskTable(basicTable),
                }}
              />
            </div>
          </div>
          <div>
            <DescBlock>
              <DescBlockTitle>
                <I18n zh="评级说明" en="Rating Description" ko="등급 평가 설명" />
              </DescBlockTitle>

              <DescBlockMain>
                <DescBlockName>
                  <I18n id="评级时间:" />
                </DescBlockName>
                <DescBlockNote>
                  <I18n
                    value={detail.ratingTime}
                    format={(value, local) => (
                      value
                        ? moment(value).format(
                          local === 'zh' ? 'YYYY年MM月DD日' : 'DD MMM YYYY',
                        )
                        : ''
                    )}
                  />
                </DescBlockNote>

                <DescBlockName>
                  <I18n zh="项目来源:" en="Project Source:" ko="포로젝트 소스" />
                </DescBlockName>
                <DescBlockNote>
                  {detail.txHash ? (
                    detail.txHashDesc ? (
                      <I18n
                        zh={detail.txHashDesc}
                        en={detail.txHashDescEn}
                        ko={detail.txHashDescKo || detail.txHashDescEn}
                      />
                    ) : (
                      <I18n
                        zh={`${detail.projectName}团队或社区用户主动申请评级并燃烧${detail.burnToken}枚RATING以获得评级顺序优先权。`}
                        en={`The ${detail.projectNameEn} team or community user took the initiative to apply for a rating and burned ${detail.burnToken} RATING for priority in rating order.`}
                        ko={`${detail.projectName}팀 또는 커뮤니티 사용자가적극적으로 등급 평가를 신청하고 ${detail.burnToken}를 연소하며 등급 평가 순서의 우선권을 얻기 위해 RATING합니다.`}
                      />
                    )
                  ) : (
                    <I18n
                      zh="大炮评级团队主动选取并作出评级"
                      en="DPRating rating team actively selects and makes a rating"
                      ko="DPRating팀은 적극적으로 선택하고 평가를 합니다"
                    />
                  )}
                </DescBlockNote>
                {/* <DescBlockNote>
                  {detail.txHash ? (
                    <I18n
                      zh={`${detail.projectName}团队或社区用户主动申请评级并燃烧${detail.burnToken}枚RATING以获得评级顺序优先权。`}
                      en={`The ${detail.projectNameEn} team or community user took the initiative to apply for a rating and burned ${detail.burnToken} RATING for priority in rating order.`}
                    />
                  ) : (
                    <I18n
                      zh="大炮评级团队主动选取并作出评级"
                      en="DPRating rating team actively selects and makes a rating"
                    />
                  )}
                </DescBlockNote>
                */}

                {detail.txHash && (
                  <>
                    <DescBlockName>
                      <I18n zh="燃烧Txhash:" en="Burning Txhash:" ko="Txhash를 연소합니다:" />
                    </DescBlockName>
                    <DescBlockNote>
                      <A
                        title={`${detail.projectName} txhash`}
                        href={`${SOURCE_URL.etherscan}/${detail.txHash}`}
                        target="_blank"
                        style={{ color: theme.blue }}
                      >
                        {detail.txHash}
                      </A>
                    </DescBlockNote>
                  </>
                )}
                {detail.currencyPrice && (
                  <>
                    <DescBlockName>
                      {/* <I18n
                        zh="评级时币价:"
                        en="Price at the time of rating:"
                        ko="등급시 가격:"
                      /> */}
                      <I18n
                        zh="币价信息:"
                        en="token price when post:"
                        ko="게시 할 때 토큰 가격:"
                      />
                    </DescBlockName>
                    <DescBlockNote>
                      <I18n
                        zh={detail.currencyPrice}
                        en={detail.currencyPriceEn}
                        ko={detail.currencyPriceKo}
                      />
                    </DescBlockNote>
                  </>
                )}

                {detail.author && (
                  <>
                    <DescBlockName>
                      <I18n id="分析师" />
:
                    </DescBlockName>
                    <DescBlockNote>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detail.author,
                        }}
                      />
                    </DescBlockNote>
                  </>
                )}

                <div style={{ height: '20px' }} />
                <a
                  className="PG-rating-down-btn"
                  target="_blank"
                  href={reportUrl}
                  title={`${detail.projectName} ${Trans({ id: '下载报告' })}`}
                >
                  <i className="iconfont icon-download" />
                  <I18n id="下载报告" />
                </a>
              </DescBlockMain>
            </DescBlock>

            <Block
              style={{ marginTop: '20px' }}
            >
              <BlockTitle>
                <I18n id="资质" />

                <Tooltip
                  disableFocusListener
                  classes={{ tooltip: classes.customWidth }}
                  title={(
                    <I18n
                      value={investScore}
                      format={(item, lang) => getInvestScoreDesc(item, lang)
                      }
                    />
                  )}
                >
                  <Question className="iconfont icon-icon-question" />
                </Tooltip>
              </BlockTitle>

              <Circle
                style={{ marginTop: '24px' }}
                color={getInvestScoreColor(detail.investScore)}
                percent={InvestData.totalScore / 105 * 100}
                tooltip={`${toFixed2(InvestData.totalScore) || 0} / 105`}
                title={investScore}
              />

              <Line
                percent={getPercent(InvestDim1['项目基本面'])}
                tooltip={getScore(InvestDim1['项目基本面'])}
                style={{ marginTop: '34px' }}
                title={<I18n id="项目基本面" />}
                color={theme.blue}
              />
              <Line
                percent={getPercent(InvestDim1['团队基本面'])}
                tooltip={getScore(InvestDim1['团队基本面'])}
                style={{ marginTop: '10px' }}
                title={<I18n id="团队基本面" />}
                color="#3FB6E7"
              />
              <Line
                percent={getPercent(InvestDim1['社区及热度'])}
                tooltip={getScore(InvestDim1['社区及热度'])}
                style={{ marginTop: '10px' }}
                title={<I18n id="社区及热度" />}
                color="#00C484"
              />
              <Line
                percent={getPercent(InvestDim1['调节项'])}
                tooltip={getScore(InvestDim1['调节项'])}
                style={{ marginTop: '10px' }}
                title={<I18n id="调节项" />}
                color="#77787C"
              />
            </Block>

            <Block
              style={{ marginTop: '20px' }}
            >
              <BlockTitle>
                <I18n id="风险" />
                <Tooltip
                  disableFocusListener
                  classes={{ tooltip: classes.customWidth }}
                  title={RiskElement[detail.riskScore] || ''}
                >
                  <Question className="iconfont icon-icon-question" />
                </Tooltip>
              </BlockTitle>

              <Circle
                style={{ marginTop: '24px' }}
                color={getRiskScoreColor(detail.riskScore)}
                percent={RiskData.totalScore / 30 * 100}
                tooltip={`${toFixed2(RiskData.totalScore) || 0} / 30`}
                title={riskScore}
              />

              <Line
                percent={getPercent(RiskDim1['信息透明'])}
                tooltip={getScore(RiskDim1['信息透明'])}
                style={{ marginTop: '34px' }}
                title={<I18n zh="信息透明" en="Transparent Information" ko="투명한 정보" />}
                color={theme.blue}
              />
              <Line
                percent={getPercent(RiskDim1['信息真实'])}
                tooltip={getScore(RiskDim1['信息真实'])}
                style={{ marginTop: '10px' }}
                title={<I18n zh="信息真实" en="True Information" ko="실제 정보" />}
                color="#3FB6E7"
              />
              <Line
                percent={getPercent(RiskDim1['融资及合规'])}
                tooltip={getScore(RiskDim1['融资及合规'])}
                style={{ marginTop: '10px' }}
                title={<I18n zh="融资及合规" en="Financing and Compliance" ko="파이낸싱 및 컴플라이언스" />}
                color="#00C484"
              />
              <Line
                percent={getPercent(RiskDim1['调节项'])}
                tooltip={getScore(RiskDim1['调节项'])}
                style={{ marginTop: '10px' }}
                title={<I18n id="调节项" />}
                color="#77787C"
              />
            </Block>

            <ContactBlock
              contact={detail.projectContact || {}}
              style={{ marginTop: '20px' }}
            />

            <DetailBlock
              detail={detail}
              style={{ marginTop: '20px' }}
            />
          </div>
        </AutoLeftStaticRight>
        <ImageModel
          info={detail}
          // outlook={firstPStr}
          outlook={abstract}
          ref="share"
        />
        <FloatMenu
          render={Item => (
            [
              <Item key="item-1" onClick={this.doShareImage}>
                <i className="iconfont icon-tupian" />
              </Item>,
            ]
          )}
        />
        <WXshare
          title={Trans({
            zh: `${detail.projectName}（${detail.projectSymbol}） 获资质评级${investScore}、风险评级${riskScore} | 大炮评级（DPRating）`,
            en: `${detail.projectNameEn}(${detail.projectSymbol}) get Qualification Rating ${investScore}、Risk Rating ${riskScore} | DPRating`,
          })}
          image={detail.logoUrl}
          description={abstract}
        />
      </>
    )
  }
}

RatingDetail.propTypes = {
  locale: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default withStyles(styles)(defaultPage(RatingDetail))
