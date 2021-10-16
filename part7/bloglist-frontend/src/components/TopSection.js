import React from 'react'
import PopUpMessage from './PopUpMessage'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button,AppBar,Toolbar } from '@mui/material'

const TopSection= () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const logOut = () => {
    dispatch(setUser(null))
    window.localStorage.setItem(
      'BlogAppSavedUser',''
    )

  }
  return(
    <div>
      <AppBar position='fixed'>
        <Toolbar spacing={2}>
          <Button variant='text' color='error'>
            <Link to='/blogs'>blogs</Link>
          </Button>
          <Button variant='text'>

            <Link to='/users'>users</Link>
          </Button>
          <strong>logged in as {user} </strong>
          <Button
            onClick={logOut}
            variant='contained'
            color='error'
            sx={{ m:2 }}>
              log out
          </Button>
        </Toolbar>
      </AppBar>

      <h2>blog app</h2>
      <PopUpMessage/>
      <p>
      </p>
    </div>
  )
}

export default TopSection