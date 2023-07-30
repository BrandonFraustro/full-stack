import React, { useState, useEffect } from 'react'
import './App.css'
import Note from './Note'
import noteServices from '../services/notes'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteServices
      .getAll()
      .then(response => {
        setNotes(response)
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
      .catch(error => {
        setErrorMessage (
          `The note ${note.content} was already deleted form server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <div className='principal'>
        <h1 className='title'>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={() =>  setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <div className="list">
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
      </div>
      <form onSubmit={addNote} className="form">
        <input type="text" value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App


