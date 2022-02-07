import React from "react";

export default function AddPerson(props) {
  return (
    <div>
      <h2>Search</h2>
      <p>Filter Showen with input : {props.filter}</p>
      <input
        id="filter"
        name="filter"
        type="text"
        value={props.filter}
        onChange={(event) => props.setFilter(event.target.value)}
      />
      <h2>Add anew Person</h2>
      <div>
        name: <input onChange={props.handeNewName} value={props.newNames} />{" "}
        <br />
        Number :{" "}
        <input onChange={props.handleNewNumber} value={props.newNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </div>
  );
}
