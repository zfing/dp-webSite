import React from 'react'
import SelectInput from './SelectInput'

export default function SelectField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return <SelectInput {...input} {...props} error={inError} />
}
