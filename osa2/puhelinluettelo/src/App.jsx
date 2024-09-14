import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      setErrorMessage('Name or number cannot be empty')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...nameExists, number: newNumber }

        personService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== nameExists.id ? person : returnedPerson
            ))
            setSuccessMessage(`Updated ${newName}'s number.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} was already deleted from server`)
            setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
            setPersons(persons.filter(person => person.id !== nameExists.id))
          })
      }
    } else {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
      setNewName('')
      setNewNumber('')
    })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`The person '${name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} isSuccess={true} />
      <Notification message={errorMessage} isSuccess={false} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
