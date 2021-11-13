import React,{ useState,useEffect } from 'react'
import { useLazyQuery,useQuery,useApolloClient,useSubscription } from '@apollo/client'
import { BOOKS_BY_GENRE, GET_BOOKS, BOOK_ADDED } from '../queries/queries'
import BookTable from './BookTable'

const Books = (props) => {
  

  const bookGenres = useQuery(GET_BOOKS)
  const [getBooks,{loading, error, data}] = useLazyQuery(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState('')
  const client = useApolloClient()



  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: BOOKS_BY_GENRE,variables:{genre:''} })
    if(!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: BOOKS_BY_GENRE,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)},
        variables:{genre:''}

      })
      
    }
  }
  console.log('client',client.readQuery({ query: BOOKS_BY_GENRE,variables:{genre:''} }))

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('book added via subscription')
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      
    }
  })

  useEffect(() => {
    getBooks({variables:{ genre }})
    
  },[genre])// eslint-disable-line
  
  if (!props.show) {
    return null
  }

  if(loading) return (<h3>loading...</h3>)

  if(error) return (<h3>error</h3>)
  
  const selectGenre = (genre) => {
    setGenre(genre)
  }

  const getGenres = () => {
    const genresData = []
    const books = [...bookGenres.data.allBooks]
  
    books.filter(book => book.genres.includes(genre))
    books.map(book => 
      book.genres.map(genre =>  genresData.push(genre))
    )

    const genres = genresData.filter((genre,i) => 
      genresData.indexOf(genre) === i
    )
    return genres
  }
  
  
  if(data){
    const genres = getGenres()
    return (
      <div>
        <h2>books</h2>
        {genres.map(genre => 
          <button 
            key={genre} 
            onClick={() => selectGenre(genre)}
          >
            {genre}
          </button>
        )}
        <button onClick={() => selectGenre('')}>all genres</button>
        <BookTable books = {data.allBooks}/>
        
      </div>
    )
  }
  return <h2>fetching data</h2>
}


export default Books