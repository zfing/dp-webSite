import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'helpers/I18n'
import { toJson } from 'helpers/types'
import styled from 'styled-components'
import Link from 'components/Link'
import TextHide from 'components/TextHide'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import StatusItem from 'components/Article/StatusItem'
import TagName from 'components/Analysis/TagName'
import moment from 'moment'
import { media } from 'utils/theme'
import './index.scss'

const Wrapper = styled.li`
  ${media('flex-direction: column;', '<sm')}
`

const Main = styled.div`
  ${media('padding-right: 0;', '<sm')}
`


const Cover = styled.div`
  position: relative;
  width: 168px;
  height: 114px;
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center center;
  ${props => props.bgUrl && `background-image: url(${props.bgUrl});`}

  ${media(`
    order: -1;
    width: 100%;
    height: 120px;
    margin-bottom: 10px;
  `, '<sm')}
`

const Item = styled(StatusItem)`
  position: absolute;
  right: 13px;
  top: 13px;
`

function ListItem({ data, hideUserLink }) {
  const _ = toJson(data)

  return (
    <Wrapper className="PG-analysis-list-item">
      <Main className="main">
        <div className="hd">
          <TextHide width="calc(100% - 35px)" line={1} height={24}>
            <h3>
              {Number(_.topFlag) === 1 ? <span className="top"><I18n id="置顶" /></span> : null}
              {Number(_.valuableFlag === 1) ? <span className="pith"><I18n id="精" /></span> : null}
              <Link href={`/article/${_.id}`}>
                <a title={_.title}>{_.title}</a>
              </Link>
            </h3>
          </TextHide>
        </div>
        <TextHide line={2} height={42}>
          <p>{_.subContent}</p>
        </TextHide>
        <div className="ft">
          {hideUserLink ? (
            <span className="left">{moment(_.gmtCreate).format('YYYY-MM-DD HH:mm')}</span>
          ) : (
            <a href={`/member/analysis/${_.userId}`}>
              <Avatar size={24} src={_.logoUrl} className="left" />
              <span className="left">
                <TagName
                  name={_.userName}
                  tagSize={16}
                  points={_.marketsPoints}
                  style={{ marginRight: '5px' }}
                />
                {`| ${moment(_.gmtCreate).format('YYYY-MM-DD HH:mm')}`}
              </span>
            </a>
          )}
          <div className="icons">
            <span>
              <Icon className="icon-dianzanx" />
              {_.likeNum || 0}
            </span>
            <span>
              <Icon className="icon-chakanx" />
              {_.viewNum || 0}
            </span>
            <span>
              <Icon className="icon-dianpingx" />
              {_.commentNum || 0}
            </span>
          </div>
        </div>
      </Main>
      {_.headImg ? (
        <Cover bgUrl={_.headImg}>
          <Item isFill point={_.point} />
        </Cover>
      ) : <Item isFill point={_.point} />}
    </Wrapper>
  )
}

ListItem.defaultProps = {
  data: {},
  hideUserLink: false,
}

ListItem.propTypes = {
  data: PropTypes.object,
  hideUserLink: PropTypes.bool,
}

export default ListItem
