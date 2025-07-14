require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

morgan.token('postreq', (req, res) => {
    if (req.method == 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: "malformatted id" })
    }

    next(error)
}

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postreq'))
app.use(express.static('dist'))
app.use(errorHandler)

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
    },
    {
        "name": "Testi Testaaja",
        "number": "123-456789",
        "id": "5"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hei mualima!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => Number(p.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    body = request.body
    Person.findByIdAndUpdate(request.params.id, body)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const info = `<p>Phonebook has info for ${persons.length} people</p>`
            const time = `<p>${Date()}</p>`

            response.send(`<div>${info}${time}</div>`)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
