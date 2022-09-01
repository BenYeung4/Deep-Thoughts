import React from "react";

//use with the App.js
import { Link } from "react-router-dom";

//authoirze if user is logged in or not
import Auth from "../../utils/auth";

//under the <nav> {Auth.logiedIn()?} confirming if user is logged in or true, then display will be that of the logged in user. if user is not logged in or false, then display will be that of the non user
const Header = () => {
  //need this separate function to execute when clicked to run the logout() method
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
