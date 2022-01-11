import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0401237485" },
  ]);
  const [newNames, setNewNames] = useState("");
  const [newNumber, setNewNumber] = useState("");



  // Add New Person to the Person Object
  const addPerson = (event) => {
    event.preventDefault();
    const newObj = { name: newNames , number:newNumber};
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
// Add New Number to the Person Object

  /*  */
  const handeNewName = (event) => {
    console.log(event.target.value);
    setNewNames(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  let person = persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handeNewName} value={newNames} /> <br />
          Number : <input onChange={handleNewNumber} value={newNumber} />
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
