import blogService from '../services/blogs'
import { setpopup } from './popupReducer'



export const likePost = (blog) => {
  return async dispatch => {
    const updatedBlog ={
      ...blog,
      likes:blog.likes + 1,
      user: blog.user.id
    }


    const service =  await blogService.likeBlog(updatedBlog,blog.id)
    if (service.status === 200){

      updatedBlog.user = blog.user
      dispatch({
        type:'LIKE_POST',
        data: updatedBlog,
        id: blog.id
      })
    }
    else{
      dispatch(setpopup({ color:'red',message:'error' }))
    }
  }
}
export const postComment = ({ id, comment }) => {
  return async dispatch => {
    const data = {
      id,
      comment
    }
    const blog = await blogService.postComment(data)
    dispatch({
      type: 'POST_COMMENT',
      data:blog.data,
      id
    })
  }
}


export const createBlog =  ({ title,author,url }) => {
  return  async dispatch => {

    const token = JSON.parse(window.localStorage.getItem('BlogAppSavedUser')).token
    const data = {
      title,
      author,
      url,
      token
    }
    const newBlog = await blogService.createNew(data)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
    dispatch(setpopup({ color:'green',message:'blog posted' }))
  }

}

const getBlogs = async () => {
  const blogList = await blogService.getAll()
  return SortBlogs(blogList)
}

const SortBlogs =  (blogList) => {

  blogList.sort((a,b) => {
    if(a.likes > b.likes) return - 1
    if(a.likes < b.likes) return 1

    return 0
  })
  return blogList
}
export const initializeBlogs = () => {
  return  async dispatch => {
    const blogList = await getBlogs()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogList
    })
  }

}

export const removePost =  (blog) => {
  return async dispatch => {

    const result = window.confirm('would you like to delete the post?')
    if(result){
      await blogService.deletePost(blog.id)
    }
    dispatch({
      type:'DELETE_BLOG',
      id: blog.id
    })
  }

}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'POST_COMMENT':
  {
    const newState = [...state]

    const index = state.findIndex(blog => blog.id === action.id)
    newState[index] = action.data

    return newState
  }

  case 'LIKE_POST':
  {
    // return action.data
    {
      const index = state.findIndex( blog => blog.id === action.id )
      const newState = [...state]

      newState[index] = action.data
      return SortBlogs(newState)
    }

  }
  case 'DELETE_BLOG':{
    const newState = state.filter( blog => blog.id !== action.id)
    return newState
  }
  default: return state
  }

}

export default blogReducer