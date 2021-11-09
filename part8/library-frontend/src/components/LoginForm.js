import React,{useState} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'


const LoginForm =  ({show,setUser, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [getUser] = useMutation(LOGIN)

  if (!show) {
    return null
  }

  const login = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    try{

      const {data} = await getUser({variables: {username, password}})  
      setUser(username)
      console.log(data)
      localStorage.setItem('BookApp',JSON.stringify({token:data.login.value,username}))
      setPage('books')

    } catch(err){
      console.log(err)
    }
    
  }

  return(
    <div>
      <form onSubmit={login}>
        <div>
          username
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type={password}
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm