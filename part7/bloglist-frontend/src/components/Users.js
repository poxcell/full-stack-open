import React,{ useEffect } from 'react'

import { getUsers } from '../reducers/usersReducer'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router'


const User = ({ user }) => {
  const history = useHistory()

  const redirect = () => {
    history.push(`/users/${user.id}`)
  }

  return (
    <tr >
      <td >
        <button onClick={() => redirect()}>
          {user.username}
        </button>
      </td>
      <td>

        {user.blogs.length}
      </td>
    </tr>
  )
}
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect ( () => {
    dispatch(getUsers())
  },[])
  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody >
          {users.map( user =>
            <User user = {user} key={user.username}/>
          )}
        </tbody>
      </table>
    </div>
  )

}

export default Users