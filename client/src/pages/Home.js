import React from "react";
import ThoughtList from "../components/ThoughtList";

//useQuery - imported this hook from Apollo Client, allow us to make requests to the GraphQL server we connected to and made available to the application using the  <ApolloProvider> component in App.js
import { useQuery } from "@apollo/client";
//need to use the query with the imported Hook functionality, and we'll be able to query thought data!
//me_basic is for the loggedin user
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

//for confirmation if user is loggedin
import Auth from "../utils/auth";

//friends list
import FriendList from "../components/FriendList";

//Thoughtform from friends
import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  // use useQuery hook to make query request for the Thoughts data
  //loading property to indicate taht the request isn't done just yet.  when it is finished and we have data returned from the server, that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  //getting the thoughts data out of the query's response, because every GraphQL response comes in a big data object.  in this case, we'll access data.thoughts.
  // ? = optional chaining, so far, only browers support it.  if tried to use in a Node server, it would get an error.  Optional chaining negates the need to check if an object even exists before accessing its property.  in this case, no data will exist until the query to the server is finished.
  //traslating the following code: "if data exists, store it in the thoughts constant we created.  if data is undefined, then save an empty array to the thoughts component []"
  const thoughts = data?.thoughts || [];

  //if loggedin, then variable will be true, otherwise it is false
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
