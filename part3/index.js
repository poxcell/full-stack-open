// const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require('./models/Contact')

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


morgan.token('body',(req) => JSON.stringify(req.body))

// general use log
const generalMorgan = morgan(':method :url :status :res[content-length] - :response-time ms',{
  skip: req => req.method === 'POST'
})

// only used in POST methods
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body',{
  skip: req => req.method !== 'POST'
})

app.use(generalMorgan)

app.use(postMorgan)


app.get('/',(request,response) => {
  response.send('<h1>Sup Duuudes</h1>')
})

app.get('/api/persons',(request, response) => {
  Contact.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/persons',(request, response,next) => {
  const body = request.body


  const contact = new Contact({
    name: body.name,
    number: body.number || false
  })

  contact
    .save()
    .then(savedContact => {
      console.log(`added ${savedContact.name}`)
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if(contact){
        response.json(contact)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(request.params.id,
    contact,
    {
      new:true,
      runValidators:true,
      context:'query'
    })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))



})

app.delete('/api/persons/:id',(request,response,next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// app.get('/info',(request, response) => {
//   const numPeople = persons.length
//   const currDate = new Date()
//   response.send(`
//     <div>
//       <p>Phonebook has info for ${numPeople} people</p>
//       <p>${currDate}</p>
//     </div>
//     `)
// })


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error:'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error:error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)
})