import { useState } from 'react'

const Title =(props) => {
  return <h1>{props.name}</h1>
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = props => {
  const sum = props.goodClicks + props.neutralClicks + props.badClicks

  if (sum === 0) {
    return <p>No feedback given</p>
  }

  const average = (props.goodClicks - props.badClicks) / sum
  const positive = props.goodClicks / sum * 100

  return (
    <table>
      <StatisticLine text='good' value={props.goodClicks} />
      <StatisticLine text='neutral' value={props.neutralClicks} />
      <StatisticLine text='bad' value={props.badClicks} />
      <StatisticLine text='all' value={sum} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive + ' %'} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title name='give feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Title name='statistics' />
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad}/>
    </div>
  )
}

export default App
