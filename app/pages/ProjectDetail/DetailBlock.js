import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { getPriceType } from 'utils/dict'
import I18n from 'helpers/I18n'
import Block, { Title } from './Block'

import {
  isDate, handleNADate, isLegalNumber, handleNANumber,
} from './utils'

const DetailItem = styled.div`
  margin-top: 10px;

  div {
    display: inline-block;
    &:first-child {
      vertical-align: top;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7f8da5;
      letter-spacing: 0.05px;
      width: 176px;
    }
    &:last-child {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #001c4b;
      letter-spacing: 0.05px;
      max-width: 103px;
      word-break: break-all;
    }
  }
`

function DetailBlock({ detail = {}, extended, ...props }) {
  const startDate = handleNADate(detail.startDate)
  const endDate = handleNADate(detail.endDate)

  const projectExchangeList = Array.isArray(detail.projectExchangeList)
    ? detail.projectExchangeList
    : []

  return (
    <Block {...props}>
      <Title>
        <I18n id="详情" />
      </Title>
      <DetailItem>
        <div>
          <I18n id="代币符号" />
        </div>
        <div>{detail.projectSymbol}</div>
      </DetailItem>
      <DetailItem>
        <div>
          <I18n id="众筹成本" />
        </div>
        <div>
          {handleNANumber(detail.price)}
          {' '}
          {isLegalNumber(detail.price) ? getPriceType(detail.priceType) : ''}
        </div>
      </DetailItem>
      <DetailItem>
        <div>
          <I18n id="发行总量" />
        </div>
        <div>{handleNANumber(detail.totalNum)}</div>
      </DetailItem>
      <DetailItem>
        <div>
          <I18n id="流通量" />
        </div>
        <div>{handleNANumber(detail.circulatingNum)}</div>
      </DetailItem>
      <DetailItem>
        <div>
          <I18n id="众筹开始时间" />
        </div>
        <div>
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
        </div>
      </DetailItem>
      <DetailItem>
        <div>
          <I18n id="众筹结束时间" />
        </div>
        <div>
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
        </div>
      </DetailItem>
      {Number(detail.hasReleased) === 1 && (
        <DetailItem>
          <div>
            <I18n id="交易所" />
          </div>
          <div>{projectExchangeList.map(_ => _.name).join(',')}</div>
        </DetailItem>
      )}

      {extended || null}
    </Block>
  )
}

DetailBlock.propTypes = {
  detail: PropTypes.object,
  extended: PropTypes.node,
}

export default DetailBlock
