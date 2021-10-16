const express = require('express')
const app = express()
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

app.use(express.json())


app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor, blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
module.exports = app    