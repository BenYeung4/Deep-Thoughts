import React from "react";

import {
  //ApolloProvider - special type of React component that we'll use to provide data to all the other components
  ApolloProvider,
  //ApolloClient - constructor function that will help initialize the connection to the GraphQL API server
  ApolloClient,
  //inMemoryCache - enables the Apollo Client instance to cache API response data so that we can preform requests more efficiently
  InMemoryCache,
  //createHttpLink - allows us to control how the Apollo Client makes a request.  "Ex. like middleware for the outbound network requests"
  createHttpLink,
} from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

//after installing the npm install react-router-dom - React Router, can add client-side routing to application while keeping the single-page responsivenss
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

//established a new link in the GraphQL server at /graphql.  we can pass many other options and conficutaion setting with createHttpLink()
//updated the uri from uri: "http://localhost:3001/graphql", to just "graphql" and add proxy in package.json in client directory.  using this and concurrently library to only run one time instead of two terminals
const httpLink = createHttpLink({
  uri: "graphql",
});

//using ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: httpLink,
  //instigate new cache object using new InMemoryCache()
  cache: new InMemoryCache(),
});

function App() {
  return (
    //ApolloProvider wrapped - passing the client variable in as the value for the client prop in the provider, everything between the JSX tags will eventually have access to the server's API data though the client we set up
    //elements in Router component, makes all of the child components on the page aware of the client-side routing that can take place.
    //inside <div className = "container", there is Routes, holding several route component. signify that this part of the as the place where content will change according to the URL route.  when route is "/", Home will render here
    //path="*" is a wildcard character, if thr route doesn't match any of the preceding paths, then user will see the 404 message
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/thought" element={<SingleThought />} />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
