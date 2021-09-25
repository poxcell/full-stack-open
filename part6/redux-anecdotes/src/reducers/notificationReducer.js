
const initialState = ''
const notificationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timer = null
export const setNotification = (notification,time) => {
  const timeOutTime = time *1000
 
  return dispatch => {
    clearTimeout(timer)
    dispatch({
      type:'SET_NOTIFICATION',
      notification,
    })

    timer = setTimeout(() => {
      dispatch({
        type:'SET_NOTIFICATION',
        notification:''
      })
    },timeOutTime)
    
  }
}

export default notificationReducer