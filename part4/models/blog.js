const mongoose = require('mongoose')
const config = require('../utils/config.js')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
  .then(() => console.log('connected to mongo'))
  .catch(error => console.log(error))



const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
})

blogSchema.set('toJSON',{
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
console.log(Blog)
module.exports =  Blog