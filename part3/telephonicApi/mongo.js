const mongoose = require('mongoose')

// Get the password from the command line arguments
const password = process.argv[2]

// Construct the MongoDB Atlas connection URL using the provided password
const url = `mongodb+srv://marcos:${password}@cluster0.cck1alo.mongodb.net/telephonicApp?retryWrites=true&w=majority&appName=Cluster0`

// Define the schema for a person
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Create a model for a person using the schema
const Person = mongoose.model('Person', personSchema)

// Set Mongoose to use relaxed query parsing
mongoose.set('strictQuery', false)

// Connect to MongoDB Atlas using the constructed URL
mongoose.connect(url)

// If only the password is provided, list all persons in the phonebook
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        // Close the database connection
        mongoose.connection.close()
    })
}

// If a name and phone number are provided, add a new person to the phonebook
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    // Save the new person to the database
    person.save().then(result => {
        console.log('Person saved!')
        // Close the database connection
        mongoose.connection.close()
    })
}
