import { useState } from 'react'

const Country = ({country}) => {return (
  <p>{country.name?.common}</p>
)}

const CountryFilter = ({countriesToShow}) => {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)}>Back</button>
        <Country country={selected} />
        <CountryInfo country={selected} />
      </div>
    )
  }

  return (
    <>
      {countriesToShow.map(country =>
        <div key={country.cca3}>
          <Country country={country} />
          <button onClick={() => setSelected(country)}>Show info</button>
        </div>
      )}
    </>
  )
}

const CountryInfo = ({country}) => {
return(
  <div>
    <p>
      Capital:
      {country.capital.length > 1
        ? Object.values(country.capital).map((capital, id) => (
            <span key={id}> {capital}{id < country.capital.length - 1 ? ', ' : ''}</span>
          ))
        : <span> {country.capital[0]}</span>
      }
    </p>
    <p>Area: {country.area} km²</p>
    <h1>Languages</h1>
    <ul>
      {Object.values(country.languages).map((language, id) => (
        <li key={id}>{language}</li>
      ))}
    </ul>
    <p>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </p>
  </div>
)}

const CountryDisplay = ({countriesToShow, country}) => {
  if(250 > countriesToShow.length > 10) {
    return(<>Too many matches, speficy another filter</>)
  }
  if(countriesToShow.length <= 10) {
    console.log(countriesToShow)
    return(
  <><CountryFilter countriesToShow={countriesToShow} country={country}/></>
  )}
  if(country) {
    return(
    <>
      <h1><Country country={country}/></h1>
      <CountryInfo country={country}/>
    </>
  )}
}

export default CountryDisplay