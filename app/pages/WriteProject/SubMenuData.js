import React from 'react'
import I18n from 'helpers/I18n'

export const menus = [
  {
    name: <I18n id="基本信息*" />,
    bind: 'basic',
    label: 'Basic',
  },
  {
    name: <I18n id="概览*" />,
    bind: 'overview',
    label: 'Project Description',
  },
  {
    name: <I18n id="视频" />,
    bind: 'video',
    label: 'Video',
  },
  {
    name: <I18n id="详情*" />,
    bind: 'details',
    label: 'Details',
  },
  {
    name: <I18n id="团队*" />,
    bind: 'team',
    label: 'Team',
  },
  {
    name: <I18n id="投资机构" />,
    bind: 'investment',
    label: 'Investment agency',
  },
  {
    name: <I18n id="白皮书*" />,
    bind: 'whitepaper',
    label: 'Whitepaper',
  },
  {
    name: <I18n id="联系方式*" />,
    bind: 'contact',
    label: 'Contact',
  },
  {
    name: <I18n id="附加信息*" />,
    bind: 'additional',
    label: 'Additional',
  },
]
