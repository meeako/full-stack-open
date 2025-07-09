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

const Total = ({parts}) => {
  let total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
    )
  }

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts : [
      {part: "Fundamental of React", exercises: 10},
      {part: "Using props to pass data", exercises: 7}, 
      {part: "State of component", exercises: 14}
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App
