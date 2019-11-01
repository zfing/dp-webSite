import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'helpers/I18n'
import styled from 'styled-components'
import { completeUrl } from 'components/Link'
import A from 'components/A'
import Button from './Button'
import Block, { Title } from './Block'

const IconsWrapper = styled.div`
  padding: 20px 0 5px;
  text-align: center;
  line-height: 38px;
  overflow-x: scroll;

  color: #c2c8cf;
  font-size: 16px;

  .iconfont {
    padding: 0 8px;
  }
`

function ContactBlock({ contact = {}, ...props }) {
  return (
    <Block {...props}>
      <Title><I18n id="联系我们" /></Title>
      <IconsWrapper>
        {contact.fackbook && (
          <A target="_blank" href={completeUrl(contact.fackbook)}>
            <i className="iconfont icon-facebook-round" />
          </A>
        )}
        {contact.twitter && (
          <A target="_blank" href={completeUrl(contact.twitter)}>
            <i className="iconfont icon-twitter-round" />
          </A>
        )}
        {contact.linkedin && (
          <A target="_blank" href={completeUrl(contact.linkedin)}>
            <i className="iconfont icon-linkin-round" />
          </A>
        )}
        {contact.medium && (
          <A target="_blank" href={completeUrl(contact.medium)}>
            <i className="iconfont icon-medium-round" />
          </A>
        )}
        {contact.github && (
          <A target="_blank" href={completeUrl(contact.github)}>
            <i className="iconfont icon-github-round" />
          </A>
        )}
        {contact.telegram && (
          <A target="_blank" href={completeUrl(contact.telegram)}>
            <i className="iconfont icon-telegram-round" />
          </A>
        )}
        {contact.youtube && (
          <A target="_blank" href={completeUrl(contact.youtube)}>
            <i className="iconfont icon-youtube-round" />
          </A>
        )}
        {contact.reddit && (
          <A target="_blank" href={completeUrl(contact.reddit)}>
            <i className="iconfont icon-reddit-round" />
          </A>
        )}
        {contact.wechat && (
          <A target="_blank" href={completeUrl(contact.wechat)}>
            <i className="iconfont icon-weixin" />
          </A>
        )}
        {contact.weibo && (
          <A target="_blank" href={completeUrl(contact.weibo)}>
            <i className="iconfont icon-weibo" />
          </A>
        )}
      </IconsWrapper>
      <A target="_blank" href={completeUrl(contact.website)}>
        <Button block style={{ marginTop: '20px' }}>
          <I18n id="官网" />
        </Button>
      </A>
    </Block>
  )
}

ContactBlock.propTypes = {
  contact: PropTypes.object,
}

export default ContactBlock
