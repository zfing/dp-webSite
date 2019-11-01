import React from 'react'
import UITextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  bootstrapInput: {
    fontSize: 14,
    padding: '10px 5px 10px',
  },

  bootstrapUnderline: {
    '&:before': {
      borderBottomColor: '#DAE9F1',
    },
  },
  formHelperTextProps: {
    marginTop: '2px',
  },
})

function TextField({
  input,
  meta: {
    touched, error,
  },
  classes,
  InputProps = {},
  ...props
}) {
  const inError = !!error && !!touched
  return (
    <UITextField
      InputProps={{
        classes: {
          input: classes.bootstrapInput,
          underline: classes.bootstrapUnderline,
        },
        ...InputProps,
      }}
      FormHelperTextProps={{
        classes: {
          root: classes.formHelperTextProps,
        },
      }}
      fullWidth
      {...input}
      {...props}
      error={inError}
      helperText={(inError && error) || ' '}
    />
  )
}

function TextInput({
  InputProps = {},
  classes,
  ...props
}) {
  return (
    <UITextField
      InputProps={{
        classes: {
          input: classes.bootstrapInput,
          underline: classes.bootstrapUnderline,
        },
        ...InputProps,
      }}
      FormHelperTextProps={{
        classes: {
          root: classes.formHelperTextProps,
        },
      }}
      fullWidth
      {...props}
    />
  )
}

const Input = withStyles(styles)(TextInput)
export { Input }
export default withStyles(styles)(TextField)
