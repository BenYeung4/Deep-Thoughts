//list of thought data that was a component of a page

import React from "react";

import { Link } from "react-router-dom";

//instructing the ThoughtList component will recieve two props: title and the thoughts array.
const ThoughtList = ({ thoughts, title }) => {
  //checking to see if there is any data in the thoughts array, if no data, then return a message stating that.  if there i, return list of thoughts using he .map() method below
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  //with the <Link> #{thought.username} will display the username, ex http:awdasd.com/profile/ben1234
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{" "}
                  {thought.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
