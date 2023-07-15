import { useState } from 'react'
import './App.css'

function App() {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
    }
  ])
  //console.log(persons.map(person => person.name));
  const [ newName, setNewName ] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div className='button'>
          <button type='submit' onClick={handleAddName}>add</button>
        </div>
        <h2>Numbers</h2>
        <div>
          <ul>
            {
              persons.map(person =>
                <li key={person.name}>{person.name}</li>  
              )
            }
          </ul>
        </div>
      </form>
    </div>
  )
}

export default App
