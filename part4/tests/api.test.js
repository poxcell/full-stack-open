const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./helper')

describe('user api ',() => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('list is empty', async () => {
    const list = await User.find({})

    expect(list).toHaveLength(0)
  })

  test('succesfully post a new user', async () => {
    const newUser = helper.newUser

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userList = await User.find({})

    expect(userList).toHaveLength(1)

    const usernames = userList.map(user => user.username )
    expect(usernames).toContain('admin')
  })

  test('error when not giving a username', async () =>{
    const newUser = {...helper.newUser}

    newUser.username = ''

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
  })

  test('error when username is less than 3 chars long', async () =>{
    const newUser = {...helper.newUser}
    
    newUser.username = 'ad'
    

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
  })

  test('error when no password', async () =>{

    const newUser = {...helper.newUser}

    newUser.password = ''

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
  })

  test('error when password is shorter than 3 chars', async () =>{
    const newUser = {...helper.newUser}

    newUser.password = '12'

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
  })

  test('error when trying to use a taken username', async () => {
    const newUser = helper.newUser

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
  })
})

describe('test token functionality', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const newUser = helper.newUser

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('recive a token when logging in', async () => {
    
    const auth = await api
      .post('/api/login')
      .send(helper.logUser)
      .expect(200)

    expect(auth.body.token).toBeDefined()
  })

  test('can add a new post with a token', async () => {
    const auth = await api
      .post('/api/login')
      .send(helper.logUser)
      .expect(200)

    const token = auth.body.token

    const BlogList =  [...helper.initialBlogs]

    const newBlog = BlogList[0]
    
    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${token}`)
      .expect(200)

    expect(blog.body.title).toBeDefined()

    const blogs = await api.get('/api/blogs').expect(200)

    expect(blogs.body).toHaveLength(1)
  })

  test('can not add a new post without a token', async () => {
    const BlogList =  [...helper.initialBlogs]

    const newBlog = BlogList[0]
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})



describe('delete blog functionality', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const newUser = helper.newUser

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const auth = await api
      .post('/api/login')
      .send(helper.logUser)
      .expect(200)

    const token = auth.body.token
    const BlogList =  [...helper.initialBlogs]
    const newBlog = BlogList[0]

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${token}`)
      .expect(200)
  })
  test('one blog on the list', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)

    expect(blogs.body).toHaveLength(1)
  })
  test('can delete a new post with a token',async () => {
    const auth = await api
      .post('/api/login')
      .send(helper.logUser)
      .expect(200)
    const token = auth.body.token
    
    const response = await api.get('/api/blogs')

    await api
      .delete(`/api/blogs/${response.body[0].id}`)
      .set('Authorization',`bearer ${token}`)

    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(0)
  })
  test('can not delete a new post with wrong token',async () => {
    
    const token = '12JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MGNiYTdmYzFjNDQ5YTM2YmM1MDI5OGIiLCJpYXQiOjE2MjQxNjEyMDF9.XP_KL1HeilwxLcgGgo8nO6iwfAf56EAnwLIoPHTbiw8'
    
    const response = await api.get('/api/blogs')

    await api
      .delete(`/api/blogs/${response.body[0].id}`)
      .set('Authorization',`bearer ${token}`)

    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})


