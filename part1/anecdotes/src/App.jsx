import { useState } from 'react'

const Header = () => <div><h1>Anecdote of the day</h1></div>

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const MaxVoted = ({anecdote, votes}) => {
  if (votes === 0){
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>There are no votes yet. Vote!</p>
      </div>
    )
  }
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdote} votes={votes}/>
    </div>
  )
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const max = points.indexOf(Math.max(...points))

  const handleClickNext = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1))
  }

  const handleClickVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Header />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleClickNext} text='Next Anecdote' />
      <Button handleClick={handleClickVote} text='Vote' />
      <MaxVoted anecdote={anecdotes[max]} votes={points[max]}/>
    </div>
  )
}

export default App
