import React from 'react'
import PropTypes from 'prop-types'
import Container from 'components/Container'
import ProjectContainer from 'containers/ProjectContainer'
import defaultPage from 'hocs/defaultPage'
import request from 'helpers/request'
import Head from 'helpers/Head'
import api from 'utils/api'
import AutoLeftStaticRight from 'components/Layout/AutoLeftStaticRight'
import AnalysisNewList from 'components/Analysis/NewList'
import HotTagList from 'components/Analysis/HotTagList'
import ChartWithEdit from 'components/Article/ChartWithEdit'
import { Trans } from 'helpers/I18n'
import Pages from 'components/Pages'
import ListItem from '../Analysis/ListItem'
import './index.scss'

const fetch = payload => request(api.getArticleListV2, {
  sourceType: 1,
  pageSize: 10,
  currentPage: 1,
  ...payload,
}).then(res => res.toPage())

class ProjectDetail extends React.PureComponent {
  static async getInitialProps({
    query: { id },
  }) {
    const pages = await fetch({ sourceId: id })

    const detail = await request(api.getProjectByIdV2, { id }).then(res => res.toJson())

    const extendsInfo = await request(api.getRatingByProjectId, { projectDetailId: id }).then(res => res.toJson())

    return {
      id: Number(id),
      detail,
      extendsInfo,
      pages,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handle = (append, currentPage) => {
    fetch({ currentPage: currentPage + 1 })
      .then(pages => append(pages.list, pages.currentPage))
  }

  render() {
    const {
      detail, extendsInfo, pages, id,
    } = this.props

    return (
      <div>
        <Head
          name="projectDetail"
          values={{
            xxx1: detail.projectName,
            xxx2: detail.projectNameEn,
            xxx3: detail.projectSymbol,
            overview: `${detail.projectName}(${detail.projectSymbol})${Trans({ id: '行情分析' })}`,
          }}
        />
        <ProjectContainer detail={detail} extendsInfo={extendsInfo} />
        <AutoLeftStaticRight
          certain={320}
          spacing={20}
          className="PG-pro-analy section m-t-20"
        >
          <div style={{ marginBottom: '20px' }}>
            <Container>
              <ChartWithEdit
                params={{ id }}
                onOk={() => window.location.reload()}
              />
            </Container>
            <ol className="container">
              <Pages
                initail={pages.list}
                currentPage={pages.currentPage}
                totalSize={pages.totalSize}
                pageSize={pages.pageSize}
                item={data => <ListItem data={data} key={data.id} />}
                handle={this.handle}
              />
            </ol>
          </div>

          <div>
            <Container style={{ marginBottom: '20px' }}>
              <AnalysisNewList />
            </Container>
            <Container style={{ marginBottom: '20px' }}>
              <HotTagList />
            </Container>
          </div>
        </AutoLeftStaticRight>
      </div>
    )
  }
}

ProjectDetail.propTypes = {
  id: PropTypes.number,
  locale: PropTypes.string.isRequired,
  pages: PropTypes.object,
  detail: PropTypes.object.isRequired,
  extendsInfo: PropTypes.object.isRequired,
}

export default defaultPage(ProjectDetail)
