import React from 'react'
import Note from './components/Note'
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("") 
  const [showAll, setShowAll] = useState(true)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
    console.log(notesToShow)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App