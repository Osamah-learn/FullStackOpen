import React from "react";

export default function StatisticLine({ props}) {
  console.log(props.good);

  return (
    <div>
      <ol><li>Good :{props.good}</li></ol>
      <ol><li>Neutral :{props.bad}</li></ol>
      <ol><li>Bad :{props.neutral}</li></ol>
    </div>
  );
}
