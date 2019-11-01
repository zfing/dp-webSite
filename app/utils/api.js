import config from './config'

const { API_URL2 } = config

export default {
  search: 'search/getSearchByName',
  wxShare: 'rating/wx/share',

  getUserByToken: '/user/getUserByToken',

  getEditProjectList: 'edit/getProjectList',

  updateProject: 'post edit/updateProjectDetail',
  saveProjetc: 'post edit/saveProjectDetail',
  updateApplyProject: 'post apply/updateApplyRecord',

  getPrice: 'config/price',
  getConfig: 'config/get',

  getNotify: 'notify/list',

  getFreshRatings: '/rating/getFreshRatings',
  getListedRatings: '/rating/getListedRatings',
  getUnlistedRatings: '/rating/getUnlistedRatings',
  getHeadProjectList: '/projectDetail/getHeadProjectList',

  getIndex: '/index/get',
  getNewIndex: '/index/getNewIndex',

  getValidateCode: 'user/getValidateCode',

  login: 'post /user/login',
  logout: 'post /user/logout',
  updateUserInfo: 'post user/updateUserInfo',

  saveApplyRecord: 'post apply/saveApplyRecord',

  getEditProject: 'edit/getProjectDetail',
  getProject: 'projectDetail/get',

  getRatingByProjectId: 'rating/getRatingPointByProjectId',

  getEditRating: 'edit/rating/getRatingDetail',
  getRating: 'rating/getRatingDetailReleaseInfo',

  getRatingList: 'rating/getMoreRatingList',

  getValidateCodeV2: `${API_URL2}/account/getValidateCode`,
  registerV2: `post ${API_URL2}/account/register`,
  resetPasswordV2: `post ${API_URL2}/account/resetPassword`,
  updatePasswordV2: `post ${API_URL2}/account/updatePassword`,

  getApplyRecordList: 'apply/getApplyRecordList',

  getProjectCategoryList: 'project_category/list',

  getExchangeList: 'exchange/get',

  getRatingListByStatus: 'edit/rating/getRatingNameListByStatus',

  updateRating: 'post edit/rating/update',

  uploadRating: 'form edit/rating/upload',

  getSignature: 'user/signature',

  // 平仓
  getBitmex: 'data_bitmex/getDataBitmexList',
  getBitfinex: 'data_bitmex/getDataBitfinexList',
  getBtcTrend: 'data_bitmex/getBtcTrendList',

  getCommentV2: `${API_URL2}/comment/getCommentPointDetail`,
  getCommentListV2: `${API_URL2}/comment/getCommentList`,
  getReplyListV2: `${API_URL2}/comment/getReplyList`,
  replyV2: `post ${API_URL2}/comment/account/saveReply`,

  getUserArticleListV2: `${API_URL2}/account/personalArticle`,
  getTagList: `${API_URL2}/tag/list`,
  saveComment: `post ${API_URL2}/comment/account/saveComment`,
  getAnalysis: `${API_URL2}/article/analysis`,
  saveArticle: `post ${API_URL2}/article/save`,
  getCoinListV2: `${API_URL2}/article/coinlist`,
  getProjectByIdV2: `${API_URL2}/article/getdetail`,

  like: `post ${API_URL2}/like/update`,
  // 获取项目文章列表
  getArticleListV2: `${API_URL2}/article/list`,
  // 获取最新分析列表
  getLatestAnalysisListV2: `${API_URL2}/article/latestAnalysis`,
  // 获取最热币种列表
  getHottestListV2: `${API_URL2}/article/hotestAnalysis`,
  // 获取文章详情
  getArticleDetailV2: `${API_URL2}/article/get`,
  // 根据用户ID获取文章列表
  getArticleListByUserIdV2: `${API_URL2}/article/getArticlesByUserID`,
  // 根据用户ID获取用户信息
  getUserInfoV2: `${API_URL2}/article/getUserInfo`,
  // 搜索文章
  searchArticleV2: `${API_URL2}/article/searchlist`,

  // 申请投票评级
  vote: 'voting_details/saveVoting', // 申请
  voteList: 'voting_periods/list',
  voteDetail: 'voting_periods/get',
  voteProList: 'voting_details/list',
  doVote: 'voting_details/votingAdd', // 投票
}
