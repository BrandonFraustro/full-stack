import { useState } from 'react'
import './App.css'

const H2 = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  /* console.log('StatisticLine: ', props.text) */
  if (props.text === 'No feedback given') {
    return ( 
      <div>
        <p>{props.text}</p>
      </div>
    )
  } else if(props.text === 'Positive') {
    return ( 
      <tr>
          <td>{props.text}:</td>
          <td>{props.value}%</td>
      </tr>
    )
  } else {
    return ( 
      <tr>
        <td>{props.text}:</td>
        <td>{props.value}</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  /* console.log('Statistics: ', props) */
  const val = props.value[0].good + props.value[1].neutral + props.value[2].bad;
  const averageTotal = props.value[4].average / props.value[3].all;
  const positiveTotal = (props.value[0].good * 100) / props.value[3].all
  if (val === 0) {
    return (
      <StatisticLine text="No feedback given"/>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.value[0].good}/>
        <StatisticLine text="Neutral" value={props.value[1].neutral}/>
        <StatisticLine text="Bad" value={props.value[2].bad}/>
        <StatisticLine text="All" value={props.value[3].all}/>
        <StatisticLine text="Average" value={averageTotal}/>
        <StatisticLine text="Positive" value={positiveTotal}/>
      </tbody>
    </table>
  )
}

function App() {
  const [values, setValues] = useState([
    {good: 0},
    {neutral: 0},
    {bad: 0},
    {all: 0},
    {average: 0},
  ])

  const handleGood = () => {
    const updateValue = [...values]
    updateValue[0].good += 1;
    updateValue[3].all += 1;
    updateValue[4].average += 1;
    setValues(updateValue)
  }

  const handleNeutral = () => {
    const updateValue = [...values]
    updateValue[1].neutral += 1;
    updateValue[3].all += 1;
    setValues(updateValue)
  }

  const handleBad = () => {
    const updateValue = [...values]
    updateValue[2].bad += 1;
    updateValue[3].all += 1;
    updateValue[4].average -= 1;
    setValues(updateValue)
  }

  return (
    <div>
      <H2 text='Give feedback' />
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      <H2 text='Statistics' />
      <Statistics value={values}/>
    </div>
  )
}

export default App
