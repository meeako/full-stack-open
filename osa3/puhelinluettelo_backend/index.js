require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
})

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', async (request, response) => {
    numberOfDocuments = await Person.countDocuments({})
    let info = `Phonebook has info for ${numberOfDocuments} people. ${new Date()}`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
            response.json(person)
            } else {
            response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const {name, number} = request.body
    Person.findByIdAndUpdate(id, {name, number}, {new: true, runValidators: true, context: 'query'})
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})