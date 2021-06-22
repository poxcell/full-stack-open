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

  if(body.title && body.url){
    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.title,
      likes: body.likes || 0, 
      user: user._id
    })
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.json(newBlog)
  } else{
    response.status(500).end()
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
  const id = request.params.id
  const updatedBlog = request.body
  await Blog.findByIdAndUpdate(id,updatedBlog)
  response.status(200).end()
})

module.exports = blogRouter