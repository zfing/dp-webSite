import React from 'react'
import Select from 'components/Select'
import SelectInput from '../SelectInput'

export default function SelectField({
  input,
  meta: {
    touched, error,
  },
  multiple,
  ...props
}) {
  const inError = !!error && !!touched
  return multiple ? (
    <Select {...input} {...props} multiple error={inError} />
  ) : (
    <SelectInput {...input} {...props} error={inError} />
  )
}
