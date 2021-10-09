// server.js: Implement the Apollo Server and apply it to the Express server as middleware.

const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
// need to import Defs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;
// Proxy error: Could not proxy request /static/js/vendors~main.chunk.js from localhost:3000 to http://localhost:3001.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Add middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
