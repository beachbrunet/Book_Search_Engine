import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GET_ME {
    me {
      _id
      username
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
