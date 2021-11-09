const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const JWT_PK = process.env.JWT_SEKRET

const User = require('./schema/User')
const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')


mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('connected to mongo')
  })
  .catch((err) => {
    console.log(`error connecting to mongo: ${err}`)
  })


/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7),JWT_PK
      )
      const currentUser = await User.findById(decodedToken.id)
      
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
