import React from 'react'
import ToggleComponent from './ToggleComponent'
import NewBlogForm from './NewBlogForm'

import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { List, ListItemButton, ListItemText } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  console.log(blogs)

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem('BlogAppSavedUser')
    if(savedUserJSON){
      const user = JSON.parse(savedUserJSON)
      dispatch(setUser(user.username))
    }
    dispatch(initializeBlogs())

  },[])





  return(
    <div>

      <h3>create new blog entry</h3>
      <ToggleComponent id='create-blog'>
        <NewBlogForm />
      </ToggleComponent>

      <div id='blog-list'>
        <List >
          {blogs.map(blog =>
            <ListItemButton
              key={blog.id}
              component='a'
              href={`/blogs/${blog.id}`} >
              <ListItemText primary={blog.title} />
            </ListItemButton>
          )}
        </List>
      </div>
    </div>
  )
}

export default BlogList