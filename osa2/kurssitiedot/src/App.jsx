const Header1 = ({ name }) => {
  return <h1>{name}</h1>
}

const Header2 = ({ name }) => {
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
      <Header2 name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header1 name='Web development curriculum' />
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App