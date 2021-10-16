import React from 'react'
import PopUpMessage from './PopUpMessage'
import { useDispatch,useSelector } from 'react-redux'

import { logIN } from '../reducers/userReducer'

const LoginForm = () => {
  const popup = useSelector(state => state.popup)

  const dispatch = useDispatch()

  const submitForm =   async (e) => {
    e.preventDefault()

    console.log(e.target.username.value)
    const username = e.target.username.value
    const password = e.target.password.value
    dispatch(logIN(username,password))

  }

  return(
    <div>
      <h2>log in to application</h2>
      {popup && <PopUpMessage popUp={popup}/>}
      <form onSubmit={submitForm}>
        <div>
          username
          <input
            type='text'
            // value={login.username}
            name='username'
            id='username-input'
            // onChange={({ target }) => dispatch(setUsername(target.value))}
          ></input>
        </div>
        <div>
          password
          <input
            type='password'
            // value={login.password}
            name='password'
            id='password-input'
            // onChange={({ target }) => dispatch(setPassword(target.value))}
          ></input>
        </div>
        <button type='submit' id='login-button'>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm