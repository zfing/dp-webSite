import { ToastContainer as Container, toast } from 'react-toastify'
import styled from 'styled-components'
import theme from 'utils/theme'
import 'react-toastify/dist/ReactToastify.css'

export const ToastContainer = styled(Container)`
  .Toastify__toast--success {
    background: ${theme.blue};
  }
  .Toastify__toast-body {
    font-size: 16px;
  }
  &.Toastify__toast-container--top-center {
    top: 40%;
  }
`

const options = {
  hideProgressBar: true,
  autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,
}

const Toast = {
  error(message) {
    toast.error(message, options)
  },
  success(message) {
    toast.success(message, options)
  },
}

export default Toast
