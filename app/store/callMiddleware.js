import Toast from 'components/Toast'

export default () => next => (action) => {
  const actionType = action.type
  if (action.error && actionType.indexOf('FAILURE') !== -1) {
    Toast.error(action.error)
  }
  return next(action)
}
