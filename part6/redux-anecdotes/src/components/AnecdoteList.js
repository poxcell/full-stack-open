import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"

const AnecdoteList = () => {
  const anecdotes =  useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)

  const orderedAnecdotes = anecdotes.sort( (a,b) => 
    a.votes < b.votes ? 1 : 0
  )
  orderedAnecdotes.map(anecdote => console.log(typeof(anecdote))) 
  const filteredAnecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
  

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`,4))
    
  }


  return(
    <div>
      {notification !== '' &&  <Notification/> }
      
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList