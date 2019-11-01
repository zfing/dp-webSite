import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'helpers/I18n'
import { toJson } from 'helpers/types'
import Link from 'components/Link'
import TextHide from 'components/TextHide'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import moment from 'moment'
import brokeRoute from 'utils/brokeRoute'
import { getLeaksImg, getLeaksName } from 'utils/dict'
import './index.scss'

function ListItem({ data, hideUserLink }) {
  const _ = toJson(data)

  return (
    <li className="PG-broke-list-item">
      <div className="hd">
        <TextHide width="calc(100% - 70px)" line={1} height={24}>
          <h3>
            {Number(_.topFlag) === 1 ? <span className="top"><I18n id="置顶" /></span> : null}
            {Number(_.valuableFlag === 1) ? <span className="pith"><I18n id="精" /></span> : null}
            <Link href={`/article/${_.id}`}>
              <a title={_.title}>{_.title}</a>
            </Link>
          </h3>
        </TextHide>
      </div>
      <p>{_.subContent}</p>
      <div className="ft">
        {hideUserLink ? (
          <span className="left">{moment(_.gmtCreate).format('MM/DD HH:mm')}</span>
        ) : (
          <a href={`/member/broke/${brokeRoute.encode(_.userId)}`}>
            <Avatar
              src={getLeaksImg(_.leaksPoints)}
              size={24}
              className="left"
              style={{ marginRight: '8px' }}
            />
            <span className="left">{`${getLeaksName(_.leaksPoints)} | ${moment(_.gmtCreate).format('MM/DD HH:mm')}`}</span>
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
    </li>
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
