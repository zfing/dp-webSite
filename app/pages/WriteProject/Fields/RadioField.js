import React from 'react'
import Radio from '../Radio'

export default function AreaField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <Radio {...input} {...props} error={inError} />
}
