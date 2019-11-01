import React from 'react'
import PropTypes from 'prop-types'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import api from 'utils/api'
import Head from 'helpers/Head'
import I18n, { Trans } from 'helpers/I18n'
import Table from 'pureui/Table'
import Button from 'components/Button'
import Link from 'components/Link'
import Toast from 'components/Toast'
import Router from 'helpers/router'
import moment from 'moment'
import redirect from 'helpers/redirect'
import { Line } from 'rc-progress'
import { connect } from 'react-redux'
import ApplyActions from 'containers/Apply/redux'
import './index.scss'

class Vote extends React.PureComponent {
  static async getInitialProps({ query: { id }, ...ctx }) {
    const isListPage = !id
    let periodList = []
    let voteDetail = {}
    let voteProList = []

    if (isListPage) {
      periodList = await request(api.voteList, {
        currentPage: 1,
        pageSize: 100,
      })
        .then(res => res.toArray('list'))
    } else {
      const data = await request(api.voteDetail, { id })
      if (data.resultCode === '0') {
        voteDetail = data.data
        voteProList = await request(api.voteProList, {
          periodsId: id,
          status: 1,
          pageSize: 100,
        }).then(res => res.toArray('list'))
      } else {
        return redirect('/404', ctx)
      }
    }

    return {
      isListPage,
      periodList,
      voteDetail,
      voteProList,
    }
  }

  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  state = {
    selected: [],
  }

  handleVote = (e) => {
    e.preventDefault()
    this.context.verifyLogin(async () => {
      try {
        const { selected } = this.state
        if (selected.length) {
          const data = await request(api.doVote, { id: selected.join(',') })
          if (data.resultCode === '0') {
            Toast.success(Trans({ id: '投票成功' }))
          } else {
            throw Error(data.msg)
          }
        } else {
          throw Error(Trans({ id: '请选择一个项目' }))
        }
      } catch (err) {
        Toast.error(err.message)
      }
    })
  }

  onChange = (e, id) => {
    id = Number(id)
    let { selected } = this.state
    if (e.target.checked) {
      selected = [...selected, id]
    } else {
      selected = selected.filter(_ => _ !== id)
    }
    this.setState({ selected })
  }

  toUserProject = () => {
    this.context.verifyLogin(() => {
      Router.push('/user/project')
    })
  }

  render() {
    const { isListPage } = this.props
    if (isListPage) {
      const { periodList } = this.props
      const columns = [
        {
          title: <I18n id="期数" />,
          width: '100px',
          render: record => record.periodsNumber,
        },
        {
          title: <I18n id="活动标题" />,
          width: '200px',
          render: record => (
            <h3>
              <Link href={`/vote/${record.id}`}>
                <a className="link" title={record.votingTitle}>{record.votingTitle}</a>
              </Link>
            </h3>
          ),
        },
        {
          title: <I18n id="投票时间" />,
          width: '250px',
          render: record => (
            <span>
              {moment(record.votingStart).format('YYYY/MM/DD HH:mm')}
              {' - '}
              {moment(record.votingEnd).format('YYYY/MM/DD HH:mm')}
            </span>
          ),
        },
        {
          title: <I18n id="状态" />,
          width: '120px',
          render: record => record.status === 1
            ? <I18n id="进行中" />
            : <I18n id="已关闭" />,
        },
      ]

      return (
        <div className="PG-vote">
          <Head name="voteList" />
          <div className="PG-vote-hd">
            <div className="PG-vote-hd-m">
              <h1>
                <I18n
                  zh="DPRating 投票评级活动专区"
                  en="DPRating Community Vote for Rating"
                  ko="DPRating 투표 등급평가 활동존"
                />
              </h1>
            </div>
          </div>
          <div className="PG-vote-m">
            <Table
              className="PG-vote-tb"
              columns={columns}
              dataSource={periodList}
            />
            {!periodList.length ? <div className="m-20 text-center"><I18n id="暂无" /></div> : null}
          </div>
        </div>
      )
    }

    const { voteDetail, voteProList, showApply } = this.props

    const totalScorce = voteProList.reduce((prev, cur) => prev + cur.votingNumber, 0)

    const columns = [
      {
        title: '',
        width: '100px',
        render: record => (
          <div className="icon-wrapper">
            <input
              type="checkbox"
              onChange={e => this.onChange(e, record.id)}
            />
          </div>
        ),
      },
      {
        title: <I18n id="项目" />,
        width: '150px',
        render: record => (
          <h3>
            <Link href={`/project/${record.projectId}`}>
              <a target="__blank" title={record.projectName}>{record.projectName}</a>
            </Link>
          </h3>
        ),
      },
      {
        title: <I18n id="当前得票" />,
        width: '100px',
        render: record => record.votingNumber,
      },
      {
        title: <I18n id="占比" />,
        width: '200px',
        render: (record) => {
          const perc = totalScorce
            ? Math.round(100 * (record.votingNumber / totalScorce))
            : 0
          return (
            <span>
              <div
                style={{
                  width: '120px',
                  display: 'inline-block',
                  marginRight: '10px',
                }}
              >
                <Line
                  trailWidth="3"
                  strokeWidth="3"
                  trailColor="#ECEEF8"
                  percent={perc}
                />
              </div>
              {`${perc}%`}
            </span>
          )
        },
      },
    ]
    const createTime = moment(voteDetail.gmtCreate).format('YYYY-MM-DD HH:mm')
    const starTime = moment(voteDetail.votingStart).format('YYYY-MM-DD HH:mm')
    const endTime = moment(voteDetail.votingEnd).format('YYYY-MM-DD HH:mm')

    return (
      <div className="PG-vote">
        <Head name="voteDetail" values={{ xxx1: voteDetail.votingTitle }} />
        <div className="PG-vote-hd">
          <h1>{voteDetail.votingTitle}</h1>
          <p>
            <I18n id="活动时间" />
            {`：${createTime} - ${endTime}`}
          </p>
        </div>
        <div className="PG-vote-m">
          <form
            onSubmit={this.handleVote}
            name="form"
          >
            <Table
              className="PG-vote-tb"
              columns={columns}
              dataSource={voteProList}
            />
            {!voteProList.length ? <div className="m-20 text-center"><I18n id="暂无" /></div> : null}
            <Button
              className="vote-btn"
              disabled={voteDetail.status !== 1}
              type="submit"
            >
              {voteDetail.status === 1 ? <I18n id="开始投票" /> : <I18n id="已关闭" />}
            </Button>
          </form>
          <div className="PG-vote-note">
            <h3>
              <I18n
                zh="待投票项目征集流程："
                en="The process of collecting the candidates for voting: "
                ko="투표 대기 프로젝트 모집 프로세스: "
              />
            </h3>
            <p>
              <I18n
                zh={`1、报名时间：${createTime} - ${starTime}；`}
                en={`1. Registration Period: ${createTime} to ${starTime} (UTC+8);`}
                ko={`1. 지원시간: ${createTime}부터 ${starTime}까지.`}
              />
            </p>
            <p>
              <I18n
                zh="2、项目方或其社区成员均可发起报名；"
                en="2. Both the project team and a community member can register a project for voting;"
                ko="2. 프로젝트 보유자 또는 커뮤니티 구성원은 모두 지원을 발기할 수 있습니다."
              />
            </p>
            <p>
              <I18n
                zh={(
                  <span>
                    {'3、项目方发起报名，需要先提交“'}
                    <a href="javascript:;" onClick={showApply}>申请评级</a>
                    {'”，并在完成材料填写后，在个人中心的“'}
                    <a href="javascript:;" onClick={this.toUserProject}>申请的评级</a>
                    {'”中选择参与投票；'}
                  </span>
                )}
                en={(
                  <span>
                    {'3. If the project team registers for the vote, it is necessary to complete the "'}
                    <a href="javascript:;" onClick={showApply}>Apply for Rating</a>
                    {'" first, and after filling out the information, opt into the "'}
                    <a href="javascript:;" onClick={this.toUserProject}>Community Vote</a>
                    {'" in the User Center for the project;'}
                  </span>
                )}
                ko={(
                  <span>
                    {'3. 프로젝트 보유자가 지원을 발기하려면 우선 "'}
                    <a href="javascript:;" onClick={showApply}>등급평가 신청</a>
                    {'"을 제출해야 하며 자료를 작성한 후 개인센터의 "'}
                    <a href="javascript:;" onClick={this.toUserProject}>신청한 등급평가</a>
                    {'"에서 투표 참여를 선택합니다'}
                  </span>
                )}
              />
            </p>
            <p>
              <I18n
                zh={(
                  <span>
                    {'4、社区成员发起报名，需要先提交“'}
                    <a href="javascript:;" onClick={showApply}>申请评级</a>
                    {'”，然后在个人中心的“'}
                    <a href="javascript:;" onClick={this.toUserProject}>申请的评级</a>
                    {'”中选择参与投票；'}
                  </span>
                )}
                en={(
                  <span>
                    {'4. If a community member registers for the vote, he/she need to submit the "'}
                    <a href="javascript:;" onClick={showApply}>Apply for Rating</a>
                    {'" first, and then opt into the "'}
                    <a href="javascript:;" onClick={this.toUserProject}>Community Vote</a>
                    {'" in the User Center for the project;'}
                  </span>
                )}
                ko={(
                  <span>
                    {'4. 커뮤니티 구성원이 지원을 발기하려면 우선 "'}
                    <a href="javascript:;" onClick={showApply}>등급평가 신청</a>
                    {'"을 제출해야 하며 개인센터의 "'}
                    <a href="javascript:;" onClick={this.toUserProject}>신청한 등급평가</a>
                    {'"에서 투표 참여를 선택합니다.'}
                  </span>
                )}
              />
            </p>
            <p>
              {'5、'}
              <I18n
                zh="最终获投票第1名的项目，我们将在投票结束后一周内，免费发布其评级报告，但请注意，评级是个严肃行为，评级结果会确保客观中立，评级报告发布前不会提供预览给申请者；"
                en="The community voted project that receives the most votes will earn a place for free rating, subject to final review. We will release its Rating Report for free within one week, but please note that the rating process is serious, the rating results remain objective and neutrality, and the report will not provide a preview to the applicant before it is released."
                ko="최종 투표 1위의 프로젝트에 대해 우리는 투표 종료후 1주일 내에 무료 등급평가 보고서를 발표합니다. 유의해야 할 점은 등급평가는 아주 진지한 행위이며 등급평가 결과는 객관적인 중립을 유지해야 하고 등급평가 보고서를 발표하기 전에 신청자에게 미리보기를 제공하지 않습니다."
              />
            </p>
            <h3 className="m-t-20">
              <I18n
                zh="投票规则："
                en="Voting Rules: "
                ko="투표규칙: "
              />
            </h3>
            <p>
              <I18n
                zh={`1、投票时间：${starTime} - ${endTime}；`}
                en={`1. Voting Period: ${starTime} - ${endTime} (UTC+8);`}
                ko={`1. 투표시간:${starTime} - ${endTime}.`}
              />
            </p>
            <p>
              <I18n
                zh="2、只有大炮评级官网注册用户才有资格参与投票；"
                en="2. Only registered users in DPRating are eligible to vote;"
                ko="2. DPRating 등급평가 공식 웹사이트에 등록한 사용자만이 투표에 참여할 자격이 있습니다."
              />
            </p>
            <p>
              <I18n
                zh="3、每位注册用户每期活动只有一次投票机会，每次可为多个项目投票；"
                en="3. Each registered user has only one chance to vote, and can vote for many projects at the same time;"
                ko="3. 모든 등록 사용자는 기수마다 투표기회가 1회 있으며, 매번 여러 프로젝트에 투표할 수 있습니다."
              />
            </p>
            <p>
              <I18n
                zh="4、请广泛发动并邀请其社区成员参与投票，但禁止刷票，或以提供金钱激励、投票返佣等方式影响用户投票意愿的行为；"
                en="4. Please actively encourage your community members to participate in the voting, but it is forbidden to manipulate the votes, including to provide any form of financial or monetary incentives, airdrops or competition rewards offered that will influence user votes."
                ko="4. 다른 커뮤니티 구성원들을 널리 발동 및 요청해서 투표에 참여하도록 하세요. 하지만 브러쉬 티켓이나 자금으로 동기부여하거나 투표 리베이트 등 방식으로 사용자의 투표 의지에 영향을 미치는 행위는 금지합니다."
              />
            </p>
            <div className="hr" />
            <h3>
              <I18n
                zh="注意：DPRating保留审查投票并调整活动规则的权利，包括但不限于撤销投票结果、取消项目参与投票的资格等。"
                en="Note: DPRating reserves all rights to change the rules of this event without notification. This includes but is not limited to the revoking of results or disqualification of candidates who are confirmed to have engaged in vote manipulation."
                ko="주의점: DPRating은 투표에 대해 심사하고 활동 규칙을 조정할 권리를 보류하며 투표 결과 철회, 프로젝트 투표 자격 취소 등을 포함하되 이에 국한되지 않습니다."
              />
            </h3>
          </div>
        </div>
      </div>
    )
  }
}

Vote.propTypes = {
  voteDetail: PropTypes.object,
  voteProList: PropTypes.array,
  isListPage: PropTypes.bool,
  periodList: PropTypes.array,
  showApply: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  showApply: () => dispatch(ApplyActions.applyToggle(true)),
})

export default connect(
  null,
  mapDispatchToProps,
)(defaultPage(Vote))
