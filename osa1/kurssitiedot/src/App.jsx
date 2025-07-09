const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
    )
  }

const Content = ({parts}) => {
  return (
    <>
      <Part part = {parts[0].part} exercises = {parts[0].exercises} />
      <Part part = {parts[1].part} exercises = {parts[1].exercises} />
      <Part part = {parts[2].part} exercises = {parts[2].exercises} />
    </>
    )
  }

const Part = ({part, exercises}) => {
  return (
    <>
      <p>{part} {exercises}</p>
    </>
    )
  }

const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
    )
  }

const App = () => {
  const parts = [
    {part: "Fundamental of React", exercises: 10},
    {part: "Using props to pass data", exercises: 7}, 
    {part: "State of component", exercises: 14}
  ]
  const course = "Half Stack application development"

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts}/>
      <Total total = {parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App
