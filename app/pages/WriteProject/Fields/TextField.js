import React from 'react'
import TextInput from '../TextInput'

export default function TextField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <TextInput fullWidth {...input} {...props} error={inError} />
}
