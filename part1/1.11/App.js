import React, { useState } from "react";
import StatisticLine from "./components/StatisticLine";

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
    return (
      <div>
        <h1>Statisitics</h1>
        <table>
        <tbody>
          

          <StatisticLine props={props} />
          <tr>
            <th>All :</th>
            <td>{all()} </td>
          </tr>
          <tr>
          <th>Average :</th>
            <td>{average()} </td>
          </tr>
          <tr>
          <th>Positive :</th>
            <td>{positive()} </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const isFeedBack = all();

  return (
    <div>
      <h1>Give afeedBack</h1>
      <button onClick={goodClicks}>Good</button>
      <button onClick={neutralClicks}>neutral</button>
      <button onClick={badClicks}>bad</button>
      {isFeedBack !== 0 ? (
        <Statisitics
          props={clicks}
          all={all}
          average={average}
          positive={positive}
        />
      ) : (
        <div>
          <h3>No Feed Back.</h3>
        </div>
      )}
    </div>
  );
};
export default App;
