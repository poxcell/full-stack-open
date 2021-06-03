import axios from 'axios'

const BASE_URL = '/api/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(BASE_URL,newPerson)
  return request.then(response => response.data)
}

const deletePerson = id => {  
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then(response => response)
}

const update = (person, newNumber) => {
  const request = axios.put(`${BASE_URL}/${person.id}`,{...person,number:newNumber})
  return request.then(response => response.data)
}


export default{getAll,create,deletePerson,update}