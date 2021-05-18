import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0,1:0,2:0,3:0,4:0,5:0})
  const mostVotes = selectMostVoted(votes)
  return (
    <div>
    <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={voteCurrrent(selected,votes,setVotes)} >vote</button>
        <button onClick={randomAnecdote(anecdotes,setSelected)}>next anecdote</button>
      </div>
    <h2>Anecdote with most votes</h2>
    {anecdotes[mostVotes]}
    </div>
  )
}

const selectMostVoted = (votes) =>{
  let numVotes = 0
  let index = 0
  for (const vote in votes) {
    if(votes[vote] > numVotes){
      numVotes = votes[vote]
      index = vote
    }
  }
  return index
}

const voteCurrrent = (selected,votes,handleClick) => {
  return () => {
    const copy = {...votes}
    copy[selected] = copy[selected] + 1
    handleClick(copy)
  }
  
}
const randomAnecdote = (anecdotes,handleClick) => {
  const length = anecdotes.length
  const anecdote = Math.floor(Math.random() * length)
  return () => handleClick(anecdote)
}

export default App