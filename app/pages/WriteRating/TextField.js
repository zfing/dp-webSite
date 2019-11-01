import React from 'react'
import DatePick, { Wrapper } from './DatePick'

export default function TextField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <DatePick fullWidth {...input} {...props} error={inError} />
}

export function TextInput({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <div style={{ position: 'relative' }}><Wrapper fullWidth {...input} {...props} error={inError} /></div>
}
