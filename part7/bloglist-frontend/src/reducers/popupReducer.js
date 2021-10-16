export const setpopup = (pop ) => {

  return dispatch => {
    setTimeout(() => {
      dispatch(resetpopup())
    },5000)
    dispatch({

      type:'SET_POPUP',
      message: pop.message,
      color:pop.color
    })
  }
}
export const resetpopup = () => {
  return{
    type:'RESET_POPUP'
  }
}

const popupReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_POPUP':
    if(action.popup === null){
      return null
    }
    return { message: action.message,color: action.color }
  case 'RESET_POPUP':
    return null
  default: return state
  }

}

export default popupReducer