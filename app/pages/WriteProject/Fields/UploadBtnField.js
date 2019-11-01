import React from 'react'
import UploadBtn from '../UploadBtn'

export default function UploadBtnField({
  input,
  meta: { touched, error },
  ...props
}) {
  const inError = !!error && !!touched
  return (
    <UploadBtn
      {...input}
      {...props}
      name={props.title}
      error={inError}
      defaultValue={input.value}
    />
  )
}
