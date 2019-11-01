import React from 'react'
import PropTypes from 'prop-types'
import A from 'components/A'
import { completeUrl } from 'components/Link'
import upperFirst from 'lodash/upperFirst'

const contacts = [
  'fackbook',
  'twitter',
  'linkedin',
  'medium',
  'github',
  'telegram',
  'youtube',
  'reddit',
  'wechat',
  'weibo',
]

function ContactList({ contact }) {
  const nodes = []

  contacts.forEach((item) => {
    if (contact[item]) {
      nodes[nodes.length] = (
        <A key={item} target="_blank" href={completeUrl(contact[item])}>
          {upperFirst(item)}
        </A>
      )
    }
  })

  return <>{nodes}</>
}

ContactList.defaultProps = {
  contact: {},
}

ContactList.propTypes = {
  contact: PropTypes.object,
}

export default ContactList
