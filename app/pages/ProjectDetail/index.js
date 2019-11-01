import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconImage from 'components/IconImage'
import A from 'components/A'
import Link, { completeUrl } from 'components/Link'
import H3 from 'components/H3'
import FloatMenu from 'components/FloatMenu'
import TitleBar from 'components/TitleBar'
import Comment from 'components/Comment'
import ProjectContainer from 'containers/ProjectContainer'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import theme from 'utils/theme'
import I18n, { Trans } from 'helpers/I18n'
import {
  getPriceType,
  getInvestScore,
  getRiskScore,
  getInvestScoreDesc,
  getRiskScoreColor,
  getInvestScoreColor,
} from 'utils/dict'
import moment from 'moment'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import Head from 'helpers/Head'
import api from 'utils/api'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import TeamList from 'components/TeamList'
import AnalysisNewList from 'components/Analysis/NewList'
import HotTagList from 'components/Analysis/HotTagList'
import ChartWithEdit from 'components/Article/ChartWithEdit'
import Tab from 'pureui/Tab'
import redirect from 'helpers/redirect'
import isEmpty from 'lodash/isEmpty'
import Block, { Title as BlockTitle } from './Block'
import { RiskElement } from '../Methodology'
import { teamDecoupling } from '../WriteProject/utils'
import Button from './Button'
import {
  isDate, handleNADate, isLegalNumber, handleNANumber,
} from './utils'
import ContactList from './ContactList'
import ListItem from '../Analysis/ListItem'

import './index.scss'

export const DescBlock = styled(Block)`
  font-size: 14px;
  padding: 0;
`

const GradeItem = styled.div`
  background: #f5f9fa;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  margin-top: 16px;
`

const GradeTitle = styled(H3)`
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: rgba(0, 28, 75, 0.5);
  letter-spacing: 0.05px;
  display: inline;
`

const GradeSign = styled.span`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0, 141, 194, 0.3);
  letter-spacing: 0.05px;
  margin-left: 4px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

const GradeValue = styled.span`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: ${theme.blue};
  letter-spacing: 0.06px;
  text-align: right;
`

const FDTable = styled.table`
  width: 100%;
  margin-top: 12px;

  @media (max-width: 780px) {
    thead th:nth-child(2),
    tbody tr td:nth-child(2) {
      display: none;
    }
  }

  thead {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #001c4b;
    letter-spacing: 0.05px;
    text-align: left;

    th {
      font-weight: normal;
      height: 32px;
    }
  }

  tbody {
    tr {
      height: 76px;
      background: #ffffff;
      box-shadow: inset 0 1px 0 0 rgba(218, 233, 241, 0.8);
    }
    td {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0, 28, 75, 0.6);
      letter-spacing: 0.05px;
      padding-right: 5px;
    }
  }
`

const InWidth = 140
const InHeight = Math.floor((96 / 252) * InWidth)

const InvItemWrapper = styled(IconImage)`
  width: ${InWidth}px;
  height: ${InHeight}px;
  margin-right: 10px;
`

const FDIconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const NewWrapper = styled.div`
  padding: 0 30px 5px 30px;
`

const handleVideoUrl = (input) => {
  let output = ''
  if (typeof input === 'string') {
    const matchs = input.match(
      /((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/g,
    )
    if (matchs && Array.isArray(matchs)) {
      output = matchs[0]
    }
  }
  if (output) {
    output = output.replace(/http:\/\//g, 'https://')
  }
  return output
}

const styles = () => ({
  customWidth: {
    maxWidth: 500,
    fontSize: '14px',
    lineHeight: '18px',
  },
})

class ProjectDetail extends React.PureComponent {
  static async getInitialProps({
    query: { id }, search, ...ctx
  }) {
    const isPreview = search.type === 'preview'
    const isFromAdmin = search.from === 'admin'

    const apiUrl = isPreview ? api.getEditProject : api.getProject

    const options = {
      headers: {
        userToken: search.token,
      },
    }

    if (isFromAdmin) {
      options.headers.adminToken = search.token
      delete options.headers.userToken
    }

    const detail = await request(apiUrl, { id }, options).then(res => res.toJson())

    if (isEmpty(detail)) return redirect('/404', ctx)

    const extendsInfo = await request(api.getRatingByProjectId, { projectDetailId: id }).then(res => res.toJson())

    const article = await request(api.getArticleListV2, {
      sourceId: id,
      sourceType: 1,
      pageSize: 5,
      currentPage: 1,
    }).then(res => res.toPage())

    return {
      id: Number(id),
      detail,
      extendsInfo,
      articleList: article.list || [],
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getOverviewText = (detail) => {
    let feature = ''
    let description = ''

    if (this.props.locale === 'zh') {
      feature = detail.feature || ''
      description = detail.description || ''
    } else if (this.props.locale === 'en') {
      feature = detail.featureEn || ''
      description = detail.descriptionEn || ''
    } else {
      feature = detail.featureKo || detail.featureEn || ''
      description = detail.descriptionKo || detail.descriptionEn || ''
    }

    // 除去标签
    description = description.replace(/<\/?.+?\/?>/g, '')
    feature = feature.replace(/<\/?.+?\/?>/g, '')

    return description + feature
  };

  render() {
    const {
      detail, extendsInfo, classes, articleList, id,
    } = this.props

    const { teamList, advisorList } = teamDecoupling(detail.projectTeamList)
    const contact = detail.projectContact || {}
    const categoryList = detail.projectCategoryList || []
    const projectFundList = Array.isArray(detail.projectFundList)
      ? detail.projectFundList
      : []

    const videoUrl = handleVideoUrl(detail.videoUrl)

    const startDate = handleNADate(detail.startDate)
    const endDate = handleNADate(detail.endDate)

    const projectExchangeList = Array.isArray(detail.projectExchangeList)
      ? detail.projectExchangeList
      : []

    const hasRating = !Number.isNaN(Number(extendsInfo.id))

    return (
      <>
        <Head
          name="projectDetail"
          values={{
            xxx1: detail.projectName,
            xxx2: detail.projectNameEn,
            xxx3: detail.projectSymbol,
            overview: this.getOverviewText(detail),
          }}
        />
        <ProjectContainer detail={detail} extendsInfo={extendsInfo} />
        <AutoLeftStaticRight
          className="section PG-pro-detail m-t-20"
          certain={320}
          spacing={20}
        >
          <div className="m-b-20">
            <div className="container m-b-20">
              <Tab
                dataSource={[{
                  title: Trans({ id: '详情' }),
                  render: () => <>
                    <h4 className="title"><I18n id="简介" /></h4>
                    <p className="html">
                      <I18n
                        en={detail.descriptionEn}
                        zh={detail.description}
                        ko={detail.descriptionKo || detail.descriptionEn}
                      />
                    </p>
                    <h4 className="title"><I18n id="项目特点" /></h4>
                    <div
                      className="html"
                      dangerouslySetInnerHTML={{
                        __html: Trans({
                          en: detail.featureEn,
                          zh: detail.feature,
                          ko: detail.featureKo || detail.featureEn,
                        }),
                      }}
                    />
                    <div className="table-scoll">
                      <div className="table">
                        <div className="table-split">
                          <span>
                            <I18n id="代币符号" />
                          </span>
                          <span>
                            <I18n id="众筹成本" />
                          </span>
                          <span>
                            <I18n id="发行总量" />
                          </span>
                        </div>
                        <div className="table-split">
                          <span>{detail.projectSymbol}</span>
                          <span>
                            {handleNANumber(detail.price)}
                            {' '}
                            {isLegalNumber(detail.price) ? getPriceType(detail.priceType) : ''}
                          </span>
                          <span>{handleNANumber(detail.totalNum)}</span>
                        </div>
                        <div className="table-split">
                          <span>
                            <I18n id="流通量" />
                          </span>
                          <span>
                            <I18n id="众筹开始时间" />
                          </span>
                          <span>
                            <I18n id="众筹结束时间" />
                          </span>
                        </div>
                        <div className="table-split">
                          <span>{handleNANumber(detail.circulatingNum)}</span>
                          <span>
                            {
                              isDate(startDate) ? (
                                <I18n
                                  value={startDate}
                                  format={(value, local) => value
                                    ? moment(value).format(
                                      local === 'zh' ? 'YYYY年MM月DD日' : 'DD MMM, YYYY',
                                    )
                                    : ''
                                  }
                                />
                              ) : startDate
                            }
                          </span>
                          <span>
                            {
                              isDate(endDate) ? (
                                <I18n
                                  value={endDate}
                                  format={(value, local) => value
                                    ? moment(value).format(
                                      local === 'zh' ? 'YYYY年MM月DD日' : 'DD MMM, YYYY',
                                    )
                                    : ''
                                  }
                                />
                              ) : endDate
                            }
                          </span>
                        </div>
                        <div>
                          <span><I18n id="所属分类" /></span>
                        </div>
                        <div>
                          <span>
                            {categoryList.map(item => Trans({
                              en: item.categoryNameEn,
                              zh: item.categoryName,
                              ko: item.categoryNameKo || item.categoryNameEn,
                            })).join(',')}
                          </span>
                        </div>
                        <div>
                          <span colSpan={3}><I18n id="交易所" /></span>
                        </div>
                        <div>
                          <span colSpan={3}>{projectExchangeList.map(_ => _.name).join(',')}</span>
                        </div>
                        <div>
                          <span colSpan={3}><I18n id="社交频道" /></span>
                        </div>
                        <div>
                          <span colSpan={3}>
                            <ContactList contact={contact} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {videoUrl && (
                      <div className="iframe">
                        <iframe
                          title="video"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen="true"
                          webkitallowfullscreen="true"
                          mozallowfullscreen="true"
                          src={videoUrl}
                        />
                      </div>
                    )}
                  </>,
                }, {
                  hidden: !teamList.length,
                  title: Trans({ id: '团队' }),
                  render: () => <TeamList list={teamList} />,
                }, {
                  hidden: !advisorList.length,
                  title: Trans({ id: '顾问' }),
                  render: () => <TeamList list={advisorList} />,
                }, {
                  hidden: !projectFundList.length,
                  title: Trans({ id: '投资者' }),
                  render: () => (
                    <FDTable>
                      <thead>
                        <tr>
                          <th>
                            <I18n id="pages.ProjectDetail.index.name" />
                          </th>
                          <th>
                            <I18n id="官网" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectFundList.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <FDIconWrapper>
                                <InvItemWrapper src={item.logoUrl} sq />
                                {item.name}
                              </FDIconWrapper>
                            </td>
                            <td>
                              <A target="_blank" href={completeUrl(item.website)}>
                                {item.website}
                              </A>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </FDTable>
                  ),
                }, {
                  title: Trans({ id: '白皮书' }),
                  onClick: () => window.open(detail.whitepaperUrl),
                }]}
              />
            </div>
            <div className="container m-t-20">
              <ChartWithEdit
                params={{ id }}
                onOk={() => window.location.reload()}
              />
            </div>
            <div className="container m-t-20">
              {articleList.map((item, key) => <ListItem data={item} key={key} />)}
              <Link href={`/analysis/project/${id}`}>
                <a className="PG-pro-detail-more">
                  <I18n id="查看更多" />
                </a>
              </Link>
            </div>
            {/* 文章卡片 */}
            <div className="container m-t-20">
              <TitleBar title={<I18n id="社区评论" />} />
              <NewWrapper>
                <Comment params={{ sourceType: 2, sourceId: detail.id }} />
              </NewWrapper>
            </div>
          </div>

          <div>
            <Block className="m-b-20">
              <BlockTitle>
                <I18n id="评级" />
              </BlockTitle>
              <GradeItem>
                <div>
                  <GradeTitle>
                    <I18n id="资质" />
                  </GradeTitle>
                  {hasRating ? (
                    <Tooltip
                      disableFocusListener
                      classes={{ tooltip: classes.customWidth }}
                      title={(
                        <I18n
                          value={getInvestScore(extendsInfo.investScore)}
                          format={(item, lang) => getInvestScoreDesc(item, lang)
                          }
                        />
                      )}
                    >
                      <GradeSign>?</GradeSign>
                    </Tooltip>
                  ) : null}
                </div>
                <GradeValue style={{ color: getInvestScoreColor(extendsInfo.investScore) }}>
                  {hasRating ? getInvestScore(extendsInfo.investScore) : 'N/A'}
                </GradeValue>
              </GradeItem>
              <GradeItem>
                <div>
                  <GradeTitle>
                    <I18n id="风险" />
                  </GradeTitle>
                  {hasRating ? (
                    <Tooltip
                      disableFocusListener
                      classes={{ tooltip: classes.customWidth }}
                      title={RiskElement[extendsInfo.riskScore] || ''}
                    >
                      <GradeSign>?</GradeSign>
                    </Tooltip>
                  ) : null}
                </div>
                <GradeValue style={{ color: getRiskScoreColor(extendsInfo.riskScore) }}>
                  {hasRating ? (
                    <I18n
                      value={extendsInfo.riskScore}
                      format={getRiskScore}
                    />
                  ) : 'N/A'}
                </GradeValue>
              </GradeItem>
              <Link href={`/rating/report/${extendsInfo.id}`} passHref>
                <A target="_blank">
                  <Button block style={{ marginTop: '34px' }} disabled={!hasRating}>
                    {hasRating ? <I18n id="评级报告" /> : <I18n id="待评级" />}
                  </Button>
                </A>
              </Link>
            </Block>
            <div className="container m-b-20">
              <AnalysisNewList />
            </div>
            <div className="container m-b-20">
              <HotTagList />
            </div>
          </div>
        </AutoLeftStaticRight>
        <FloatMenu />
      </>
    )
  }
}

ProjectDetail.propTypes = {
  locale: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  articleList: PropTypes.array.isRequired,
  extendsInfo: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default withStyles(styles)(defaultPage(ProjectDetail))
