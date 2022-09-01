//this is adding the text input from friends to the user's profile
import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";

//this is needed so we can request for an updated array to display our entry without the need to refresh
//updated to include Query_Me, so when we review the user's profile, it will populate the new updated array as well without manually refreshing
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const ThoughtForm = () => {
  const [thoughtText, setText] = useState("");
  //for the character count
  const [characterCount, setCharacterCount] = useState(0);
  //for the thought component
  //the update(), addThought reporesnts the new thought that was just created.  Using the cache object, we can read what's currently saved in the Query_Thoughts cache and then update it with wrieQuery() to include th new thought.
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache and no need to manually refresh
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!");
      }

      // read what's currently in the cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

      // prepend the newest thought to the front of the array
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });

  //sets the character count length. eventually cannot type over 280 characters
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  //handles the button submission and submit the entered thought
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addThought({
        variables: { thoughtText },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
