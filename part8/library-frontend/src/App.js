
import React, { useState,useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, GET_BOOKS } from './queries/queries'

const HiddenView = ({ user, view, setPage,hidden }) =>{
  if((hidden && user) || (!hidden && !user) ){
    return <button onClick={() => setPage(view)}>{view}</button>
  } 

  return  null
}

const App = () => {
  const [page, setPage] = useState('books')
  const [user,setUser] = useState(null)
  const client = useApolloClient()


  useEffect(() => {
    const localUser = localStorage.getItem('BookApp') 
    if(localUser){
      setUser(JSON.parse(localUser).username)
    }
  },[])
  
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: GET_BOOKS })
    if(!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('book added via subscription')
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })


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