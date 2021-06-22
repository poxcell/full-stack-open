const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/',async (request, response) => {

  const body = request.body

  if(!body.username || body.username.length < 3 || !body.password || body.password.length < 3){
    response.send(500).end()
  }else{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
  
    try{

      const savedUser = await user.save()
    
      response.json(savedUser)
    }catch(err){
      response.status(401).json({
        error:'username already taken'
      })
    }
  }

  
})

usersRouter.get('/', async (request, response) => {
  const usersList = await User
    .find({}).populate('blogs',{title:1,url:1,author:1})
  response.json(usersList)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(200).end()
})
module.exports = usersRouter