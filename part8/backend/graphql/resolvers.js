const { UserInputError,AuthenticationError } = require('apollo-server-express')
const Book = require('../schema/Book')
const Author = require('../schema/Author')
const User = require('../schema/User')
const bcrypt = require('bcrypt')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')


const pubsub = new PubSub()

require('dotenv').config()
const JWT_PK = process.env.JWT_SEKRET


const resolvers = {
  Query: {
    authorCount: async () =>  (await Author.find({})).length,
    bookCount: async () =>  (await Book.find({})).length,
    allBooks: async (root, args) => {
      if(!args.genre && !args.author){
        return await Book.find({})
      }
      let filteredBooks = Book.find({})

      if(args.genre){
        filteredBooks = filteredBooks.find({ genres:{ $in: [args.genre] } })
      }
      if(args.author){
        const author = await Author.findOne({ name:args.author })
        
        filteredBooks = filteredBooks.find({author: author._id})
      }
      return filteredBooks
    },
    allAuthors: async (root, args) =>{
      if(!args.name){
        return await Author.find({}).populate('bookCount')
      }
      return await Author.find({name:args.name})
    }, 
    me:(root,args,context) => {
      return context.currentUser
    },
  },
  Author:{
    books:async (root) => await Book.find({author: root._id})
    ,
    bookCount: async (root) =>  {

      const books = (await  Book.find({author:root._id})).length
      console.log('found book')
      return books
    }
  },
  Book:{
    author: async (root) => await Author.findOne({_id: root.author})

  },

  

  Mutation:{
    addBook: async (root, args,context) => {
      if(!context.currentUser){
        throw new AuthenticationError('user not authenticated')
      }

      const book = new Book({ ...args })
      let author = await Author.findOne({name: args.author})
      
      if(!author){
        const newAuthor = new Author({ name: args.author })
        book.author = newAuthor
        author = newAuthor
      }

      book.author = author
      try{
        await author.save()
        await book.save()
        pubsub.publish('BOOK_ADDED',{ bookAdded : book})
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError('user not authenticated')
      }
      const foundAuthor = await Author.findOne({ name: args.name })
      if(!foundAuthor){
        throw new UserInputError('Author not found',{
          invalidArgs:args
        })
      }
      foundAuthor.born = args.setBornTo
      try{
        await foundAuthor.save()
      } catch(error){
        throw new UserInputError(error.message,{
          invalidArgs: args
        })
      }
      return foundAuthor
    },

    createUser: async (root, {username,favoriteGenre,password}) => {
      const hashedPassword = await bcrypt.hash(password,10)
      const userExists = await User.findOne({username})
      if(userExists){
        throw new UserInputError('user already exists')
      }
      const user = new User({
        username,
        password: hashedPassword,
        favoriteGenre
      })

      await user.save()
      return user
    },

    login: async(root, args) => {
      const user = await User.findOne({username:args.username})
      if(!user){
        throw new AuthenticationError('user not found')
      }
      const passwordCorrect = await bcrypt.compare(args.password,user.password)
      if( !(user && passwordCorrect)){
        throw new AuthenticationError('invalid user or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(
        userForToken,
        JWT_PK
      )
      return {value:token}
    }
  },

  Subscription:{
    bookAdded:{
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers