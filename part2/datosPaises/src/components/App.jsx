import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState([])

  useEffect(() => {
    axios
      .get(' https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFindCountries = (event) => {
    const search = event.target.value.toLowerCase();
    const filtered = countries.filter(countrie =>
      countrie.name.common.toLowerCase().includes(search)
    );
    setFind(filtered);
  }

  const countriesToShow = find.length > 10 
    ? 'Too many matches, specify another filter'
    : find.map(data =>
      <li key={data.name.common}>{data.name.common}</li>
    )

  return (
    <div>
      <div className='search'>
        <label htmlFor="find">Find countries: </label>
        <input type="text" id='find' onChange={handleFindCountries}/>
      </div>
      <div className="results">
        <ul>
          {
            countriesToShow
          }
        </ul>
      </div>
    </div>
  )
}

export default App
