import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Wrapper from './Wrapper'
import LeftMenu from './LeftMenu'
import LeftSubMenu from './LeftSubMenu'
import TypeSelect from './TypeSelect'
import {
  makeSelectCategoryList,
  makeSelectFundList,
  makeSelectExchangeList,
  makeSelectProjectDetail,
  makeSelectInLoading,
} from './selectors'
import Actions from './redux'
import { menus } from './SubMenuData'
import ContentPage from './ContentPage'

class WriteProject extends React.PureComponent {
  componentDidMount() {
    this.props.getCategoryList()
    this.props.getFundList()
    this.props.getExchangeList()

    // 分析师更新、项目方更新才获取详情
    if (this.inType() || this.inType('2')) {
      this.props.getProjectList({}, true)
    }
  }

  // type => 1 分析师新增; 2 项目方更新; 其他 分析师更新
  inType = (type) => {
    const search = this.props.search
    if (type === '1' || type === '2') {
      return search.type === type
    }
    return search.type !== '1' && search.type !== '2'
  };

  render() {
    const {
      projectDetail,
      categoryList,
      fundList,
      exchangeList,
      inLoading,
      save,
    } = this.props

    return (
      <Wrapper>
        <style>
          {'#__next { height: 100%; }'}
        </style>
        {this.inType() && (
          <LeftMenu>
            <TypeSelect />
          </LeftMenu>
        )}
        <LeftSubMenu dark={!this.inType()} selected="0" menus={menus} />
        <ContentPage
          inLoading={inLoading}
          categoryList={categoryList}
          fundList={fundList}
          exchangeList={exchangeList}
          save={save}
          detail={projectDetail}
          // disabled={
          //   this.inType('2') &&
          //   (String(projectDetail.status) !== '0' &&
          //     String(projectDetail.status) !== '6')
          // } // 未通过或者初始状态才能够修改
        />
      </Wrapper>
    )
  }
}

WriteProject.propTypes = {
  categoryList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  fundList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  exchangeList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  projectDetail: PropTypes.object.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getFundList: PropTypes.func.isRequired,
  getExchangeList: PropTypes.func.isRequired,
  getProjectList: PropTypes.func.isRequired,
  getProjectDetail: PropTypes.func.isRequired,
  inLoading: PropTypes.bool,
  search: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
  fundList: makeSelectFundList(),
  exchangeList: makeSelectExchangeList(),
  categoryList: makeSelectCategoryList(),
  inLoading: makeSelectInLoading(),
})

const mapDispatchToProps = dispatch => ({
  getProjectList: (payload, reload) => dispatch(Actions.getProjectListRequest(payload, reload)),
  getProjectDetail: payload => dispatch(Actions.getProjectDetailRequest(payload)),
  getCategoryList: () => dispatch(Actions.getCategoryListRequest()),
  getFundList: () => dispatch(Actions.getFundListRequest()),
  getExchangeList: () => dispatch(Actions.getExchangeListRequest()),
  save: (payload, options) => dispatch(Actions.saveProjectRequest(payload, options)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteProject)
