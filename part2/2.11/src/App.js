import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNames, setNewNames] = useState("");
  console.log(newNames);

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3007/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

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
