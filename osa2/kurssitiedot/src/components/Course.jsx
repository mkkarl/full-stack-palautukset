const Header = ({ name }) => {
  return (

    <h2>{name}</h2>

  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part part={part} key={part.id} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const t = parts.map(part => part.exercises)
  const sum = t.reduce((a, b) => a + b)

  return (
    <div>
      <p><b>total of {sum} excercises</b></p>
    </div>
    
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course