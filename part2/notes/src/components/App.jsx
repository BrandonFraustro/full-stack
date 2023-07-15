import './App.css'
import Note from './Note'

const App = ({ notes }) => {
  return (
    <div className='notes'>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => {
          return <Note key={note.id} note={note}/>
        })}
      </ul>
    </div>
  )
}

export default App
