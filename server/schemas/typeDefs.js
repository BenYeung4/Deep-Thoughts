//type definition or typeDefs - involes literally defining every piece of data that the client can expect to work with through  query or mutation. Every GraphQl API starts with defining this data, as this type of strict type definition will give the client more clarity as to what they are asking for and what hey can expect in return. Think of this as not only defining the API endpoint, but also defining the exact data and parameters that are tied to that endpoint.

// import the gql tagged template function from apollo-server-express
const { gql } = require("apollo-server-express");

// create our typeDefs thse are customs
//type Thought - information that we've placed
//type Reaction - when run the thoughts query, we can also run the Reaction field to get back an array of reaction data for each thought ie. "reactions" are simply replies to or comments about a single thought
//Query - how we preform GET request and ask for data from a GraphQL API, [] made it a custom array.  we placed(username: string), we defined our thought query that it could recieve a parameter if we wnated.  in this case, the parameter we would be identified as username and would have a string data type.

const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    thoughts(username: String): [Thought]
  }
`;

// export the typeDefs
module.exports = typeDefs;
