//type definition or typeDefs - involes literally defining every piece of data that the client can expect to work with through  query or mutation. Every GraphQl API starts with defining this data, as this type of strict type definition will give the client more clarity as to what they are asking for and what hey can expect in return. Think of this as not only defining the API endpoint, but also defining the exact data and parameters that are tied to that endpoint.

// import the gql tagged template function from apollo-server-express
const { gql } = require("apollo-server-express");

// create our typeDefs thse are customs
//type User - user will return all the data in their Mongoose model.  friends field is an array that will populate data that also adheres to the User type
//type Thought - information that we've placed, quieries to retrieve a single thought by its _id value, all users, and a single user by their username.  The ! after String, indicates that for that query to be carried out, that data must exist.  Otherwise, apollo will return an error to the client.
//type Reaction - when run the thoughts query, we can also run the Reaction field to get back an array of reaction data for each thought ie. "reactions" are simply replies to or comments about a single thought
//how we search through Query Create & mutation POST UPDATE DELETE
//Query - how we preform GET request and ask for data from a GraphQL API, [] made it a custom array.  we placed(username: string), we defined our thought query that it could recieve a parameter if we wnated.   in this case, the parameter we would be identified as username and would have a string data type.  Included me: User as an example of saving the token as a local storage
//type Mutation - login and addUser , both will return a User object: either the user who sucessfully logged in or the user who was just created on sign-up.  We've updated the User to be Auth, so goes from User > Auth > Mutation.  the thoughts are the comments
//type Auth - under utils/auth includes the genration of tokens. Toekn isnt part of the User model, rather we create a new type specifically for authentication.  Meaning that tan Auth type must return a token and can optionally INCLUDE ANY OTHER USER DATA!!!!!, which is why we updated Mutation from their User to Auth
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

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
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
