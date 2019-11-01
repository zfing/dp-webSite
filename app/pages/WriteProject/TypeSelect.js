/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'
import SimpleSelect from 'components/SimpleSelect'

import { makeSelectTypeSelected } from './selectors'
import Actions from './redux'

const SelectTypes = [
  { name: '所有', value: '' },
  { name: '未确认', value: '0' },
  { name: '确认提交', value: '1' },
  { name: '初审通过', value: '2' },
  { name: '已发布', value: '3' },
]

const SelectItem = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #dae9f1;
  letter-spacing: 0.07px;

  .iconfont {
    font-size: 12px;
    margin-left: 10px;
  }
`

export class TypeSelect extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <SimpleSelect
        list={SelectTypes}
        onChange={this.props.change}
        value={this.props.selected}
        renderItem={value => (
          <SelectItem>
            {value && value.length ? value.map(_ => _.name).join(',') : ''}
            <i className="iconfont icon-Trianglex" />
          </SelectItem>
        )}
      />
    )
  }
}

TypeSelect.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
  change: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

const mapStateToProps = createStructuredSelector({
  selected: makeSelectTypeSelected(),
})

const mapDispatchToProps = dispatch => ({
  change: selected => dispatch(Actions.changeTypeSelected(selected)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypeSelect)
