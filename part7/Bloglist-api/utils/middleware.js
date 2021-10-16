const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token =  authorization.substring(7)
  }else{
    request.err = 'failed authorization'
  }
  
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (token){
    let decodedToken = null
    try{

      decodedToken = jwt.verify(token, process.env.SECRET)
  
      // console.log(decodedToken)
      
      request.decodedToken = decodedToken
      const user = await User.findById(decodedToken.id)
      request.user = user
    }catch(err){
      request.err = err
    }
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error:'unknown endpoint'})
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  userExtractor
}