
const AddPersonForm = ({handleSubmit,newName,newNumber,updateName, updateNumber}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value = {newName} onChange={updateName}/>
    </div>
    <div>
      number: <input value = {newNumber} onChange={updateNumber}/>
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>
)

export default AddPersonForm