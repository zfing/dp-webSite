import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Section from 'components/Section'
import Container from 'components/Container'
import theme from 'utils/theme'
import defaultPage from 'hocs/defaultPage'
import Head from 'helpers/Head'

const Wrapper = styled(Container)`
  font-family: PingFangSC-Regular;
  font-size: 14px;

  color: #4d6182;
  padding: 20px;
  margin: 20px 0;
  padding: 36px 56px 33px;
  overflow: hidden;

  @media (max-width: 785px) {
    padding: 20px 10px 30px;
  }

  table {
    // border: 1px solid rgba(218,233,241,0.80);
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 41px;

    th,
    td {
      padding: 14px 24px;
    }

    thead {
      tr {
        text-align: left;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #dae9f1;
        letter-spacing: 0.06px;

        th {
          background: #004785;
          max-height: 48px;
          position: sticky;
          top: ${theme.HDHeightSmall}px;
        }

        // th:not(:first-child) {
        //   border-left: 1px solid rgba(218,233,241,0.25);
        // }
      }
    }

    tbody {
      tr {
        &:nth-child(2n) {
          background: #f5f9fa;
        }
      }
    }
  }

  pre {
    display: inline-block;
    width: 100%;
    background: rgba(223, 228, 234, 0.5);
    padding: 10px;
    border-radius: 6px;

    overflow-x: scroll;
  }
`

const input = `

# 1 获取指定时间段的指数数据

**请求URL：** 
- \` https://api.dapaopingji.com/api/index/get \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|indexType |  是  |    int   |    指数种类，1:BVIX, 2:DPC   |
|period |  是  |    int   |    周期范围，0：12小时，1：1天，2：1周，3：1月，4：全部，默认为0   |


**返回示例**

\`\`\` 
{
  "data": {
    "btcPrice": [],
    "changePercent": 1.23,
    "changeValue": 1.06,
    "ethPrice": [],
    "indexName": "BVIX",
    "indexValue": [
      [
        "1534743900000",
        "87.6328"
      ],
      [
        "1534744800000",
        "87.7077"
      ],
      [
        "1534745701000",
        "87.6219"
      ],
      [
        "1534746600000",
        "87.6532"
      ],
      [
        "1534747500000",
        "87.3538"
      ]
    ],
    "isPositive": 1,
    "latestValue": 87.35,
    "size": 48
  },
  "msg": "成功",
  "resultCode": "0",
  "success": true
}
\`\`\`

# 2 获取所有类型的最新一条指数数据
**请求URL：** 
- \` https://api.dapaopingji.com/api/index/getAllLatestIndex \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|typeList |  是  |    Array(integer)   |    指数种类列表，1:BVIX, 2:DPC   |


**返回示例**

\`\`\` 
{
  "data": [
    {
      "changePercent": 1.1926553,
      "changeValue": 1.0269012,
      "indexName": "BVIX",
      "isPositive": 1,
      "latestValue": 87.129
    },
    {
      "changePercent": 1.6954552,
      "changeValue": 11.609985,
      "indexName": "DPC",
      "isPositive": 1,
      "latestValue": 696.381
    }
  ],
  "msg": "成功",
  "resultCode": "0",
  "success": true
}

\`\`\`
# 3 获取最新评级报告列表

**请求URL：** 
- \` https://api.dapaopingji.com/api/rating/getFreshRatings \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|currentPage |  是  |    int   |    当前页数，从1开始   |
|pageSize |  是  |    int   |    分页大小   |


**返回示例**

\`\`\` 
{
  "data": {
    "currentPage": 1,
    "list": [
      {
        "id": 16,
        "investScore": 5,
        "isDeleted": 0,
        "isListed": 1,
        "logoUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15343185452705456.png",
        "projectDetailId": 42,
        "projectName": "Nebulas",
        "projectSymbol": "NAS",
        "pv": 741,
        "ratingStatus": 2,
        "ratingTime": 1534320488000,
        "reportUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15344069753144810.pdf",
        "reportUrlEn": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15344070381625966.pdf",
        "riskScore": "C"
      },
      {
        "id": 15,
        "investScore": 6,
        "isDeleted": 0,
        "isListed": 1,
        "logoUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15343037472804591.png",
        "projectDetailId": 40,
        "projectName": "Ontology",
        "projectSymbol": "ONT",
        "pv": 1253,
        "ratingStatus": 2,
        "ratingTime": 1534304414000,
        "reportUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15343170182023324.pdf",
        "reportUrlEn": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15344918014138970.pdf",
        "riskScore": "C"
      },
      {
        "id": 13,
        "investScore": 5,
        "isDeleted": 0,
        "isListed": 1,
        "logoUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15342119367612924.png",
        "projectDetailId": 35,
        "projectName": "AELF",
        "projectSymbol": "aelf",
        "pv": 585,
        "ratingStatus": 2,
        "ratingTime": 1534212817000,
        "reportUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15342136774875034.pdf",
        "riskScore": "B"
      }
    ],
    "pageSize": 10,
    "totalSize": 3
  },
  "msg": "成功",
  "resultCode": "0",
  "success": true
}
\`\`\`

# 4 获取已发布评级报告的项目列表



**请求URL：** 
- \` https://api.dapaopingji.com/api/getReleaseProjectList \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|currentPage |  是  |    int   |    无   |
|pageSize |  是  |    int   |    无   |


**返回示例**

\`\`\` 
{
  "data": {
    "currentPage": 1,
    "list": [
      {
        "description": "本体是新一代公有基础链项目 & 分布式信任协作平台。\\n\\n本体提供新一代高性能基础公有链，包括完整的分布式账本、智能合约体系支持。\\n\\n同时本体架构支持公有链网体系，除了提供基础公有链服务，通过本体区块链框架支持不同应用的公有链定制，并通过不同协议群支持链网协作。\\n\\n在基础层之上，本体将持续提供各类分布式应用中的通用性模块，如分布式身份框架、分布式数据交换协议等支持分布式信任协作组件，并会根据应用需求持续扩展新的通用模块。\\n在基础层之上，本体将持续提供各类分布式应用中的通用性模块，如分布式身份框架、分布式数据交换协议等支持分布式信任协作组件，并会根据应用需求持续扩展新的通用模块。\\n\\nOntology 为绑定的双 Token 模式（ONT和ONG）第一阶段的 ONT Token 为 NEP-5 Token（此阶段不会释放 ONG）, 在 Ontology 的基础主网上线后会转换成主网 ONT Token, 同时与 ONT 绑定的 ONG Token 会逐步释放。",
        "descriptionEn": "Ontology (ONT) provides a new generation of high-performance infrastructure public chains, including complete distributed accounting, intelligent contract system support. At the same time, the ontology architecture supports the public chain network system. In addition to providing basic public chain services, the ontology block chain framework supports customization of public chains for different applications, and supports chain network collaboration through different protocol groups.\\n\\n\\nOn the basic level, ontology will continue to provide common modules in various distributed applications, such as distributed identity framework, distributed data exchange protocol, supporting distributed trust collaboration components, and will continue to expand new common modules according to application requirements.\\n\\n\\nOntology is a new high-performance public blockchain project & a distributed trust collaboration platform.\\n\\nOntology provides new high-performance public blockchains that include a series of complete distributed ledgers and smart contract systems",
        "id": 40,
        "logoUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15343037472804591.png",
        "projectName": "Ontology",
        "projectSymbol": "ONT",
        "status": 3
      },
      {
        "description": "OneLedger是一种使用分片和优化拜占庭容错一致方案，实现高性能扩展的协议，OneLedger侧链首先将与比特币及以太坊网络同步，而后支持不同区块链的兼容。",
        "descriptionEn": "OneLedger is a high-performance extension protocol using fragmentation and optimized Byzantine fault-tolerant conformance. The OneLedger side chain will first synchronize with Bitcoin and Ethernet, and then support compatibility of different block chains.",
        "id": 16,
        "logoUrl": "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/1534154280352221.png",
        "projectName": "OneLedger",
        "projectSymbol": "ONE",
        "status": 3
      }
    ],
    "pageSize": 2,
    "totalSize": 8
  },
  "msg": "成功",
  "resultCode": "0",
  "success": true
}
\`\`\`



# 5 根据评级报告id获取评级报告详情


**请求URL：** 
- \` https://api.dapaopingji.com/api/rating/getRatingDetailReleaseInfo \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id |  是  |    int   |    评级报告id   |
|isEn |  是  |    int   |    是否是英文版，1是，0不是，默认不是英文版，即中文版   |


**返回示例**

\`\`\` 
{ 
     "data" : { 
          "adjustment" : "<p><strong>四、调节项：-10%~10%</strong></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#0f63ab"><strong>当前市值</strong></span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj88X8CRqmu47oLN7z8p8mtPvZNOncoPXMa2uDf9zXykuhskL3uSPUBWA/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">2018年6月5日至2018年7月4日之间，币价介于1.03美元至0.7243美元，最低/最高价格分别为0.4704美元和1.07美元。</span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">其市值介于2570万美元至1810万美元之间，最低/最高为1176万美元和2667万美元，中位数为1709万美元，7天移动平均值为1895万美元。</span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">交易量在7.98 $ MM和$ 51.63 MM之间变化，$ 15.52 MM的中位数和$ 45.54 MM的7日均线。</span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8mhlRx1ZtFCEuO2DfH9ibYfHUfFQBofyhLrbvetJQ77iaKX40UAEyq78Q/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">当前上线交易所共18家 ，包括Binance、Huobi、OKEx、Gate.io、KuCoin、韩国交易所Bithumb等，流动性得到充足的支撑。</span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8q7o0JbIJvDic3SJZXwBmuR1FibsfZkIsev7cvAgj38MCakr03blZsHhQ/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">自17年12月开通交易以来核心数据如下：</span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj85UPz071MUuD3FicQj7Kia6tvAE7QI7jWTdeIeQBlEgEULwv3tedDXNNQ/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="533px" height="auto" style="width:533px;height:auto"/></div><p></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8XOcc2pSxDUNDj9FZfd2Gc6kGnibZByicyUxVgltk919MnnOMyuo2k6hA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="533px" height="auto" style="width:533px;height:auto"/></div><p></p><p style="text-align:justify;"><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><strong><span style="color:#1064ad">履约考察</span></strong></span></span></p><p><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">公布的路线图如下：</span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_jpg/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8diaXs0YuXLBe0vfA7fvkFudJ3ZE3rB7TMZqfCtYewiayicjLJwibX259uQ/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="538px" height="auto" style="width:538px;height:auto"/></div><p></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj80x5IJI8mKH3HdJpXk83XyGmibyicXTVFsGs5eMyzWKJgZDR22e8Yhd9A/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">发布测试网，实现多节点P2P通讯、DPoS共识、智能合约、并行执行、集群基础功能；<strong>根据发布的进度周报，团队自2018年第一季度以来，主要展开以下工作：</strong></span></span></p><ul><li><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">Candy自研系统；</span></span></li><li><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">与一些细分领域（内容为主）项目达成资源共享或技术支持的合作关系。</span></span></li></ul><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">总体来看，技术开发进展以资产链和主链开发为核心，Candy糖果系统不在原路线图规划中。</span></span></p><p><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0e5fa5"><strong><span style="font-size:14px">代码审计</span></strong></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="line-height:21px"><span style="font-size:14px">在最新一期代码审计数据中，elf综合得分4星，最活跃的两个代码库分别为“Aelf”和“AElfWebsite-Angular”，核心数据如下：</span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8ialFPia8AoicBbwdeh2SpCe3mcUPQU8kEOZbtAVkuEFvzD0duqyvkQ0ng/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="538px" height="auto" style="width:538px;height:auto"/></div><p></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8xAic1J3EYjneHkLTjMzuU5oBQ781sIaltqNgUic7U1AQKrNFam1u6vicw/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="line-height:21px"><span style="font-size:14px">提交数504，5月发布了devV1.0更新版本，更新了RPC以及节点的命令行选项，优化了并行失误的处理和网络环境，可实现智能合约的注册、部署和调用逻辑。迭代速率1.04，开发者数量9。</span></span></span></p><p></p>", 
          "gmtCreate" : "1534213743000", 
          "gmtModify" : "1534749484000", 
          "id" : "13", 
          "investScore" : "5", 
          "isDeleted" : "0", 
          "isListed" : "1", 
          "logoUrl" : "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15342119367612924.png", 
          "projectDetailId" : "35", 
          "projectFundamental" : "<p><strong>一、项目基本面（35%）</strong></p><p><span style="padding-left:0px;padding-right:0px"><span style="letter-spacing:1px"><span style="font-size:14px"><span style="color:#000000">Ælf的核心，分别是Ælf系统和Ælf操作系统两部分，前者的实现途径为高性能方案、资源隔离、代议治理结构，对节点进行职能分类，运行在集群上提供标准服务，通过并行处理，目标是效率随着更多侧链的加入得到提高；后者提供基础模块、组件、接口。</span></span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8LYQ6ZXY7GyibfUsrMP08y80Ev6ySv7iaA8IRXgmTiaqqNXazQSCOicq2HA/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><strong>评析：</strong></span></span></p><ol><li><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">Ælf为不同的智能合约划分不同资源，屏蔽相互之间的干扰，实现资源隔离，<span style="letter-spacing:1px">平衡不同业务情景需求（如A需要更高TPS，B需要安全性，C需要两者兼顾）。</span></span></span></span></li><li><span style="padding-left:0px;padding-right:0px"><span style="color:#000000"><span style="font-size:14px">由于网络瓶颈、拥堵、交易等待等因素，串行处理存在极限，单个节点/矿机的性能往往制约着整个系统的性能；Ælf采用并行处理以及集群环境的解决方案，目标是实现性能提升。</span></span></span></li></ol><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#000000"><span style="font-size:14px">综上，Ælf落在“综合公链”赛道，和各类底层公链在技术及方案上均形成直接竞争，尤其是模板及基础设施部分，大部分公链都号称将降低开发者门槛，提供最完整和最好的设施，各自也在进行生态建设和技术瓶颈突破，2018年已经过半，公链竞争格局中，可定制基本模块和组件已经成为公链的基本标配而非创新点，该领域先发者不少，Ælf的护城河是其集群的性能提升方案和完善的资源隔离机制。在生态建设上，暂未展现突出优势，有待Q3发力。</span></span></span></p><p><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0f62ab"><strong>特点</strong>：</span><span style="color:#000000"><span style="font-size:14px"><span style="letter-spacing:1px">一链一合约、侧链动态索引、树形侧链延展</span></span></span></span></p><ul><li><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">区分于单链系统，采用一条主链和多条侧链的模式，主链作为整个系统的基石，包含代币系统和DPoS共识机制并成为主干索引，主链、多级侧链面对不同商业场景，实现“一链一合约、侧链动态索引、树形侧链延展”。</span></span></span></li></ul><p></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8icIgPVsmebfCI0r3cYsLhibJAnfibicnAmWh4TGEicvdnSj15DUJh2IITEQ/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p><br/></p><ul><li><span style="padding-left:0px;padding-right:0px"><span style="color:#000000"><span style="font-size:14px"><span style="letter-spacing:1px">侧链交互及经济系统，</span>被Ælf主链索引过的链是侧链，侧链间需要消息验证时，需要包含主链区块头信息，通过主链提供的Merkle Tree Root完成。当验证从另一条侧链来的信息的时候，它必须要包含Ælf主链的区块头信息，验证是通过主链提供的Merkle Tree Root完成。</span></span></span></li><li><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">内置侧链提供模板及基础设施</span></span></span><br/><span style="color:#000000"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">在基金会的指引下进行开发，提供开发侧链的模板和基础设施并实现通信，包含了以下场景，采用层级侧链机制及跨层担保机制作为优化跨链交易速度的解决方案。</span></span></span><br/><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">a. 信息登记认证</span></span></span><br/><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">b. 数字资产发售</span></span></span><br/><span style="color:#000000"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">c. 去中心化交易</span></span></span><br/><span style="color:#000000"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">d. 跨链优化</span></span></span></li></ul><p style="text-align:justify;"><br/></p><p><span style="padding-left:0px;padding-right:0px"><span style="color:#0e63ad"><span style="font-size:14px"><strong>微创</strong></span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">侧链概念自2014年提出以来，从最初简单的主侧链资产锚定到“主链-应用链”独立结构，大方向上虽然难有大的创新，但在细节和实现上，对安全和效率的平衡有不同需求。侧链动态索引和索引时机提供灵活性，白皮书中原话如下：</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><strong>评析：</strong></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">Ælf对每一条链基于它自己的特点提出不同的索引策略，而不是一视同仁，有分叉风险的侧链、作恶的侧链、对系统缺乏维护贡献的侧链逐渐被淘汰，优质侧链获得更多灵活的资源和扶持，节省了主链资源和性能的同时和“侧链竞争”的规则匹配。</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#000000"><span style="font-size:14px">在性能提升方案方面，Ælf对节点的专业度提出要求。然而，节点的高门槛往往会造成一个区块链系统分散化程度的不足；因此，需要合理的治理机制来平衡效率和公平。Ælf系统强调竞争和类似淘汰的机制，并与其治理机制和系统规则关联，被委任的节点的首要条件是完成好自己的责任，保证系统的稳定运行和健康，否则将无法被整个系统接受。运行在集群上提供标准服务的节点开源，并通过DPoS达成主链上的共识。此外，在操纵系统接口部分，内核将并行计算扩展在云上，实现基于云的合约执行。</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">可以看到，除竞争外，生态中各部分也保持着强关联和合作，如存储链、IM链、资产链、应用链等之间的两两组合及更丰富的关系，实现资源和价值互通。这样的环境下，各侧链既要发挥出自身特色在维度打出火花，同时和同领域侧链直接竞争。“合作+优胜劣汰”，最终促进系统内生态的螺旋式上升。总体来说，项目的系统设计与区块链基因关联紧密。</span></span></span></p><p><br/></p><p style="text-align:justify;"><strong>生态</strong></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8JDsGPu3cJyaxFib1gr1hWsuVKMNqZjVFGN4OVhsX1FY4Qiaqap71P0Lw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="558px" height="auto" style="width:558px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><strong>评析：从合作关系可知，主要与一些细分领域的项目达成资源共享或技术支持，以内容、视频领域为主，双方合作意向达成的公告集中在2018年3月前，近期无新动向。</strong></span></span></p>", 
          "projectName" : "AELF", 
          "projectSymbol" : "aelf", 
          "pv" : "591", 
          "ratingStatus" : "2", 
          "ratingTime" : "1534212817000", 
          "reportUrl" : "https://dprating.oss-cn-shanghai.aliyuncs.com/test/frontend/project/15342136774875034.pdf", 
          "riskScore" : "B", 
          "socialHot" : "<p><strong>三、社区及热度（20%）</strong></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0f63ab"><span style="font-size:14px"><strong>谷歌趋势</strong></span></span></span></p><p><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">谷歌搜索指数均值在55左右， 2017年12月至2018年3月达到高峰。</span></span></p><p style="text-align:justify;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj85URY9N5DEqI280agEaBTBRWicyFel7D1SF1WpPicy4KXbhAVR8QPJKKg/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#1162a9"><span style="font-size:14px"><strong>微信指数</strong></span></span></span></p><p><span style="padding-left:0px;padding-right:0px"><span style="color:#333333"><span style="font-size:14px">微信指数近三个月波动不大，自7月初上升达峰值，2017年7月3日达42840。</span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8YDRFtBeqMiaS4libZ93AkDfwTYkib1EXBib4CCCWsbEYpbcCxL8nGlcDDQ/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="373px" height="auto" style="width:373px;height:auto"/></div><p></p><p><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0e64af"><span style="font-size:14px"><strong>社交媒体及社群热度</strong></span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8lzsoJrrdziaCENxClYm7lxECdRugHDFPSZuicTL7CocQ3ZZvhyblqILw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="558px" height="auto" style="width:558px;height:auto"/></div><p></p><p><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0f67b3"><span style="font-size:14px"><strong>PR活动汇总</strong></span></span></span></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8an8HD3F4BVosSIocvibE3G9icgmrVAT4riaicQtpBx5P5L9VFCs85ibFmzw/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p></p>", 
          "summary" : "<p><span style="padding-left:0px;padding-right:0px"><span style="font-size:16px"><span style="color:#1064ad"><strong>资质评级：Bb</strong></span></span></span><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">基于项目当前的进度及各类数据，我们给到Ælf当前资质评级Bb评级。</span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">团队创始人在圈内有过丰富的行业经验积累及技术沉淀，然而项目愿景宏大，推进过程中面临着较大的实现难度和不确定性，资源隔离机制在竞品中并不少见，后续阶段中侧链动态索引及树形侧链延展的实现将是投资者重点跟进和关注的点。</span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">2018年6月30日发布测试网后，官方给出下一阶段的计划是每个月进行一次版本迭代，三个月完成一个阶段的功能交付更新，以实现2019年Q1主网上线的关键节点。需要提醒的是，当前项目在开发者参与的刺激上，还未推出具备吸引力的计划。</span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px">Ælf在包括币安及韩国Bithumb在内的主流交易所均已上线，有良好的流动性支撑，流通市值在60~70名之间，整体表现略微跑赢大盘指数，历史法币最高价$2.59，对比最高价跌幅-71.52%。</span></span></p><p><br/></p><p><span style="padding-left:0px;padding-right:0px"><span style="font-size:16px"><span style="color:#1064ad"><strong>风险评级：低</strong></span></span></span><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">基于项目当前的披露信息，Ælf的风险为低。</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">结合token分配计划可知，私募部分占比25%，无锁定期；基金会持有部分占比25%，锁定3年；团队顾问合作伙伴持有部分锁定两年，每半年等比例释放。向市场释放的流通盘锁定周期合理，对照路线图，对项目执行团队有一定的制约。</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">根据企查查数据，项目公司主体好扑科技与Ælf团队成员匹配，成员披露信息清晰并可在各渠道得到验证，透明度高。</span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">项目主要的风险将来自于开发难度自身。自立项以来虽市场PR活动、合作关系建立、技术研发推进三线稳步进行，但生态建设相对薄弱，在后续的公链竞争中仍然面临着严峻的考验。</span></span></span></p>", 
          "teamFundamental" : "<p><strong>二、团队基本面（40%）</strong></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#1b5e99"><strong>核心成员</strong></span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8ibPibeU99LOCgdVb7G5fBCwYtSoaCRyfUbIQDEHaVKRwlZtDTibGTbDlA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:center;"><br/></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="color:#0e63ad"><span style="font-size:14px"><strong>项目顾问</strong></span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000">项目顾问包括FBG周硕基，<span style="background-color:#fcfcfc">Alphabit的创始人和首席执行官、特许金融分析师Liam Robertson，大成律师事务所高级合伙人TENX，KyberNetwork顾问Kenneth Oh和</span>美国科技类博客TechCrunch创始人J.Michel Arrington；投资机构涵括FBG、ALPHABIT等领先机构。</span></span></span></p><p style="text-align:center;"></p><div class="media-wrap image-wrap"><img src="https://mmbiz.qpic.cn/mmbiz_png/FpHAeaXmibLicgR8vzeWyICDWn75MkHwj8R1rmydFrkqhWznB9IMmpiczwxknibvWlj5MDLhldIIxzbsXibCB1RgQlA/640?tp=webp&amp;wxfrom=5&amp;wx_lazy=1" width="677px" height="auto" style="width:677px;height:auto"/></div><p></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="font-size:14px"><span style="color:#000000"><strong><span style="line-height:21px">评析：</span></strong></span></span></span></p><p style="text-align:justify;"><span style="padding-left:0px;padding-right:0px"><span style="line-height:21px"><span style="font-size:14px"><span style="color:#000000">根据领英信息现团队人员稳定至30+，包括多个海外PR，创始人核心成员在圈内的技术及创业团队磨合经验丰富，公司主体北京好扑信息科技有限公司此前曾为海航生态科技集团、链家旗下第三方支付平台理房通提供服务，并与苏州同济金融科技研究院合作，完成2800万人民币Pre-A轮融资，投后估值1.36亿，投资方包括华创资本、<span style="letter-spacing:1px">德鼎创新(Dapper Dragon)、陶石资本、微汇金融、丹华资本、信天创投。</span></span></span></span></span></p>", 
          "website" : "https://aelf.io/" 
     }, 
     "msg" : "成功", 
     "resultCode" : "0", 
     "success" : "true" 
 }

\`\`\`
# 6 根据项目id获取评级报告分数

**请求URL：** 
- \` https://api.dapaopingji.com/api/rating/getRatingPointByProjectId \`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|projectDetailId |  是  |    int   |    无   |


**返回示例**

\`\`\`
{ 
     "data" : { 
          "id" : "15", 
          "investScore" : "6", 
          "riskScore" : "C" 
     }, 
     "msg" : "成功", 
     "resultCode" : "0", 
     "success" : "true" 
 }

\`\`\`

# 7 根据评级报告id获取评级报告分数详情

**请求URL：** 
- \`https://api.dapaopingji.com/api/rating/getRatingPointDetailByReportId\`
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|reportId |  是  |    int   |    无   |
|type |  否  |    int   |    0：资质评级，1：风险评级，2：全部 ，默认为0  |

**返回示例**

\`\`\`
{
  "data": [
    {
      "fieldList": [
        {
          "name": "projectFundamental",
          "score": 25,
          "title": "项目基本面",
          "totalScore": 35
        },
        {
          "name": "teamFundamental",
          "score": 31,
          "title": "团队基本面",
          "totalScore": 40
        },
        {
          "name": "communityAndHeat",
          "score": 15,
          "title": "社区及热度",
          "totalScore": 20
        },
        {
          "name": "adjustMent",
          "score": 4,
          "title": "调节项",
          "totalScore": 10
        }
      ],
      "id": 4,
      "level": "B",
      "score": 74,
      "totalScore": 105,
      "type": 0
    },
    {
      "fieldList": [
        {
          "name": "transparency",
          "score": 4,
          "title": "信息透明",
          "totalScore": 14
        },
        {
          "name": "authenticity",
          "score": 3,
          "title": "信息真实",
          "totalScore": 3
        },
        {
          "name": "fundraisingAndCompliance",
          "score": 5,
          "title": "融资及合规",
          "totalScore": 13
        },
        {
          "name": "adjustment",
          "score": 0,
          "title": "调节项",
          "totalScore": 5
        }
      ],
      "id": 4,
      "level": "中",
      "score": 12,
      "totalScore": 30,
      "type": 1
    }
  ],
  "msg": "成功",
  "resultCode": "0",
  "success": true
}
\`\`\`
`

export default defaultPage(() => (
  <Section>
    <Head name="API" />
    <Wrapper>
      <ReactMarkdown source={input} />
    </Wrapper>
  </Section>
))
