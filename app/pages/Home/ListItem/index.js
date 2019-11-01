import React from 'react'
import PropTypes from 'prop-types'
import I18n, { Trans } from 'helpers/I18n'
import { toJson } from 'helpers/types'
import styled from 'styled-components'
import Link from 'components/Link'
import TextHide from 'components/TextHide'
import Avatar from 'components/Avatar'
import StatusItem from 'components/Article/StatusItem'
import TagName from 'components/Analysis/TagName'
import moment from 'moment'
import brokeRoute from 'utils/brokeRoute'
import { getLeaksImg, getLeaksName } from 'utils/dict'
import Icons from './Icons'
import './index.scss'

const Item = styled(StatusItem)`
  float: right;
  margin-left: 5px;
  line-height: 16px;
  font-size: 12px;
  padding: 0 6px;
  font-family: PingFangSC-Regular;
  transform: scale(0.9);
`

function ListItem({ data, showTypes }) {
  const _ = toJson(data)
  const isAnos = Number(_.sourceType) === 7
  return (
    <div className="Ph-list-item">
      <div className="hd">
        <TextHide width="calc(100% - 65px)" line={1} height={18}>
          <h3>
            {Number(_.topFlag) === 1 ? <span className="top"><I18n id="置顶" /></span> : null}
            {Number(_.valuableFlag === 1) ? <span className="pith"><I18n id="精" /></span> : null}
            <Link href={`/article/${_.id}`} passHref>
              <a title={_.title}>
                {showTypes ? `【${Trans({ id: isAnos ? '爆料' : '分析' })}】` : ''}
                {_.title}
              </a>
            </Link>
          </h3>
        </TextHide>
        <div>{!isAnos && <Item point={_.point} />}</div>
      </div>
      <TextHide line={2} height={32}>
        <p>{_.subContent}</p>
      </TextHide>
      <div className="ft">
        <Link href={isAnos ? `/member/broke/${brokeRoute.encode(_.userId)}` : `/member/analysis/${_.userId}`}>
          <a>
            <Avatar
              v={isAnos ? 0 : Number(_.userQualification)}
              src={isAnos ? getLeaksImg(_.leaksPoints) : _.logoUrl}
              size={24}
              className="left"
              style={{ marginRight: '8px' }}
            />
            <span className="left">
              {isAnos
                ? getLeaksName(_.leaksPoints)
                : <TagName name={_.userName} size={12} points={_.marketsPoints} />}
              {` | ${moment(_.gmtCreate).format('MM/DD HH:mm')}`}
            </span>
          </a>
        </Link>
        <Icons data={data} />
      </div>
    </div>
  )
}

ListItem.defaultProps = {
  data: {},
  showTypes: false,
}

ListItem.propTypes = {
  data: PropTypes.object,
  showTypes: PropTypes.bool,
}

export default ListItem
