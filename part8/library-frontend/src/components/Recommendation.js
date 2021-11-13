import React,{ useEffect, useState } from "react";
import { ME, BOOKS_BY_GENRE } from "../queries/queries";
import { useQuery,useLazyQuery } from "@apollo/client";
import BookTable from "./BookTable";

const Recommendation = ({show}) => {
  const {loading, error, data} = useQuery(ME) 
  const [execQuery,books] = useLazyQuery(BOOKS_BY_GENRE)
  const [favoriteGenre, setFavoriteGenre] = useState('')
  
  useEffect(() => {
    if(!loading){
      
      if(data.me != null){

        setFavoriteGenre(data.me.favoriteGenre)
        execQuery({variables:{genre:data.me.favoriteGenre}})
      }
    }
  },[data])  //eslint-disable-line

  if(!show){
    return null
  }

  if(loading) {
    return <h2>loading</h2>
  }
  if(error){
    return <h2>error</h2>
  }
  console.log(books.data)

  return(
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre: {favoriteGenre}</p>
      <BookTable books = {books.data.allBooks}/>
    </div>
  )
}

export default Recommendation