import React, {useState} from 'react'

const calcAverage = (good,bad,all) => (good - bad) / all


const calcPositive = (good,all) => (good / all) * 100

const Statistics = ({good,neutral,bad}) => {
  const all = good + neutral + bad
  const average = calcAverage(good,bad,all)
  const positive = calcPositive(good,all)
  if (all <= 0){
    return(
      <div>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text='good' count={good}/>
          <Statistic text='neutral' count={neutral}/>
          <Statistic text='bad' count={bad}/>
          <Statistic text='all' count={all}/>
          <Statistic text='average' count={average}/>
          <Statistic text='positive' count={positive} decorator='%'/>
        </tbody>
      </table>
    </div>
  )
}
const Statistic = ({text,count,decorator =''})=>(
  <tr>
    <td> {text} </td> 
    <td> {count} {decorator} </td> 
  </tr>
)

const FeedbackButton = ({handleClick,text,value}) => {
  return(
    <button onClick={() => handleClick(value + 1)}>{text}</button>
  )
}


const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  return(
    <div>
      <h2>give feedback</h2>
      <FeedbackButton handleClick={setGood} text = 'good' value = {good}/>
      <FeedbackButton handleClick={setNeutral} text = 'neutral' value = {neutral}/>
      <FeedbackButton handleClick={setBad} text = 'bad' value = {bad}/>
      

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App