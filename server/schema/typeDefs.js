// types here
// define the query we want to execute by wrapping it in the gql template literal:
const { gql } = require("apollo-server");
// const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: String
    description: String!
    bookId: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    user: User
    token: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      description: String
      bookId: String!
      image: String
      link: String
      title: String!
    ): User
    deleteBook(bookId: ID!): User
  }
`;
module.exports = typeDefs;
