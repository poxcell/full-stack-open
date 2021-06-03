import Person from './Person'


const PersonsBox = ({filter,persons,handleDelete}) => (
  <div>
    { filter.length > 0 
      ? filter.map((person) => 
        <Person  
          key={person.id} 
          name={person.name} 
          number={person.number} 
          handleDelete={() => handleDelete(person.id)}
        />)
      : persons.map((person) => 
        <Person  
          key={person.id} 
          name={person.name} 
          number={person.number} 
          handleDelete={() => handleDelete(person.id)}
        />)
      }
  </div>
)

export default PersonsBox