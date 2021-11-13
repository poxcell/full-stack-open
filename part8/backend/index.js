const {
  ApolloServer
} = require('apollo-server-express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const express = require('express')

require('dotenv').config()
const JWT_PK = process.env.JWT_SEKRET

const User = require('./schema/User')
const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')


const {  createServer } = require('http')
const {  execute, subscribe } = require('graphql')
const {
  SubscriptionServer
} = require('subscriptions-transport-ws')
const {
  makeExecutableSchema
} = require('@graphql-tools/schema')




mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('connected to mongo')
  })
  .catch((err) => {
    console.log(`error connecting to mongo: ${err}`)
  })

mongoose.set('debug', true)
/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */



// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async({req}) => {
//     const auth = req ? req.headers.authorization : null
//     if(auth && auth.toLowerCase().startsWith('bearer ')){
//       const decodedToken = jwt.verify(
//         auth.substring(7),JWT_PK
//       )
//       const currentUser = await User.findById(decodedToken.id)

//       return { currentUser }
//     }
//   }
// })

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })


async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: async ({
      req
    }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_PK
        )
        const currentUser = await User.findById(decodedToken.id)

        return {
          currentUser
        }
      }
    },
    
  });

  SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
  }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  })

  // Modified server startup
  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`🚀 server ready on http://localhost:${PORT}`)
  })
}

startApolloServer(typeDefs, resolvers)