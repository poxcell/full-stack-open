
import React, { useState,useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const HiddenView = ({ user, view, setPage,hidden }) =>{
  if((hidden && user) || (!hidden && !user) ){
    return <button onClick={() => setPage(view)}>{view}</button>
  } 

  return  null
}

const App = () => {
  const [page, setPage] = useState('books')
  const [user,setUser] = useState(null)


  useEffect(() => {
    const localUser = localStorage.getItem('BookApp') 
    if(localUser){
      setUser(JSON.parse(localUser).username)
    }
  },[])


  return (
    <div>
      <div>
        
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <HiddenView
          user={user}
          view={'add book'}
          setPage={setPage}
          hidden={true}
        />
        <HiddenView
          user={user}
          view={'login'}
          setPage={setPage}
          hidden={false}
        />
        <HiddenView
          user={user}
          view={'recommend'}
          setPage={setPage}
          hidden={true}
        />
      </div>

      <LoginForm
        show={page === 'login'}
        setUser = {setUser}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add book'}
      />

      <Recommendation
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App