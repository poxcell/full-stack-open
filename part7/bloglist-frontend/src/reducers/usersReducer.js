import usersService from '../services/users'


export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch({
      type:'GET_USERS',
      users:users
    })
  }
}

const usersReducer = (state = [], action) => {
  switch(action.type){
  case 'GET_USERS':

    return action.users
  default:
    return state
  }
}

export default usersReducer