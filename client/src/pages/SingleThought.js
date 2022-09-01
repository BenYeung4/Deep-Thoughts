import React from "react";
import { useParams } from "react-router-dom";

//importing utils/queries/THOUGHT
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";

//reactionList
import ReactionList from "../components/ReactionList";

//reactionForm
import ReactionForm from "../components/ReactionForm";

//authorization module
import Auth from "../utils/auth";

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  //loading variable is used to briefly show a loading <div> and data is used to populate a thought object
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    //the useQuery hook was given a second argument in the form of an object.  id vaeriable object will becom e the $id parament in the GraphQL query
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
