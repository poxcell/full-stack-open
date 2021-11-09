import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query getBooks {
    allBooks {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
}
`

export const LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query{
    me {
      favoriteGenre
      id
      username
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query($genre: String){
    allBooks(genre: $genre) {
      
      title
      published
      author {
        name
      }
      genres
      id
      
    }
  }
`