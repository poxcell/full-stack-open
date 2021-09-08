import React,{ useState } from 'react'
const NewBlogForm = ({ handleSubmit }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    const newBlog = { author,title,url }
    handleSubmit(newBlog)

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
        <button id='submit-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm