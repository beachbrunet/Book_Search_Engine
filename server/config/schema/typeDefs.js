// types here
// define the query we want to execute by wrapping it in the gql template literal:
const { gql } = require("apollo-server-express");
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
    token: ID!
    user: User
  }
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        username: String!
        email: String!
        password: String!
    ): Auth
    saveBook(
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    ): User
    removeBook(bookId: ID!): User
`;
module.exports = typeDefs;

// example code
// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Profile {
//     _id: ID
//     name: String
//     skills: [String]!
//   }

//   type Query {
//     profiles: [Profile]!
//     profile(profileId: ID!): Profile
//   }

//   type Mutation {
//     addProfile(name: String!): Profile
//     addSkill(profileId: ID!, skill: String!): Profile
//     removeProfile(profileId: ID!): Profile
//     removeSkill(profileId: ID!, skill: String!): Profile
//   }
// `;

// module.exports = typeDefs;
