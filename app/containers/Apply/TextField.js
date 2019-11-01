import React from 'react'
import theme from 'utils/theme'
import UITextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  bootstrapInput: {
    fontFamily: 'PingFangSC-Thin',
    fontSize: '14px',
    color: theme.default,
    letterSpacing: '0.18px',
  },
})

function TextField({ InputProps, classes, ...props }) {
  return (
    <UITextField
      InputProps={{
        ...InputProps,
        classes: {
          input: classes.bootstrapInput,
        },
      }}
      {...props}
    />
  )
}

export default withStyles(styles)(TextField)
