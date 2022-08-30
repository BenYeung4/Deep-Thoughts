//authencation with JSON Web Token/ JWT.  A JSON object that's been encoded into a tokenized string. "example an inputed username and email becaomse a giant string of random code"
//this is usesful to contain all the data you need encoded into a single string, eliminate the need to save a session ID on the back end or in the database, decrease the amount of server-side resources needed to maintain authentication, can be generated anywhere and aren't tied to a single domain like cookie

//JSON web Token/JWT npm package
const jwt = require("jsonwebtoken");

//optionally tokens can be given an exipration date and secret sign the token with.  Note that the secret has nothing to do ith encoding, the secret merely enables the server to verify wheather it recognizes this token
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  //signToken function expects a user object and will dd that user's username, email, and _id properties to the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
