import React from 'react'
import H3 from 'components/H3'
import styled from 'styled-components'
import theme from 'utils/theme'
import I18n from 'helpers/I18n'
import config from 'utils/config'

const { SOURCE_URL } = config

const Wrapper = styled.div`
  margin-top: 38px;
  overflow-x: scroll;
`

const Content = styled.div`
  min-width: 600px;
`

const Title = styled(H3)`
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: ${theme.default};
  letter-spacing: 0.14px;
`

const Table = styled.table`
  border: 1px solid rgba(218, 233, 241, 0.8);
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`

const TR = styled.tr`
  &:nth-child(2n-1) {
    background: #f5f9fa;
  }

  td {
    padding: 16px;
    &:nth-child(2n-1) {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: ${theme.default};
      letter-spacing: 0.06px;
    }
    &:nth-child(2n) {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0, 28, 75, 0.7);
      letter-spacing: 0.06px;
      text-align: right;
    }
    &:nth-child(2) {
      padding-right: 32px;
    }
    &:nth-child(3) {
      padding-left: 32px;
    }
  }

  ${props => props.noPadBt
    && `
    td {
      padding-bottom: 0;
    }
  `};
`

const ImageTd = styled.td`
  text-align: right;
  padding-right: 16px;
`

const Image = styled.img`
  height: 114px;
  width: 114px;
`

function Contact() {
  return (
    <Wrapper>
      <Title>
        <I18n id="联系我们" />
      </Title>
      <Content>
        <Table>
          <tbody>
            <TR>
              <td>
                <I18n id="网站" />
              </td>
              <td>www.dprating.com</td>
              <td>
                <I18n id="邮箱" />
              </td>
              <td>service@dprating.com</td>
            </TR>
            <TR>
              <td>
                <I18n id="电报群" />
              </td>
              <td>t.me/DPRating</td>
              <td>
                <I18n id="电报渠道" />
              </td>
              <td>t.me/DPRatingChannel</td>
            </TR>
            <TR>
              <td>
                <I18n id="推特" />
              </td>
              <td>https://twitter.com/DPRating</td>
              <td>Medium</td>
              <td>medium/@DPRating</td>
            </TR>
            <TR noPadBt>
              <td>
                <I18n id="微信公众号" />
              </td>
              <td>大炮评级社区</td>
              <td>
                <I18n id="微信助手" />
              </td>
              <td>Darpalzhushou</td>
            </TR>
            <tr>
              <td />
              <ImageTd>
                <Image src={SOURCE_URL.WechatCommunity} />
              </ImageTd>
              <td />
              <ImageTd>
                <Image src={SOURCE_URL.WeChatServer} />
              </ImageTd>
            </tr>
          </tbody>
        </Table>
      </Content>
    </Wrapper>
  )
}

export default Contact
