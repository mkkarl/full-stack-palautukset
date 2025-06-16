import { useState } from 'react'

const Title =(props) => {
  return <h1>{props.name}</h1>
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = (props) => {
  return (
    <p>{props.text} {props.clicks}</p>
  )
}

const Statistics = props => {
  const sum = props.goodClicks + props.neutralClicks + props.badClicks
  const average = (props.goodClicks - props.badClicks) / sum
  const positive = props.goodClicks / sum * 100

  return (
    <p>
      good {props.goodClicks}<br />
      neutral {props.neutralClicks}<br />
      bad {props.badClicks}<br/>
      all {sum}<br/>
      average {average}<br />
      positive {positive} %
    </p>
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
      <Display text='good' clicks={good} />
      <Display text='neutral' clicks={neutral} />
      <Display text='bad' clicks={bad} />
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad}/>
    </div>
  )
}

export default App
