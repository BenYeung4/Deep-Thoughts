//for front end user authentication

import { gql } from "@apollo/client";

//mutation for creating a new user through the signup form page.
//same as the Login_User request below, but we added that the user to input the email as well
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//this mutation will accept two variables, the $email and $password, whose values will set up to be passed i nas an arguments when we integrate this with he login form page.
//in return, we expect the logged-in user's data and the token, with the toke, we'll be able to preform other acions unique to the logged-in user.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;