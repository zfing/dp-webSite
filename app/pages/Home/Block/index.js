import React from 'react'
import PropTypes from 'prop-types'
import theme from 'utils/theme'
import Link from 'components/Link'
import moment from 'moment'
import { getInvestScore, getRiskScore } from 'utils/dict'
import I18n, { Trans } from 'helpers/I18n'
import TextHide from 'components/TextHide'
import './index.scss'

function RatingBlock({ detail, isWait }) {
  return (
    <Link href={isWait ? `/project/${detail.id}` : `/project/${detail.projectDetailId}`}>
      <a className="PG-home-block" title={Trans({ en: detail.projectNameEn, zh: detail.projectName || detail.projectNameEn, ko: detail.projectNameKo || detail.projectNameEn })}>
        <div className="block-hd">
          <img src={detail.logoUrl} alt={detail.projectSymbol} />
          <div>
            <h3>
              <I18n
                en={detail.projectNameEn}
                zh={detail.projectName || detail.projectNameEn}
                ko={detail.projectNameKo || detail.projectNameEn}
              />
            </h3>
            <h4>{detail.projectSymbol}</h4>
          </div>
        </div>
        {isWait ? (
          <TextHide line={4} height={80}>
            <p>
              <I18n
                zh={detail.description}
                en={detail.descriptionEn}
                ko={detail.descriptionKo || detail.descriptionEn}
              />
            </p>
          </TextHide>
        ) : (
          <div className="block-cell">
            <div>
              <span>
                <I18n id="资质" />
              </span>
              <span style={{ color: theme.blue }}>
                {getInvestScore(detail.investScore)}
              </span>
            </div>
            <div>
              <span>
                <I18n id="风险" />
              </span>
              <span style={{ color: theme.blue }}>
                <I18n value={detail.riskScore} format={getRiskScore} />
              </span>
            </div>
            <div>
              <span>
                <I18n id="评级时间" />
              </span>
              <span style={{ color: '#3B3B49' }}>
                <I18n
                  value={detail.ratingTime}
                  format={(value, local) => (
                    value
                      ? moment(value).format(
                        local === 'zh' ? 'MM月DD日' : 'DD MMM',
                      )
                      : ''
                  )}
                />
              </span>
            </div>
          </div>
        )}
      </a>
    </Link>
  )
}

RatingBlock.defaultProps = {
  isWait: false,
  detail: {},
}

RatingBlock.propTypes = {
  isWait: PropTypes.bool,
  detail: PropTypes.object,
}

export default RatingBlock
