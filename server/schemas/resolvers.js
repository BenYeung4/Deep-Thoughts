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

    // me Query to include token
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
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

    //thought
    addThought: async (parent, args, context) => {
      //confirming if user is logged in, JWT is only added to context if the verification passes.  Token incluse the username, emal, and _id properties. Which becomes the properties of context.user. Which can be used in the follow-up Thought.create() and User.findByIdAndUpdate()
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }
      //only logged in users should be able to use this mutation
      throw new AuthenticationError("You need to be logged in!");
    },

    //reaction, stored as array on the Thought model, so we will use Mongo $push operator, because we are updating an exisiting thought, the client will need to provide the corresponding thoughtId.
    //this provides a reaction to the comment/thought
    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    //adding a friend
    //look for an incoming firnedId and add that to the current user's friends array.  A user cannot be friends with the same peson twice, which is why there is $addToSet operator instead of $push to prevent duplicate entries
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
