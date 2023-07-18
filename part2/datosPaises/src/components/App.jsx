import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
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

  //console.log("Flag: ", Object.values(find[0].languages))

  const countriesToShow = () =>{
    if (find.length > 10) {
      return 'Too many matches, specify another filter';
    } else if (find.length > 1) {
      return find.map(data => (
        <ul>
          <li key={data.name.common}>{data.name.common}</li>
        </ul>
      ));
    } else if(find.length === 1){
      const country = find[0]
      //const capital = country.map(data => (data.capital))
      //const capi = capital.map(data => (data[0]))
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
