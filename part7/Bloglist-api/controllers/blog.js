const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate('user',{username:1})
  response.json(Blogs)
})

blogRouter.post('/', async (request, response) => {
  if(request.err){
    return response.status(401).json({error: request.err})
  }
  const body = request.body  
  const user = request.user

  
  try{
    if(body.title && body.url){
      const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.title,
        likes: body.likes || 0, 
        user: user._id
        // user: user
      })

      const newBlog = await blog.save()
      console.log(newBlog)
      user.blogs = user.blogs.concat(newBlog._id)
      const blogid = newBlog._id
      await user.save()
      
      const responseBlog = {...newBlog._doc, 
        id:blogid,
        user:{
          username: user.username, 
          id: user._id
        }
        
      }
      delete responseBlog._id
      delete responseBlog.__v
      console.log(responseBlog)
      response.json(responseBlog)
    } else{
      response.status(500).end()
    }
  } catch(err){
    return err
  }
})

blogRouter.delete('/:id', async (request, response) => {
  if(request.err){
    return response.status(401).json({error:'invalid token'})
  }
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(200).end()
})

blogRouter.put('/:id', async (request, response) => {
  try{

    const id = request.params.id
    const updatedBlog = request.body
    const responseBlog = await Blog.findByIdAndUpdate(id,updatedBlog)
    delete responseBlog._id
    delete responseBlog.__v
    response.status(200).end()
  } catch(err){
    response.err
  }
})

blogRouter.post('/:id/comments',async (request, response) => {
  if(request.err){
    return response.status(401).json({error: request.err})
  }
  const user = request.user

  const comment = request.body  
  const id = request.params.id
  const foundBlog = await Blog.findById(id)
  if(foundBlog){
    
    foundBlog.comments = foundBlog.comments.concat(comment)
    await Blog.findByIdAndUpdate(id,foundBlog)
    const responseBlog = {...foundBlog._doc, 
      id:id,
      user:{
        username: user.username, 
        id: user._id
      }
      
    }
    delete responseBlog._id
    delete responseBlog.__v
    console.log(responseBlog)
    response.json(responseBlog)
  }
})

module.exports = blogRouter