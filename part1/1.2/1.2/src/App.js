import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
const data = {"part1":part1,"part2":part2,"part3":part3}

  return (
    <div>
      <Header course={course} />
      <Content
     data={data}
      />
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  );
};

export default App;
