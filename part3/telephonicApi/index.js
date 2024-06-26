const express = require('express')
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Initial list of persons
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

// Route to get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Route to get a specific person by id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Route to get info about the phonebook
app.get('/info', (request, response) => {
  const dateTime = new Date()
  const totalPersons = persons.length

  const message = `<p>Phonebook has info for ${totalPersons} people</p> <p>${dateTime}</p>`
  response.send(message)
})

// Route to delete a person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Route to add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number are missing' })
  }

  // Check if the name already exists in the phonebook
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  // Create a new person object
  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number
  }

  // Add the new person to the list
  persons = persons.concat(person)

  // Respond with the new person
  response.json(person)
})

// Start the server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
