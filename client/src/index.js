// https://www.apollographql.com/docs/apollo-server/getting-started/
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// fixed index via feedback had the wrong thingy
const apolloUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/graphql"
    : "/graphql";

//from the website
const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
