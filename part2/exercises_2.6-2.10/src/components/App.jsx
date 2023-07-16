import { useState } from 'react'
import './App.css'

function App() {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567',
    },
  ])
  //console.log(persons.map(person => person.name));
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleAddPhonebook = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const found = names.find(name => name === newName)
    console.log('Found: ', newNumber);
    if (found === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }
  
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    //console.log(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div className="inputs">
          <div>
            name: <input onChange={handleNameChange} />
          </div>
          <div>
            number: <input onChange={handleNumberChange} />
          </div>
        </div>
        <div className='button'>
          <button type='submit' onClick={handleAddPhonebook}>add</button>
        </div>
        <h2>Numbers</h2>
        <div>
          <ul>
            {
              persons.map(person =>
                <li key={person.name}>{person.name} {person.number}</li>  
              )
            }
          </ul>
        </div>
      </form>
    </div>
  )
}

export default App
