import React from "react";

export default function StatisticLine({ props }) {
  console.log(props.good);

  return (
    
      
        <tbody>
     
        <tr>
          <th>Good :</th>
          <td>{props.good}</td>
        </tr>
        <tr>
          <th>neutral :</th>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <th>Bad :</th>
          <td>{props.bad}</td>
        </tr>
        </tbody>
        
    
  );
}
