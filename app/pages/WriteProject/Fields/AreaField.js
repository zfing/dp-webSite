import React from 'react'
import TextArea from '../TextArea'

export default function AreaField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <TextArea {...input} {...props} error={inError} />
}
