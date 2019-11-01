import React from 'react'
import Editor from '../Editor'

export default function EditorField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = !!error && !!touched
  return (
    <Editor
      {...input}
      {...props}
      error={inError}
      contentFormat="html"
      initialContent={input.value}
    />
  )
}
