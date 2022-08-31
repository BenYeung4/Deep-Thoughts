//this is for concurrently to run one terminal instead of two for front and back end
const path = require("path");

const express = require("express");

// import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

//import authencation and token
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //serve up static assets
  //checks to see if the Node environment is in production, if it is, we instruct the express.js server to serve any files in the React applications build directory in the client folder.
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__direname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__direname, "../client/build/index.html"));
  });

  //listen for connection in Mongoose to be made, with successful connection, we start the server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
