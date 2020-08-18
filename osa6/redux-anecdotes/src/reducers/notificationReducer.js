const initialNotification = {message: 'Welcome!', timeOut: 0}


const notificationReducer = ( state = initialNotification, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.message!==''){clearTimeout(state.timeOut)}
      return action.notification
    case 'NOTIFICATION_OFF':
      return ''
    default:
      return state
  }

}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationOff = () => {
  return {
    type: 'NOTIFICATION_OFF',
  }
}

export const setNotification = (notification, seconds) => {

  return async dispatch => {
    dispatch(notificationChange({
      message: notification, 
      timeOut: setTimeout(() => {
        dispatch(notificationOff())
      }, 1000*seconds)
    }))
  }
}

export default notificationReducer