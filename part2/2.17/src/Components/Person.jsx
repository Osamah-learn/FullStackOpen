import React from 'react'

export default function Person(props) {
  const showAlert = (person)=>{
    if(window.confirm(`Do you wanna delete ${person.name}`))
    props.handleDelete(person)
  }
    return (
        <div>
          <h2>Numbers</h2>  
          {props.person.map(person => <p key={person.id}>{person.name}{person.number} <button onClick={()=>showAlert(person)}>Delete</button></p>)}
        </div>
    )
}
