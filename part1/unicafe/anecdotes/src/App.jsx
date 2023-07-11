import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [selected, setSelected] = useState(0)
  const [random, setRandom] = useState(0)
  const [vote, setVote] = useState([ 0, 0, 0, 0, 0, 0 ])
  const copy = [...vote]
  const [mostVote, setMostVote] = useState(0)

  useEffect (() => {
    copy.forEach((value, index) => {
      if (value > mostVote) {
        setMostVote(value)
      }
    })
  }, [copy])

  const anecdotes = [
    'Adding manpower to a late software project makes it later!',
    'The best way to get a project done faster is to start sooner',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Even the best planning is not so omniscient as to get it right the first time.',
    'How does a project get to be a year late?... One day at a time.',
    'The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.',
  ]
  
  const handleClickNext = () => {
    setRandom(Math.floor(Math.random() * anecdotes.length));
    setSelected(random)
    anecdotes[selected]
  }

  const handleClickVote = () => {
    copy[random] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <p>{anecdotes[random]}</p>
      <p>Has {copy[random]}</p>
      <button onClick={handleClickNext}>Next anecdote</button>
      <button onClick={handleClickVote}>Vote</button>
      <h2>Anecdote width most votes</h2>
      <p>{anecdotes[vote.indexOf(mostVote)]}</p>
    </div>
  )
}

export default App
