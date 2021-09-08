import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removePost, likePost }) => {
  const [fullView, setFullView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const ulStyle ={
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }

  const viewBlog = () => {
    setFullView(!fullView)
  }
  const CompactView = () => (
    <div className='blog'>
      {blog.title} <strong>{blog.author}</strong>
      <button onClick={viewBlog} className='view-button'>view</button>
    </div>
  )



  const FullView = () => (
    <div className='blog'>
      <ul style ={ulStyle}>
        <li>
          {blog.title} <button onClick={viewBlog}>hide</button>
        </li>
        <li>
          <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
        </li>
        <li className='like-count'>
          {blog.likes}<button onClick={() => likePost(blog)} className='like-button'>like</button>
        </li>
        <li>
          <strong>{blog.author}</strong>
        </li>
        {blog.user && <li><strong>{blog.user.username}</strong></li>}
        <li>
          <button onClick={() => removePost(blog)}>delete</button>
        </li>
      </ul>
    </div>
  )
  return(
    <div style={blogStyle}>
      {fullView ? FullView():CompactView()}

    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default Blog