import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import ToggleComponent from './components/ToggleComponent'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const [popUp,setPopUp] = useState(null)


  const getBlogs = async () => {
    const blogList = await blogService.getAll()
    blogList.sort((a,b) => {
      if(a.likes > b.likes) return -1
      if(a.likes < b.likes) return 1
      return 0
    })
    setBlogs(blogList)
  }

  useEffect(  () => {
    getBlogs()
  }, [])

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem('BlogAppSavedUser')
    if(savedUserJSON){
      setUser(JSON.parse(savedUserJSON))
    }
  },[])

  const submitBlog = async ({ title,author,url }) => {
    const token = JSON.parse(window.localStorage.getItem('BlogAppSavedUser')).token
    const data = {
      title,
      author,
      url,
      token
    }
    setPopUp({ color:'green',message:'blog posted' })
    const postedBlog = await blogService.createNew(data)
    console.log(postedBlog)
    getBlogs()
    setTimeout(() => {
      setPopUp(null)
    },5000)

  }



  const log = async () => {
    const log = await loginService.logIn(username,password)
    return log
  }

  const submitForm =   async (e) => {
    e.preventDefault()

    let loginfo =''
    try{
      loginfo = await log()
      if(loginfo.token){
        setUser(loginfo.username)
      }
      window.localStorage.setItem(
        'BlogAppSavedUser',JSON.stringify(loginfo)
      )
      setPopUp({ color:'green',message:`logged in as ${loginfo.username}` })

      setTimeout(() => {
        setPopUp(null)
      },5000)

    } catch(err){
      console.log(err)
      setPopUp({ color:'red',message:'wrong username or password' })

      setTimeout(() => {
        setPopUp(null)
      },5000)
    }
  }

  const likePost = async (blog) => {
    const updatedBlog= {
      user:blog.user.id,
      likes:blog.likes+1,
      author:blog.author,
      title:blog.title,
      url:blog.url
    }
    await blogService.likeBlog(updatedBlog,blog.id)
    getBlogs()

  }
  const removePost = async (blog) => {
    const result = window.confirm('would you like to delete the post?')
    if(result){
      await blogService.deletePost(blog.id)
      getBlogs()
    }
  }

  const LoginForm = () => (
    <div>
      <h2>log in to application</h2>
      {popUp && PopUpMessage()}
      <form onSubmit={submitForm}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            id='username-input'
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='password'
            id='password-input'
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type='submit' id='login-button'>Log In</button>
      </form>
    </div>
  )
  const logOut = () => {
    setUser(null)
    window.localStorage.setItem(
      'BlogAppSavedUser',''
    )
  }
  const PopUpMessage = () => {
    const styledPopUp ={
      color: popUp.color,
      fontSize: '1.2em',
      backgroundColor:'lightgray',
      padding:'.6em',
      paddingLeft:'1.2em',
      border:`solid 4px ${popUp.color}`,
      borderRadius:'50px'
    }
    return(
      <div style={styledPopUp} className='popUp'>
        <strong>{popUp.message}</strong>
      </div>
    )
  }

  const BlogList = () => (
    <div>

      <h2>blogs</h2>
      {popUp && PopUpMessage()}
      <h3>create new blog entry</h3>
      {<ToggleComponent id='create-blog'>
        <NewBlogForm handleSubmit={submitBlog}/>
      </ToggleComponent>}
      <hr/>
      <p>
        <strong>logged in as {username}</strong>
        <button onClick={logOut}>log out</button>
      </p>
      <div id='blog-list'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likePost={likePost} removePost={removePost}/>
        )}
      </div>
    </div>
  )
  return (
    <div>
      {!user ? LoginForm():BlogList()}
    </div>
  )
}

export default App

