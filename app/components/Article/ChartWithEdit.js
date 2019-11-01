import React from 'react'
import PropTypes from 'prop-types'
import Toast from 'components/Toast'
import TitleBar from 'components/TitleBar'
import { Trans } from 'helpers/I18n'
import request from 'helpers/request'
import api from 'utils/api'
import dynamic from 'next/dynamic'
import { getAnalysisNums } from './helpers'
import Chart from './Chart'

const Edit = dynamic({
  loader: () => import('./Edit'),
  loading: () => (<p>Loading ...</p>),
  ssr: false,
})

class ChartWithEdit extends React.PureComponent {
  instance = {}

  timer = null

  state = {
    analysisInfo: {},
    analysisType: 1,
  }

  static contextTypes = {
    verifyLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.getAnalysis(this.state.analysisType, true)
  }

  getAnalysis = async (type, isAuto = false) => {
    try {
      type = type || this.state.analysisType
      const data = await request(api.getAnalysis, {
        id: this.props.params.id,
        type,
      })
      if (data.resultCode === '0') {
        this.setState({
          analysisInfo: data.data,
          analysisType: type,
        })
      } else if (data.resultCode === '5' && isAuto && (type < 3)) {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.getAnalysis(type + 1, true)
        }, 600)
      } else {
        this.setState({
          analysisInfo: {},
          analysisType: type,
        })
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  edit = () => {
    this.context.verifyLogin(this.instance.open)
  }

  render() {
    const { analysisInfo, analysisType } = this.state
    const { params, onOk, opened } = this.props
    return (
      <div>
        <TitleBar
          title={Trans({ id: '行情分析' })}
          suffix={Trans({ id: '发表观点' })}
          onSuffix={this.edit}
        />
        <Chart
          selected={analysisType}
          onChange={this.getAnalysis}
          nums={getAnalysisNums(analysisInfo)}
          score={analysisInfo.avgScore}
        />
        <Edit
          opened={opened}
          onInstance={(ref) => { this.instance = ref }}
          params={{ sourceId: params.id }}
          onOk={onOk}
        />
      </div>
    )
  }
}

ChartWithEdit.defaultProps = {
  params: {},
  onOk: () => {},
  opened: false,
}

ChartWithEdit.propTypes = {
  params: PropTypes.object,
  onOk: PropTypes.func,
  opened: PropTypes.bool,
}

export default ChartWithEdit
