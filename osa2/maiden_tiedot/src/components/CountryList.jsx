import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, setFilter }) => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
      return (
        <ul>
          {countries.map(country => (
            <li key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => setFilter(country.name.common)}>show</button>
            </li>
          ))}
        </ul>
      )
    }

    if (countries.length === 1) {
      return <CountryDetail country={countries[0]} />
    }

    return <p>No matches</p>
  }

  const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
      const capital = country.capital[0]
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

      axios
        .get(weatherUrl)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.error("Error fetching weather data:", error)
        })
    }, [country.capital, api_key])

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
  }

  export default CountryList