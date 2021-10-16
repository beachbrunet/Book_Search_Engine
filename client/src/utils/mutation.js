import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
      }
    }
  }
`;

// corrected the thingy
export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $description: String, $bookId: Int!, $image: String, $link: String, $title: String) {
    saveBook(
        authors: $authors
        description: $desciption
        bookId: $bookId
        image: $image
        link: $link
        title: $title
        )
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id: ID
      username: String
      email: String
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
