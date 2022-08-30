//Resolvers are simply the functions we connect to each query or mutation type definition that preforms the CRUD actions that each query or mutation is expected to preform

//import the Mongoose model of Thought in typeDefs.js
const { User, Thought } = require("../models");

//using with utils/auth
const { AuthenticationError } = require("apollo-server-express");
//generating token, in this case, help verify and with AuthenticationError
const { signToken } = require("../utils/auth");

//after entering entering the Query in typeDef, we will call it under the resolvers
const resolvers = {
  //Query through thoughts
  Query: {
    //passing in parent as a placeholder parameter(wont be used). checking if {username} exists.
    thoughts: async (parent, { username }) => {
      //if it does, set a params to an object with a username key set to that value. if it doesnt, return an empty object
      const params = username ? { username } : {};
      //find() method on the Thought model in typeDefs.js.  returning the thought data in desending order .sort()
      return Thought.find(params).sort({ createdAt: -1 });
    },

    //finding a single thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },

    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
  Mutation: {
    //the mongoose user model creates a new user in the database with whatever is passed in as the args.
    addUser: async (parent, args) => {
      const user = await User.create(args);
      //assign a token
      const token = signToken(user);

      return { token, user };
    },

    //login authentication
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //usually setting errors like these would cause server to crash, but GraphQL will catch the error and send to the client instead
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      //assign a token
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
