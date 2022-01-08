import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newNames, setNewNames] = useState([]);

  const addName = (event) => {
    event.preventDefault();
    const newObj = { name: newNames };
    setPersons(persons.concat(newObj));
    setNewNames("");
  };

  const handeNewName = (event) => {
    console.log(event.target.value);
    setNewNames(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handeNewName} value={newNames} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
      ...
    </div>
  );
};

export default App;
