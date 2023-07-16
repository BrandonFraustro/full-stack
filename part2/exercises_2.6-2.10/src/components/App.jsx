import { useState } from 'react'
import './App.css'

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  //console.log(persons.map(person => person.name));
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState(persons)

  const handleAddPhonebook = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const found = names.find(name => name === newName)
    //console.log('Found: ', newNumber);
    if (found === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewSearch(persons.concat(personObject))
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
  const handleSearch = (event) => {
    //setNewSearch(event.target.value)
    //console.log('Search: ', event.target.value);
    const search = event.target.value.toLowerCase();
    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(search)  
    )
    setNewSearch(filtered)
    //console.log('Search: ', filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter shown with: <input type="text" onChange={handleSearch} />
      </div>
      <h2>Add a new</h2>
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
      </form>
      <h2>Numbers</h2>
        <div>
          <ul>
            {
              newSearch.map(person =>
                <li key={person.name}>{person.name} {person.number}</li>  
              )
            }
          </ul>
        </div>
    </div>
  )
}

export default App
