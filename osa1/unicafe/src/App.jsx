import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, total}) => <tr><td>{text}</td><td>{total}</td></tr>

const Statistics = ({good, neutral, bad, total, value}) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = value/total
  const positive = good/total
  
  return <>
    <Header text={"Statistics"}/>
    <table>
      <tbody>
        <StatisticLine text={"Good"} total={good}/>
        <StatisticLine text={"Neutral"} total={neutral}/>
        <StatisticLine text={"Bad"} total={bad}/>
        <StatisticLine text={"Average"} total={average}/>
        <StatisticLine text={"Positive"} total={positive}/>
      </tbody>
    </table></>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setAll] = useState(0)
  const [value, setValue] = useState(0)

  const increaseGood = () => {
      setGood(good + 1)
      setAll(total + 1)
      setValue(value + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(total + 1)
    setValue(value)
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setAll(total + 1)
    setValue(value - 1)
  }

  return (
    <div>
      <Header text = {"Give feedback"}/>
      <Button handleClick ={increaseGood} text = {"Good"}/>
      <Button handleClick ={increaseNeutral} text = {"Neutral"}/>
      <Button handleClick ={increaseBad} text = {"Bad"}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} value = {value}/>
    </div>
  )
}

export default App 
