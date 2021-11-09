import React from 'react'
import { useMutation,useQuery } from '@apollo/client'
import { EDIT_AUTHOR,GET_AUTHORS } from '../queries/queries'
import { useState } from 'react'

const SetBirthyear = () => {
  const [editAuthor] = useMutation(EDIT_AUTHOR,{
    refetchQueries:[{query: GET_AUTHORS}]
  })

  const {data} = useQuery(GET_AUTHORS)


  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submitEditAuthor = (e) => {
    e.preventDefault()

    editAuthor({ variables:{name, setBornTo:born}})

    setName('')
    setBorn('')
  }

  return(
    <div>
      <h2>Set SetBirthyear</h2>
      <form onSubmit={submitEditAuthor}>
        {/* <div>
          name <input
            value={name}
            onChange={({target}) => setName(target.value)}
          />
        </div> */}
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            <option>select an author</option>
            {/* <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option> */}
            {data.allAuthors.map(author => 
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({target}) => setBorn(Number(target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )

}

export default SetBirthyear