import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(()  => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  
  let filteredCountries = 0
  if (countries.length>0) {
    filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
  }

  const handleChange = (event) => setFilter(event.target.value)
  const onClick = (country) => setFilter(country)

  if (filteredCountries.length>10) {
    return (
      <div>
        <CountryForm filter={filter} handleChange={handleChange} />
        <p>Too many matches, specify another filter.</p>
      </div>
    )
  }

  if (filteredCountries.length>1) {
    return (
      <div>
        <CountryForm filter={filter} handleChange={handleChange} />
        <CountryList countries={filteredCountries} onClick={onClick} />
      </div>
    )
  }

  if (filteredCountries.length>0) {
    return (
      <div>
        <CountryForm filter={filter} handleChange={handleChange} />
        <CountryInfo countries={filteredCountries} />
      </div>
    )
  }
  


  return (
    
    <div>
      <CountryForm filter={filter} handleChange={handleChange} />
      No matches, specify another filter.
    </div>
  );
}

const CountryForm = ({ filter, handleChange}) => {
  return (
    <form>
      <div>
        find countries <input 
        value={filter}
        onChange={handleChange}/>
      </div>
    </form>

  )
}


const CountryList = ({countries, onClick}) => {
  return (
    <ul>
      {countries
        .map(country => <li key={country.name}> {country.name} <button onClick={()=>onClick(country.name)}> show </button> </li>)
        }
    </ul>
  )
}

const CountryInfo = ({countries}) => {
  let country=countries[0]
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({temperature: 100})
  
  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: api_key,
          query: country.capital
        }
      })
      .then(response => {
        setWeather(response.data.current)
      })
  }, [api_key, country.capital])
  
  
  if (weather.temperature!==100) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population} </p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>) }
        </ul>
        <img src={country.flag} width="120" height="100" alt={country.name} />
        <h3>Weather in {country.capital}</h3>
        <p>temperature: {weather.temperature} Celsius</p>
        <img src={weather.weather_icons} width="120" height="100" alt="weather" />
        <p>wind: {weather.wind_speed} mph direction {weather.wind_dir} </p>
      </div>
    )
  }

  return null
}

export default App;
