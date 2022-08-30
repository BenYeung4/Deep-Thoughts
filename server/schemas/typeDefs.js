//type definition or typeDefs - involes literally defining every piece of data that the client can expect to work with through  query or mutation. Every GraphQl API starts with defining this data, as this type of strict type definition will give the client more clarity as to what they are asking for and what hey can expect in return. Think of this as not only defining the API endpoint, but also defining the exact data and parameters that are tied to that endpoint.

// import the gql tagged template function from apollo-server-express
const { gql } = require("apollo-server-express");

// create our typeDefs
//Query - how we preform GET request and ask for data from a GraphQL API
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// export the typeDefs
module.exports = typeDefs;
