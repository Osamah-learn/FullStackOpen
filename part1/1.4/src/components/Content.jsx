import React from "react";
import Part from "./Parts/Part";

export default function Content({parts}) {
  
  return (
    <div>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>

    </div>
  );
}
