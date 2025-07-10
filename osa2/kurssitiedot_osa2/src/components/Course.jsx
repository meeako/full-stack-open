const Course = ({course}) => {
  return (
  <>  
    <Header course = {course}/>
    <Content course = {course}/>
  </>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({course}) => {
  return (
    <div>
      <ul>
        {course.parts.map(part =>
          <Part key = {part.id} part = {part}/>
        )}
      </ul>
      <p>
        Total number of exercises&nbsp; 
        <Total parts = {course.parts}/>
      </p>
  </div>
  )
}

const Part = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return total
}

export default Course