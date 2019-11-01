import React from 'react'
import PropTypes from 'prop-types'
import { Picker, MonthCalendar } from '../Calendar'
import Input from './Input'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue,
    }
  }

  onChange = (value) => {
    this.setState({ value }, () => this.props.onChange(value))
  };

  render() {
    const state = this.state

    const { format, disabledDate } = this.props

    const monthCalendarProps = {
      disabledDate,
    }

    return (
      <div>
        <Picker
          animation="slide-up"
          calendar={
            <MonthCalendar style={{ zIndex: 9 }} {...monthCalendarProps} />
          }
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => (
              <Input
                readOnly
                value={value && value.format(format)}
                placeholder="请选择日期"
              />
            )
          }
        </Picker>
      </div>
    )
  }
}

MonthPicker.defaultProps = {
  format: 'YYYY-MM',
  onChange: () => {},
}

MonthPicker.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
}

export default MonthPicker
