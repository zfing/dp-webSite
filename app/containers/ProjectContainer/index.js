import React from 'react'
import PropTypes from 'prop-types'
import config from 'utils/config'
import { media } from 'utils/theme'
import styled from 'styled-components'
import H1 from 'components/H1'
import IconImage from 'components/IconImage'
import Section from 'components/Section'
import I18n from 'helpers/I18n'
import HorMenu from './HorMenu'
import './index.scss'

const { SOURCE_URL } = config

const Wrapper = styled.div`
  position: relative;
  height: 163px;
  width: 100%;
  z-index: 1;
  overflow: hidden;
`

const Background = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  bottom: -50px;
  background-position: 50%;
  background-size: 100%;
  filter: blur(20px);
  z-index: 1;

  background-image: url(${SOURCE_URL.ratingBg});
`

const Main = styled.div`
  position: relative;
  background-image: linear-gradient(-180deg,transparent, rgba(0,0,0,0.5));
  background-size: cover;
  z-index: 2;
  height: 100%;

  display: flex;
  align-items: center;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #E3E3E3;
    margin-left: 30px;

    ${media(`
      font-size: 26px;
      width: 300px;
      margin-left: 10px;
    `, 'md')}
  }
`

const Icon = styled(IconImage)`
  height: 48px;
  width: 48px;
  overflow: hidden;
`

function GradientBanner({ detail, extendsInfo }) {
  const hasRating = !Number.isNaN(Number(extendsInfo.id))
  const projectId = detail.projectDetailId || detail.id

  return (
    <>
      <Wrapper>
        <Background />
        <Main>
          <Section>
            <TitleWrapper>
              <Icon src={detail.logoUrl} alt={detail.projectSymbol} />
              <H1>
                <I18n
                  en={`${detail.projectNameEn}/${detail.projectSymbol}`}
                  ko={`${detail.projectNameEn}/${detail.projectSymbol}`}
                  zh={`${detail.projectName || detail.projectNameEn}/${detail.projectSymbol}`}
                />
              </H1>
            </TitleWrapper>
          </Section>
        </Main>
      </Wrapper>
      <HorMenu>
        <div href={`/project/${projectId}`} name={<I18n id="总览" />} />
        <div href={`/analysis/project/${projectId}`} name={<I18n id="行情分析" />} />
        {hasRating
          ? <div href={`/rating/report/${extendsInfo.id}`} name={<I18n id="基础评级" />} />
          : null
        }
      </HorMenu>
    </>
  )
}

GradientBanner.defaultProps = {
  detail: {},
  extendsInfo: {},
}

GradientBanner.propTypes = {
  detail: PropTypes.object,
  extendsInfo: PropTypes.object,
}

export default GradientBanner
