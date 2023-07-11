import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

function App() {
  const name = 'Fátima'
  const age = 20
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Brandon" age={13 + 10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default App
