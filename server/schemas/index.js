//serves as the file to collect the typeDefs.js and resolvers.js and export them
//Setup of a GraphQl API ivolves typeDefs.js and resolvers.js

//calling typeDefs
const typeDefs = require("./typeDefs");

//calling resolver
const resolvers = require("./resolvers");

//export our Queries and mutation
module.exports = { typeDefs, resolvers };
