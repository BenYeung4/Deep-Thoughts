//Resolvers are simply the functions we connect to each query or mutation type definition that preforms the CRUD actions that each query or mutation is expected to preform

//after entering entering the Query in typeDef, we will call it under the resolvers

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello world!";
    },
  },
};

module.exports = resolvers;
