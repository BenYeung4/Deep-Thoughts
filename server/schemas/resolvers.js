//Resolvers are simply the functions we connect to each query or mutation type definition that preforms the CRUD actions that each query or mutation is expected to preform

//import the Mongoose model of Thought in typeDefs.js
const { User, Thought } = require("../models");

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
};

module.exports = resolvers;
