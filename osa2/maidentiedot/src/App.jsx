import { useState } from 'react'
import countryService from './services/countries' 
import CountryDisplay from './components/CountryDisplay'
import './index.css'
import { useEffect } from 'react'

const Form = ({handleInput, newInput}) => {return (   
  <form>
    find countries: <input onChange = {handleInput} value = {newInput}/>
  </form>)
}

function App() { 
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [newInput, setNewInput] = useState('')

  const hook = () => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
  useEffect(() => {
    if (newInput.trim() === '') {
        setCountry('')
      }
    }, [newInput])

  const commonCountryName = (countryObject) => countryObject.name?.common.toLowerCase()

  const countriesToShow = countries.filter(country => 
    commonCountryName(country).includes(newInput.toLowerCase()))

  if (countriesToShow.length == 1) {
    const countryName = commonCountryName(countriesToShow[0])
    countryService
      .getCountryInfo(countryName)
      .then(response => {
        setCountry(response.data)
      })
    setNewInput('')
  }

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewInput(event.target.value)
  }

  return(
  <div> 
    <Form handleInput={handleInput} value={newInput}/>
    <CountryDisplay countriesToShow={countriesToShow} country={country}/>
  </div>
  )
}

export default App
