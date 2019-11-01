import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import I18n from 'helpers/I18n'
import Tooltip from '@material-ui/core/Tooltip'
import TextHide from 'components/TextHide'
import A from 'components/A'
import IconImage from 'components/IconImage'
import { withStyles } from '@material-ui/core/styles'
import theme from 'utils/theme'
import { completeUrl } from 'components/Link'

const Table = styled.table`
  width: 100%;
  margin-top: 12px;

  @media (max-width: 780px) {
    thead th:nth-child(2),
    tbody tr td:nth-child(2) {
      display: none;
    }
  }

  thead {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #001c4b;
    letter-spacing: 0.05px;
    text-align: left;

    th {
      font-weight: normal;
      height: 32px;
    }
  }

  tbody {
    tr {
      height: 76px;
      background: #ffffff;
      box-shadow: inset 0 1px 0 0 rgba(218, 233, 241, 0.8);
    }
    td {
      &:nth-child(1) {
        width: 220px;
      }
      &:nth-child(2) {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 28, 75, 0.6);
        letter-spacing: 0.05px;
        padding-right: 5px;
      }
    }
  }

  .iconfont {
    color: ${theme.blue};
    font-size: 20px;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled(IconImage)`
  height: 50px;
  width: 50px;
`

const Info = styled.div`
  margin-left: 16px;
  p,
  h4 {
    margin: 0;
    padding: 0;
    font-weight: normal;

    width: 124px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4 {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #001c4b;
    letter-spacing: 0.06px;
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 28, 75, 0.4);
    letter-spacing: 0.05px;
  }
`

const styles = () => ({
  customWidth: {
    maxWidth: 500,
    fontSize: '14px',
    lineHeight: '18px',
  },
})

function TeamList({ list, classes }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <I18n id="名字" />
          </th>
          <th>
            <I18n id="简介" />
          </th>
          <th style={{ textAlign: 'right' }}>
            <I18n id="社交" />
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, key) => (
          <tr key={key}>
            <td>
              <IconWrapper>
                <Icon src={item.avatarUrl} alt={item.positionName} />
                <Info>
                  <h4>{item.name}</h4>
                  <Tooltip
                    disableFocusListener
                    classes={{ tooltip: classes.customWidth }}
                    title={item.positionName}
                  >
                    <TextHide line={2} height={40}>
                      <p>{item.positionName}</p>
                    </TextHide>
                  </Tooltip>
                </Info>
              </IconWrapper>
            </td>
            <td>
              <I18n
                zh={item.description}
                en={item.descriptionEn}
                ko={item.descriptionKo || item.descriptionEn}
                wrapper={message => (
                  <Tooltip
                    disableFocusListener
                    classes={{ tooltip: classes.customWidth }}
                    title={message}
                  >
                    <TextHide line={3} height={60}>
                      <span>{message}</span>
                    </TextHide>
                  </Tooltip>
                )}
              />
            </td>
            <td style={{ width: '38px', textAlign: 'right' }}>
              {item.linkedinUrl && (
                <A target="_blank" href={completeUrl(item.linkedinUrl)}>
                  <i className="iconfont icon-linkin-fill" />
                </A>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TeamList.defaultProps = {
  list: [],
}

TeamList.propTypes = {
  list: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(TeamList)
