import React, { useState, useEffect } from 'react'
import './App.css'
import Note from './Note'
import axios from 'axios'
import noteServices from '../services/notes'

const App = () => {
  //const data = props.note.map(note => note)
  //console.log(data);
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    //console.log('Effect');
    noteServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteServices
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
    //console.log(`Importance of ${id} needs to be toggled`);
  }

  const handleNoteChange = (event) => {
    /* console.log(event.target.value); */
    setNewNote(event.target.value)
  }

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() =>  setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />  
          )
        }
      </ul>
      <form onSubmit={addNote} className="form">
        <input type="text" value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App


