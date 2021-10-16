import React,{ useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'


const NewBlogForm = () => {
  const dispatch = useDispatch()
  // TODO submit button
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    // const newBlog = { author,title,url }
    // handleSubmit(newBlog)
    dispatch(createBlog({ author,title,url }))

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={submitForm}>
        <div>title:
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>author:
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>url:
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <Button variant='contained' id='submit-button' type='submit'>create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm