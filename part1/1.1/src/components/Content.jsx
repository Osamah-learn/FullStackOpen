import React from "react";

export default function Content(props) {
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3}
      </p>
    </div>
  );
}
