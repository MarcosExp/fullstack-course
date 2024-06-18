// Import necessary hooks and services
import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {

  // Create necessary states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
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
  const handleSearchChange = (event) =>{
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
          ));
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
    if(window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // Filter persons based on search term
  const personsToShow = searchTerm ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>

      <h2>Add new!</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
