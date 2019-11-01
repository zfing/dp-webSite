import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import { codeMap } from './CodeMap'

const styles = () => ({
  root: {
    fontFamily: 'PingFangSC-Thin',
    fontSize: '18px',
    color: theme.default,
    letterSpacing: '0.18px',
    fontWeight: 'normal',
  },
})

const Icon = styled.i`
  position: absolute;
  right: 0;
  top: 5px;
  &.iconfont {
    color: ${theme.blue};
    font-size: 34px;
  }
`

class SimpleSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: '86',
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleChange = (e) => {
    this.setState({ open: false, value: e.target.value })
  };

  render() {
    const { classes } = this.props
    const { open, value } = this.state
    return (
      <Select
        disableUnderline
        open={open}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        value={value}
        onChange={this.handleChange}
        IconComponent={() => <Icon className="iconfont icon-Trianglex" />}
        input={(
          <Input
            classes={{
              root: classes.root,
            }}
          />
        )}
      >
        {codeMap.map((item, k) => (
          <MenuItem value={item.code} key={k}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(SimpleSelect)
