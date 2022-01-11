import React, { useState } from "react";
import AddPerson from "./components/AddPerson";
import Person from "./components/Person";

const App = () => {
  /* States */
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0401237485" },
  ]);
  const [newNames, setNewNames] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  /* Handlers */

  // Add New Person to the Person Object
  const addPerson = (event) => {
    event.preventDefault();
    const newObj = { name: newNames, number: newNumber };
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

  // Mapping  and filter Throw PersonState
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  let person = filtered.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <AddPerson
            filter={filter}
            setFilter={setFilter}
            handeNewName={handeNewName}
            newNames={newNames}
            handleNewNumber={handleNewNumber}
            newNumber={newNumber}
          />
        </div>
      </form>
      <Person person={person} />
    </div>
  );
};

export default App;
