import React, { useState } from "react";

const randomIndex = (arr) => {
  // returns a random int value to use as an selected
  return Math.floor(Math.random() * arr.length);
};

const App = () => {
  /*   const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ]; */
  const defaultAnecdotes = [
    {
      text: "If it hurts, do it more often",
      votes: 0,
    },
    {
      text: "ist hurt ?",
      votes: 0,
    },
    {
      text: "Helooooooooooo ?",
      votes: 0,
    },
    {
      text: "Baklaaaaaaaawa ?",
      votes: 0,
    },
    {
      text: "Osamah Amer Mohammed ?",
      votes: 0,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anecdotes, setAnecdotes] = useState(defaultAnecdotes);

  const genHandler = () => {
    setSelectedIndex(randomIndex(anecdotes));
  };

  const voteHandler = () => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selectedIndex].votes += 1;
    setAnecdotes(newAnecdotes);
  };

  // sort by Vote
  const sortedAnecdotes = [...anecdotes];
  sortedAnecdotes.sort(function (a, b) {
  return b.votes - a.votes;
});
const anecdoteWithMostVote  = sortedAnecdotes[0]
  return (
    <div>
      <h1>{anecdotes[selectedIndex].text}</h1> <br></br>
      <h3>has {anecdotes[selectedIndex].votes} votes</h3>
      <br />
      <button onClick={voteHandler}>Vote</button>
      <button onClick={genHandler}>Next anecdote</button>
      <h1>Anecdotes with most vote</h1> <br></br>
      <p>{anecdoteWithMostVote.text}</p>
      <p>has {anecdoteWithMostVote.votes} vote</p>
    </div>
  );
};

export default App;
