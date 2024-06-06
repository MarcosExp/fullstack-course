import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
      
    </div>
  )
}

export default App
