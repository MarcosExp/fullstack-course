import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>Give Feedback!</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  const { good, neutral, bad, total } = props
  const average = ((good-bad)/total).toFixed(1)
  const positiveAverage = ((good/total)*100).toFixed(1)
  if (total === 0){
    return(
    <div>
      <h2>Statistics</h2>
      <p>No feedback given yet!</p>
    </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good}/>
          <StatisticLine text='Neutral' value={neutral}/>
          <StatisticLine text='Bad' value={bad}/>
          <StatisticLine text='All' value={total}/>
          <StatisticLine text='Average' value={average}/>
          <StatisticLine text='Positive' value={`${positiveAverage}%`} />
        </tbody>  
       </table> 
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
 

  const handleClickGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleClickGood} text='Good' />
      <Button handleClick={handleClickNeutral} text='Neutral' />
      <Button handleClick={handleClickBad} text='Bad' />
      <Statistic good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App
