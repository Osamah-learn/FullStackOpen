import React, { useState, useEffect } from "react";
import AddPerson from "./Components/AddPerson";
import Person from "./Components/Person";
import apiService from "./services/api.js";

const App = () => {
  /* States */
  const [persons, setPersons] = useState([]);
  const [newNames, setNewNames] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  //Fetch Data from BackEnd
  useEffect(() => {
    apiService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  /* Handlers */

  // Add New Person to the Person Object
  const addPerson = (event) => {
    event.preventDefault();
    const newObj = { name: newNames, number: newNumber };
    const SelectedPerson = persons.find(
      (person) => person.name === newObj.name
    );
    if (SelectedPerson) {
      window.confirm(
        `${newObj.name} is already adedd to the phonebook, replcae the old number with anew one ?`
      );
      apiService.update(SelectedPerson.id, newObj).then(() => {
        apiService.getAll().then((response) => {
          setPersons(response);
        });
      });
    } else {
      apiService.create(newObj).then((response) => {
        console.log(response);
        setPersons(persons.concat(response));
        setNewNames("");
      });
    }
  };
  // Add New Number to the Person Object

  /*  */
  const handeNewName = (event) => {
    setNewNames(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleDelete = (person) => {
    apiService.remove(person.id).then(() => {
      apiService.getAll().then((response) => {
        setPersons(response);
      });
    });
  };
  // Mapping  and filter Throw PersonState
  const allPersons = Object.values(persons);
  const filtered = allPersons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

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
      <Person person={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
