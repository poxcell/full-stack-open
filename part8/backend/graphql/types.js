const { gql } = require('apollo-server-express')


const typeDefs = gql`
  type User{
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token{
    value: String!
  }

  type Author{
    name: String!
    id: ID!
    born: Int
    books: [Book!]!
    bookCount:Int
  }

  type Book{
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre:String, author: String):[Book!]!
    allAuthors(name:String):[Author!]!
    me: User
  }

  type Mutation{
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]
    ):Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
  type Subscription{
    bookAdded: Book!
  }
`
module.exports = typeDefs