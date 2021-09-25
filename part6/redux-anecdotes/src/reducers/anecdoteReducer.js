import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type:'VOTE',
      data:{id}
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const {content,votes, id} = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      content: content,
      votes: votes,
      id: id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}



const anecdoteReducer = (state = [], action) => {
  
  switch (action.type){
    case 'VOTE':
      const arr = state.findIndex(note => action.data.id === note.id )
      let prevVotes = state[arr].votes

      const newState = [...state]
      newState[arr].votes = prevVotes += 1

      return newState
    
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.content,
        votes: action.votes,
        id: action.id
      }
      return state.concat(newAnecdote)

    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }

}

export default anecdoteReducer