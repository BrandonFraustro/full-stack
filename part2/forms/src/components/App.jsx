import { useState } from 'react'
import './App.css'
import Note from './Note'

const App = (props) => {
  //const data = props.note.map(note => note)
  //console.log(data);
  const [notes, setNotes] = useState(props.note)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

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

  const handleNoteChange = (event) => {
    /* console.log(event.target.value); */
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notes.map(note => 
            <Note key={note.id} note={note}/>  
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
