import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Header = ({text}) => <h1>{text}</h1>
const Person = ({persons, removePerson}) => {return(
  <li>
    {persons.name} {persons.number}
    <button onClick = {() => removePerson(persons.id)}>delete contact</button>
  </li>
  )}

const PersonForm = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) => {return(
        <form onSubmit = {addName}>
        <div>
          name: <input onChange = {handleNameChange} value = {newName}/>
        </div>
         <div>
          number: <input onChange = {handleNumberChange} value = {newNumber}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
  )
}

const FilterForm = ({handleInput, newInput}) => {
  return (
    <p>filter wih:
      <input onChange={handleInput} value={newInput}></input>
    </p>
  )
}

const PersonFilter = ({personsToShow, removePerson}) => {return(
  <>     
    {personsToShow.map(person => 
    <Person key={person.name} persons={person} removePerson={removePerson}/>)}
  </>
)}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newInput, setNewInput] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const personsToShow = (persons.filter(person => (person['name']).includes(newInput))) ?
  persons.filter(person => person.name.includes(newInput)) : persons

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response=> {
        setPersons(response.data)
      })
  }
  useEffect(hook,[])

  const addName = (event) => {
    event.preventDefault()
    if (personsToShow.find(person => person.name == newName)) {
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with the new one?`)) {
          const updatedPerson = persons.find(person => person.name == newName)
          console.log(updatedPerson)
          const personId = updatedPerson.id
          console.log(personId)
          const personObject = {
            name: newName,
            number: newNumber
          }
          personService
            .updateNumber(personId, personObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== personId ? person : response.data))
            })
            .then(() => {
              setSuccessMessage(`Phonenumber updated for ${newName}`)
              setTimeout(() => {
              setSuccessMessage(null)
              }, 5000)
            })
          setNewName("")
          setNewNumber("")
        }
    } else {
      const personObject = {
      name: newName,
      number: newNumber
      }
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
          setSuccessMessage(`${newName} added to the phonebook`)
          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
        })
    } 
  }

  const removePerson = (id) => {    
    const updatedPersons = persons.filter(person => person.id !== id)
    const name = (persons.find(person => person.id === id)).name
    if (window.confirm("Do you want to delete selected contact?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(updatedPersons)
        })
        .then(() => {
          setSuccessMessage(`${name} removed from phonebook`)
          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${name} was already removed from server`)
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
        })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInput = (event) => {
    setNewInput(event.target.value)
  }

  const SuccessNotification = ({message}) => {
    if(message === null) {
      return null
    }
    return (
      <div className="success">{message}</div>
    )
  }

  const ErrorNotification = ({message}) => {
    if(message === null) {
      return null
    }
    return (
      <div className="error">{message}</div>
    )
  }

    return (
      <div>
        <Header text = {"Phonebook"}/>
        <SuccessNotification message = {successMessage}/>
        <ErrorNotification message = {errorMessage}/>
        <FilterForm handleInput={handleInput} newInput={newInput}/>
        <Header text = {"Add new"}/>
        <PersonForm 
          addName = {addName} handleNameChange = {handleNameChange} handleNumberChange={handleNumberChange} 
            newName={newName} newNumber={newNumber}/>
        <Header text = {"Numbers"}/>
        <PersonFilter personsToShow = {personsToShow} removePerson={removePerson}/>
      </div>
    )
}

export default App