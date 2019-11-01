import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import H1 from 'components/H1'
import { getColor } from 'utils/mixins'
import theme from 'utils/theme'

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 42px;
`

const Title = styled(H1)`
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: rgba(0, 28, 75, 0.7);
  letter-spacing: 0.07px;
  padding-top: 5px;
  font-weight: 500;
`

const Right = styled.div`
  float: right;
  text-align: right;
  padding-right: 10px;
`

const RightTitle = styled.div`
  font-size: 36px;
  color: ${theme.default};
`

const RightNote = styled.div`
  font-size: 16px;
  color: ${props => getColor(props.number)};

  span:first-child {
    margin-right: 3px;
  }
`

class Topi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data })
    }
  }

  _update = (data) => {
    this.setState({ data })
  };

  render() {
    const { data } = this.state
    return (
      <Top>
        <Title>{this.props.title}</Title>
        <Right>
          <RightTitle>{data.latestValue}</RightTitle>
          <RightNote number={data.isPositive}>
            <span>
              {data.isPositive > 0 ? (
                <i className="icon iconfont icon-up" />
              ) : (
                <i className="icon iconfont icon-down" />
              )}
            </span>
            <span>
              {`${data.changeValue} ${data.changePercent}% 24h`}
            </span>
          </RightNote>
        </Right>
      </Top>
    )
  }
}

Topi.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.node,
}

export default Topi
