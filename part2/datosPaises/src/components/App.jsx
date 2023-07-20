import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [find, setFind] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
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

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const showCountryData = () => {
    if (selectedCountry) {
      const { name, capital, population, languages, flags } = selectedCountry
      return (
        <div>
          <h2>{name.common}</h2>
          <p>Capital: {capital[0]}</p>
          <p>Population: {population.population}</p>
          <h2>Languages</h2>
          <ul>
            {
              Object.values(languages).map(language => 
                <li key={language}>{language}</li>
              )
            }
          </ul>
          <img src={flags.png} alt={name.common} />
        </div>
      )
    } else {
      return null
    }
  }

  //console.log("Flag: ", Object.values(find[0].languages))

  const countriesToShow = () =>{
    if (find.length > 10) {
      return 'Too many matches, specify another filter';
    } else if (find.length > 1) {
      return (
        <ul>
          {find.map(data => (
            <li key={data.name.common}>
              {data.name.common} <button onClick={() => handleShowCountry(data)}>show</button> 
            </li>
          ))}
          {showCountryData()}
        </ul>
      );
    } else if(find.length === 1){
      const country = find[0]
      const languages = Object.values(country.languages);
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {
              languages.map(language => 
                <li key={language}>{language}</li>
              )
            }
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
        </div>
      );
    } else {
      return null
    }
  }

  return (
    <div>
      <div className='search'>
        <label htmlFor="find">Find countries: </label>
        <input type="text" id='find' onChange={handleFindCountries}/>
      </div>
      <div className="results">
        {
          countriesToShow()
        }
      </div>
    </div>
  )
}

export default App
