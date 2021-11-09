  
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries/queries'
import SetBirthyear from './SetBirthyear'

const Authors = (props) => {
  const {loading,error,data} = useQuery(GET_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if(loading){
    return(<h3>loading...</h3>)
  }

  if(error){
    return(<h3>error</h3>)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthyear/>
    </div>
  )
}

export default Authors
