import React, { useState, useEffect } from 'react'
import personServices from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newFilter, setNewFilter] = useState('') 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newNotification, setNewNotification ] = useState('')
  const [ errorExists, setErrorExists ] = useState(false)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber
    }
    
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          let existingPerson = persons.find(person => person.name.toLowerCase() === personObject.name.toLocaleLowerCase())
          let id = existingPerson.id
          personObject.name = existingPerson.name //added this because capitalized names look nicer

          personServices
            .update(persons.find(person => person.name.toLowerCase() === personObject.name.toLocaleLowerCase()).id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setNewNotification('Number succesfully changed')
              setTimeout(() => {
                setNewNotification('')
              }, 5000)
            })
            .catch(error => {

              setNewNotification(`Information of ${newName} has already been deleted from the server`)
              setErrorExists(true)
              setTimeout(() => {
                setNewNotification('')
                setErrorExists(false)
              }, 5000)
            })
        }
    } else {
        personServices
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNewNotification(`Added ${personObject.name}`)
            setTimeout(() => {
              setNewNotification('')
            }, 5000)
          })  
    }
  }

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      personServices
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id!==id))
          setNewNotification(`${name} deleted`)
          setTimeout(() => {
            setNewNotification('')
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Filter</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Phonebook</h2>
      <Notification message={newNotification} errorExists={errorExists} />
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDeleteClick={handleDeleteClick}/>
    
    </div>
  )

}

const Filter = ({value, onChange}) => {
    return (
      <form>
        <div>
          filter shown with: <input value={value} onChange={onChange} />
        </div>
      </form>  
    )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">save</button>
      </form>

    )
}

const Persons = ({persons, newFilter, handleDeleteClick}) => {
    return (
      <ul>
        {persons.filter(
          person => person.name.toLowerCase()
            .includes(newFilter.toLowerCase()))
            .map(person => 
              <li key={person.name}>
                {person.name} {person.number} <button onClick={() => {handleDeleteClick(person.id, person.name)}}> delete </button>
              </li>)}
      </ul>
    )
}

const Notification = ({message, errorExists}) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }
  
  if (errorExists) {
    return (
      <div style={errorStyle}>
        <br />
        <em>{message}</em>
      </div>
    )
  }

  return (
    <div style={notificationStyle}>
      <br />
      <em>{message}</em>
    </div>
  )
}

export default App