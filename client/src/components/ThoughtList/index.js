//list of thought data that was a component of a page

import React from "react";

//instructing the ThoughtList component will recieve two props: title and the thoughts array.
const ThoughtList = ({ thoughts, title }) => {
  //checking to see if there is any data in the thoughts array, if no data, then return a message stating that.  if there i, return list of thoughts using he .map() method below
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
