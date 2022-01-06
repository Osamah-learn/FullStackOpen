import React from "react";

export default function Part({parts}) {
  console.log(parts);
  return (
    <div>
    <p>{parts.name}</p>
    <p>{parts.exercises}</p>
    </div>
  );
}
