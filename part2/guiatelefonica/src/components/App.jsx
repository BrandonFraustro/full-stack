import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState([])

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
        setNewSearch(response.data)
      })
  }, [])
  //console.log('App: ', props.person.map(persons => persons));
  //console.log('App: ', persons);

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
    const search = event.target.value.toLowerCase();
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(search)
    );
    console.log("App:", filtered);
    setNewSearch(filtered);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='Filter shown with:' persons={persons} handleSearch={handleSearch}/>
      
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPhonebook={handleAddPhonebook}
      />

      <h2>Numbers</h2>
      <Persons newSearch={newSearch}/>
    </div>
  )
}

export default App
