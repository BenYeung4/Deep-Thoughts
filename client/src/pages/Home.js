import React from "react";
import ThoughtList from "../components/ThoughtList";

//useQuery - imported this hook from Apollo Client, allow us to make requests to the GraphQL server we connected to and made available to the application using the  <ApolloProvider> component in App.js
import { useQuery } from "@apollo/client";
//need to use the query with the imported Hook functionality, and we'll be able to query thought data!
import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  // use useQuery hook to make query request for the Thoughts data
  //loading property to indicate taht the request isn't done just yet.  when it is finished and we have data returned from the server, that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //getting the thoughts data out of the query's response, because every GraphQL response comes in a big data object.  in this case, we'll access data.thoughts.
  // ? = optional chaining, so far, only browers support it.  if tried to use in a Node server, it would get an error.  Optional chaining negates the need to check if an object even exists before accessing its property.  in this case, no data will exist until the query to the server is finished.
  //traslating the following code: "if data exists, store it in the thoughts constant we created.  if data is undefined, then save an empty array to the thoughts component []"
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {
            /* PRINT THOUGHT LIST */ loading ? (
              <div>Loading...</div>
            ) : (
              <ThoughtList
                thoughts={thoughts}
                title="Some Feed for Thought(s)..."
              />
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
