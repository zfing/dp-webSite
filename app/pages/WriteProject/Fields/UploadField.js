import React from 'react'
import Upload from '../Upload'

export default function UploadField({
  input,
  meta: { touched, error },
  ...props
}) {
  const inError = !!error && !!touched
  return <Upload {...input} {...props} name={props.title} error={inError} />
}
