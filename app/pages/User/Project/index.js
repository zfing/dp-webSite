import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import A from 'components/A'
import Link from 'components/Link'
import IconImage from 'components/IconImage'
import { media } from 'utils/theme'
import I18n, { Trans } from 'helpers/I18n'
import securePage from 'hocs/securePage'
import UserLayout from 'components/UserLayout'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectCurrentUser,
  makeSelectUserProject,
} from 'containers/App/selectors'
import { connect } from 'react-redux'
import { getProjectStatus } from 'utils/dict'
import AppActions from 'containers/App/redux'
import ApplyActions from 'containers/Apply/redux'
import dynamic from 'next/dynamic'
import request from 'helpers/request'
import api from 'utils/api'
import Toast from 'components/Toast'
import TxhashConfirm from './TxhashConfirm'
import {
  selectApplyRecodeList,
} from './selectors'
import Actions from './redux'

const TuneConfirm = dynamic({
  loader: () => import('./TuneConfirm'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

const Cell = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(218,233,241,0.50);

  ${media(`
    flex-direction: column;
    align-items: flex-start;

    .toolarea {
      margin-top: 12px;
    }
  `, '<sm')}

  div:first-child {
    display: flex;
    align-items: center;
  }

  h3 {
    margin: 0;
    padding: 0;
    margin-bottom: 2px;
    
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #001C4B;
    letter-spacing: 0.06px;
  }

  span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9B9B9B;
  }
`

const LogoImg = styled(IconImage)`
  width: 48px;
  margin-right: 18px;
`

const Btn = styled(Button)`
  min-height: 40px;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  display: inline-block;
`

const NullCenter = styled.div`
  text-align: center;
  margin-top: 80px;
`

function isOrg(role) {
  return Number(role) === 2
}

function isPerson(role) {
  return Number(role) === 1
}

function isShowTune(role, status) {
  return isOrg(role) && (Number(status) === 10 || Number(status === 12))
}

function isShowApplyVote(role, status) {
  if (isOrg(role)) {
    return Number(status) === 1
  }
  return Number(status) === 9
}

// function isShowTxhash(status) {
//   return Number(status) === 5 || Number(status) === 8
// }

function rendertReportBtn(item) {
  const reportId = !Number.isNaN(Number(item.reportId)) ? String(item.reportId) : ''
  return reportId ? (
    <Link href={`/rating/report/${reportId}`} passHref>
      <A style={{ marginLeft: '20px' }} target="_blank">
        <Btn>
          <I18n id="查看报告" />
        </Btn>
      </A>
    </Link>
  ) : null
}

class Account extends React.Component {
  componentDidMount() {
    if (isPerson(this.props.currentUser.role)) {
      this.props.query()
    }
  }

  applyVote = async ({ id, projectName }) => {
    try {
      const { currentUser } = this.props
      const payload = { id, projectName }
      if (!isOrg(currentUser.role)) {
        delete payload.id // 个人申请传项目名
      }

      const data = await request(api.vote, payload)
      if (data.resultCode === '0') {
        Toast.success(Trans({
          zh: '申请成功',
          en: '申请成功',
          ko: '申请成功',
        }))
      } else {
        throw Error(data.msg)
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  render() {
    const {
      currentUser, applyList, userProject, onTuneConfirm, showApply,
    } = this.props
    const currentIsOrg = isOrg(currentUser.role)

    const isEmptyUserProject = Number.isNaN(Number(userProject.id))

    const listData = currentIsOrg
      ? (isEmptyUserProject ? [] : [userProject])
      : applyList

    return (
      <UserLayout currentModel="project">
        {listData.map((item, key) => (
          <Cell key={key}>
            <div>
              <LogoImg src={item.logoUrl} alt="DPRating" />
              <div>
                <h3>{item.projectName}</h3>
                <span><I18n {...getProjectStatus(item.status)} /></span>
              </div>
            </div>
            <div className="toolarea">
              {isShowApplyVote(currentUser.role, item.status) ? (
                <Btn outline onClick={() => this.applyVote(item)} style={{ marginLeft: '20px' }}>
                  <I18n zh="申请投票评级" en="申请投票评级" ko="申请投票评级" />
                </Btn>
              ) : null}

              {currentIsOrg && (
                <Link href="/writer/project?type=2" passHref>
                  <A target="_blank">
                    <Btn><I18n id="项目管理" /></Btn>
                  </A>
                </Link>
              )}
              {/* isShowTxhash(item.status) && (
                <Btn style={{ marginLeft: '20px' }} onClick={() => onTxhashConfirm(item.id)}>
                  <I18n zh="代币燃烧" en="Burning Token" />
                </Btn>
              ) */}
              {isShowTune(currentUser.role, item.status) ? (
                <Btn onClick={onTuneConfirm} style={{ marginLeft: '20px' }}>
                  <I18n zh="上传尽调协议" en="Upload due diligence" ko="실사계약 업로드" />
                </Btn>
              ) : null}
              {rendertReportBtn(item)}
            </div>
          </Cell>
        ))}
        {listData.length ? <TxhashConfirm /> : (
          <NullCenter>
            <Btn onClick={showApply}><I18n id="申请评级" /></Btn>
          </NullCenter>
        )}
        <div style={{ height: '0', overflow: 'hidden' }}>
          {isShowTune(currentUser.role, userProject.status) ? <TuneConfirm /> : null}
        </div>
      </UserLayout>
    )
  }
}

Account.propTypes = {
  currentUser: PropTypes.object.isRequired,
  // onTxhashConfirm: PropTypes.func.isRequired,
  applyList: PropTypes.array.isRequired,
  userProject: PropTypes.object.isRequired,
  onTuneConfirm: PropTypes.func.isRequired,
  showApply: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  applyList: selectApplyRecodeList(),
  userProject: makeSelectUserProject(),
})

const mapDispatchToProps = dispatch => ({
  // onTxhashConfirm: selected => dispatch(AppActions.onTxhashConfirm(true, selected)),
  onTuneConfirm: () => dispatch(AppActions.onTuneConfirm(true)),
  query: () => dispatch(Actions.getApplyListRequest()),
  showApply: () => dispatch(ApplyActions.applyToggle(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(securePage(Account))
