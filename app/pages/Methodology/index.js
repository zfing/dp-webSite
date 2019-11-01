import React from 'react'
import Section from 'components/Section'
import Container from 'components/Container'
import H1 from 'components/H1'
import UIH2 from 'components/H2'
import UIH3 from 'components/H3'
import styled from 'styled-components'
import theme from 'utils/theme'
import I18n from 'helpers/I18n'
import { INVEST_SCORE_DESC } from 'utils/dict'
import defaultPage from 'hocs/defaultPage'
import Head from 'helpers/Head'

const Title = styled(H1)`
  font-family: PingFangSC-Medium;
  font-size: 26px;
  color: ${theme.default};
  letter-spacing: 0.08px;
  padding: 36px 56px 33px;
  border-bottom: 1px solid rgba(218,233,241,0.60);

  @media (max-width: 785px) {
    padding: 20px 10px 30px;
  }
`

const Content = styled.div`
  padding: 27px 56px 60px;

  @media (max-width: 785px) {
    padding: 10px 10px 30px;
  }

  font-family: PingFangSC-Regular;
  font-size: 14px;

  color: #4d6182;
  letter-spacing: 0.06px;
  line-height: 23px;
`

const H2 = styled(UIH2)`
  font-family: PingFangSC-Semibold;
  font-size: 22px;
  color: ${theme.default};
  letter-spacing: 0.06px;
  line-height: 24px;
  padding-bottom: 11px;
  padding-top: 14px;
`

const H3 = styled(UIH3)`
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.06px;
  line-height: 24px;
  margin-bottom: 24px;
`

const H4 = styled(UIH3)`
  font-family: PingFangSC-Medium;
  font-size: 14px;
  letter-spacing: 0.06px;
  line-height: 24px;
`

const P = styled.div`
  margin-bottom: 24px;
`
const UITable = styled.table`
  // border: 1px solid rgba(218,233,241,0.80);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 41px;
  
  th, td {
    padding: 14px 24px;
  }

  thead {
    tr {
      text-align: left;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #DAE9F1;
      letter-spacing: 0.06px;

      th {
        background: #004785;
        max-height: 48px;
        position: sticky;
        top: ${theme.HDHeightSmall}px;
      }

      // th:not(:first-child) {
      //   border-left: 1px solid #376F9F;
      // }
    }
  }

  tbody {
    tr {
      &:nth-child(2n) {
        background: #F5F9FA;
      }
    }
  }
`

const ScoreUI = styled.span`
  color: ${theme.default};
  text-align: center;
  margin-right: 10px;

  &:before {
    content: '[';
  }
  &:after {
    content: ']';
  }

  span {
    display: inline-block;
    min-width: 20px;
  }
`

const TableScrollWrapper = styled.div`
  @media (max-width: 780px) {
    overflow-x: scroll;

    table thead th {
      position: relative;
      top: 0;
    }
  }
`

const Table = props => (
  <TableScrollWrapper>
    <div style={{ minWidth: '500px' }}>
      <UITable {...props} />
    </div>
  </TableScrollWrapper>
)

const Score = ({ children, ...props }) => <ScoreUI {...props}><span>{children}</span></ScoreUI>

export const RiskElement = {
  A: (
    <div>
      <div>
        <I18n
          en="Excellent performance in every indicator"
          zh="各种风险指标得分优秀。"
          ko="각종 리스크 지표 점수가 우수합니다."
        />
      </div>
      <div>
        <I18n
          en="Project is well illustrated, Team members’ experiences are authentic, Completion level is high."
          zh="说明信息透明度非常清晰，团队成员履历真实，项目完成度高。"
          ko="정보의 투명도가 매우 뚜렷하며 팀구성원들의 이력이 진실되고 프로젝트 완성도가 높음을 설명합니다."
        />
      </div>
      <div>
        <I18n
          en="Progress conforms the roadmap, overall risk is low."
          zh="履约能力优秀，整体风险小。"
          ko="약속 이행 능력이 우수하고 전반적인 리스크가 적습니다."
        />
      </div>
    </div>
  ),

  B: (
    <I18n
      en="Good performance in every indicator, risk is relatively low."
      zh="各项风险指标得分良好但不突出。风险较小。"
      ko="각항 리스크 지표 점수가 양호하지만 뛰어나지 않으며, 리스크가 비교적 적습니다."
    />
  ),

  C: (
    <div>
      <I18n
        en="Average performance in every indicator, no apparent shortage. Risk is medium."
        zh="各项风险指标得分中等。无明显短板，存在一定的风险。"
        ko="각항 리스크 지표 점수는 중등이며, 분명한 단점이 없고 일정한 리스크가 있습니다."
      />
    </div>
  ),

  D: (
    <div>
      <div>
        <I18n id="综合指标得分较差。" />
      </div>
      <div>
        <I18n
          en="Apparent shortage in some indicators, Uncertainty surrounding the project is severely affecting its investment value.Risk level is high."
          zh="部分维度得分过低，存在明显风险点，对项目整体推进所带来的不确定因素强，有较高风险。"
          ko="일부 차원 점수가 지나치게 낮으며 명백한 리스크 포인트가 있고 전체 프로젝트의 추진에 대한 불확실한 요소가 강하며 리스크가 비교적 큽니다."
        />
      </div>
    </div>
  ),
  E: (
    <div>
      <div>
        <I18n id="多项风险指标得分差" />
      </div>
      <div>
        <I18n
          en="The projects has numerous potential risks, e.g. negative past records, exaggeration or fraud.The projects prospect is very uncertain.Likely to fail or be a scam."
          zh="表明可能存在多个风险点，如不良记录、夸大及造假风险，未来前景不确定性极强，存在较大失败及跑路风险。"
          ko="불량 기록, 과장 및 허위 조작 등 여러 가지 리스크 포인트가 존재할 가능성이 있음을 나타내며, 미래 전망은 극도로 불확실하고 비교적 중대한 실패와 도주 리스크가 있습니다."
        />
      </div>
    </div>
  ),
}

function Methodology() {
  return (
    <Section>
      <Head name="model" />
      <Container style={{ margin: '35px 0' }}>
        <Title>
          <I18n
            en="Crypto Rating Model 3.1"
            zh="DPRating 量化评级框架V3.1版"
            ko="DPRating 양화 등급평가 프레임워크  V3.1 버전"
          />
        </Title>
        <Content>
          <p>
            <I18n
              en="A consistent rating framework is the premise of subjective, comparable and scientific rating results. In order to elevate its professionalism and versatility, the DPRating team has released an important and comprehensive update to our framework in absorbing our previous experience and collecting feedback from the community. Instead of delivering a single rating evaluation, we now supremely give out assessments on investment potential and risk."
              zh="一套科学的评级框架，是保障评级结果客观、公正和科学的前提。DPRating（大炮评级）团队在过往评级模型基础上，结合已有的经验教训，吸收社区及各方的建议，对评级体系进行了一次重大且完整的更新，以提升其专业度和可用性。在依然保证评级体系客观、公正和科学性基础上，将原有的单个最终结果，裂变为由信用评级得分和资质评级得分组合而成的综合结果。"
              ko="과학적인 등급평가 프레임워크로, 객관적이고 공정하며 과학적인 등급평가 결과를 보장하기 위한 전제 조건이다. DPRating팀은 기존 등급평가 모델을 기반으로 경험과 교훈을 결합시키고 커뮤니티 및 여러 측의 조언을 흡수하여 등급평가 시스템에 대해 중대하고 완벽한 업데이트를 실행함으로써 시스템의 전문성과 가용성을 향상시켰다. 여전히 객관적이고 공정하며 과학적인 등급평가 시스템에 대한 보장을 기반으로 기존의 단일한 최종 결과를 신용 등급평가점수와 자질 등급평가점수 조합으로 형성된 종합 결과로 분열시켰다."
            />
          </p>
          <H2>
            <I18n
              en="Background"
              zh="一、模型调整背景"
              ko="1. 모델 조정 배경"
            />
          </H2>
          <P>
            <I18n
              en="Our first quantitative model SmartICO was released in June 2017. Since then, DPRating has made two new versions of our quantitative frameworks for crypto evaluation. Nearly a hundred reports have been made based on these models, including comprehensive reviews that rank and compare different projects. Each of the previous models have had their advantages and disadvantages. These models are meant to evolve with new developments and adapt to the current state of the crypto industry."
              zh="众所周知，DPRating于17年6月份发布了SmartICO系列评级框架，于17年11月份发布了ChainDC系列评级框架，前者我们可以称之为DPRating量化评级框架V1.0时代，后者我们称之为DPRating量化评级框架V2.0时代。基于这两个系列的量化评级框架，DPRating已发布近百篇量化报告，并基于其发布了项目综合榜单。上述模型各有优缺点，且显著的特点是跟当时行业所处的现状较为贴合，但在我们近一年的评级实践中也暴露了不少问题。"
              ko="모두 알다시피, DPRating은 2017년 6월에 SmartICO 시리즈 등급평가 프레임워크를 발표하고 17년 11월에 ChainDC 시리즈 등급평가 프레임워크를 발표했다. 우리는 전자를 DPRating 양화 등급평가 프레임워크 V1.0 시대라 부르고 후자를   DPRating 양화 등급평가 프레임워크 V2.0 시대라 부른다. 이 두 시리즈의 양화 등급평가 프레임워크를 기반으로 DPRating은 거의 100편에 달하는 양화 보고서를 발표했으며 이를 기반으로 프로젝트 종합 랭킹을 발표했다. 위의 모델은 각각 장단점이 있으며 당시 업계가 처한 상황과 더 어울리는 특징이 아주 뚜렷했지만 지난 1년간의 등급평가 실무에서 적지 않은 문제점들이 노출되었다. "
            />
          </P>
          <P>
            <I18n
              en="Lately, our readers have asked us about the difference between risk and qualification. In the traditional finance rating market, rating agencies such as Moody’s and S&P release credibility ratings based upon the default rate. Investment banks like Goldman and Citibank rate the qualification i.e. how much growth investors can expect.
In our previous models, SamartICO and ChainDC, qualification and risk were both in the same sector, which now seems unreasonable. Our goal for this upgrade is to keep risk and qualification independent."
              zh="首先，投资者在选择标的的过程中，最大的需求是在风险规避的前提下追求盈利，但过往的评级结果并未有针对性地区分。传统金融评级市场中，以穆迪、标普为代表的评级三剑客所做的是信用评级，其评估的是标的物的违约率；而以高盛、花旗等为代表的投行所发布的是资质评级，其评估的是标的物的后续增长空间。而无论是我们的SmartICO系列还是ChainDC系列，信用评级和资质评级一直被合并在一起，这显然是不科学的。因此，本次调整的首要任务是将信用评级和资质评级独立，使得我们的一份量化评级结果，同时能给出项目的信用得分和资质得分。"
              ko="우선, 목표를 선택하는 과정에서 투자자의 가장 큰 니즈는 리스크를 피하는 전제 하에서 수익을 추구하는 것이지만 이전의 등급평가 결과는 목표에 초점을 맞추어 구분하지 못했다. 전통적인 금융 등급평가 시장에서 무디스, 스탠더드앤드푸어스사를 대표로 하는 등급평가 삼총사의 등급평가는 신용 등급평가이며 표적물의 위약율에 대해 평가했다. 골드만삭스, 씨티은행을 대표로 하는 투자은행에서 발표한 것은 자질 등급평가이며 표적물의 후속 성장 공간에 대해 평가했다. 우리의 SmartICO 시리즈 또는 ChainDC 시리즈는 모두 신용 등급평가와 자질 등급평가를 합병했으며 이것은 분명히 비과학적이다. 따라서 이번  조정의 최우선 과제는 신용 등급평가와 자질 등급평가를 분리시킴으로써 우리의 양화 등급평가 결과에서 프로젝트의 신용 점수와 자질 점수를 동시에 제공하는 것이다."
            />
          </P>
          <p>
            <I18n
              en="Secondly, taking the ChainDC series model as an example, some dimensions do not reflect gradients and differences. For example, many project parties do not pay attention to the disclosure of funds supervision methods at present, which leads to the result of most incompetent and medium-scoring results regardless of the quality of the project. This is obviously not reasonable enough. Similarly, some dimensions are more cumbersome and less fair; for example, in the evaluation of blockchain relevance, based on the design of the project in the encryption layer, contract layer, consensus layer, network layer, platform layer, application layer and incentive layer, It is not fair enough for a public chain type to always get a relatively high score. In fact, the Token economic system and the intrinsic value-driven investigation throughout the life of the project are equally important. Therefore, in the new model, another task is to delete and adjust the problematic dimensions to further ensure that the sub-dimensions are independent and do not interfere with each other."
              zh="其次，以ChainDC系列模型为例，其部分维度没有体现出梯度和差异。例如许多项目方在当前并不重视资金监管方式的披露，导致无论项目资质优劣，大部分得到无差别中等得分的结果，这显然不够合理。 同样，部分维度设计得较为繁琐且公平性不足；例如区块链关联度的评估中，基于项目在加密层、合约层、共识层、网络层、平台层、应用层及激励层设计的梳理，公链类型总是能够得到相对高的分，这也是不够公平的。事实上，贯穿项目整个生命周期的Token经济体系及内在价值推动性的考察同等重要。因此，在新模型中，另一个任务是对存在问题的维度进行了删减及调整，进一步确保子维度间各自独立，互不干扰。"
              ko="다음으로, ChainDC 시리즈 모델을 예로 들자면, 일부 차원에 그래디언트와 차이가 반영되지 않았다. 예를 들어, 많은 프로젝트 보유자는 현재 자금 감독관리 방식의 공개에 대해 중시하지 않기에 프로젝트 자질의 우열과 관계없이 무차별적으로 중등 점수 결과를 초래하였으며 이것은 분명히 비합리적이다. 마찬가지로, 일부 차원의 설계는 비교적 복잡하고 공정성이 결여되었다. 예를 들어 블록체인 관련성 평가에서 프로젝트는 암호화 레이어, 프로토콜 레이어, 컨센서스 레이어, 네트워크 레이어, 플랫폼 레이어, 애플리케이션 레이어 및 인센티브 레이어 설계를 기반으로 정리되었기에 퍼블릭블록체인 유형은 항상 상대적으로 높은 점수를 얻게 되며 이것도 불공평하다. 사실, 프로젝트의 라이프 사이클 전체에 포함되는 토큰 경제 시스템과 내재적 가치의 추진성에 대한 조사도 동일하게 중요하다. 따라서 새 모델의 다른 과제는 문제점의 차원에 대해 삭제 및 조정해서 하위 차원간에 독립적이며 서로 교란이 없도록 확보해야 한다."
            />
          </p>
          <P>
            <I18n
              en="Another objective of the new model is to adjust current dimensions so that projects with good community building and international popularity gain more points in qualification. The basic dimensions remain Team and Project (same as within the ChainDC model), but adjustable factors will now also be given certain weight. The details are as follows:"
              zh="除权重分配的调整外，我们将原有的独立维度——热度纳入了社区评分考量的子项，这将使得一些社区建设完善、积攒了国际关注度的项目获得一定资质的加分；而跟ChainDC模型一致的是，我们依然将项目及团队作为通用维度考察基本资质，同时将动态变化的维度归为调节项目，并设置合理的权重占比。该评级体系包括以下方面内容："
              ko="제권 및 재분배 조정 외에도, 우리는 기존 독립 차원의 인기를 커뮤니티 평점 고려사항의 하위 항목에 포함시켜 일부 커뮤니티를 완벽하게 구축하고 국제관심도 프로젝트에서 일정한 자질 보너스를 축적했다. 우리는 ChainDC 모델과 일관되게 프로젝트와 팀을 여전히 범용 차원으로 기본자질을 검토했으며 동시에 동적변화 차원을 조절항목에 포함시키고 합리적인 가중점유율을 설정하였다. 해당 등급평가 시스템은 다음과 같은 방면의 내용이 포함된다:"
            />
          </P>
          <H3>
            <I18n
              en="1. Rating dimensions and indicators"
              zh="1.评价权重和指标"
              ko="1. 가중치 및 지표 평가"
            />
          </H3>
          <P>
            <I18n
              en="Since the importance of each dimension varies, their weights are determined individually. When choosing and weighing dimensions, Occam’s Razor is our guiding principle. There is no need to include dimensions that are not relevant to value or barely differentiate between projects."
              zh="权重泛指各项指标的重要性。评级的各项指标不应该中庸地等同，部分指标关联度高，影响更大，应当占据更高的权重；部分指标的影响相对小一些，其权重相对则小。广义来说，维度的选择应当满足奥卡姆剃刀定律：当某个指标关联度太小或无梯度差时，不应为增加维度而增加，维度的选择取决于对项目风险因子及资质的区分。"
              ko="가중치는 각 지표의 중요성을 모두 포함한다. 등급평가의 각항 지표는 중용적으로 동일해서는 아니되며, 일부 지표는 관련성이 높고 영향력이 더 크기에 더 높은 비중을 차지해야 하며, 일부 지표는 영향이 상대적으로 작고 가중치도 상대적으로 작다. 광의적으로, 차원의 선택에서 오컴의 면도날법칙을 만족시켜야 한다 . 어떤 지표의 관련도가 너무 작거나 그래디언트 차이가 없는 경우, 차원 증가에 따라 증가시켜서는 아니되며 차원의 선택은 프로젝트 리스크 요소 및 자질의 구분에 의해 결정된다."
            />
          </P>
          <P>
            <I18n
              en="Credit evaluating is essentially an assessment of risk, equivalent to the “Risk Assessment” dimension in our in-depth reviews. The selection of risk dimensions is dependent on the current compliancy standards of the industry. The result is an accumulation of many sub-divisions in order to create an integrated final evaluation. Typical risks include non-transparency, exaggerated information, etc. This evaluates a project’s credibility and the likelihood it fulfills its commitments."
              zh="信用评级，本质上是评估投资可能存在的风险，因此下文我们用更直观的“风险评级”表述来替代“信用评级”。风险评级的维度选择，应当符合当前行业的合规程度，以能充分联动评级结果为条件，通过各项主要指标的衡量，把项目潜在的风险点充分揭示出来，例如披露信息不透明、信息存在夸大等情况。其更偏向考察项目的可信度及履行承诺的可能性。"
              ko="신용 등급평가는 본질적으로 투자할 때 발생할 수 있는 리스크를 예측하는 것이기에 다음의 글에서 우리는 더욱 직관적인 '리스크 등급평가'로 '신용 등급평가'를 대체한다. 리스크 등급평가의 차원 선택은 현재 업계의 컴플라이언스 수준과 일치해야 하며 등급평가 결과와 충분하게 연동 가능함을 조건으로 각항 주요 지표에 대한 평가를 통해 프로젝트의 잠재적인 리스크를 충분히 밝혀야 한다. 예를 들어 정보 공개가 불투명하거나 정보에 부풀림이 있는 등 상황으로 프로젝트의 신뢰성과 약속 이행의 가능성에 대해 조사하는 경향이 있다."
            />
          </P>
          <P>
            <I18n
              en="The investibility evaluation includes the projects, the effectiveness of token incentive mechanisms, the current market value, and many other factors. Project and Team are the most fundamental dimensions while there are also adjustable variants as the project develops through its different phases. In general, the higher the investibility is, the more undervalued the project is in terms of market cap."
              zh="资质评级则将结合项目基本面、Token激励有效性、当前市值等多个因素，评估其投资潜力。评级要素以项目基本面、团队基本面为基础，结合动态因素，对当前市值是否高估、低估进行量化分析。市值若被高估，则说明资质较差，反之则说明资质较好。"
              ko="자질 등급평가는 프로젝트 펀더멘털, Token 인센티브 유효성, 현재 시가 등 여러 가지 요소를 결합시켜 투자 잠재력을 평가한다. 등급평가 요소는 프로젝트 펀더멘털, 팀 펀더멘털을 기반으로 동적 요소와 결합하여 현재 시가의 과대 평가 여부 또는 과소 평가 여부를 양화 분석한다. 시가가 과대 평가되었을 경우 자질이 비교적 안좋음을 설명하고 반대인 경우 자질이 비교적 양호함을 의미한다."
            />
          </P>
          <H3>
            <I18n
              en="2. Rating method and process"
              zh="2.评级的方法及流程"
              ko="2. 등급평가 방법 및 프로세스"
            />
          </H3>
          <P>
            <I18n
              en="Rating methods and processes indicate the full processes and methods (research, qualitative evaluation) comprising an in-depth review. This includes information collection, due diligence investigation, auditing after draft review, etc."
              zh="将评级结果划分为不同的级别时，应当将每一项级别所对应的不同定位向投资者公示，以起到参照系的作用。明确标准是建立完整评级体系的关键之一，如果定位标准模糊，投资者将很难分辨不同的风险和资质梯度意味着什么。"
              ko="등급평가 결과를 다른 레벨로 나눌 때 각 레벨에 해당하는 다른 포지셔닝에 대해 참조 시스템 역할을 할 수 있도록 투자자에게 공지해야 한다. 기준을 명확하게 하는 것은 완벽한 등급평가 시스템을 구축하는 관건 중의 하나이다. 만약 포지셔닝 기준이 애매하면 투자자가 다양한 리스크와 자질 그래디언트가 무엇을 의미하는지 구별하기 어렵게 된다."
            />
          </P>
          <H3>
            <I18n
              en="3. Levels of rating"
              zh="3.评级结果对应的标准"
              ko="3. 평가 결과에 해당되는 기준"
            />
          </H3>
          <P>
            <I18n
              en="Investors need a clear understanding of the levels of rating in our project reviews if they are to successfully use them as reference. If these levels are not clearly defined, they will provide little advice for investors hoping to learn more about the risk and investibility of a project."
              zh="将评级结果划分为不同的级别时，应当将每一项级别所对应的不同定位向投资者公示，以起到参照系的作用。明确标准是建立完整评级体系的关键之一，如果定位标准模糊，投资者将很难分辨不同的风险和资质梯度意味着什么。"
              ko="등급평가 결과를 다른 레벨로 나눌 때 각 각 레벨에 해당하는 다른 포지셔닝에 대해 참조 시스템 역할을 할 수 있도록 투자자에게 공지해야 한다. 표준을 명확하게 하는 것은 완벽한 등급평가 시스템을 구축하는 관건 중의 하나이다. 만약 포지셔닝 기준이 애매하면 투자자가 다양한 리스크와 자질 그래디언트가 무엇을 의미하는지 구별하기 어렵게 된다"
            />
          </P>
          <P>
            <I18n
              en="Defining levels is also one of the major challenges when designing a rating framework. The levels should not be too tight nor too broad. When defining investibility we adopted a nine level system which ranges from CCC as the lowest to AAA the highest. For risk there are five levels."
              zh="梯度的界定是框架设计的难点之一，标准过高或过低均会存在问题，因此需要十分慎重。不同梯度符号对应有多种预选方案，包括采用A~D，或Aaa、Aa、A、Bbb、Bb、B、Ccc、Cc、C表示。一般来说，结果区分度高时，采用级别较宽（9级以上）的指标更为合适，因此我们在资质评级中将采用9级以上梯度，在风险评级采用5级梯度。"
              ko="그래디언트에 대한 정의는 프레임워크 설계에서 어려운 포인트 중의 하나이다. 기준이 너무 높거나 또는 너무 낮으면 모두 문제가 되기에 반드시 아주 신중해야 한다. 다른 그래디언트 기호는 여러 가지 예선방안과 대응하며 A ~ D의 사용을 포함하여 Aaa, Aa, A, Bbb, Bb, B, Ccc, Cc, C로 표시된다. 일반적으로 차별 정도가 아주 높은 경우 레벨이 큰(9레벨 이상) 지표가 더 적합하므로 우리는 자질 등급평가에 9레벨 이상의 그래디언트를 채택하고 리스크 등급평가에서는 5레벨의 그래디언트를 사용하였다."
            />
          </P>
          <H2>
            <I18n
              en="Risk assessment system"
              zh="二、风险评级体系"
              ko="2. 리스크 등급평가 시스템"
            />
          </H2>
          <P>
            <I18n
              en="Risk assessment is an overall assessment containing many sub dimensions. It conducts qualitative and quantitative analysis for related risk factors. Quantitative factors are mostly for disclosed information from the project side and from research, such as transparency, exaggeration, fundraising, compliancy, and several other adjustable factors."
              zh="风险评级采用多维度综合判断的方法，对相关风险因子进行定性和定量的判断分析。定量指标主要对被评项目的披露信息和调研信息进行考察，主要包括：信息透明及真实、融资及合规、调节项。"
              ko="리스크 등급평가는 다차원 통합 판단 방법을 채택하여 관련 리스크 요인에 대해 정성 및 정량의 판단과 분석을 진행한다. 정량지표는 주로 평가대상 프로젝트가 공개한 정보 및 조사연구 정보에 대해 조사하며 주로 정보 투명도 및 진실성, 파이낸싱 및 컴플라이언스, 조절항목을 포함한다."
            />
          </P>
          <H3>
            <I18n
              en="1. Transparency"
              zh="1.信息透明"
              ko="1. 정보 투명도"
            />
          </H3>
          <H4>
            <I18n
              en="(1) Basic information"
              zh="(1) 基本信息"
              ko="(1) 기본정"
            />
          </H4>
          <P>
            <I18n
              en="Evaluating whether all necessary information for investors is disclosed by the project, including fundamental information (official website, white paper, communication channels, roadmap and code repo), and whether there are additional materials (such as a technical yellow paper, ecosystem paper or token economics paper, the level of outsource, etc)."
              zh="考察受评项目的信息披露透明程度。包括基础信息是否完整（官网、白皮书、社区通道、路线图、github），是否有附加文档（技术黄皮书、生态白皮书及经济白皮书），github开源程度等。"
              ko="평가대상 프로젝트의 정보 공개 투명도에 대해 조사하며  기본정보의 무결성 (공식 웹사이트, 백서, 커뮤니티 채널, 로드맵, github), 첨부 문서 (기술황서, 생태백서 및 경제백서) 여부, github 오픈소스 수준 등이 포함된다."
            />
          </P>
          <H4>
            <I18n
              en="(2) Team information"
              zh="(2) 团队信息"
              ko="(2) 팀 정보"
            />
          </H4>
          <P>
            <I18n
              en="The project's core team should be disclosed. Information about the core team helps investors know the founder, the team’s experience, whether there are scandals or negative history, whether they are working full time for the project, whether there is enough staff for the team, any major changes in the team, etc. All of the above information is indispensable for investors hoping to know the strength and stability of the team. On the contrary, lack of transparent information is a sign of  an unstable team. Investors should weigh any past history of failure from the project founder or core team as evenly as they weigh successful past experience, as such past failures reveal potential risks that are often neglected. Additionally, an investor should look into whether the company has a larger entity that owns it, as well as the amount of time the project has been in operation."
              zh="团队核心成员信息的详细披露，有助于投资人完整地了解项目创始人、执行团队的过往履历，包括有无不良记录、是否在该项目中全职投入、团队是否完整、团队人员变动情况等。通过以上信息的合理披露，团队的基础实力和稳定性能够得到较好的风险评判；反之，如果团队信息过于不透明，那么出现变动甚至跑路的风险会显著加大；而过分依赖成员的正面履历，却不考察其过往可能出现的失败案例和不良记录，有可能使得投资人无法预判潜在风险。此外，公司实体是否存在、项目立项时间也在我们的风险考察维度之中。项目在进行代币融资前的已运作时间，有助于帮助投资人判断项目是全新还是经过了时间的沉淀。"
              ko="팀의 핵심 멤버에 대한 자세한 정보 공개는 투자자가 불량기록의 유무, 프로젝트에 대한 올인 여부, 팀의 무결성 여부, 팀원 변경 여부 등을 포함하여 프로젝트 창시인, 집행팀의 과거 이력에 대해 완벽하게 이해하는 데 도움을 준다. 위의 정보의 합리적인 공개를 통해 팀의 기본실력과 안정성은 비교적 좋은 리스크 평가를 받을 수 있으며, 반대로 팀 정보가 지나치게 불투명한 경우 변경이나 심지어 도주 리스크가 뚜렷하게 증가한다. 구성원의 긍정적인 이력에만 과도하게 의존하고 과거에 발생했을 가능성이 있는 실패 사례와 불량기록을 검토하지 않으면 투자자는 잠재적 리스크를 미리 판단하지 못할 가능성도 있다. 또한, 회사 실체의 존재 여부, 프로젝트 입안 시간도 우리의 리스크 조사 차원에 포함된다. 프로젝트가 토큰 파이낸싱 이전에 운행된 시간은 투자자가 프로젝트의 신규 여부 또는 시간의 축적 여부를 판단하는 데 도움을 줄 수 있다. "
            />
          </P>
          <H3>
            <I18n
              en=" 2. Authentification"
              zh="2. 信息真实"
              ko="2. 정보의 진실성"
            />
          </H3>
          <P>
            <I18n
              en="Transparency is a basic indicator in risk analysis. Change of concept and exaggeration are very common in promoting a blockchain project, so analysts need their information to be verified and to carefully examine the source of that information."
              zh="透明度是风险评级的基本考察因子。披露信息描述可能会通过偷换概念、夸大描述等方式进行包装；分析师需要对信息的来源和可信度进行深入考察，在此基础上对存疑的点进行深入挖掘，对存在信息真实性疑点的阐述做出评定。"
              ko="투명도는 리스트 등급평가의 기본적인 조사 요소이다. 정보 공개는 개념을 바꿔치기해서 설명하거나 부풀려서 설명하는 등 방식으로 포장될 수 있으며, 애널리스트는 정보의 출처와 신뢰성에 대한 심도있게 조사하고 이를 바탕으로 의심되는 부분을 깊이 파고들어 정보의 진실성에 의심이 가는 부분의 논술에 대해 평가해야 한다."
            />
          </P>
          <P>
            <I18n
              en="Common non factual information from a team include exaggerations about education and work background, e.g. an internship repackaged into professional experience, investors listed as advisors, including non-investors and advisors on the advisors list. Other common exaggerations include fake popularity, exaggerated industry resources, non factual media propaganda etc. A project's attempts to fool investors into unrealistic expectations will affect its ratings in the risk dimension."
              zh="执行团队可能存在学历、工作履历的夸大，如将在校实习经验包装成工程经验，将投资人写作顾问，或将非投资人及顾问擅自纳入顾问成员中，一旦与顾问本人核实确认存在造假情况，说明项目存在严重的诚信问题。除此之外，社群的明显伪热、行业资源夸大、不实的媒体宣传等，也意味着项目方在营销上，以远超项目自身价值的预期进行包装，这也将影响风险评级的结果。"
              ko="집행팀은 학력, 근무 경력에 대한 과장이 있을 수 있다. 예를 들어, 학교의 인턴십 경험을 엔지니어링 경험으로, 투자자를 컨설턴트로, 또는 비투자자 및 컨설턴트를 임의로 컨설턴트 구성원에 포함시키는 경우가 있으며,  일단 컨설턴트 본인에게 확인하여 허위 조작 사실이 발견되면 프로젝트에 심각한 성실신의 문제가 존재함을 설명한다. 이외에도 커뮤니티의 명백한 의사인기, 업계자원의 과장, 허위 미디어 홍보 등 역시 프로젝트 보유자가 마케팅에서 프로젝트 본연의 가치 예상을 훨씬 초과한 포장으로 이 또한 리스크 등급평가 결과에 영향을 미친다."
            />
          </P>
          <H3>
            <I18n
              en="3. Fundraising and compliancy"
              zh="3. 融资及合规"
              ko="3. 파이낸싱 및 컴플라이언스"
            />
          </H3>
          <p>
            <I18n
              en="Fundraising is one of the key risk indicators. The most important factors are the number of fundraising rounds and the price, the lock-up period, budget allocation, additional issuance, etc. In the earlier stages of a project, some of these indicators can be merely regarded as empty promises, but they do partially reflect the token economic concept behind the project. Projects have different standards for fundraising in different industries; our method is to compare the project’s market cap with its rivals and to conduct objective, justified conclusions on the funding plan of the project."
              zh="融资信息是衡量项目的风险指标之一，其中尤其要关心融资阶梯及价格、锁仓情况、预算分配、有无增发等信息。虽然在项目进展初期，部分指标仅能视为承诺，但能初步反映受评项目对经济模型设计的合理程度。一般而言，不同领域的资金需求是不同的，我们通常会将受评项目与同类竞品进行对照，以参考均值的方式对受评项目融资情况做出客观、公正的判断。"
              ko="파이낸싱 정보는 프로젝트의 리스크를 측정하는 지표 중의 하나이며, 그중 특히 융자 수단과 가격, 예산 분배, 추가 발행 여부에 초점을 두어야 한다. 프로젝트 초기에 일부분의 지표는 약속으로만 볼 수 있지만 평가대상 프로젝트의 경제 모델 설계의 합리성을 초보적으로 반영할 수 있다. 일반적으로 서로 다른 분야의 자금 니즈는 다르며, 우리는 일반적으로 평가대상 프로젝트를 유사한 경쟁제품과 비교하고 평균치를 참조하는 방식으로 평가대상 프로젝트의 파이낸싱 상황에 대해 객관적이고 공정하게 판단한다."
            />
          </p>
          <p>
            <I18n
              en="For compliance, the actual plan and the execution of the fundraising are evaluated. Whether it is internal supervising, or external supervising by their community or a third party, the project has to spend investor money wisely and respect the plan it has previously set."
              zh="合规层面，主要是考察项目资金监管的计划和实际执行情况。无论采用内部（基金会）监管，或者是外部的社区及第三方监管，项目推进中的合理支出应与预算相匹配并定期披露。"
              ko="컴플라이언스 측면에서는 주로 프로젝트 자금의 감독관리 계획 및 실제 집행 상황에 대해 조사한다. 내부 (펀드) 감독관리를 채택하든 외부의 커뮤니티 및 제3자 감독관리를 채택하든 상관없이 프로젝트 추진 중에서 합리적인 지출은 예산과 매칭되어야 하며 정기적으로 공개되어야 한다."
            />
          </p>
          <p>
            <I18n
              en="Based on the above three items, we have developed a risk rating quantification table as follows:"
              zh="根据以上三项，我们制定风险量化表如下："
              ko="위의 세 가지 항목에 의해 우리는 다음과 같은 리스크 양화표를 제정하였다:"
            />
          </p>
          <Table>
            <thead>
              <tr>
                <th>
                  <I18n
                    en="First dimension"
                    zh="一级维度"
                    ko="1급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="Second dimension"
                    zh="二级维度"
                    ko="2급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="Third dimension"
                    zh="三级维度"
                    ko="3급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="(Score) Details"
                    zh="（得分）描述"
                    ko="(점수) 설명"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <I18n
                    en="Transparency"
                    zh="信息透明"
                    ko="정보 투명"
                  />
                </td>
                <td>
                  <I18n
                    en="Basic information"
                    zh="基本信息"
                    ko="기본정보"
                  />
                </td>
                <td>
                  <I18n
                    en="Whitepaper"
                    zh="白皮书"
                    ko="백서"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No whitepaper"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Has whitepaper"
                      zh="有"
                      ko="있음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Has whitepaper and additional yellow paper or ecosystem/tekeneconomy whitepaper"
                      zh="有附件技术黄皮书或生态/经济白皮书"
                      ko="기술황서 또는 생태 / 경제백서의 첨부파일이 있음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Social media and communication channels"
                    zh="社区通道"
                    ko="커뮤니티 채널"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No social media nor communication channel"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Has telegram and twitter as communication channels"
                      zh="有基本社区（电报、twitter）"
                      ko="기본 커뮤니티가 있음 (텔레그램, 트위터)"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Has many communication channels including Youtube, forum, reddit, developers community etc."
                      zh="有丰富的社区通道（ YouTube、论坛、微博、开发者聊天频道)"
                      ko="풍부한 커뮤니티 채널이 있음 (YouTube, 포럼, 웨이보, 개발자 채팅 채널)"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Github</td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Not open source"
                      zh="明确不开源"
                      ko="명백하게 오픈소스가 아님"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Private repository"
                      zh="暂无或有私有库"
                      ko="일시적으로 없거나 또는  사적스토리지가 있음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Open source"
                      zh="开源"
                      ko="오픈 소스"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Open source and well documented,  conforms the roadmap"
                      zh="开源且详细，与进度相符"
                      ko="오픈 소스 및 상세하고 진척과 일치함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Core team"
                    zh="核心团队信息"
                    ko="핵심 팀 정보"
                  />
                </td>
                <td>
                  <I18n
                    en="Team’s records"
                    zh="人员"
                    ko="인원"
                  />
                </td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="Have negative history (Risk)"
                      zh="存在不良记录或负面报道（风险点）"
                      ko="불량기록 또는 부정적인 기사가 있음 (리스크 포인트)"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Cannot be verified"
                      zh="无可查证"
                      ko="검증할 수 없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Verifiable and very detailed (Through LInkedin, ITJUZI or other channels)"
                      zh="可查证且详细（领英或IT桔子等渠道）"
                      ko="검증 가능하고 상세함 (링크드인 또는 IT juzi 등 채널)"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Full-time or part-time"
                    zh="是否全职"
                    ko="상근 여부"
                  />
                </td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="All employees are part-time (Risk)"
                      zh="全兼职（风险点）"
                      ko="전부 겸직임 (리스크 포인트)"
                    />
                  </div>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Some employees are part-time"
                      zh="部分兼职"
                      ko="일부분이 겸직임"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="All employees are full-time"
                      zh="全职"
                      ko="상근임"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Operation time"
                    zh="项目立项时间"
                    ko="프로젝트 입안 시간"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Within 3 months"
                      zh="3个月内"
                      ko="3개월 이내"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="3-6 months"
                      zh="3~6个月"
                      ko="3 ~ 6개월"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="More than 1 year"
                      zh="一年以上"
                      ko="1년 이상"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Has an physical entity?"
                    zh="是否有公司实体"
                    ko="회사 실체 여부"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Yes"
                      zh="有"
                      ko="있음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Change of team"
                    zh="人员变动"
                    ko="인원 변경"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Core team member has left"
                      zh="有核心成员退出"
                      ko="핵심 멤버가 퇴출하였음"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No changes"
                      zh="无异动"
                      ko="변경 없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Has expanded the team"
                      zh="进行了人员扩充"
                      ko="인원을 확장하였음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Has introduced new members who will eminently contribute to the project"
                      zh="重磅成员加入"
                      ko="폭탄급 멤버가 합류"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Authenticity"
                    zh="信息真实"
                    ko="정보 진실성"
                  />
                </td>
                <td>
                  <I18n
                    en="Team members’ experience"
                    zh="团队成员描述"
                    ko="팀원 설명"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-3</Score>
                    <I18n
                      en="infomation of the executive team, investor or advisor is forged"
                      zh="执行团队、投资方、顾问造假（风险点）"
                      ko="집행팀, 투자자, 컨설턴트 허위조작 (리스크 포인트)"
                    />
                  </div>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Information of the executive team, investor or advisor  is exaggerated"
                      zh="执行团队、投资方、顾问夸大"
                      ko="집행팀, 투자자, 컨설턴트 부풀림"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Information is authentic"
                      zh="无夸大，信息属实"
                      ko="부풀림이 없고, 정보가 진실됨"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Industry resources"
                    zh="行业资源描述"
                    ko="업계자원 설명"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-3</Score>
                    <I18n
                      en="Industry resource is forged  (risk)"
                      zh="行业资源造假（风险点）"
                      ko="업계자원 허위조작 (리스크 포인트)"
                    />
                  </div>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="industry resources is exaggerated"
                      zh="行业资源夸大"
                      ko="업계자원 부풀림"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Industry resource is authentic"
                      zh="无夸大，信息属实"
                      ko="부풀림이 없고, 정보가 실제와 일치함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Fake popularity of social media and community"
                    zh="热度造假"
                    ko="인기 허위조작"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="Fake popularity of social media or community"
                      zh="社交媒体及社群伪热"
                      ko="소셜미디어 및 커뮤니티 의사인기"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Authentic popularity"
                      zh="有真实热度"
                      ko="진실된 인기가 있"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Marketing and PR"
                    zh="媒体宣传"
                    ko="미디어 홍보"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Has exaggeration in Marketing and PR"
                      zh="存在不实或夸大"
                      ko="실제와 일치하지 않거나 부풀람이 있음"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No exaggeration in Marketing and PR"
                      zh="无夸大"
                      ko="부풀람이 없음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Fundraising and compliance"
                    zh="融资合规"
                    ko="파이낸싱 및 컴플라이언스"
                  />
                </td>
                <td>
                  <I18n
                    en="Fundraising rounds"
                    zh="融资阶梯"
                    ko="파이낸싱 수단"
                  />
                </td>
                <td>
                  <I18n
                    en="Ratio of price in each round"
                    zh="各轮价格比例"
                    ko="각 라운드 가격비"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Not transparent"
                      zh="不透明"
                      ko="불투명"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Ratio is not reasonable, the gap between each round is too big"
                      zh="梯度差距过大"
                      ko="그래디언트 차이가 지나치게 "
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Ratio is reasonable"
                      zh="梯度合理"
                      ko="그래디언트가 합리적임"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Ratio of the total funding in each round"
                    zh="各轮融资占比"
                    ko="각 라운드 파이낸싱 점유율"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Not transparent"
                      zh="不透明"
                      ko="불투명"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Ratio is not reasonable, the gap between each round is too big"
                      zh="占比不合理"
                      ko="점유율이 불합리적임"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Ratio is reasonable"
                      zh="占比合理"
                      ko="점유율이 합리적임"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Lock-up"
                    zh="锁仓情况"
                    ko="락포지션 상황"
                  />
                </td>
                <td>
                  <I18n
                    en="Team lock-up"
                    zh="团队锁仓"
                    ko="팀 락포지션"
                  />
                </td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="No lock-up"
                      zh="无锁仓"
                      ko="락포지션이 없음"
                    />
                  </div>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Lock-up period is too short (Less than 6 months)"
                      zh="锁仓时间过短（6个月内）"
                      ko="락포지션 시간이 너무 짧음 (6개월 이내)"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Lock-up period is reasonable considering the road-map"
                      zh="有锁仓，时间合理（对比里程碑）"
                      ko="락포지션이 있고 시간이 합리적임 (마일스톤 대비)"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Lock-up period is long"
                      zh="长周期锁仓"
                      ko="장기 사이클 락포지션"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Investor lock-up"
                    zh="投资人锁仓"
                    ko="투자자 락포지션"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="No lock-up"
                      zh="无锁仓"
                      ko="락포지션이 없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Lock-up period is reasonable (3 to 6 months)"
                      zh="合理锁仓时间周期（3个月~6个月）"
                      ko="합리적인 락포지션 사이클 (3개월 ~ 6개월)"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Lock-up period is long"
                      zh="长周期锁仓"
                      ko="장기 사이클 락포지"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Budget disclosure"
                    zh="预算分配"
                    ko="예산 분배"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="No budget disclosure"
                      zh="未公布"
                      ko="발표하지 않음"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Budget is disclosed but ambiguous"
                      zh="公布但模糊"
                      ko="발표했지만 애매함"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Budget is disclosed and detailed"
                      zh="公布且详细"
                      ko="발표하였으며 상세함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Additional issuance"
                    zh="增发"
                    ko="추가 발행"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="Unreasonable additional issuance"
                      zh="不合理的增发设计"
                      ko="불합리적인 추가발행 설계"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Additional issuance within a reasonable range"
                      zh="合理范畴内"
                      ko="합리적인 범주 이내"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Fund supervision"
                    zh="资金监管"
                    ko="자금 감독 관리"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No fund supervision"
                      zh="无资金监管"
                      ko="자금 감독관리가 없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Internal fund supervision"
                      zh="内部（基金会）监管"
                      ko="내부 (펀드) 감독관리"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Fund supervision by the community"
                      zh="社区监管"
                      ko="커뮤니티 감독관리"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Fund supervision by third party"
                      zh="第三方监管"
                      ko="제3자 감독관리"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Compliance"
                    zh="合规"
                    ko="컴플라이언스"
                  />
                </td>
                <td>
                  <I18n
                    en="Policy"
                    zh="政策"
                    ko="정책"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Likely to be regalated"
                      zh="明显触碰政策及监管因素"
                      ko="명백하게 정책 및 감독관리 요소에 저촉됨"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Unlikely to be regulated"
                      zh="不涉及"
                      ko="연관이 없음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>KYC</td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No KYC"
                      zh="无限制"
                      ko="무제한"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Reasonable KYC"
                      zh="合理设置"
                      ko="설정이 합리적임"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Adjustable factor"
                    zh="调节项"
                    ko="조절항목"
                  />
                </td>
                <td>
                  <I18n
                    en="Market cap"
                    zh="估值"
                    ko="예정"
                  />
                </td>
                <td>
                  <I18n
                    en="Estimated Market cap"
                    zh="预估市值或当前市值"
                    ko="시가 예정 또는 현재 시가"
                  />
                </td>
                <td>
                  <div>
                    <Score>-5</Score>
                    <I18n
                      en="Very high"
                      zh="相对极高"
                      ko="상대적으로 극히 높"
                    />
                  </div>
                  <div>
                    <Score>-3</Score>
                    <I18n
                      en="High"
                      zh="相对高"
                      ko="상대적으로 높음"
                    />
                  </div>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Adequate"
                      zh="适中"
                      ko="적절함"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Low"
                      zh="相对低"
                      ko="상대적으로 낮음"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Very low"
                      zh="相对极低"
                      ko="상대적으로 극히 낮"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <P>
            <I18n
              en="The corresponding results of the risk rating are as follows："
              zh="风险评级结果对应标准如下："
              ko="리스크 등급평가 결과에 해당되는 기준은 다음과 같습니다:"
            />
          </P>
          <Table>
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>
                  <I18n
                    en="Risk grade"
                    zh="风险得分"
                    ko="리스크 점수"
                  />
                </th>
                <th style={{ minWidth: '150px' }}>
                  <I18n
                    en="Meaning"
                    zh="含义"
                    ko="의미"
                  />
                </th>
                <th>
                  <I18n
                    en="Description"
                    zh="描述"
                    ko="설명"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A[25-30]</td>
                <td>
                  <I18n
                    en="Very low risk"
                    zh="风险极低"
                    ko="리스크가 아주 낮음"
                  />
                </td>
                <td>
                  {RiskElement.A}
                </td>
              </tr>
              <tr>
                <td>B[20-25]</td>
                <td>
                  <I18n
                    en="Low risk"
                    zh="风险低"
                    ko="리스크가 낮음"
                  />
                </td>
                <td>
                  {RiskElement.B}
                </td>
              </tr>
              <tr>
                <td>C[10-20]</td>
                <td>
                  <I18n
                    en="Medium risk"
                    zh="风险中"
                    ko="리스크 중"
                  />
                </td>
                <td>
                  {RiskElement.C}
                </td>
              </tr>
              <tr>
                <td>D[5-9]</td>
                <td>
                  <I18n
                    en="High risk"
                    zh="风险高"
                    ko="리스크가 높음"
                  />
                </td>
                <td>
                  {RiskElement.D}
                </td>
              </tr>
              <tr>
                <td>
                  {'E[<5]'}
                </td>
                <td>
                  <I18n
                    en="Very high risk"
                    zh="风险极高"
                    ko="리스크가 극도로 높음"
                  />
                </td>
                <td>
                  {RiskElement.E}
                </td>
              </tr>
            </tbody>
          </Table>
          <P>
            <I18n
              en="Comment: Risk evaluation is focused on force projects stability and risk level of the future development. It is all based on open data and information, its conclusion should be precise, without any ambiguity. The levels of risk increases progressively. All the projects are covered in the above metric."
              zh="（说明：风险评级重点预估项目在未来推进过程的稳定程度和风险大小。基于公开信息和数据，所得出的结论应当具备确定性而非模棱两可，梯度间应当呈现递进的关系，而不应存在处于两者之间的情况。）"
              ko="(설명 : 리스크 등급평가는 프로젝트의 장래 추진 과정에서의 안정성과 리스크의 크기를 예측한다. 공개 정보 및 데이터를 기반으로 도출된 결론은 확실해야 하고 애매해서는 아니되며 그래디언트는 점진적인 관계를 보여주어야 하고 양자 사이 처해 있는 상황이 있어서는 아니된다.)"
            />

          </P>
          <H2>
            <I18n
              en="Investibility evaluation"
              zh="三、资质评级体系"
              ko="3. 자질 등급평가 시스템"
            />

          </H2>
          <p>
            <I18n
              en="Qualification is also an integrated quantitative and qualitative evaluation based on many dimensions besides just fundamental analysis and estimated market cap. Adjustable factors are set for different types of projects in different phases. Quantitative indicators have three core aspects: project, team, and adjustable factors. These three core aspects, together with estimated market cap, decide the qualification of a project."
              zh="资质评级同样采用多维度综合判断的方法，对基本面及估值等可投资因素进行定性和定量的判断分析，并针对不同类型、不同时间节点的评级对象，采用不同的“调节项”。定量指标主要对被评项目的资质进行评估，在项目基本面、团队基本面、调节项的基础上，结合估值分析，对项目资质进行评估。"
              ko="자질 등급평가는 마찬가치로 다차원 통합판단 방법을 사용하여 펀더멘털 및 예측 등 투자 가능한 요소에 대해 정성 및 정량의 판단 및 분석을 진행하며, 다른 유형 및 다른 시간 노드의 등급평가 대상에 대해 서로 다른 '조절항목'을 채택한다. 정량 지표는 주로 평가대상 프로젝트의 자질에 대해 평가하며 프로젝트 펀더멘털,  팀 펀더멘털, 조절항목을 기반으로 예측 분석과 결합하여 프로젝트 자질에 대해 평가한다."
            />
          </p>
          <H3>
            <I18n
              en="1. Project (35%)"
              zh="1.项目基本面(35%)"
              ko="1. 프로젝트 펀더멘털(35%)"
            />

          </H3>
          <H4>
            <I18n
              en="(1) Positioning: 15%"
              zh="(1) 定位：15%"
              ko="(1) 포지션: 15%"
            />

          </H4>
          <P>
            <I18n
              en="Includes a project’s competitive field (basic infrastructure, solution, use cases), the project's current status, the maturity of its technology and its potential market."
              zh="考察项目所处赛道（底层设施、解决方案、应用），根据该领域在行业所处的阶段、技术成熟度、前景进行评估。"
              ko="프로젝트가 위치하는 트랙 (인프라 시설, 솔루션, 애플리케이션)을 조사하고 해당 분야가 업계에서 위치한 단계, 기술 성숙도 및 전망에 대해 평가한다."
            />
          </P>
          <H4>
            <I18n
              en="(2) Competition: 5%"
              zh="(2) 竞品对比：5%"
              ko="(2) 경쟁제품 비교: 5%"
            />
          </H4>
          <P>
            <I18n
              en="Many projects are similar in concept and design. It is important to ask whether such projects  have their own core innovation as a “moat,” as a unique competitive advantage not easily replicated or adapted by competitors. When analyzing a project, investors need to distinguish which parts of the projects do not really differentiate it from its many rivals, and which parts qualify as truly unique advantages."
              zh="许多项目在概念和设计上大同小异，因此有实质创新的项目更容易形成自身的护城河。分析师在考察项目创新时，应区分哪一类是东拼西凑，哪一类是其他项目没有而评级对象"
              ko="많은 프로젝트의 개념과 설계가 대동소이하기 때문에 실제로 혁신적인 프로젝트가 더욱 쉽게 자체 해자를 형성할 수 있다. 프로젝트 혁신에 대해 조사할 때 애널리스트는 어떤 것이 짜집기한 것이고 어떤 것이 다른 프로젝트에 없는 등급평가 대상인지를 구분해야 한다."
            />
          </P>
          <P>
            <I18n
              en="First-mover projects tend to have more experience and a team working on later, delivery based stages of the project. When analysts evaluate projects’ first mover advantages, a comprehensive investigation including related past examples is necessary. Analysts must also identify projects that haven't had any updates or progress for a long time, since it is likely such projects are reselling old services with a new blockchain label."
              zh="早期的先发项目虽然在团队磨合、经验和教训方面有一定的积累和沉淀，分析师在评估项目先发优势时，仍然需要结合其过往案例进行综合分析，识别出长时间无更新迭代、放弃老项目意图新瓶装旧酒的套路。"
              ko="초기 선발 프로젝트는 팀워크, 경험 및 교훈 면에서 일정한 축적이 있다. 하지만 애널리스크는 프로젝트의 선점우세에 대해 평가할 때 여전히 과거 사례와 결합해서 통합적으로 분석함으로써 장기간 세대교체가 없거나 오래된 프로젝트를 포기하고 새병에 묵은 술을 담듯이 그릇 바꿔치기만 하는 수법 의도들을 식별해야 한다."
            />
          </P>
          <H4>
            <I18n
              en="(3) Necessity of the project: 15%"
              zh="(3) 项目必要性分析：15%"
              ko="(3) 프로젝트 필요성 분석: 15%"
            />

          </H4>
          <P>
            <I18n
              en="This dimension should be evaluated using two aspects: pain point (i.e. what problem is the project solving?) and the token incentive mechanism. The pain point assesses the estimated impact on the industry’s efficiency, and has four levels: no demand, has demand, strong demand, and rigid demand. It is inevitable to be subjective when judging the perceived demand of a project, but analysts should nevertheless justify their decisions with strong evidence and convincing reasons."
              zh="从痛点及Token激励机制两个方面考察，将结合具体项目对行业效率的预计影响，分为伪需求、一般需求、强需求、刚需。由于该维度不可避免存在一定的主观判断，分析师对所得出的结论应当有充分的依据和逻辑。"
              ko="페인포인트와 Token인센티브 메커니즘의 두 측면으로부터 조사하고 구체적인 프로젝트와 결합시켜 업계 효율에 대한 예상 영향을 의사니즈, 일반 니즈, 강한 니즈와 절대 니즈로 구분한다. 해당 차원은 불가피적으로 일정한 주관적인 판단이 존재하기 때문에 애널리스트가 도출한 결론은 충분한 근거와 논리가 뒷받침해야 한다."
            />
          </P>
          <P>
            <I18n
              en="The token incentive mechanism measures the importance of tokens within the system. It also has four levels: no token incentive mechanism, has token incentive mechanism, token incentive mechanism is integrated, token incentive mechanism is highly integrated."
              zh="Token激励机制考察项目与Token的耦合程度，分为无、常规激励机制、与项目深度耦合、与项目耦合度极高4档。"
              ko="Token 인센티브 메커니즘은 프로젝트와 Token 간의 매칭도를 조사하며, 없음, 일반적인 인센티브 메커니즘, 프로젝트와 딥커플링, 프로젝트와 매칭도가 매우 높음의 4단계로 구분한다."
            />
          </P>
          <H3>
            <I18n
              en="2. Team: (40%)"
              zh="2. 团队基本面（40%)"
              ko="2. 팀 펀더멘털 (40%)"
            />
          </H3>
          <H4>
            <I18n
              en="(1) Executive team: 30%"
              zh="(1) 执行团队：30%"
              ko="(1) 집행팀: 30%"
            />
          </H4>
          <P>
            <I18n
              en="The strength of the executive team is the key indicator that pushes the project forward at a steady pace. The members’ former blockchain experience, accumulated entrepreneurship experience, and accumulated industry resources are all especially important. This dimension evaluates the executive members' blockchain experience, software development experience, and related industry resource."
              zh="执行团队的实力是推动项目稳步进展的核心指标之一，其中尤其重要的是成员在区块链及软件领域的开发经验、过往公司运作经验以及积累的行业资源。该维度将从团队成员的区块链项目开发经验、软件项目开发经验、公司运作经验、相关行业资源考察。"
              ko="집행팀의 실력은 프로젝트의 꾸준한 발전을 추진하는 핵심 지표 중의 하나이며, 그중에서 특히 중요한 것은 구성원이 갖고 있는 블록체인 및 소프트웨어 분야에서의 개발 경험, 과거의 회사운영 경험 및 축적된 업계자원이다. 해당 차원은 팀 구성원의 블록체인 프로젝트 개발 경험, 소프트웨어 프로젝트 개발 경험, 회사운영 경험 및 관련 업계자원에 대해 조사한다."
            />
          </P>
          <H4>
            <I18n
              en="(2) Investors and advisors: 5%"
              zh="(2) 投资人顾问：5%"
              ko="(2) 투자자 컨설턴트: 5%"
            />
          </H4>
          <P>
            <I18n
              en="Investors and advisors bring their own influence and resources to the team, but investors should note that if the investors or advisors have little connection to blockchain, or the industry the project has chosen, then the actual positive impact of their involvement will be limited."
              zh="投资方和顾问除了考察其影响力外，还应评估其与项目的关联程度；如果关联度弱，顾问对项目所能带来的实质帮助将十分有限。"
              ko="투자자와 컨설턴트는 그들의 영향력에 대해 조사하는 외에도 프로젝트와의 관련성에 대해서도 평가해야 한다. 관련성이 약하면 컨설턴트가 프로젝트에 대한 실질적인 도움은 매우 큰 한계가 있다."
            />
          </P>
          <H4>
            <I18n
              en="(3) Institutional investors: 5%"
              zh="(3) 投资机构：5%"
              ko="(3) 투자기관: 5%"
            />
          </H4>
          <P>
            <I18n
              en="Evaluation of institutional investors will use DPRating’s Venture’s ranking as a reference. Community and Popularity."
              zh="结合投机机构评分榜单，根据其过往投资案例，进行评估。"
              ko="투자기관의 평점랭킹과 결합하여 과거 투자사례에 의해 평가한다."
            />
          </P>
          <H3>
            <I18n
              en="3. Community building and popularity (20%)"
              zh="3. 社区及热度（20%）"
              ko="3. 커뮤니티 및 인기 (20%)"
            />
          </H3>
          <P>
            <I18n
              en="Evaluating community building and popularity is based on a project's social media platforms, as well as search indexes, PR events."
              zh="从社交媒体、搜索指数、社群、PR活动，考察项目当前社区建设情况和热度。"
              ko="소셜미디어, 검색지수, 소셜미디어 이용자, PR활동으로부터 해당 커뮤니티의 구축상황과 인기에 대해 조사한다."
            />
          </P>
          <H3>
            <I18n
              en="4. Adjustable factor (-10%~10%)"
              zh="4. 调节项（-10%~10%）"
              ko="4. 조절항목 (-10% ~ 10%)"
            />
          </H3>
          <P>
            <I18n
              en="(1) For those projects that have already been launched, this evaluation will be based on its market cap, roadmap goal fulfillment, and code updates."
              zh="(1) 对已上线项目，考察其当前市值、履约情况、代码更新；"
              ko="(1) 이미 출시된 프로젝트에 대해 현재 시가, 약속 이행 상태 및 코드 업데이트를 조사한다."
            />
          </P>
          <P>
            <I18n
              en="(2) For those projects that haven't been launched, this evaluation will be based on its estimated market cap (which is based on the token economic model), and the current status of development."
              zh="(2) 对未上线项目，考察预估市值（根据token经济模型）和当前进度。"
              ko="(2) 출시되지 않은 프로젝트에 대해, 예상 시가 (token경제모델에 의해)와 현재 진척을 조사한다."
            />

          </P>
          <P>
            <I18n
              en="Based on the above, the quantitative table of qualification rating is as follows:"
              zh="根据以上各项，制定资质评级量化表如下："
              ko="위의 각 항목에 의해 다음과 같이 자질 등급평가 양화표를 제정한다:"
            />
          </P>
          <Table>
            <thead>
              <tr>
                <th>
                  <I18n
                    en="First Dimension"
                    zh="一级维度"
                    ko="1급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="Second dimension"
                    zh="二级维度"
                    ko="2급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="Third Dimension"
                    zh="三级维度"
                    ko="3급차원"
                  />
                </th>
                <th>
                  <I18n
                    en="(Score) Comment"
                    zh="(得分) 说明"
                    ko="(점수) 설명"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <I18n
                    en="Project"
                    zh="项目基本面"
                    ko="프로젝트 펀더멘털"
                  />
                </td>
                <td>
                  <I18n
                    en="Position 15%"
                    zh="定位 15%"
                    ko="포지션 15%"
                  />
                </td>
                <td>
                  <I18n
                    en="Position 15%"
                    zh="定位 15%"
                    ko="포지션 15%"
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Competitive advantages 5%"
                    zh="竞品定位 5%"
                    ko="경쟁제품 포지션 5%"
                  />
                </td>
                <td>
                  <I18n
                    en="First mover 2%"
                    zh="先发优势 2%"
                    ko="선점우세 2%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No"
                      zh="无积累跟风"
                      ko="축적이 없고 남들을 뒤쫓아다님"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="No, but has unique advantages"
                      zh="有一定积累"
                      ko="일정한 축적이 있음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Yes"
                      zh="先发优势明显、有充足合作积累"
                      ko="선점우세가 뚜렷하고 협력과 축적이 충분함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Innovative 3%"
                    zh="创新 3%"
                    ko="혁신 3%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Little innovation"
                      zh="弱"
                      ko="약함"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Lots of innovation"
                      zh="较强"
                      ko="비교적 강함"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Important break through"
                      zh="突破性创新"
                      ko="획기적인 혁신"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Necessity 15%"
                    zh="项目必要性分析 15%"
                    ko="프로젝트 필요성 분석 15%"
                  />
                </td>
                <td>
                  <I18n
                    en="Is it Pain point 5%"
                    zh="痛点 5%"
                    ko="페인포인트 5%"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="No demand"
                      zh="伪需求"
                      ko="의사 니즈"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Normal demand"
                      zh="需求一般"
                      ko="니즈가 일반적임"
                    />
                  </div>
                  <div>
                    <Score>4</Score>
                    <I18n
                      en="Strong demand"
                      zh="强需求"
                      ko="니즈가 강함"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Rigid demand"
                      zh="刚需"
                      ko="니즈가 절대적임"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Token incentive mechanism 10%"
                    zh="Token 激励机制 10%"
                    ko="Token 인센티브 메커니즘 10%"
                  />
                </td>
                <td>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="No token incentive"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>4</Score>
                    <I18n
                      en="Has token incentive mechanism"
                      zh="常规激励机制"
                      ko="일반 인센티브 메커니즘"
                    />
                  </div>
                  <div>
                    <Score>7</Score>
                    <I18n
                      en="Token incentive mechanism is integrated"
                      zh="与项目深度耦合"
                      ko="프로젝트와 딥커플"
                    />
                  </div>
                  <div>
                    <Score>10</Score>
                    <I18n
                      en="Token incentive mechanism is highly integrated"
                      zh="与项目耦合度极高"
                      ko="프로젝트와 커플링도가 극히 높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Team"
                    zh="团队基本面"
                    ko="팀 펀더멘털"
                  />
                </td>
                <td>
                  <I18n
                    en="Executive Team 30%"
                    zh="执行团队 30%"
                    ko="집행팀 30%"
                  />
                </td>
                <td>
                  <I18n
                    en="Team profile and project match 10%"
                    zh="团队与项目需求匹配度 10%"
                    ko="팀 및 프로젝트 니즈 매칭도 10%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Level of Match is low"
                      zh="匹配度低"
                      ko="매칭도가 낮음"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Level of Match is relatively low"
                      zh="匹配度较低"
                      ko="매칭도가 비교적 낮음"
                    />
                  </div>
                  <div>
                    <Score>6</Score>
                    <I18n
                      en="Level of Match is medium"
                      zh="匹配度中"
                      ko="매칭도 중"
                    />
                  </div>
                  <div>
                    <Score>8</Score>
                    <I18n
                      en="Level of Match is relatively high"
                      zh="匹配度较高"
                      ko="매칭도가 비교적 높음"
                    />
                  </div>
                  <div>
                    <Score>10</Score>
                    <I18n
                      en="Level of Match is very high"
                      zh="匹配度高"
                      ko="매칭도가 높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Software development experience 10%"
                    zh="软件项目开发经验 10%"
                    ko="소프트웨어 프로젝트 개발경험 10%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No experience"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Has experience"
                      zh="参与过"
                      ko="참여한 적이 있음"
                    />
                  </div>
                  <div>
                    <Score>6</Score>
                    <I18n
                      en="Previously occupied an important position in a blockchain project"
                      zh="担任过要职"
                      ko="중요직책을 맡은 적이 있음"
                    />
                  </div>
                  <div>
                    <Score>8</Score>
                    <I18n
                      en="Led a blockchain project"
                      zh="主导过项目"
                      ko="프로젝트를 주도한 적이 있음"
                    />
                  </div>
                  <div>
                    <Score>10</Score>
                    <I18n
                      en="Led a very successful blotching project"
                      zh="有成功案例"
                      ko="성공 사례가 있음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Operation expertience 5%"
                    zh="公司运作经验 5%"
                    ko="회사운영 경험 5%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Has experience"
                      zh="参与过"
                      ko="참여한 적이 있음"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Very experienced, has led a team before"
                      zh="有过丰富的创业及带团队经验"
                      ko="창업 및 팀 인솔 경험이 풍부함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Other industry resources 5%"
                    zh="相关行业资源 5%"
                    ko="관련 업계자원 5%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Has little resource"
                      zh="薄弱"
                      ko="취약함"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Relatively resourceful"
                      zh="一定行业资源"
                      ko="일정한 업계자원"
                    />
                  </div>
                  <div>
                    <Score>4</Score>
                    <I18n
                      en="Resourceful"
                      zh="丰富行业资源"
                      ko="업계자원이 풍부함"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Very resourceful"
                      zh="极强行业资源"
                      ko="강력한 산업 자원"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Investors and advisors 5%"
                    zh="投资人及顾问 5% "
                    ko="투자자 및 컨설턴트 5%"
                  />
                </td>
                <td>
                  <I18n
                    en="Level of influence 3%"
                    zh="顾问影响力 3%"
                    ko="컨설턴트 영향력 3%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Not influential"
                      zh="影响力弱"
                      ko="영향력이 약함"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Influential"
                      zh="影响力一般"
                      ko="영향력이 일반적임"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Very influential"
                      zh="影响力较强"
                      ko="영향력이 비교적 강함"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Key figure in the industry"
                      zh="影响力极强"
                      ko="영향력이 극히 강함"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Relativity 2%"
                    zh="顾问与项目关联度 2%"
                    ko="컨설턴트와 프로젝트 관련성 2%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Not relative to the project"
                      zh="弱关联"
                      ko="관련성이 약함"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Relative to the project"
                      zh="关联度一般"
                      ko="관련성이 일반적임"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Very relative, can provide important insights and resource"
                      zh="强关联能够提供一定帮助"
                      ko="관련성이 강하고 일정한 도움을 줄 수 있음"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Institution investors 5%"
                    zh="投资机构 5%"
                    ko="투자기관 5%"
                  />
                </td>
                <td></td>
                <td>
                  <I18n
                    en="Depends on the precious invest record"
                    zh="根据投资机构榜单评定"
                    ko="투자기관 랭킹에 의해 평가"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Community and popularity"
                    zh="社区及热度"
                    ko="커뮤니티 및 인기"
                  />
                </td>
                <td>
                  <I18n
                    en="Social Media and Search Trends 5%"
                    zh="社交媒体及搜索指数 5%"
                    ko="소셜 미디어 및 검색지수 5%"
                  />
                </td>
                <td>
                  <I18n
                    en="Popularity 1%"
                    zh="关注度 1%"
                    ko="관심도 1%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Low"
                      zh="低"
                      ko="낮음"
                    />
                  </div>
                  <div>
                    <Score>0.5</Score>
                    <I18n
                      en="Medium"
                      zh="中"
                      ko="중"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="High"
                      zh="高"
                      ko="높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Interactivity 2%"
                    zh="互动 2%"
                    ko="인터랙티브 2%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Low"
                      zh="低"
                      ko="낮음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Medium"
                      zh="中"
                      ko="중"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="High"
                      zh="高"
                      ko="높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Search popularity 2%"
                    zh="搜索指数 2%"
                    ko="검색지수 2%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Low"
                      zh="低"
                      ko="낮음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Medium"
                      zh="中"
                      ko="중"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="High"
                      zh="高"
                      ko="높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Community 10%"
                    zh="社群 10%"
                    ko="커뮤니티 10%"
                  />
                </td>
                <td>
                  <I18n
                    en="Popularity 3%"
                    zh="关注度 3%"
                    ko="관심도 3%"
                  />
                </td>
                <td>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Low"
                      zh="低"
                      ko="낮음"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Medium"
                      zh="中"
                      ko="중"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="High"
                      zh="高"
                      ko="높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <I18n
                    en="Interactivity 7%"
                    zh="活跃度 7%"
                    ko="활약도 7%"
                  />
                </td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Very low"
                      zh="极低"
                      ko="매우 낮음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Low"
                      zh="低"
                      ko="낮음"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Medium"
                      zh="中"
                      ko="중"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="High"
                      zh="高"
                      ko="높음"
                    />
                  </div>
                  <div>
                    <Score>7</Score>
                    <I18n
                      en="Very high"
                      zh="极高"
                      ko="극히 높음"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="PR Events 5%"
                    zh="PR 活动 5%"
                    ko="PR 활동 5%"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="No PR events"
                      zh="无"
                      ko="없음"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Few PR events"
                      zh="有一般的PR活动"
                      ko="일반적인 PR활동이 있음"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Lots of PR events"
                      zh="有丰富的PR活动"
                      ko="풍부한 PR활동이 있음"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Highly successful PR events"
                      zh="形成爆点或话题"
                      ko="폭점 또는 이슈 형성"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <I18n
                    en="Adjustable factor"
                    zh="调节项"
                    ko="조절항목"
                  />
                </td>
                <td>-10% ~ 10%</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Fulfillment tracking 2%"
                    zh="履约 2%"
                    ko="약속 이행 2%"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>-2</Score>
                    <I18n
                      en="Heavily delayed"
                      zh="出现严重延期或违约"
                      ko="심각한 지연 또는 위약이 있음"
                    />
                  </div>
                  <div>
                    <Score>-1</Score>
                    <I18n
                      en="Partly delayed"
                      zh="出现部分延期"
                      ko="부분적 지연이 있음"
                    />
                  </div>
                  <div>
                    <Score>1.5</Score>
                    <I18n
                      en="On schedule"
                      zh="项目如期履约"
                      ko="프로젝트가 예정대로 진행됨"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Ahead of schedule"
                      zh="超预期"
                      ko="예상 초월"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Github Audit 3%"
                    zh="代码审计 3%"
                    ko="코드감사 3%"
                  />
                </td>
                <td></td>
                <td>
                  <I18n
                    en="Based on DPRating’s monthly Github audit report"
                    zh="取自月度榜单"
                    ko="월간 랭킹을 사용함"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <I18n
                    en="Progress 5%"
                    zh="进度 5%"
                    ko="진척 5%"
                  />
                </td>
                <td></td>
                <td>
                  <div>
                    <Score>0</Score>
                    <I18n
                      en="Whitepaper only"
                      zh="纯概念、白皮书阶段"
                      ko="순수 개념, 백서 단계"
                    />
                  </div>
                  <div>
                    <Score>1</Score>
                    <I18n
                      en="Has a demo"
                      zh="demo"
                      ko="demo"
                    />
                  </div>
                  <div>
                    <Score>2</Score>
                    <I18n
                      en="Has a testnet"
                      zh="测试网"
                      ko="테스트넷"
                    />
                  </div>
                  <div>
                    <Score>3</Score>
                    <I18n
                      en="Has mainnet and nodes"
                      zh="主网或关键节点"
                      ko="메인넷 또는 키 노드"
                    />
                  </div>
                  <div>
                    <Score>5</Score>
                    <I18n
                      en="Has its own ecosystem"
                      zh="生态扩展"
                      ko="생태 확장"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <P>
            <I18n
              en="The corresponding criteria for qualification results are as follows:"
              zh="资质结果对应标准如下："
              ko="자질 결과에 해당되는 기준은 다음과 같습니다:"
            />
          </P>
          <Table>
            <thead>
              <tr>
                <th>
                  <I18n
                    en="Rating"
                    zh="等级"
                    ko="등급"
                  />
                </th>
                <th style={{ minWidth: '110px' }}>
                  <I18n
                    en="Points"
                    zh="得分"
                    ko="점수"
                  />
                </th>
                <th>
                  <I18n
                    en="Comment"
                    zh="说明"
                    ko="설명"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aaa</td>
                <td>[95-105]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Aaa} />
                </td>
              </tr>
              <tr>
                <td>Aa</td>
                <td>[90-95]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Aa} />
                </td>
              </tr>
              <tr>
                <td>A</td>
                <td>[85-90]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.A} />
                </td>
              </tr>
              <tr>
                <td>Bbb</td>
                <td>[80-85]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Bbb} />
                </td>
              </tr>
              <tr>
                <td>Bb</td>
                <td>[75-80]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Bb} />
                </td>
              </tr>
              <tr>
                <td>B</td>
                <td>[70-75]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.B} />
                </td>
              </tr>
              <tr>
                <td>Ccc</td>
                <td>[65-70]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Ccc} />
                </td>
              </tr>
              <tr>
                <td>Cc</td>
                <td>[60-65]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.Cc} />
                </td>
              </tr>
              <tr>
                <td>C</td>
                <td>[50-60]</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.C} />
                </td>
              </tr>
              <tr>
                <td>D</td>
                <td>{'<50'}</td>
                <td>
                  <I18n {...INVEST_SCORE_DESC.D} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Content>
      </Container>
    </Section>
  )
}

export function InvestabilityDescription() {
  InvestabilityDescription
}

export default defaultPage(Methodology)
