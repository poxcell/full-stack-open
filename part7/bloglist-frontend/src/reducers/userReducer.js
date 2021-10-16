import loginService from '../services/login'
import { setpopup } from './popupReducer'

export const setUser = (user) => {
  return{
    type:'SET_USER',
    user: user
  }
}

const log = async (username, password) => {
  const log = await loginService.logIn(username,password)
  return log
}


export const logIN = (username,password) => {
  return async dispatch => {
    let loginfo =''
    try{
      loginfo = await log(username,password)
      console.log('loginfo',loginfo)
      if(loginfo.token){
        dispatch({
          type:'SET_USER',
          user: username
        })
      }
      window.localStorage.setItem(
        'BlogAppSavedUser',JSON.stringify(loginfo)
      )
      dispatch(setpopup({ color:'green',message:`logged in as ${loginfo.username}` }))

    } catch(err){
      dispatch(setpopup({ color:'red',message:'wrong username or password' }))
    }

  }
}

const userReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_USER':
    if(action.user === null){
      return null
    }
    return action.user
  default: return state
  }

}

export default userReducer