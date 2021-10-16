/* eslint-disable */
import React from 'react'

import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const id = useParams().id

  useEffect ( () => {
    dispatch(getUsers())
  },[])

  console.log(user)
  console.log(users)

  const singleuser = users.filter( auser => auser.id === id)[0]

  return(
    <div>
      <h2>{user.username}</h2>
      <p>added blogs</p>
      {
        singleuser ? 
          <ul>
            {singleuser.blogs.map((blog,num) =>
              <li key={num}>{blog.title}</li>
            )}
          </ul>
        :  null
      }

    </div>
  )
}

export default UserPage