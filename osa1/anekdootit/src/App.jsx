import React, { useState } from 'react';

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Display = ({text}) => <p>{text}</p>
const AnecdoteDisplay = ({text, total}) => {
  if (total === 0) {
    return <p>No votes yet</p>
  } else {
    return (
      <div><Header text = {"Anecdote with most votes"}/>
      {text}
      <Display text = {"Votes " + total}/>
      </div>
      )
  }
} 

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0));
  const [total, setTotal] = useState(0)
  const [anecdote, setAnecdote] = useState("")

  const randomAnecdote = () => {
    console.log(votes)
    const randomNumber = Math.floor(Math.random() * 7)
    console.log(randomNumber)
    if (selected + randomNumber > 7) {
      setSelected(Math.abs(randomNumber % selected))
    } else {
      setSelected(selected + randomNumber)
    }
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > total){
      setTotal(copy[selected])
      setAnecdote(anecdotes[selected])
    }
    setVotes(copy)
  }

  return (
    <div>
      <Header text = "Anecdote of the day"/>
      <Display text = {anecdotes[selected]}/>
      <Display text = {"Votes " + votes[selected]}/>
      <div>
        <Button handleClick={voteAnecdote} text = {"Vote"}/>
        <Button handleClick={randomAnecdote} text={"Next anecdote"}/>
      </div>
      <AnecdoteDisplay text = {anecdote} total = {total}/>
    </div>
  )
}

export default App
