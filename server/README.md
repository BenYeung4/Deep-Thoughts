## Installation:

### `npm install -y`

### `npm run seed` - under server folder

## Usage:

### `npm run watch` - run localhost:3001/graphql on web browser

## Tech:

- Javascript - Program language
- React - Front end
- GraphQL - Query language for APIs and a runtime for fulfilling queries, providing users the power to ask for exactly what they need and nothing more.
- Apollo Server - Open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. Use apollo-server-express package to integrage GraphQL into the Express.js server, and the @apollo/client package to make requests from React front end to the GraphQL API

npm i apollo-server-express graphql

- React Router - Collection of navigational components that compose declaratively with your application, allowing you to make your single-page React applications behave more like multi-page applications.
- Concurrently npm package - Allows you to run multiple processes, or servers, from a single command-line interface. Rather than opening multiple terminals to start the multiple servers, you can run them both at the same time. It also allows you to keep track of different outputs in one place, and will stop all of your processes if even one of them fails.
- JSON Web Tokens (JWT) - jsonwebtoken package, are an alternative to using session cookies for authentication.

npm install jsonwebtoken

- jwt-decode - npm package that helps decode JWTs from their Base64Url encoding. Extract non-sensitive data such as the token's expiration date to see if it's expired before making a erquest to the server.
- faker npm package - Allows us to generate massive amounts of fake data in the development nvironment of Node.js application.
- nodemon package - Simplifies development enviorment by automatically restarting your Node.js application when file chanes in the directory are detected.
