import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import {
  Field, reduxForm, FieldArray, formValueSelector,
} from 'redux-form/immutable'
import { connect } from 'react-redux'
import Toast from 'components/Toast'
import I18n, { Trans } from 'helpers/I18n'
import { PRICE_TYPE, CONTRACT_TYPE } from 'utils/dict'
import { Jump } from 'components/Link'
import Label from './Label'
import AreaField from './Fields/AreaField'
import EditorField from './Fields/EditorField'
import renderTeamFields from './Fields/renderTeamFields'
import renderAdFields from './Fields/renderAdFields'
import renderFinancFields from './Fields/renderFinancFields'
import SelectField from './Fields/SelectField'
import TextField from './Fields/TextField'
import UploadField from './Fields/UploadField'
import UploadBtnField from './Fields/UploadBtnField'
import RadioField from './Fields/RadioField'
import Container from './Container'
import UIContent from './Content'
import BottomBar from './BottomBar'
import BottomBarBtn from './BottomBarBtn'
import Flex from './Flex'
import Spacing from './Spacing'
import Alert from './Alert'

const Content = styled(UIContent)`
  width: 810px;
`

const CutLine = styled.div`
  border-bottom: 1px dashed #D1DAE6;
  margin: 70px 0 20px;
`

const Text = styled.div`
  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.08px;
`

const TxtLabel = styled(Text)`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

// const BottomBar = UIBottomBar.withComponent(UIContent)

class ContentPage extends React.PureComponent {
  // saveTimer = null

  render() {
    const {
      save,
      handleSubmit,
      categoryList,
      fundList,
      exchangeList,
      detail,
      inLoading,
      disabled,
      projectName,
      projectNameEn,
      lockedType,
      isOpenSource,
    } = this.props

    const onSubmit = (values) => {
      // const payload = handlePayload(values, detail)
      save(values, {})
    }

    const confirm = (...args) => this.refs.alert.open(() => onSubmit(...args))

    // if (!this.saveTimer) {
    //   this.saveTimer = setTimeout(function() {
    //     console.log('===> save')
    //   }, 5000);
    // }

    // 预览
    const onPreview = () => {
      Jump.init()
      save({
        status: 0,
      }, {
        cache: true,
        preview: true,
        open: Jump.open,
      })
    }

    return (
      <Container>
        <Content disabled={disabled}>
          <Label required id="basic"><I18n id="基本信息" /></Label>
          <Flex>
            <Field
              name="logoUrl"
              title="logo"
              component={UploadField}
            />
            <Flex
              flex={1}
              marginLeft="28px"
              column
              between
            >
              <Flex>
                <Field
                  name="projectNameEn"
                  placeholder={Trans({
                    zh: '项目英文全称',
                    en: 'Project name',
                  })}
                  component={TextField}
                />
                <Spacing />
                <Field
                  name="projectName"
                  placeholder={Trans({
                    zh: '项目中文全称',
                    en: 'Project chinese name',
                  })}
                  component={TextField}
                />
              </Flex>
              <Field
                multiple
                name="categoryIdList"
                placeholder={Trans({
                  zh: '选择你的项目类型',
                  en: 'Choose your project category',
                })}
                component={SelectField}
                list={Array(...categoryList.map(_ => ({ value: String(_.id), name: Trans({ zh: _.categoryName, en: _.categoryNameEn }) })))}
              />
            </Flex>
          </Flex>
          <Label required id="overview"><I18n id="概览" /></Label>
          <Flex between>
            <Field
              name="descriptionEn"
              placeholder={Trans({
                zh: '简要概括你的项目（英文）',
                en: 'Description of the project in one sentence（in English）',
              })}
              component={AreaField}
            />
            <Field
              name="description"
              placeholder={Trans({
                zh: '简要概括你的项目（中文）',
                en: 'Description of the project in one sentence (in Chinese)',
              })}
              component={AreaField}
            />
          </Flex>
          <Label required><I18n id="特点" /></Label>
          <Field
            name="featureEn"
            placeholder={Trans({
              zh: '使用英文介绍你的项目特点',
              en: 'Summarize the characteristics of your project',
            })}
            component={EditorField}
            contentId={detail.id}
          />
          <Spacing />
          <Field
            name="feature"
            placeholder={Trans({
              zh: '使用中文介绍你的项目特点',
              en: 'Please summarize your project characteristics in Chinese',
            })}
            component={EditorField}
            contentId={detail.id}
          />
          <Label id="video"><I18n id="视频" /></Label>
          <Field
            name="videoUrl"
            placeholder={Trans({
              zh: '请输入你的视频链接',
              en: 'Video Link',
            })}
            component={TextField}
          />
          <Label id="details" required><I18n id="详情" /></Label>
          <Flex>
            <Field
              name="projectBuildDate"
              placeholder={Trans({
                zh: '项目立项时间',
                en: 'Project establishment time',
              })}
              type="date"
              component={TextField}
            />
            <Spacing />
            <Field
              name="teamBuildDate"
              placeholder={Trans({
                zh: '团队或公司成立时间',
                en: 'Team or company establishment time',
              })}
              type="date"
              component={TextField}
            />
          </Flex>

          <Flex style={{ paddingTop: '20px' }}>
            <Field
              name="startDate"
              placeholder={Trans({
                zh: '众筹开始时间',
                en: 'Crowdfunding start time',
              })}
              type="date"
              component={TextField}
            />
            <Spacing />
            <Field
              name="endDate"
              placeholder={Trans({
                zh: '众筹结束时间',
                en: 'Crowdfunding end time',
              })}
              type="date"
              component={TextField}
            />
          </Flex>
          <Flex style={{ paddingTop: '20px' }}>
            <Field
              name="projectSymbol"
              placeholder={Trans({
                zh: '代币简称',
                en: 'Token Symbol',
              })}
              component={TextField}
            />
            <Spacing />
            <Flex style={{ width: '100%', alignItems: 'flex-end' }}>
              <Field
                name="price"
                placeholder={Trans({
                  zh: '发行价',
                  en: 'Price',
                })}
                component={TextField}
                type="number"
              />
              <Field
                name="priceType"
                placeholder={Trans({
                  zh: '单位',
                  en: 'Price Type',
                })}
                component={SelectField}
                style={{ width: '102px' }}
                list={PRICE_TYPE}
              />
            </Flex>
          </Flex>
          <Flex style={{ paddingTop: '20px' }}>
            <Field
              name="totalNum"
              placeholder={Trans({
                zh: '发行总量',
                en: 'Total Supply',
              })}
              component={TextField}
              type="number"
            />
            <Spacing />
            <Field
              name="circulatingNum"
              placeholder={Trans({
                zh: '流通量',
                en: 'Circulating Supply',
              })}
              component={TextField}
              type="number"
            />
          </Flex>
          <Flex style={{ paddingTop: '20px' }}>
            <Field
              name="contractType"
              placeholder={Trans({
                zh: '代币种类',
                en: 'Token type',
              })}
              component={SelectField}
              style={{ width: '100%' }}
              list={CONTRACT_TYPE}
            />
            <Spacing />
            <Field
              name="contractAddress"
              placeholder={Trans({
                zh: '代币合约地址',
                en: 'Token contract address',
              })}
              component={TextField}
            />
          </Flex>
          <Flex style={{ paddingTop: '20px' }}>
            <Field
              name="haveBurning"
              placeholder={Trans({
                zh: '是否有回收及销毁机制',
                en: 'Is there a repurchase and destruction mechanism',
              })}
              component={SelectField}
              style={{ width: '100%' }}
              list={[
                { name: Trans({ zh: '无', en: 'NO' }), value: 0 },
                { name: Trans({ zh: '有', en: 'YES' }), value: 1 },
              ]}
            />
            <Spacing />
            <Field
              multiple
              name="exchangeList"
              placeholder={Trans({
                zh: '请选择上线交易所名称',
                en: 'Please select Exchange',
              })}
              component={SelectField}
              list={Array(...exchangeList.map(_ => ({ value: String(_.id), name: _.name })))}
            />
          </Flex>
          <Label required id="team"><I18n id="团队" /></Label>
          <FieldArray
            name="projectTeamList"
            component={renderTeamFields}
          />
          <Label><I18n id="顾问" /></Label>
          <FieldArray
            name="projectTeamList2"
            component={renderAdFields}
          />
          <Label id="investment"><I18n id="投资机构" /></Label>
          {/* <FieldArray
            name="projectFundList"
            component={renderFundFields}
          /> */}
          <Field
            multiple
            name="fundList"
            placeholder={Trans({
              zh: '请选择投资机构',
              en: 'Please select Institution Investors',
            })}
            component={SelectField}
            list={Array(...fundList.map(_ => ({ value: String(_.id), name: _.name })))}
          />
          <Label required id="whitepaper"><I18n id="白皮书" /></Label>
          <Field
            name="whitepaperUrl"
            component={UploadBtnField}
            accept="application/pdf"
          />
          <Label required id="contact"><I18n id="联系方式" /></Label>
          <Flex
            flex={1}
          >
            <Field
              name="projectContact.website"
              placeholder="Website*"
              component={TextField}
            />
            <Spacing />
            <Field
              name="projectContact.telegram"
              placeholder="Telegram*"
              component={TextField}
            />
          </Flex>
          <Flex
            flex={1}
            marginTop="20px"
          >
            <Field
              name="projectContact.github"
              placeholder="Github"
              component={TextField}
            />
            <Spacing />
            <Field
              name="projectContact.twitter"
              placeholder="Twitter"
              component={TextField}
            />
          </Flex>
          <Flex
            flex={1}
            marginTop="20px"
          >
            <Field
              name="projectContact.fackbook"
              placeholder="Facebook"
              component={TextField}
            />
            <Spacing />
            <Field
              name="projectContact.reddit"
              placeholder="Reddit"
              component={TextField}
            />
          </Flex>
          <Flex
            flex={1}
            marginTop="20px"
          >
            <Field
              name="projectContact.youtube"
              placeholder="Youtube"
              component={TextField}
            />
            <Spacing />
            <Field
              name="projectContact.medium"
              placeholder="Medium"
              component={TextField}
            />
          </Flex>
          <Flex
            flex={1}
            marginTop="20px"
          >
            <Field
              name="projectContact.wechat"
              placeholder="Wechat"
              component={TextField}
            />
            <Spacing />
            <Field
              name="projectContact.weibo"
              placeholder="Weibo"
              component={TextField}
            />
          </Flex>
          <CutLine />
          <Label
            id="additional"
            message={Trans({
              zh: '附加信息（除非实施尽职调查，否则下列信息将不对外公示）',
              en: 'Additional information (The following information will not be made public unless a due diligence report is ongoing)',
            })}
          >
            <I18n id="附加信息" />
          </Label>

          <Text>
            <I18n
              zh="若贵项目最终评级结果达标，是否愿意接受我们推荐到下列类型交易所？"
              en="If the rating of your project meets the standards, would you like to send recommendation to the following types of exchanges ?"
            />
          </Text>
          <div style={{ marginTop: '20px' }}>
            <Field
              name="recommendType"
              multiple
              component={RadioField}
            >
              <div
                name={(
                  <I18n
                    zh="一线交易所"
                    en="Top-tier exchanges
"
                  />
                )}
                value="1"
              />
              <div name={<I18n zh="二线交易所" en="Second-tier exchanges" />} value="2" />
              <div name={<I18n zh="其他交易所" en="Other exchanges" />} value="3" />
            </Field>
          </div>

          <Label><I18n zh="应用场景介绍" en="Use case introduction" /></Label>
          <Flex between>
            <Field
              name="applicationSceneEn"
              placeholder={Trans({
                zh: '使用英文介绍项目的应用场景',
                en: 'Please introduce the use cases of your project in English',
              })}
              component={AreaField}
            />
            <Field
              name="applicationScene"
              placeholder={Trans({
                zh: '使用中文介绍项目的应用场景',
                en: 'Please introduce the use cases of your project in Chinese',
              })}
              component={AreaField}
            />
          </Flex>
          <Label><I18n zh="融资轮次" en="Funding rounds" /></Label>
          <FieldArray
            name="projectFinancing"
            component={renderFinancFields}
          />

          <Label><I18n zh="代币分配情况" en="Token allocation plan" /></Label>
          <Flex between>
            <Field
              name="tokenDeliverEn"
              placeholder={Trans({
                zh: '使用英文描述代币分配情况，例如：\n挖矿：40%\n基金会管理：10%\n第一次发售：15%\n第二次发售：20%\n项目运营支出：15%',
                en: 'Describe you token allocation plan in English. E.g.\nMining：10%\nPresale：15%\nPublic sale：20%\nMarketing and operation：15%',
              })}
              component={AreaField}
            />
            <Field
              name="tokenDeliver"
              placeholder={Trans({
                zh: '使用中文描述代币分配情况，例如：\n 挖矿：40%\n基金会管理：10%\n第一次发售：15%\n第二次发售：20%\n项目运营支出：15%',
                en: 'Describe you token allocation plan in Chinese. E.g.\nMining：10%\nPresale：15%\nPublic sale：20%\nMarketing and operation：15%',
              })}
              component={AreaField}
            />
          </Flex>

          <Label><I18n zh="团队持币锁仓情况" en="Team lock-up" /></Label>
          <Flex style={{ minHeight: '44px', marginBottom: '10px' }}>
            <TxtLabel>
              <I18n zh="锁仓方式" en="Lock-up mode" />


：
            </TxtLabel>
            <Field
              name="lockedType"
              component={RadioField}
            >
              <div name={<I18n zh="智能合约释放" en="Locked by smart contract" />} value="1" />
              <div name={<I18n zh="口头承诺" en="By verbal commitment" />} value="2" />
              <div name={<I18n zh="无" en="None" />} value="3" />
              <div name={<I18n zh="其他" en="Others" />} value="4" />
            </Field>

            {
              lockedType === '4' ? (
                <Field
                  name="lockedDesc"
                  component={TextField}
                  style={{ width: 'auto', marginLeft: '20px' }}
                />
              ) : null
            }
          </Flex>
          <Flex style={{ minHeight: '44px', marginBottom: '10px' }}>
            <TxtLabel>
              <I18n zh="锁仓地址" en="Lock-up adderss" />


：
            </TxtLabel>
            <Field
              name="lockedAddress"
              component={TextField}
              style={{ width: 'auto', flex: 1 }}
            />
          </Flex>
          <TxtLabel style={{ margin: '20px 0px 14px' }}>
            <I18n zh="解锁时间" en="Unlock time" />


：
          </TxtLabel>
          <Flex between>
            <Field
              name="unlockedTimeEn"
              placeholder={Trans({
                zh: '使用英文描述代币解锁时间，例如：\n第一批解锁时间：2018/09/25\n解锁量：10,0000 RATING\n比例：15%\n\n第二次解锁时间：2019/09/25\n解锁量：1000,0000 RATING\n比例：25%\n...',
                en: 'Describe the lock-up time in English, e.g.\nTime of the first unlock：2018/09/25\nUnlock amount：10,0000 RATING\nRatio：15%\n\nTime of the second unlock：2019/09/25\nUnlock amount：1000,0000 RATING\nRatio：25%\n...',
              })}
              component={AreaField}
            />
            <Field
              name="unlockedTime"
              placeholder={Trans({
                zh: '使用中文描述代币解锁时间，例如：\n第一批解锁时间：2018/09/25\n解锁量：10,0000 RATING\n比例：15%\n\n第二次解锁时间：2019/09/25\n解锁量：1000,0000 RATING\n比例：25%\n...',
                en: 'Describe the lock-up time in Chinese, e.g.\nTime of the first unlock：2018/09/25\nUnlock amount：10,0000 RATING\nRatio：15%\n\nTime of the second unlock：2019/09/25\nUnlock amount：1000,0000 RATING\nRatio：25%\n...',
              })}
              component={AreaField}
            />
          </Flex>
          <TxtLabel style={{ margin: '20px 0px 14px' }}>
            <I18n zh="资金使用情况" en="Use of funds" />


：
          </TxtLabel>
          <Flex between>
            <Field
              name="fundUseEn"
              placeholder={Trans({
                zh: '使用英文详尽描述融资资金的使用情况',
                en: 'Please specify the use of funds of your project in English',
              })}
              component={AreaField}
            />
            <Field
              name="fundUse"
              placeholder={Trans({
                zh: '使用中文详尽描述融资资金的使用情况',
                en: 'Please specify the use of funds of your project in Chinese',
              })}
              component={AreaField}
            />
          </Flex>

          <Label><I18n zh="合作伙伴及合作方式" en="Partners and ways of cooperation" /></Label>
          <Flex between>
            <Field
              name="cooperativeEn"
              placeholder={Trans({
                zh: '使用英文描述伙伴及合作方式',
                en: 'Describe the partnerships and how the partnerships run in English',
              })}
              component={AreaField}
            />
            <Field
              name="cooperative"
              placeholder={Trans({
                zh: '使用中文描述伙伴及合作方式',
                en: 'Describe the partnerships and how the partnerships run in Chinese',
              })}
              component={AreaField}
            />
          </Flex>

          <Label><I18n zh="特别说明" en="Other announcements" /></Label>
          <Flex between>
            <Field
              name="teamExplainEn"
              placeholder={Trans({
                zh: '使用英文描述团队信息变更情况',
                en: 'Describe in English the change of team personnel. (new members or left members)',
              })}
              component={AreaField}
            />
            <Field
              name="teamExplain"
              placeholder={Trans({
                zh: '使用中文描述团队信息变更情况',
                en: 'Describe in Chinese the change of team personnel. (new members or left members)',
              })}
              component={AreaField}
            />
          </Flex>
          <Flex between style={{ marginTop: '20px' }}>
            <Field
              name="staffExplainEn"
              placeholder={Trans({
                zh: '使用英文描述团队成员兼职情况',
                en: 'Are there any part-time employees? Please describe in English',
              })}
              component={AreaField}
            />
            <Field
              name="staffExplain"
              placeholder={Trans({
                zh: '使用中文描述团队成员兼职情况',
                en: 'Are there any part-time employees? Please describe in Chinese',
              })}
              component={AreaField}
            />
          </Flex>

          <Label><I18n zh="项目代码" en="Project code" /></Label>
          <Flex style={{ minHeight: '44px', marginBottom: '10px' }}>
            <TxtLabel>
              <I18n zh="是否开源" en="Is the code open-source" />


：
            </TxtLabel>
            <Field
              name="isOpenSource"
              component={RadioField}
            >
              <div name={<I18n zh="是" en="YES" />} value="1" />
              <div name={<I18n zh="否" en="NO" />} value="0" />
            </Field>
          </Flex>

          {String(isOpenSource) === '1' ? (
            <div>
              <Flex between style={{ marginTop: '20px' }}>
                <Field
                  name="githubDescEn"
                  placeholder={Trans({
                    zh: '使用英文描述核心代码库及以实现功能',
                    en: 'Describe in English what features have been developed/implemented?',
                  })}
                  component={AreaField}
                />
                <Field
                  name="githubDesc"
                  placeholder={Trans({
                    zh: '使用中文描述核心代码库及以实现功能',
                    en: 'Describe in Chinese what features have been developed/implemented?',
                  })}
                  component={AreaField}
                />
              </Flex>
              <Flex between style={{ marginTop: '20px' }}>
                <Field
                  name="forkDescEn"
                  placeholder={Trans({
                    zh: '使用英文描述哪些代码库进行了Fork',
                    en: 'Has your project forked code from other projects? Please describe in English',
                  })}
                  component={AreaField}
                />
                <Field
                  name="forkDesc"
                  placeholder={Trans({
                    zh: '使用中文描述哪些代码库进行了Fork',
                    en: 'Has your project forked code from other projects? Please describe in Chinses',
                  })}
                  component={AreaField}
                />
              </Flex>
            </div>
          ) : null}

          <Label><I18n zh="进度" en="Progress" /></Label>
          <Flex between>
            <Field
              name="teamSituationEn"
              placeholder={Trans({
                zh: '使用英文描述项目开发及运营路线',
                en: 'Please describe the roadmap of your project in English',
              })}
              component={AreaField}
            />
            <Field
              name="teamSituation"
              placeholder={Trans({
                zh: '使用中文描述项目开发及运营路线',
                en: 'Please describe the roadmap of your project in Chinese',
              })}
              component={AreaField}
            />
          </Flex>
          <Flex between style={{ marginTop: '20px' }}>
            <Field
              name="projectProgressEn"
              placeholder={Trans({
                zh: '使用英文描述目前已完成进度，包括开发及运营',
                en: 'Describe in English the current progress of your project interns of development and operation',
              })}
              component={AreaField}
            />
            <Field
              name="projectProgress"
              placeholder={Trans({
                zh: '使用中文描述目前已完成进度，包括开发及运营',
                en: 'Describe in Chinese the current progress of your project interns of development and operation',
              })}
              component={AreaField}
            />
          </Flex>
        </Content>
        <BottomBar contentProps={{ style: { width: '810px', paddingRight: 0 } }}>
          <BottomBarBtn outline round loading={inLoading} disabled={!projectNameEn || !projectName || disabled} onClick={onPreview}>
            <I18n id="预览" />
          </BottomBarBtn>
          <BottomBarBtn
            outline
            round
            onClick={handleSubmit(payload => onSubmit({
              ...payload,
              status: 0, // 保存
            }))}
            loading={inLoading}
            disabled={disabled}
          >
            <I18n id="保存" />
          </BottomBarBtn>
          <BottomBarBtn
            outline
            round
            onClick={handleSubmit(payload => confirm({
              ...payload,
              status: 1, // 提交
            }))}
            loading={inLoading}
            disabled={disabled}
          >
            <I18n id="提交" />
          </BottomBarBtn>
        </BottomBar>
        <Alert
          ref="alert"
          handle={() => true}
          message={<I18n en="You will not be able to modify the information again after submission, continue?" zh="提交后将无法再次修改，确认提交？" />}
          btnTxt={<I18n en="Confirm" zh="确认" />}
        />
      </Container>
    )
  }
}

const Rquired = [
  'projectName',
  'projectNameEn',
  'categoryIdList',
  'descriptionEn',
  'description',
  'featureEn',
  'feature',
  'startDate',
  'endDate',
  'projectSymbol',
  'price',
  'priceType',
  'totalNum',
  'circulatingNum',
  'whitepaperUrl',
  'projectBuildDate',
  'teamBuildDate',
  'contractType',
  'contractAddress',
  'haveBurning',
]

const TeamRquired = [
  'name',
  'positionName',
  'descriptionEn',
]

const PjectRquired = [
  'website',
  'telegram',
]

const catBeEmpty = 'cant\`t be empty'

function validate(input) {
  const errors = {}

  Rquired.forEach((param) => {
    if (!input[param] && typeof input[param] !== 'number') {
      errors[param] = catBeEmpty
    }
  })

  if (input.categoryIdList && input.categoryIdList.length === 0) {
    errors.categoryIdList = catBeEmpty
  }

  if (!input.projectTeamList || !input.projectTeamList.length) {
    errors.projectTeamList = catBeEmpty
  } else {
    const errs = []
    input.projectTeamList.forEach((_, k) => {
      const err = {}
      TeamRquired.forEach((param) => {
        if (!_[param]) {
          err[param] = catBeEmpty
        }
      })
      errs[k] = err
    })
    errors.projectTeamList = errs
  }

  input.projectContact = input.projectContact || {}

  const errs = {}
  PjectRquired.forEach((param) => {
    if (!input.projectContact[param]) {
      errs[param] = catBeEmpty
    }
  })
  errors.projectContact = errs

  return errors
}

// const errorTasks = [
//   {
//     name: 'projectNameEn',
//     error: 'project name cant\`t be empty'
//   },
//   {
//     name: 'categoryIdList',
//     error: 'category cant\`t be empty'
//   },
//   {
//     name: 'description',
//     error: 'chinese description cant\`t be empty'
//   },
//   {
//     name: 'descriptionEn',
//     error: 'description cant\`t be empty'
//   },
//   {
//     name: 'feature',
//     error: 'chinese feature cant\`t be empty'
//   },
//   {
//     name: 'featureEn',
//     error: 'feature cant\`t be empty'
//   },
//   {
//     name: 'startDate',
//     error: 'Crowdfunding start time cant\`t be empty'
//   },
//   {
//     name: 'endDate',
//     error: 'Crowdfunding end time cant\`t be empty'
//   },
//   {
//     name: 'projectSymbol',
//     error: 'Token cant\`t be empty'
//   },
//   {
//     name: 'price',
//     error: 'Price cant\`t be empty'
//   },
//   {
//     name: 'priceType',
//     error: 'Price Type cant\`t be empty'
//   },
//   {
//     name: 'totalNum',
//     error: 'Circulation cant\`t be empty'
//   },
//   {
//     name: 'circulatingNum',
//     error: 'Liquidity cant\`t be empty'
//   },
//   {
//     name: 'whitepaperUrl',
//     error: 'whitepaper cant\`t be empty'
//   },
//   {
//     name: 'projectContact.github',
//     error: 'github cant\`t be empty'
//   },
//   {
//     name: 'projectContact.telegram',
//     error: 'telegram cant\`t be empty'
//   },
//   {
//     name: 'projectContact.website',
//     error: 'website cant\`t be empty'
//   },
// ]

function onSubmitFail() {
  return Toast.error('Missing required fields !')
  // if (!isEmpty(errors)) {

  //   for (let i = 0; i < errorTasks.length; i++) {
  //     if (has(errors, errorTasks[i].name)) {
  //       let msg = errorTasks[i].error
  //       return Toast.error(msg)
  //     }
  //   }

  //   if ((errors.projectTeamList instanceof Array)
  //     && errors.projectTeamList.length) {
  //     const list = errors.projectTeamList
  //     for (let i = 0; i < list.length; i++) {
  //       const listItem = list[i]
  //       if (listItem && (typeof listItem === 'object')) {
  //         for (let key in listItem) {
  //           if (listItem[key]) {
  //             return Toast.error(`team.${key} ${listItem[key]}`)
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // return ''
}

ContentPage.defaultProps = {
  disabled: false,
}

ContentPage.propTypes = {
  categoryList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  fundList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  exchangeList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  inLoading: PropTypes.bool,
  detail: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  save: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  projectNameEn: PropTypes.any,
  projectName: PropTypes.any,
  lockedType: PropTypes.any,
  isOpenSource: PropTypes.any,
}

export default connect(state => ({
  projectNameEn: formValueSelector('writeProject')(state, 'projectNameEn'),
  projectName: formValueSelector('writeProject')(state, 'projectName'),
  lockedType: formValueSelector('writeProject')(state, 'lockedType'),
  isOpenSource: formValueSelector('writeProject')(state, 'isOpenSource'),
}))(reduxForm({
  form: 'writeProject',
  validate,
  onSubmitFail,
})(ContentPage))
