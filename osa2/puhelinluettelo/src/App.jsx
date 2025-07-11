import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Person = ({persons}) => {return(
  <li>{persons.name} {persons.number}</li>)}

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

const PersonFilter = ({personsToShow}) => {return(
  <>     
    {personsToShow.map(person => 
    <Person key={person.name} persons={person}/>)}
  </>
)}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newInput, setNewInput] = useState('')
  const personsToShow = (persons.some(person => (person['name']).includes(newInput))) ?
  persons.filter(person => person.name.includes(newInput)) : persons

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person['name'].toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phone book`)
    } else {
      const personObject = {
      name: newName,
      number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewInput(event.target.value)
  }
  
    return (
      <div>
        <Header text = {"Phonebook"}/>
        <FilterForm handleInput={handleInput} newInput={newInput}/>
        <Header text = {"Add new"}/>
        <PersonForm 
          addName = {addName} handleNameChange = {handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
        <Header text = {"Numbers"}/>
        <PersonFilter personsToShow = {personsToShow}/>
      </div>
    )
}

export default App

