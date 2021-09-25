import { connect } from "react-redux"
// import {  useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addNewAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    
    e.target.anecdote.value =''

    // dispatch(addAnecdote(content))

    // dispatch(setNotification(`anecdote created`,4))
    props.addAnecdote(content)
    props.setNotification(`anecdote added`,4)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name='anecdote'/></div>
        <button >create</button>
      </form>
    </div>
  )
}

const connectedAnecdoteForm = connect(null,{addAnecdote, setNotification})(AnecdoteForm)
export default connectedAnecdoteForm