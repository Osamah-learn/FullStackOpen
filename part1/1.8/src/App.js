import React, { useState } from "react";

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
  });

  const goodClicks = () => setClicks({ ...clicks, good: clicks.good + 1 });

  const neutralClicks = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });

  const badClicks = () => setClicks({ ...clicks, bad: clicks.bad + 1 });

  const all = () => {
    return clicks.good + clicks.bad + clicks.neutral;
  };

  const average = () => {
    return all() / 3;
  };

  const positive = () => {
    return Math.floor((clicks.good / all()) * 100);
  };
  const Statisitics = ({ props, ...others }) => {
    console.log(all);
    return (
      <div>
        <h1>Statisitics</h1>
        <p>Good : {props.good}</p>
        <p>Neutral : {props.neutral}</p>
        <p>Bad : {props.bad}</p>
        <p>All :{all()} </p>
        <p>Average : {average()}</p>
        <p>Positive : {positive()}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Give afeedBack</h1>
      <button onClick={goodClicks}>Good</button>
      <button onClick={neutralClicks}>neutral</button>
      <button onClick={badClicks}>bad</button>
      <Statisitics
        props={clicks}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};
export default App;
