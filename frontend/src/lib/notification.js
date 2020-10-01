import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const successNotify = (message) => {
  return (
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip
    })
  )
}

export const customSuccessNotify = (message, eventFunction) => {
  return (
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip,
      onClose: eventFunction
    })
  )
}

export const errorNotify = (message) => {
  return (
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip
    })
  )
}
