const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


morgan.token('body',(req,res) => JSON.stringify(req.body))

// general use log
const generalMorgan = morgan(':method :url :status :res[content-length] - :response-time ms',{
  skip: req =>req.method === 'POST'
})

// only used in POST methods
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body',{
  skip: req =>req.method !== 'POST'
})

app.use(generalMorgan)
app.use(postMorgan)

let persons = [
  {
    id:1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id:2,
    name: "Ada Lovelace",
    number: "39-44-532453"
  },
  {
    id:3,
    name: "Dan Abramov",
    number: "12-43-23242525"
  },
  {
    id:4,
    name: "Mary Poppendendick",
    number: "39-23-6412122"
  },
  {
    id:5,
    name: "delet mi dud",
    number: "55555555555555"
  },
]

const generateId = () =>   Math.floor(Math.random() * 9999999999)


app.get('/',(request,response) => {
  response.send('<h1>Sup Duuudes</h1>')
})

app.get('/api/persons',(request, response) => {
  response.json(persons)
})

app.post('/api/persons',(request, response) => {

  const body = request.body
  const duplicate = persons.find(person => person.name === body.name)

  if(!body.name || !body.number){
    return response.status(400).json({
      error:'content missing'
    })
  }

  if (duplicate){
    return response.status(400).json({
      error:'name is already in database'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.get('/api/persons/:id',(request,response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info',(request, response) => {
  const numPeople = persons.length
  const currDate = new Date()
  response.send(`
    <div>
      <p>Phonebook has info for ${numPeople} people</p>
      <p>${currDate}</p>
    </div>
    `)
})


const PORT = 3001
app.listen(PORT, () =>{

  console.log(`Server running on port ${PORT}`)
})