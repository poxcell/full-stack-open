import React,{ useEffect } from 'react'
import { likePost,removePost,postComment,initializeBlogs } from '../reducers/blogReducer'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { List,ListItem,ListItemText,Divider,Link,Button,TextField } from '@mui/material'

const Blog = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initializeBlogs())
  },[])

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.filter( blog => blog.id === id)[0]
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,

    borderWidth: 1,
    marginBottom: 5
  }


  const addComment = (e) => {
    e.preventDefault()


    dispatch(postComment({ id, comment:e.target.comment.value }))
    e.target.comment.value= ''
  }

  return(
    <div>
      {
        blog ?
          <div className='blog' style={blogStyle}>
            <h2>
              {blog.title} {blog.author}
            </h2>
            <div>
              <Link href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</Link>
            </div>
            <div>
              {blog.likes} likes
              <Button
                sx={{ m:2 }}
                onClick={() => dispatch(likePost(blog))}
                className='like-button'
                variant='contained'
              >
                like
              </Button>
            </div>
            <div>
              <strong>added by {blog.user.username}</strong>
            </div>
            <Button
              sx={{ m:2 }}
              onClick={() => dispatch(removePost(blog))}
              variant='outlined'
              color='error'
            >
            delete
            </Button>

            <h3>comments</h3>
            <form onSubmit={addComment}>
              <TextField
                name='comment'
                id="outlined-multiline-static"

                multiline
                rows={4}
                label="comment"
              />
              <br/>
              <Button
                sx={{ mt:2,mb:4 }}
                type='submit'
                variant='outlined'
              >
              add comment
              </Button>
            </form>
            {blog.comments.length > 0
              ?
              <List>
                {blog.comments.map( comment =>
                  <div key={comment._id}>

                    <Divider/>
                    <ListItem >
                      <ListItemText>{comment.comment}</ListItemText>
                    </ListItem>
                  </div>
                )}
              </List>
              :
              <p>no comments yet</p>
            }
          </div>
          : null
      }
    </div>
  )
}


export default Blog