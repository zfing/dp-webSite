import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import request from 'helpers/request'
import api from 'utils/api'
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import { teamDecoupling } from 'pages/WriteProject/utils'
import {
  isDate, handleNADate, handleNANumber,
} from 'pages/ProjectDetail/utils'
import { getFinacashType } from 'utils/dict'
import TuneLogo from 'static/img/tune-logo.png'

const Wrapper = styled.div`
  letter-spacing: 0.2px;
  background: white;

  .left-block-200 {
    display: inline-block;
    min-width: 200px;
  }

  .between {
    display: flex;
    justify-content: space-between;
  }

  .left-right-same {
    div:first-child {
      display: inline-block;
      width: 50%;
    }
    div:last-child {
      display: inline-block;
      width: 50%;
    }
  }

  .between-padding {
    display: flex;
    justify-content: space-between;
    div:first-child {
      flex: 1;
      margin-right: 25px;
    }
    div:last-child {
      flex: 1;
      margin-left: 25px;
    }
  }

  .clear {
    * {
      padding: 0 !important;
      margin: 0 !important;
      color: inherit !important;
      font-size: inherit !important;
    }
  }

  .sub-title {
    font-size: 14px;
    font-weight: 500;
    padding-top: 15px;
  }
`


const Logo = styled.div`
  text-align: center;
  padding-top: 30px;
  img {
    width: 80%;
    max-width: 300px;
  }
`

const Header = styled.div`
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  padding: 20px 45px;
`

const Line = styled.div`
  height: 2px;
  background-color: #E7E7E7;

  ${props => props.margin ? 'height: 1px;margin: 12px 0 6px;' : ''};
`

const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding: 35px 0 8px;
`

const Text = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin-top: 10px;
`

const LesTitle = styled.div`
  text-align: center;
  background: #F1F1F1;
  font-size: 17px;
  font-weight: 500;
  margin-top: 30px;
  line-height: 50px;
`

const Table = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  border: 2px solid #EBEBEB;
  
  span {
    display: inline-block;
    padding: 15px;
  }

  span:first-child {
    width: 300px;
    border-right: 2px solid #EBEBEB;
  }

  div:not(:first-child) {
    border-top: 2px solid #EBEBEB;
  }
`

/**
 * 提取分类
 */
function handleCategoryList(input) {
  const categories = Array.isArray(input) ? input : []
  return {
    categoriesZh: categories.map(_ => _.categoryName).join(', '),
    categoriesEn: categories.map(_ => _.categoryNameEn).join(', '),
  }
}

function formatDate(input) {
  return isDate ? moment(input).format('YYYY.MM.DD') : input
}

function handleNAName(input) {
  return input || 'N/A'
}

/**
 * 清除标签
 */
function clearHTML(input = '') {
  return input.replace(/<\/?.+?\/?>/g, '')
}

/**
 * 处理换行
 */
function convertHr(input = '') {
  return input.replace(/(\n|\\n)/g, '<br />')
}


function INNERHtml({ html, ...props }) {
  return (
    <Text
      className="clear avoid"
      dangerouslySetInnerHTML={{
        __html: convertHr(html),
      }}
      {...props}
    />
  )
}

class ProjectPdfModel extends React.PureComponent {
  state = {
    info: {},
  }

  // componentDidMount() {
  //   this.queryProject()
  // }

  download = async (id, callback) => {
    callback = typeof callback === 'function' ? callback : () => {}
    try {
      const data = await request(api.getEditProject, { id })
      if (data.resultCode === '0') {
        const info = { ...data.data, ...data.data.extendInfo }
        delete info.extendInfo
        this.setState({ info }, () => {
          setTimeout(() => {
            const element = ReactDOM.findDOMNode(this.refs.body)
            html2pdf().from(element).set({
              filename: 'DPRating-Due-diligence-form.pdf',
              margin: [8, 15],
              image: { type: 'jpeg', quality: 1 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: {
                mode: '', before: '.before', after: '.after', avoid: '.avoid',
              },
            }).toPdf().get('pdf').then((pdf) => {
              // const number_of_pages = pdf.internal.getNumberOfPages()
              const pdfPages = pdf.internal.pages
              const myFooter = 'Copyright DPRating © 2018'
              for (let i = 1; i < pdfPages.length; i++) {
                pdf.setPage(i)
                pdf.setFontSize(10)
                pdf.text(myFooter, 83, 290)
              }
              callback()
            }).save()
          }, 500)
        })
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      callback()
    }
  }

  render() {
    const _ = this.state.info

    const { categoriesZh, categoriesEn } = handleCategoryList(_.projectCategoryList)

    const { teamList, advisorList } = teamDecoupling(_.projectTeamList)
    const contact = _.projectContact || {}
    const projectFundList = Array.isArray(_.projectFundList)
      ? _.projectFundList
      : []

    const startDate = handleNADate(_.startDate)
    const endDate = handleNADate(_.endDate)

    const projectBuildDate = handleNADate(_.projectBuildDate)
    const teamBuildDate = handleNADate(_.teamBuildDate)

    const projectExchangeList = Array.isArray(_.projectExchangeList)
      ? _.projectExchangeList
      : []

    const recommendType = []
    if (typeof _.recommendType === 'string') {
      _.recommendType.split(',').forEach((i) => {
        if (i === '1') {
          recommendType.push('⼀线交易所/Top-tier exchanges')
        } else if (i === '2') {
          recommendType.push('⼆线交易易所/Second-tier exchanges')
        } else if (i === '3') {
          recommendType.push('其他交易易所/Other exchanges')
        }
      })
    }

    const projectFinancing = Array.isArray(_.projectFinancing)
      ? _.projectFinancing
      : []

    let lockedType = ''

    switch (String(_.lockedType)) {
      case '1':
        lockedType = '智能合约释放/Locked by smart contract'
        break
      case '2':
        lockedType = '口头承诺/By verbal commitment'
        break
      case '3':
        lockedType = '无/None'
        break
      default:
        lockedType = '其他/Others'
    }

    return (
      <Wrapper ref="body">
        <Logo><img alt="DPRating" src={TuneLogo} /></Logo>
        <Header className="avoid">
          {`${_.projectName}项目尽职调查问卷/${_.projectNameEn} Project Due Diligence Questionnaire`}
        </Header>
        <Line className="avoid" />

        <Title className="avoid">基础/Basic:</Title>
        <Text className="avoid">
          <span className="left-block-200">项目名/Project Name:</span>
          <span>
            {`${_.projectName}/${_.projectNameEn}`}
          </span>
        </Text>
        <Text className="avoid">
          <span className="left-block-200">项目类型/Project Type:</span>
          <span>
            {`${categoriesZh}/${categoriesEn}`}
          </span>
        </Text>

        <Title>项目描述/Project Description:</Title>
        <INNERHtml html={_.description} />
        <INNERHtml html={_.descriptionEn} />

        <Title className="avoid">特点/Features:</Title>
        <Text
          className="clear avoid"
          dangerouslySetInnerHTML={{
            __html: clearHTML(_.feature),
          }}
        />

        <Text
          style={{ marginTop: '10px' }}
          className="clear avoid"
          dangerouslySetInnerHTML={{
            __html: clearHTML(_.featureEn),
          }}
        />

        <Title className="avoid">视频/Video:</Title>
        <Text className="avoid">{handleNAName(_.videoUrl)}</Text>

        <Title className="avoid">详情/Details:</Title>
        <Text className="between">
          <span>项目立项时间/Project establishment time:</span>
          <span>{formatDate(projectBuildDate)}</span>
        </Text>
        <Text className="between avoid">
          <span>团队或公司成⽴立时间/Team or company establishment time:</span>
          <span>{formatDate(teamBuildDate)}</span>
        </Text>
        <Text className="between avoid">
          <span>众筹开始时间/Crowdfunding start time:</span>
          <span>
            {formatDate(startDate)}
          </span>
        </Text>
        <Text className="between avoid">
          <span>众筹结束时间/Crowdfunding end time:</span>
          <span>{formatDate(endDate)}</span>
        </Text>
        <Text className="between avoid">
          <span>Token/Token:</span>
          <span>{_.projectSymbol}</span>
        </Text>
        <Text className="between avoid">
          <span>价格/Price:</span>
          <span>{handleNANumber(_.price)}</span>
        </Text>
        <Text className="between avoid">
          <span>代币种类/Token type:</span>
          <span>{_.contractType}</span>
        </Text>
        <Text className="between avoid">
          <span>发行总量/Total amount of issuance:</span>
          <span>{handleNANumber(_.totalNum)}</span>
        </Text>
        <Text className="between avoid">
          <span>流通总量/Liquidity:</span>
          <span>{handleNANumber(_.circulatingNum)}</span>
        </Text>
        <Text className="between avoid">
          <span>代币合约地址/Token contract address:</span>
          <span>{_.contractAddress}</span>
        </Text>
        <Text className="between avoid">
          <span>是否有回购及销毁机制/Is there a repurchase and destruction mechanism?:</span>
          <span>{_.haveBurning}</span>
        </Text>
        <Text className="between avoid">
          <span>交易所/Exchange:</span>
          <span>{projectExchangeList.map(item => item.name).join(',')}</span>
        </Text>

        <Title className="avoid">团队/Team:</Title>
        {teamList.map((item, key) => (
          <div key={key} className="avoid">
            {key === 0 ? null : <Line margin />}
            <div className="between-padding">
              <Text className="between">
                <span>姓名/Name:</span>
                <span>{item.name}</span>
              </Text>
              <Text className="between">
                <span>职位/Position:</span>
                <span>{item.positionName}</span>
              </Text>
            </div>
            {item.linkedinUrl && (
              <Text>
                {`Linkedln link: ${item.linkedinUrl}`}
              </Text>
            )}
            {item.facebookUrl && (
              <Text>
                {`Facebook link: ${item.facebookUrl}`}
              </Text>
            )}
            {item.twitterUrl && (
              <Text>
                {`Twitter link: ${item.twitterUrl}`}
              </Text>
            )}
            <Text>简介/Profile:</Text>
            <Text>{item.description}</Text>
            <Text>{item.descriptionEn}</Text>
          </div>
        ))}

        <Title className="avoid">顾问/Advisors:</Title>
        {advisorList.map((item, key) => (
          <div key={key} className="avoid">
            {key === 0 ? null : <Line margin />}
            <div className="between-padding">
              <Text className="between">
                <span>姓名/Name:</span>
                <span>{item.name}</span>
              </Text>
              <Text className="between">
                <span>职位/Position:</span>
                <span>{item.positionName}</span>
              </Text>
            </div>
            <Text>简介/Profile:</Text>
            <Text>{item.description}</Text>
            <Text>{item.descriptionEn}</Text>
          </div>
        ))}

        <Title className="avoid">投资机构/Institution Investors:</Title>
        <div className="left-right-same avoid">
          <Text>投资者/Investors</Text>
          <Text>网站/Website</Text>
        </div>
        <Line margin />

        {projectFundList.map((item, key) => (
          <div key={key} className="avoid">
            <div className="left-right-same">
              <Text>{item.name}</Text>
              <Text>{item.website}</Text>
            </div>
            <Line margin />
          </div>
        ))}

        <Title className="avoid">⽩皮书/Whitepaper:</Title>
        <Text className="avoid">{_.whitepaperUrl}</Text>

        <Title className="avoid">联系方式/Contact:</Title>
        <div className="between-padding avoid">
          <Text className="between">
            <span>Website</span>
            <span>{handleNAName(contact.website)}</span>
          </Text>
          <Text className="between">
            <span>Telegram</span>
            <span>{handleNAName(contact.telegram)}</span>
          </Text>
        </div>
        <div className="between-padding avoid">
          <Text className="between">
            <span>Github</span>
            <span>{handleNAName(contact.github)}</span>
          </Text>
          <Text className="between">
            <span>Twitter</span>
            <span>{handleNAName(contact.twitter)}</span>
          </Text>
        </div>
        <div className="between-padding avoid">
          <Text className="between">
            <span>Facebook</span>
            <span>{handleNAName(contact.fackbook)}</span>
          </Text>
          <Text className="between">
            <span>Reddit</span>
            <span>{handleNAName(contact.reddit)}</span>
          </Text>
        </div>
        <div className="between-padding avoid">
          <Text className="between">
            <span>Youtube</span>
            <span>{handleNAName(contact.youtube)}</span>
          </Text>
          <Text className="between">
            <span>Medium</span>
            <span>{handleNAName(contact.medium)}</span>
          </Text>
        </div>
        <div className="between-padding avoid">
          <Text className="between">
            <span>Wechat</span>
            <span>{handleNAName(contact.wechat)}</span>
          </Text>
          <Text className="between">
            <span>Weibo</span>
            <span>{handleNAName(contact.weibo)}</span>
          </Text>
        </div>

        <Title className="avoid">附加信息/Additional information:</Title>
        <Text className="avoid">
          <div>若贵项目最终评级结果达标，是否愿意接受我们推荐到下列类型交易所免费上币?</div>
          <div>If the rating of your project meets the standards, would you like to send recommendation for free listing to the following types of exchanges?</div>
        </Text>
        <Text className="avoid">
          {recommendType.length ? recommendType.map((item, key) => {
            <span key={key}>
              {`${key + 1}. ${item}`}
            </span>
          }) : 'N/A'}
        </Text>

        <Title className="avoid">应⽤场景介绍/Use case introduction:</Title>
        <INNERHtml html={_.applicationScene} />
        <INNERHtml html={_.applicationSceneEn} />

        <Title className="avoid">融资轮次/Funding rounds:</Title>
        {projectFinancing.map((item, key) => (
          <div key={key} className="avoid">
            {key === 0 ? null : <Line margin />}
            <div className="between-padding avoid">
              <Text className="between">
                <span>轮次/Rounds:</span>
                <span>{item.financingRotation}</span>
              </Text>
              <Text className="between">
                <span>开始时间/starting time:</span>
                <span>{formatDate(item.financingStartTime)}</span>
              </Text>
            </div>
            <div className="between-padding avoid">
              <Text className="between">
                <span>结束时间/closing time:</span>
                <span>{formatDate(item.financingEndTime)}</span>
              </Text>
              <Text className="between">
                <span>融资代币量/Amount of token:</span>
                <span>{item.financingTokenNum}</span>
              </Text>
            </div>
            <div className="between-padding avoid">
              <Text className="between">
                <span>本轮单价:Token price for the round:</span>
                <span>
                  {item.currentRoundPrice}
                  {' '}
                  {getFinacashType(item.cashType)}
                </span>
              </Text>
              <Text className="between"></Text>
            </div>
          </div>
        ))}


        <Title className="avoid">代币分配情况/Token allocation plan:</Title>
        <INNERHtml html={_.tokenDeliver} />
        <INNERHtml html={_.tokenDeliverEn} />

        <Title className="avoid">团队持币锁仓情况/Team lock-up:</Title>
        <Text className="avoid">
          <span className="left-block-200">锁仓方式/Lock mode:</span>
          <span>{lockedType}</span>
        </Text>
        {String(_.lockedType) === '4' ? (
          <INNERHtml html={_.lockedDesc} />
        ) : null}
        <Text className="avoid">
          <span className="left-block-200">锁仓地址/Lock-up adderss:</span>
          <span>{_.lockedAddress}</span>
        </Text>

        <Text className="sub-title avoid">解锁时间/Unlock time:</Text>
        <INNERHtml html={_.unlockedTime} />
        <INNERHtml html={_.unlockedTimeEn} />

        <Text className="clear avoid">融资资金使用情况/Use of financing funds:</Text>
        <INNERHtml html={_.fundUse} />
        <INNERHtml html={_.fundUseEn} />

        <Title className="clear avoid">合作伙伴及合作方式/Partners and ways of cooperation:</Title>
        <INNERHtml html={_.cooperative} />
        <INNERHtml html={_.cooperativeEn} />

        <Title className="avoid">特别说明/Other announcements:</Title>

        <Text className="sub-title avoid">团队信息变更情况/The change of team personnel:</Text>
        <INNERHtml html={_.teamExplain} />
        <INNERHtml html={_.teamExplainEn} />

        <Text className="sub-title avoid">成员兼职情况/Are there any part-time employees?:</Text>
        <INNERHtml html={_.staffExplain} />
        <INNERHtml html={_.staffExplainEn} />

        <Title className="avoid">项目代码/Project code:</Title>
        <Text className="sub-title avoid">是否开源/Is the code open-source?:</Text>
        <Text className="avoid">{String(_.isOpenSource) === '1' ? '是/YES' : '否/NO'}</Text>

        <Text className="sub-title avoid">描述核心代码库及已实现功能/what features have been developed/implemented?:</Text>
        <INNERHtml html={_.githubDesc} />
        <INNERHtml html={_.githubDescEn} />

        <Text className="sub-title avoid">描述哪些代码库存在Fork行为/Has your project forked code from other projects?:</Text>
        <INNERHtml html={_.forkDesc} />
        <INNERHtml html={_.forkDescEn} />

        <Title className="avoid">进度/Progress:</Title>

        <Text className="sub-title avoid">项⽬开发及运营路线/Roadmap:</Text>
        <INNERHtml html={_.teamSituation} />
        <INNERHtml html={_.teamSituationEn} />

        <Text className="sub-title avoid">⽬前已完成进度，包括开发及运营/Roadmap:</Text>
        <INNERHtml html={_.projectProgress} />
        <INNERHtml html={_.projectProgressEn} />

        <LesTitle className="avoid">申明/Declaration</LesTitle>
        <Text className="sub-title avoid">
          <div className="avoid">
            {`我代表${_.projectName}项目⽅在此郑重声明，以上所提供的有关${_.projectName}项目的信息是最新、且完全正确的，若有任何虚假或者不实之处，本⼈愿意承担由此带来的任何后果;同时，本人授权⼤炮评级(DPRating)团队可根据需要，在其社区公开发布上述信息，并对${_.projectName}项⽬展开尽职调查。`}
          </div>
          <div className="avoid" style={{ marginTop: '10px' }}>
            {`On behalf of the ${_.projectNameEn} project, I solemnly declare that the information on the purpose of the ${_.projectNameEn} project provided above is up-to-date and completely correct. If there is any false or untrue, I am willing to take it. Any consequences of the visit; at the same time, I authorize the DPRating team to publicly release the above information in their community as needed, and conduct due diligence on the ${_.projectNameEn} project.`}
          </div>
        </Text>
        <div style={{ padding: '30px 0' }}>
          <Table className="avoid">
            <div>
              <span>申请人姓名/Name of applicant:</span>
              <span></span>
            </div>
            <div>
              <span>项⽬名称/Project Name:</span>
              <span></span>
            </div>
            <div>
              <span>⽇期/Date:</span>
              <span></span>
            </div>
            <div>
              <span>申请人签名/Applicant Signature:</span>
              <span></span>
            </div>
          </Table>
        </div>
        <Text>请打印后签字并扫描保存为PDF文档后上传 / Please scan and upload the signed document in PDF format</Text>
      </Wrapper>
    )
  }
}

export default ProjectPdfModel
