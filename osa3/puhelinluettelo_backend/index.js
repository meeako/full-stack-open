const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


let persons = [
    { 
        id: "1",
        name: 'Arto Hellas', 
        number: '040-123456' 
    },
    {
        id: "2",
        name: 'Ada Lovelace', 
        number: '39-44-5323523' 
    },
    {   id: "3",
        name: 'Dan Abramov', 
        number: '12-43-234345' 
    },
    {   id: "4",
        name: 'Mary Poppendieck', 
        number: '39-23-6423122' 
    }
]

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (request, response) => {
    let info = `Phonebook has info for ${persons.length} people. ${new Date()}`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    const personIndex = persons.findIndex(person => person.id === id)
    if (personIndex === -1) {
        return response.status(404).json({ error: 'person not found' })
    }

    const updatedPerson = {
        ...persons[personIndex],
        number: body.number
    }

    persons[personIndex] = updatedPerson

    response.json(updatedPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const randomId = Math.floor(Math.random()*200)
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing'})
    }

    const personExists = persons.some(person => person.name === body.name)
    if(personExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: String(randomId)
    }

    persons = persons.concat(person)
    
    response.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server runnin on port ${PORT}`)