import React from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserPage from './components/UserPage'
import Blog from './components/Blog'
import TopSection from './components/TopSection'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


import { setUser } from './reducers/userReducer'




import{
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'



const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const savedUserJSON = window.localStorage.getItem('BlogAppSavedUser')
  if(savedUserJSON){
    const savedUser = JSON.parse(savedUserJSON)
    dispatch(setUser(savedUser.username))
  }





  return(
    <Router>
      <TopSection/>


      <Switch>
        <Route path='/blogs/:id'>
          <Blog/>
        </Route>
        <Route path='/users/:id'>
          <UserPage/>
        </Route>
        <Route path='/users'>
          <div>
            {user ? <Users/>: <LoginForm />}
          </div>
        </Route>
        <Route path='/blogs'>
          {user ? <BlogList/>: <LoginForm />}

        </Route>

      </Switch>
    </Router>
  )


}

export default App

