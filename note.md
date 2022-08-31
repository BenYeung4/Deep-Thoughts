install concurrently package - runs multiple processes, or servers, from a single command line interface. this is so we don't need to have a second command-line window to start the other server, can do them both at the same time.

the -D instructs the dependency listed should be only installed i na development environment and not used in production. this will keep the overall node_modules folder size a bit smaller for production, which makes the application take up less space

```
npm install -D concurrently
```

additional scripts in package.json:

"scripts": {
"start": "node server/server.js", - when we run npm start, will only start running the back-end server. will be used in production when the client-side React application is built and doesn't need a development server anymore
"develop": "concurrently \"cd server && npm run watch\" \"cd client && npm start\"", - using the npm run devvelop script as we continute to build this application. using the concurrently to run two seperate commands. each \ \ will run their own specific requested npm
"install": "cd server && npm i && cd ../client && npm i", - npm i to install all the dependencies at this root level. then navigates to the server directory and install those dependencies. lastly, navigates to the client directory to install those dependencies as well
"seed": "cd server && npm run seed" - naviaget to the server directorty and seed the database iusing the npm run seed command.
}
