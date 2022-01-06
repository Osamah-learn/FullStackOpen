import React from "react";
import Part from "./Parts/Part";

export default function Content({data}) {
  
  return (
    <div>
     <Part data={data.part1}/>
     <Part data={data.part2} />
     <Part data={data.part3} />

    </div>
  );
}
