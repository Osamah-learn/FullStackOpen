import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newNames, setNewNames] = useState("");
  console.log(newNames);
  const addName = (event) => {
    event.preventDefault();
    const newObj = { name: newNames };
    const isExisting = persons.filter(
      (person) => person.name === newObj.name
    ).length;
    if (isExisting) {
      console.log(isExisting);
      alert(`${newObj.name} is already adedd to PhoneBook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewNames("");
    }
  };

  const handeNewName = (event) => {
    console.log(event.target.value);
    setNewNames(event.target.value);
  };
  let person = persons.map((person) => <p key={person.name}>{person.name}</p>);

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

      {person}
    </div>
  );
};

export default App;
