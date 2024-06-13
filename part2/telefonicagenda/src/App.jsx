import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } 
    
    else {
      const personObject = {
        name: newName,
        number: newNumber
      };
  
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('')
    }
  }
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
