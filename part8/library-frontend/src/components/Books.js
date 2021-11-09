import React,{ useState,useEffect } from 'react'
import { useLazyQuery,useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, GET_BOOKS } from '../queries/queries'
import BookTable from './BookTable'

const Books = (props) => {

  const bookGenres = useQuery(GET_BOOKS)
  const [getBooks,{loading, error, data}] = useLazyQuery(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState('')
  console.log(genre)
  console.log(data)
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