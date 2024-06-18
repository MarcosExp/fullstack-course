// Import necessary hooks and services
import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {

  // Create necessary states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  // Fetch initial data from the server when the component mounts
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Handle name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Handle number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Add a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault();
    
    // Check if the person already exists in the phonebook
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      // If the person exists, confirm updating the phone number
      if (window.confirm(`${newName} is already on the phonebook, do you want to update the number?`)) {
        const idToUpdate = existingPerson.id

        // Update the existing person's phone number
        personService
          .update(idToUpdate, { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            // Update the local state with the updated person
            setPersons(persons.map(person =>
              person.id === idToUpdate ? updatedPerson : person
            ))

            // Send a notification when successfully updated
            setMessage(`${newName} has been updated successfully`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)

            // Clear the input fields
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error updating person:', error)
          })
      }
    } else {
      // If the person doesn't exist, add a new person
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          // Add the new person to the local state
          setPersons(persons.concat(returnedPerson))

          // Send a notification when successfully added
          setMessage(`${newName} has been added successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          // Clear the input fields
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error adding person:', error)
        })
    }
  }

  // Handle person deletion
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          // Update the local state by removing the deleted person
          setPersons(persons.filter(person => person.id !== id))

          // Send a notification when successfully deleted
          setMessage(`${name} has been deleted successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          // Handle error when the person is already deleted from the server
          setErrorMessage(`${name} was already deleted from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  // Filter persons based on search term
  const personsToShow = searchTerm 
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Display error and notification messages */}
      <Error errorMessage={errorMessage}/>
      <Notification message={message}/>

      {/* Filter component to handle search term */}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>

      <h2>Add new!</h2>

      {/* Form component to add a new person */}
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      {/* List component to display persons */}
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App