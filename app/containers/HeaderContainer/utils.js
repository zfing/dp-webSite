export const projectStatus = {
  0: {
    zh: '项目信息待完善',
    en: 'Project information is not completed',
  },
  1: {
    zh: '项目详细信息终审中',
    en: 'Project details in the final review',
  },
  2: {
    zh: '评级中',
    en: 'Rating',
  },
  3: {
    zh: '已评级',
    en: 'Rated',
  },
  4: {
    zh: '尽调中',
    en: 'Due diligent investigation ongoing',
  },
  5: {
    zh: 'Txhash待提交',
    en: 'Txhash to be submitted',
  },
  6: {
    zh: '审核未通过',
    en: 'Application denied',
  },
  7: {
    zh: '尽调未通过',
    en: 'Due diligence investigation failed',
  },
  8: {
    zh: 'Txhash审核未通过',
    en: 'Txhash is not authentic',
  },
  9: {
    zh: 'Txhash审核中',
    en: 'Verifying Txhash',
  },
  10: {
    zh: '尽调协议待提交',
    en: 'Due diligence application form to be submitted',
  },
  11: {
    zh: '尽调协议审核中',
    en: 'Due diligence application form submitted',
  },
  12: {
    zh: '尽调协议审核不通过',
    en: 'Due diligence application form denied',
  },
}

export function getProjectStatus(input = 0) {
  return projectStatus[String(input)] || {}
}
