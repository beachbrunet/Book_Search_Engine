// Remove the useEffect() Hook that sets the state for UserData.
// Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
// Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function
// that's imported from API file. (Make sure you keep the removeBookId() function in place!)
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

// add here
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutation";

const SavedBooks = () => {
  const { loading, data, error } = useQuery(GET_ME);

  // const [userData, setUserData] = useState({});

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = async (bookId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   // const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await removeBookId({
  //       variables: { bookId },
  //     });

  //     if (!data || error) {
  //       throw new Error("something went wrong!");
  //     }

  //     // const updatedUser = await response.json();
  //     // setUserData(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBook({
  //       variables: {
  //         bookId,
  //       },
  //     });
  //     // const updatedUser = await response.json();
  //     // setUserData(updatedUser);

  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (error) {
    console.log(error);
    return <h2> Error </h2>;
  }
  console.log(data);
  const userData = data.me || {};
  console.log(userData);

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    // onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
