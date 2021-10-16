// server.js: Implement the Apollo Server and apply it to the Express server as middleware.

const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
// need to import Defs and resolvers
// const db = require("./config/connection");
const routes = require("./routes");
const schema = require("./schema");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
console.log(schema);
const app = express();
const PORT = process.env.PORT || 3001;
// Proxy error: Could not proxy request /static/js/vendors~main.chunk.js from localhost:3000 to http://localhost:3001.
// console.log(typeDefs);
const server = new ApolloServer({
  introspection: true,
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  context: authMiddleware,
});

// Add middleware
server.start().then(() => {
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

  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
});
