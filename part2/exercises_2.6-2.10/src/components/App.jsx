import { useState } from 'react'
import './App.css'

function App() {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
    },
    {
      name: 'Brandon Fraustro'
    }
  ])
  //console.log(persons.map(person => person.name));
  const [ newName, setNewName ] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const found = names.find(name => name === newName)
    //console.log('Found: ', newName);
    if (typeof found === 'undefined') {
      const personObject = {
        name: newName,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      window.alert(found + ' is already added to phonebook')
    }
  }
  
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value);
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
