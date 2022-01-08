import React from "react";

export default function Course({ course }) {
  const reducer = (previousValue, part) => {
    return previousValue + part.exercises;
  };
  const totalExercises = course.parts.reduce(reducer, 0);
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((item) => (
        <p key={item.name}>
          {item.name}: {item.exercises}
        </p>
      ))}
      <h3>Total of {totalExercises} exercises</h3>
    </div>
  );
}
