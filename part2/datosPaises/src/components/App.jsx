import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [find, setFind] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const WEATHERSTACK_API_KEY = 'cb6bde81e2c9c9ec4808d37fe35c94b3';

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

      axios
        .get(`http://api.weatherstack.com/current`, {
          params: {
            access_key: WEATHERSTACK_API_KEY,
            query: country.capital[0]
          }
        })
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.log('Error fetching weather data:', error);
        });

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
          <h2>Weather in {country.capital[0]}</h2>
          <p> <b>Temperature:</b> {weather.temperature}°C</p>
          
          <p><b>Wind:</b> {weather.wind}</p>
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
