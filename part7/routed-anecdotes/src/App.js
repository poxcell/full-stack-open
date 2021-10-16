import React, { useState } from 'react'
import { 
  Link,
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import { useField  } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link href='#' style={padding} to='/'>anecdotes</Link>
      <Link href='#' style={padding} to='/new'>create new</Link>
      <Link href='#' style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
          {anecdote.content}
          </Link>
        </li>)
      }

    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({addNew, setNotification}) => {
  const [content,resetContent] = useField('text')
  const [author,resetAuthor] = useField('text')
  const [info,resetInfo] = useField('text')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content:content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`new anecdote added: ${content.value}`)
    history.push('/')
  }

  const reset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button><button onClick={(e) => reset(e)}>reset</button>
      </form>
    </div>
  )

}

const Anecdote = ({note}) => {
  const padding = {
    padding: 15
  }
  return(
    <div style={padding}>
      <p>
        <strong>Author: </strong>{note.author}
      </p>
      <p>
        <strong>content: </strong>{note.content}
      </p>
      <p>
        <strong>info: </strong> 
        <a target="_blank" rel='noreferrer' href={note.info}>{
          note.info}
          </a> 
      </p>
      <p>
        <strong>Votes: </strong>{note.votes}
      </p>
      
    </div>
  )
}
const Notification = ({notification, setNotification}) => {
  const boxedNotification = {
    marginTop:'20px',
    border: 'red solid 2px',
    paddingLeft: '10px'
  } 
  setTimeout( ()=> {
    setNotification('')
  },10000)
  return(
    <div>

      {notification &&
        <div style ={boxedNotification}>
        <p>{notification}</p>
      </div>}
    </div>
    
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  
  const [notification, setNotification] = useState('')
  
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const match = useRouteMatch('/anecdotes/:id')

  const note = match ? anecdoteById(match.params.id) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

        <Menu />
        <Notification notification ={notification} setNotification={setNotification}/>
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote note={note} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/new'>
            <CreateNew addNew={addNew} setNotification={setNotification} />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes}/>
          </Route>
        </Switch>

      <Footer />
    </div>
  )
}

export default App;