import React,{useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const SingleCountry =({country, weather}) => {
  if(weather.current){
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>
        languages
      </h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}

      </ul>
      <img src={country.flag} alt={`${country.name} flag`} width="200"></img>

      <h3>Weather in {country.name}</h3>
      <p><b>temperature: {weather.current.temperature} F</b></p>
      <img src={weather.current.weather_icons[0]} alt={'representation of weather'} width='50'></img>
      <p><b>wind:</b> {weather.current.wind_speed}</p>
    </div>
  )}
  else{return <div>loading</div>}
}

const CountryList = ({name, handleClick}) => (
  <div >
    {name}  
    <button onClick={() => handleClick(name)}>show</button>
  </div>
)

const Countries = ({countries, handleClick, weather}) => {
  if (countries.length > 0){
    if (countries.length < 10){
      if(countries.length === 1){
        
        return(
          <SingleCountry 
            country={countries[0]} 
            weather={weather}
          />
        )
      }

      return(
        <div>
          {countries.map(country => 
            <CountryList key={country.name} 
            name ={country.name} 
            handleClick={handleClick}
            />
          )}
        </div>
      )
    }
    return <div>too many countries match the query</div>
  } 
  if(countries === -1) return<div>no countries match the query</div>
    
  return <div>Type a country</div>  
}


const App = () =>{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() =>{
    
    !filter 
    ?
      setCountries([])
    :
      axios
        .get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then(response => {

          setCountries(response.data)
        })
        .catch(error => setCountries(-1))

  },[filter])

  const changeFilter = (event) => {setFilter(event.target.value)}

  useEffect(() => {
    if(countries.length === 1){
      const countryName = countries[0].name
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
        .then(response => setWeather(response.data))
    }
  },[countries])
  
  

  return(
    <div>
      find countries
      <input onChange={changeFilter}></input>
      <Countries 
        countries={countries} 
        handleClick={setFilter} 
        weather={weather}  
      />
    </div>
  )
}

export default App;
