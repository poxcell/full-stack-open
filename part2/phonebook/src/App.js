import React, { useState, useEffect } from 'react'
import personsServices from './services/persons'
import AddPersonForm from './components/AddPersonForm'
import PersonsBox from './components/PersonsBox'
import Filter from './components/Filter'

const Message = ({message,color}) =>{
  
  if (message === null){
    return null
  }
  const messageStyle ={
    background: 'lightgrey',
    color: color,
    fontSize: '24px',
    border: `${color} solid 3px`,
    padding:'10px',
    borderRadius: '10px',
    marginBottom:'15px'
  }
  return(
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    
  ])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([])
  const [message, setMessage] = useState([null,'green'])

  const filterNames = (event) => {
    const filterInput = event.target.value
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filterInput))
    setFilter(filtered)
  }
  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  const handleAddPerson = (event)=>{
    event.preventDefault()
    const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (!foundPerson){
      
      const newPerson = {name:newName,number:newNumber}
      personsServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage([`Added ${returnedPerson.name}`,'green'])
          setTimeout(() => {
            setMessage([null,'green'])
          },3000)
        })
        .catch(error => {
          const errorMessage = error.response.data.error.split('.,')[0]
          console.log(errorMessage)
          setMessage([errorMessage,'red'])
          setTimeout(() => {
            setMessage([null,'green'])
          },6000)
        })
    }
    else{
      personsServices
        .update(foundPerson,newNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id !== foundPerson.id ? person : returnedPerson
          ))
        })
        .catch(error => {
          const errorMessage = error.response.data.error.split('.,')[0]
          console.log(errorMessage)
          setMessage([errorMessage,'red'])
          setTimeout(() => {
            setMessage([null,'green'])
          },6000)
        })
    }
  }

  

  const handleDeletePerson = id => {
    const person = persons.find(person => person.id === id)
    const confirmation = window.confirm(`you sure you want to delete ${person.name}?`)

    if (confirmation){
      personsServices
        .deletePerson(id)
        .then(response =>{
          setPersons(persons.filter(person => id !== person.id) )
        })
    }
      
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message[0]} color={message[1]}/>
      <Filter handleChange={filterNames}/>
      <h2>add a new</h2>
      <AddPersonForm 
        handleSubmit={handleAddPerson} 
        newName={newName} 
        newNumber ={newNumber}
        updateName={updateName}
        updateNumber={updateNumber}
      />
      <h2>Numbers</h2>
      <PersonsBox 
        filter={filter} 
        persons={persons}
        handleDelete ={handleDeletePerson}
      />
    </div>
  )
}







export default App