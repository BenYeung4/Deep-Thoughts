## Tech:

# starting out with the following for the client folder

- npx create-react-app client

# install and setting up Apollo Client

- Library that Apollo created for making requests to GraphQl APIs using Apollo Server. Designed to support managing state for a React front end.

npm i @apollo/client graphql

@apollo/client - an all-in-one dependency that enables us to connect to a GraphQL API server and execute queries or mutations using their own special form of React Hooks

graphql - is a dependency much like MySQL2 was for Sequelize. Don't use it directly, but it needs to be present so that the GraphQL syntax used with Apollo Client can be understood.

#install React Router

- can add client-side routing to your applicaion while keeping the single-page responsiveness that React is known for.
  npm install react-router-dom

# install jwt-decode

- serves as a helper library working with JSON Web Tokens. only missing the function for creating and validating the token, instead, it used to extract nonsensitive data such as the expiration date so we can check if it has expired before we make a request to the server that needs it.

npm install jwt-decode
