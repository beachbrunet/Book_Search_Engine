// https://www.apollographql.com/docs/apollo-server/getting-started/
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/graphql"
    : "Heroku";

//from the website
const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache(),
});

// HERE IS THE CONSOLE BUG?
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </ApolloProvider>,
  document.getElementById("root")
);
